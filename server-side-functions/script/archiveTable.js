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
        if (cutOffDate == null || typeof(cutOffDate) == "undefined")
            cutOffDate = new Date((Math.floor(Date.now() / 3600000) - 24) * 3600000);

        // Parameters' type verification
        if (!(fromDB instanceof DB)) {
            log('[fromDB] must be a database', 'Audit', 'ARCHIVE', 'E');
            return;
        }
        if (!(toDB instanceof DB)) {
            log('[toDB] must be a database', 'Audit', 'ARCHIVE', 'E');
            return;
        }
        if (typeof group != "string") {
            log('[group] must be a string', 'Audit', 'ARCHIVE', 'E');
            return;
        }
        if (typeof column != "string") {
            log('[column] must be a string', 'Audit', 'ARCHIVE', 'E');
            return;
        }
        if (!(cutOffDate instanceof Date)) {
            log('[cutOffDate] must be a date', 'Audit', 'ARCHIVE', 'E');
            return;
        }

        // Initialize group collections' name
        let coll = {
            name: group
        };
        let coll_bk = {
            name: group + '_bk'
        };

        // Group must have collection
        if (fromDB.getCollectionInfos({name: coll.name}).length != 1) {
            log('Cannot run archive because [' + fromDB._name + '.' + coll.name + '] does NOT exist', group, 'ARCHIVE', 'E');
            return;
        }

        let archiveByBatch = (docs) => {
            try {
                toDB[coll_bk.name].insertMany(docs, {ordered: false});
            } catch (e) {
                log('- insertMany: ' + e.message, group, e.name, 'E');
            }
            let bulkUpdatePipe = [];
            docs.forEach( (_doc) => {
                let eventtime = new Date();
                try {
                    eventtime = (_doc[column] instanceof Date) ? _doc[column] : (typeof _doc[column] == 'string') ? ISODate(date) : new Date();
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

        let doc_arr = [];
        let doc_arr_cnt = 0;

        log(cutOffDate.toISOString(), 'CutOffTime', 'ARCHIVE', 'I');
        let filter = {};
        filter[column] = {$lt: cutOffDate};
        filter['__archive.eventtime'] = {$exists: false};

        fromDB[coll.name].find(filter).forEach( (doc) => {
            doc_arr.push(doc);
            doc_arr_cnt++;

            if (doc_arr_cnt % 1000 === 0) {
                archiveByBatch(doc_arr);
                doc_arr = [];
            }

            if (doc_arr_cnt % 10000 === 0) {
                log('- Archiving ' + doc_arr_cnt + ' docs', group, 'ARCHIVE', 'I');
            }
        });
        archiveByBatch(doc_arr);
        log('Archived ' + doc_arr_cnt + ' docs', group, 'ARCHIVE', 'I');
    }
,   version: 2.9
,   process: 'Archive Process'
}); db.getSiblingDB('script').loadServerScripts();
