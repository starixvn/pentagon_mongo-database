{
    // Archive.archiveByTimes()
    const archiveByTimesFunc = (fromColl, toColl, _arcOpts, _childOpts) => {
        // Param validation
        // • We will work directly on the DBCollection objects that refer directly
        //   to the source and destination collection
        if (!(fromColl instanceof DBCollection)) {
            Misc.log(`Source collection MUST be a collection.`, `Audit`, `ARC-BY-TIME`, `E`);
            return;
        }
        if (!(toColl instanceof DBCollection)) {
            Misc.log(`Destination collection MUST be a collection.`, `Audit`, `ARC-BY-TIME`, `E`);
            return;
        }

        // Copy object based params
        // • This is to prevent the changes in this function affect the variable outside
        //   due to referencing object.
        const arcOpts = Object.extend({cutOffTime: ISODate(), filter: {}, exCols: []}, _arcOpts);
        const childOpts = Object.extend([], _childOpts);

        // Param verification
        // • This will compare the object with corresponding user-defined schema
        const arcOptsSchema = {
            timeField: "string"
        ,   cutOffTime: Date
        ,   updateOnly: "boolean"
        ,   filter: "object"
        ,   exCols: Array
        };
        if (!Misc.auditSchema(arcOpts, arcOptsSchema)) {
            Misc.log(`timeOpts' schema is NOT correct.`, `Audit`, `ARC-BY-TIME`, `E`);
            return;
        }
        const exColsSchema = {
            coll: "string"
        ,   localField: "string"
        ,   foreignField: "string"
        ,   fields: Array
        };
        if (arcOpts.exCols.length > 0 && arcOpts.exCols.some((exCol) => !Misc.auditSchema(exCol, exColsSchema))) {
            Misc.log(`timeOpts' schema is NOT correct.`, `Audit`, `ARC-BY-TIME`, `E`);
            return;
        }
        const childCollSchema = {
            fromColl: DBCollection
        ,   toColl: DBCollection
        ,   joinParent: "string"
        ,   joinChild: "string"
        ,   updateOnly: "boolean"
        ,   filter: "object"
        ,   exCols: Array
        };
        if (childOpts.some((coll) => !Misc.auditSchema(coll, childCollSchema))) {
            Misc.log(`childOpts' schema is NOT correct.`, `Audit`, `ARC-BY-TIME`, `E`);
            return;
        }

        Misc.log(`${arcOpts.cutOffTime.toISOString()}`, `CutOffTime`, `ARC-BY-TIME`, `I`);

        // Insert pipe
        // • The list of operation that will insert the documents into destination colection
        let insPipe = [];

        // Update pipe
        // • The list of operation that will update the flags of copied documents
        //   in source collection
        let updPipe = [];

        // Ids object
        // • Each child archive process may have its own joining strategy
        // • This object will collect all values that needed for joining
        //   to pass into child archive process
        const ids = {};
        childOpts.forEach((child) => {
            if (!ids[child.joinParent]) {
                ids[child.joinParent] = [];
            }
        })

        // Building filter
        // • Check if the archive flag exists
        // • Only archive data EARLIER than cut off time based on config field
        const filter = Object.extend({'__archive.eventtime': {$exists: false}}, arcOpts.filter);
        if (arcOpts.timeField) {
            filter[arcOpts.timeField] = {$lt: arcOpts.cutOffTime};
        }

        // Handle BulkWriteError
        // • This function will be used for catching the BulkWriteError
        // • In some cases, insert documents can failed be cause the document are already
        //   archived. Since this error can be ignored, we will only print the count of
        //   failed documents and continue the process.
        const hanldeBulkWriteError = (e, msg) => {
            if (e instanceof BulkWriteError) {
                const err = e.getRawResponse().writeErrors.reduce((acc, cur) => {
                    acc[ErrorCodeStrings[cur.code]] = acc[ErrorCodeStrings[cur.code]] ? acc[ErrorCodeStrings[cur.code]] + 1 : 1;
                    return acc;
                }, {});
                for (const key in err) {
                    Misc.log(`- ${msg}: ${key} - ${err[key]} ops`, `${fromColl._shortName}`, `ARC-BY-TIME`, `E`);
                }
            } else {
                Misc.log(`- ${msg}: ${tojson(e)}`, `${fromColl._shortName}`, `ARC-BY-TIME`, `E`);
            }
        };

        // Get data and archive data
        // • Server return the cursor, we will iterate through it to process data on the go.
        //   This will prevent data to be saved as a whole on local memory, therefore may
        //   lead to insuspicient memory.
        // • noCursorTimeout() is used to ensure the cursor won't be closed by timeout.
        const curSource = fromColl.find(filter).noCursorTimeout();
        curSource.forEach((doc) => {
            // Get extra columns - Duplicated field will be overrided
            arcOpts.exCols.forEach((exCol) => {
                const exFilter = {};
                exFilter[exCol.foreignField] = doc[exCol.localField];
                const project = {_id: 0};
                exCol.fields.forEach((field) => {
                    project[field] = 1;
                });
                const data = fromColl._db[exCol.coll].findOne(exFilter, project);
                doc = Object.extend(doc, data);
            });

            insPipe.push({insertOne: {
                document: doc
            }});
            updPipe.push({updateOne: {
                filter: {_id: doc._id}
            ,   update: [
                    {$set: {__archive: {eventtime: arcOpts.timeField ? doc[arcOpts.timeField] : arcOpts.cutOffTime}}}
                ]
            }});
            for (const field in ids) {
                ids[field].push({joinVal: doc[field], time: arcOpts.timeField ? doc[arcOpts.timeField] : arcOpts.cutOffTime});
            }

            // Execute the operation pipes every 1000 iterations
            if ((insPipe.length - 1) % 1000 === 999 || !curSource.hasNext()) {
                // Run archive for child collections first
                childOpts.forEach((child) => {
                    const dataOpts = ids[child.joinParent];
                    const arcOpts = {
                        joinCol: child.joinChild
                    ,   updateOnly: child.updateOnly ? true : false
                    ,   filter: child.filter ? child.filter : {}
                    ,   exCols: child.exCols ? child.exCols : []
                    };
                    Archive.archiveByIds(child.fromColl, child.toColl, dataOpts, arcOpts);
                });

                if (!arcOpts.updateOnly) {
                    try {
                        toColl.bulkWrite(insPipe, {ordered: false});
                    } catch (e) {
                        hanldeBulkWriteError(e, `Insert to ${toColl._shortName}`);
                    }
                }

                try {
                    fromColl.bulkWrite(updPipe, {ordered: false});
                } catch (e) {
                    hanldeBulkWriteError(e, `Update to ${fromColl._shortName}`);
                }

                Misc.log(`- Archiving ${insPipe.length} documents.`, `${fromColl._shortName}`, `ARC-BY-TIME`, `I`);

                // Reset all pipes
                insPipe = [];
                updPipe = [];
                for (const key in ids) {
                    ids[key] = [];
                }
            }
        });
        Misc.log(`Finished.`, `${fromColl._shortName}`, `ARC-BY-TIME`, `I`);
    };

    const archiveByIdsFunc = (fromColl, toColl, _dataOpts, _arcOpts) => {
        // Param validation
        // • We will work directly on the DBCollection objects that refer directly
        //   to the source and destination collection
        if (!(fromColl instanceof DBCollection)) {
            Misc.log(`Source collection MUST be a collection.`, `Audit`, `ARC-BY-ID  `, `E`);
            return;
        }
        if (!(toColl instanceof DBCollection)) {
            Misc.log(`Destination collection MUST be a collection.`, `Audit`, `ARC-BY-ID  `, `E`);
            return;
        }

        // Copy object based params
        // • This is to prevent the changes in this function affect the variable outside
        //   due to referencing object.
        const dataOpts = Object.extend([], _dataOpts);
        const arcOpts = Object.extend({updateOnly: false, filter: {}, exCols: []}, _arcOpts);

        // Param verification
        // • This will compare the object with corresponding user-defined schema
        const dataValSchema = {
            '!': true
        ,   joinVal: ""
        ,   time: Date
        };
        if (dataOpts.some((data) => !Misc.auditSchema(data, dataValSchema))) {
            Misc.log(`dataOpts' schema is NOT correct.`, `Audit`, `ARC-BY-ID  `, `E`);
            return;
        }
        const arcOptsSchema = {
            '!': true
        ,   joinCol: "string"
        ,   updateOnly: "boolean"
        ,   filter: "object"
        ,   exCols: Array
        };
        if (!Misc.auditSchema(arcOpts, arcOptsSchema)) {
            Misc.log(`arcOpts' schema is NOT correct.`, `Audit`, `ARC-BY-ID  `, `E`);
            return;
        }
        const exColsSchema = {
            coll: "string"
        ,   localField: "string"
        ,   foreignField: "string"
        ,   fields: Array
        };
        if (arcOpts.exCols.length > 0 && arcOpts.exCols.some((exCol) => !Misc.auditSchema(exCol, exColsSchema))) {
            Misc.log(`timeOpts' schema is NOT correct.`, `Audit`, `ARC-BY-ID`, `E`);
            return;
        }

        // Insert pipe
        // • The list of operation that will insert the documents into destination colection
        let insPipe = [];

        // Update pipe
        // • The list of operation that will update the flags of copied documents
        //   in source collection
        const updPipe = [];

        // Building filter and updPipe
        // • Check if the archive flag exists
        // • Based on options, filter data base on join field
        const filter = Object.extend({'__archive.eventtime': {$exists: false}}, arcOpts.filter);
        filter[arcOpts.joinCol] = {$in: []}
        dataOpts.forEach((data) => {
            filter[arcOpts.joinCol]['$in'].push(data.joinVal);

            const updFilter = {'__archive.eventtime': {$exists: false}};
            updFilter[arcOpts.joinCol] = data.joinVal;
            updPipe.push({updateMany: {
                filter: updFilter
            ,   update: [
                    {$set: {__archive: {eventtime: data.time}}}
                ]
            }});
        });

        // Handle BulkWriteError
        // • This function will be used for catching the BulkWriteError
        // • In some cases, insert documents can failed be cause the document are already
        //   archived. Since this error can be ignored, we will only print the count of
        //   failed documents and continue the process.
        const hanldeBulkWriteError = (e, msg) => {
            if (e instanceof BulkWriteError) {
                const err = e.getRawResponse().writeErrors.reduce((acc, cur) => {
                    acc[ErrorCodeStrings[cur.code]] = acc[ErrorCodeStrings[cur.code]] ? acc[ErrorCodeStrings[cur.code]] + 1 : 1;
                    return acc;
                }, {});
                for (const key in err) {
                    Misc.log(`- ${msg}: ${key} - ${err[key]} ops`, `${fromColl._shortName}`, `ARC-BY-ID  `, `E`);
                }
            } else {
                Misc.log(`- ${msg}: ${tojson(e)}`, `${fromColl._shortName}`, `ARC-BY-ID  `, `E`);
            }
        };

        // Get data and archive data
        // • Server return the cursor, we will iterate through it to process data on the go.
        //   This will prevent data to be saved as a whole on local memory, therefore may
        //   lead to insuspicient memory.
        // • noCursorTimeout() is used to ensure the cursor won't be closed by timeout.
        if (!arcOpts.updateOnly) {
            const curSource = fromColl.find(filter).noCursorTimeout();
            curSource.forEach((doc) => {
                // Get extra columns - Duplicated field will be overrided
                arcOpts.exCols.forEach((exCol) => {
                    const exFilter = {};
                    exFilter[exCol.foreignField] = doc[exCol.localField];
                    const project = {_id: 0};
                    exCol.fields.forEach((field) => {
                        project[field] = 1;
                    });
                    const data = fromColl._db[exCol.coll].findOne(exFilter, project);
                    doc = Object.extend(doc, data);
                });

                insPipe.push({insertOne: {
                    document: doc
                }});

                // Execute the operation pipes every 10000 iterations
                if ((insPipe.length - 1) % 10000 === 9999 || !curSource.hasNext()) {
                    try {
                        toColl.bulkWrite(insPipe, {ordered: false});
                    } catch (e) {
                        hanldeBulkWriteError(e, `Insert to ${toColl._shortName}`);
                    }

                    Misc.log(`- Archiving ${insPipe.length} documents.`, `${fromColl._shortName}`, `ARC-BY-ID  `, `I`);

                    insPipe = [];
                }
            });
        }
        try {
            fromColl.bulkWrite(updPipe, {ordered: false});
        } catch (e) {
            hanldeBulkWriteError(e, `Update to ${fromColl._shortName}`);
        }
    };

    // Archive
    db.getSiblingDB('script').system.js.save({
        _id: 'Archive'
    ,   value:  new Code(`{
            archiveByTimes: ${archiveByTimesFunc.toString()}
        ,   archiveByIds: ${archiveByIdsFunc.toString()}
        }`)
    ,   version: 2.0
    ,   name: 'Archive'
    });

    // Reload scripts
    db.getSiblingDB('script').loadServerScripts();
}

