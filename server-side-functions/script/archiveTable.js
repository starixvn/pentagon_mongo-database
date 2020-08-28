db.getSiblingDB('script').system.js.save({
    _id: 'archiveTable'
,   value: (fromDB, toDB, group, column, cutOffDate) => {
        if (fromDB == null || typeof(fromDB) == "undefined") {
            log('[fromDB] must be defined', 'Audit', 'ARCHIVE', 'E');
            return;
        }
        if (toDB == null || typeof(toDB) == "undefined") {
            log('[toDB] must be defined', 'Audit', 'ARCHIVE', 'E');
            return;
        }
        if (group == null || typeof(group) == "undefined") {
            log('[group] must be defined', 'Audit', 'ARCHIVE', 'E');
            return;
        }
        if (column == null || typeof(column) == "undefined") {
            log('[column] must be defined', 'Audit', 'ARCHIVE', 'E');
            return;
        }
        if (cutOffDate == null || typeof(cutOffDate) == "undefined") {
            cutOffDate = new Date((Math.floor(Date.now() / 3600000) - 24) * 3600000);
        }

        // Parameters' type verification
        if (!(fromDB instanceof DB)) {
            log('[fromDB] must be a database', 'Audit', 'ARCHIVE', 'E');
            return;
        }
        if (!(toDB instanceof DB)) {
            log('[toDB] must be a database', 'Audit', 'ARCHIVE', 'E');
            return;
        }
        if (typeof(group) != "string") {
            log('[group] must be a string', 'Audit', 'ARCHIVE', 'E');
            return;
        }
        if (typeof(column) != "string") {
            log('[column] must be a string', 'Audit', 'ARCHIVE', 'E');
            return;
        }
        if (!(cutOffDate instanceof Date)) {
            log('[cutOffDate] must be a date', 'Audit', 'ARCHIVE', 'E');
            return;
        }

        // Initialize group collections' name
        const coll = {
            name: `${group}`
        };
        const collBK = {
            name: `${group}_bk`
        };

        // Group must have collection
        if (fromDB.getCollectionInfos({name: coll.name}).length !== 1) {
            log(`Cannot run archive because [${fromDB._name}.${coll.name}] does NOT exist`, group, 'ARCHIVE', 'E');
            return;
        }

        const archiveByBatch = (docs) => {
            try {
                toDB[collBK.name].insertMany(docs, {ordered: false});
            } catch (e) {
                log(`- insertMany: ${e.message}`, group, e.name, 'E');
            }
            const bulkUpdatePipe = [];
            docs.forEach( (_doc) => {
                let eventtime = new Date();
                try {
                    if (_doc[column] instanceof Date) {
                        eventtime = _doc[column];
                    } else {
                        eventtime = (typeof(_doc[column]) == "string") ? ISODate(date) : new Date();
                    }
                } catch (e) {}

                bulkUpdatePipe.push(
                    {   updateMany: {
                            filter: {_id: _doc._id}
                        ,   update: {$set: {'__archive.eventtime': eventtime}}
                        }
                    }
                )
            });
            fromDB[coll.name].bulkWrite(bulkUpdatePipe, {ordered : false});
        }

        let docArr = [];
        let docArrCnt = 0;

        log(`${cutOffDate.toISOString()}`, 'CutOffTime', 'ARCHIVE', 'I');
        const filter = {};
        filter[column] = {$lt: cutOffDate};
        filter['__archive.eventtime'] = {$exists: false};

        fromDB[coll.name].find(filter).forEach( (doc) => {
            docArr.push(doc);
            docArrCnt++;

            if (docArrCnt % 1000 === 0) {
                archiveByBatch(docArr);
                docArr = [];
            }

            if (docArrCnt % 10000 === 0) {
                log(`- Archiving ${docArrCnt} docs`, group, 'ARCHIVE', 'I');
            }
        });
        archiveByBatch(docArr);
        log(`Archived ${docArrCnt} docs`, group, 'ARCHIVE', 'I');
    }
,   version: 2.10
,   process: 'Archive Process'
});
db.getSiblingDB('script').loadServerScripts();
