db.getSiblingDB('script').system.js.save({
    _id: 'archiveLog'
,   value: (fromDB, toDB, group) => {
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

        // Parameters' type verification
        if (!(fromDB instanceof DB)) {
            log('[fromDB] must be a database', 'Audit', 'ARCHIVE', 'E');
            return;
        }
        if (!(toDB instanceof DB)) {
            log('[toDB] must be a database', 'Audit', 'ARCHIVE', 'E');
            return;
        }
        if (!(typeof group == "string")) {
            log('[group] must be a string', 'Audit', 'ARCHIVE', 'E');
            return;
        }

        let e;

        // Initialize group collections' name
        let coll = {
            log: group
        };
        let coll_bk = {
            log: group + '_bk'
        };

        // Group must have collection
        if (fromDB.getCollectionInfos({name: coll.log}).length != 1) {
            log('Cannot run archive because [' + fromDB._name + '.' + coll.log + '] does NOT exist', group, 'ARCHIVE', 'E');
            return;
        }

        let archiveByBatch = (docs) => {
            try {
                toDB[coll_bk.log].insertMany(docs, {ordered: false});
            } catch (e) {
                log('- log.insertMany: ' + e.message, group, e.name, 'E');
            }
            bulkUpdatePipe = [];
            docs.forEach( (_doc) => {
                bulkUpdatePipe.push(
                    {   updateMany: {
                            filter: {_id: _doc._id}
                        ,   update: {$set: {'__archive.eventtime': ISODate(_doc.requestTimeStamp)}}
                        }
                    }
                )
            });
            fromDB[coll.log].bulkWrite(bulkUpdatePipe, {ordered : false});
        }

        let docs = [];
        let docs_cnt = 0;

        fromDB[coll.log].find({'__archive.eventtime': {$exists: false}}).forEach( (doc) => {
            docs.push(doc);
            docs_cnt++;

            if (docs_cnt % 1000 === 0) {
                archiveByBatch(docs);
                docs = [];
            }

            if (docs_cnt % 10000 === 0) {
                log('- Archiving ' + docs_cnt + ' logs', group, 'ARCHIVE', 'I');
            }
        });
        archiveByBatch(docs);
        log('Archived ' + docs_cnt + ' logs', group, 'ARCHIVE', 'I');
    }
,   version: 2.8
,   process: 'Archive Process'
}); db.getSiblingDB('script').loadServerScripts();
