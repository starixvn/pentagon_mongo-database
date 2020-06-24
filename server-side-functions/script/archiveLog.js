db.getSiblingDB('script').system.js.save({
    _id: 'archiveLog'
,   value: (fromDB, toDB, group) => {
        if (fromDB == null || typeof(fromDB) == "undefined")
            throw Error("[fromDB] must be defined");
        if (toDB == null || typeof(toDB) == "undefined")
            throw Error("[toDB] must be defined");
        if (group == null || typeof(group) == "undefined")
            throw Error("[group] must be defined");

        // Parameters' type verification
        if (!(fromDB instanceof DB))
            throw Error("[fromDB] must be a database");
        if (!(toDB instanceof DB))
            throw Error("[toDB] must be a database");
        if (!(typeof group == "string"))
            throw Error("[group] must be a string");

        // Initialize group collections' name
        var coll = {
            log: group
        };
        var coll_bk = {
            log: group + '_bk'
        };

        // Group must have collection
        if (fromDB.getCollectionInfos({name: coll.log}).length != 1)
            throw Error("Cannot run archive because [" + fromDB._name + "." + coll.log + "] does NOT exist");

        // Function for logging
        var log = (type, label, title, str) => {
            d = new Date();
            print(d.toISOString() + ' ' + type.toUpperCase() + '  ' + label.toUpperCase() + ' [' + title + '] ' + str);
        }

        var archiveByBatch = (docs) => {
            try {
                toDB[coll_bk.log].insertMany(docs, {ordered: false});
            } catch (e) {
                log('E', e.name, group, '- log.insertMany: ' + e.message);
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

        var docs = [];
        var docs_cnt = 0;

        fromDB[coll.log].find({'__archive.eventtime': {$exists: false}}).forEach( (doc) => {
            docs.push(doc);
            docs_cnt++;

            if (docs_cnt % 1000 === 0) {
                archiveByBatch(docs);
                docs = [];
            }

            if (docs_cnt % 10000 === 0) {
                log('I', 'ARCHIVE', group, '- Archiving ' + docs_cnt + ' logs');
            }
        });
        archiveByBatch(docs);
        log('I', 'ARCHIVE', group, 'Archived ' + docs_cnt + ' logs');
    }
}); db.getSiblingDB('script').loadServerScripts();
