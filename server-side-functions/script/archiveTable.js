db.getSiblingDB('script').system.js.save({
    _id: 'archiveTable'
,   value: (fromDB, toDB, group, column, cutOffDate) => {
        if (fromDB == null || typeof(fromDB) == "undefined")
            throw Error("[fromDB] must be defined");
        if (toDB == null || typeof(toDB) == "undefined")
            throw Error("[toDB] must be defined");
        if (group == null || typeof(group) == "undefined")
            throw Error("[group] must be defined");
        if (column == null || typeof(column) == "undefined")
            throw Error("[column] must be defined");
        if (cutOffDate == null || typeof(cutOffDate) == "undefined")
            cutOffDate = new Date((Math.floor(Date.now() / 3600000) - 24) * 3600000);

        // Parameters' type verification
        if (!(fromDB instanceof DB))
            throw Error("[fromDB] must be a database");
        if (!(toDB instanceof DB))
            throw Error("[toDB] must be a database");
        if (!(typeof group == "string"))
            throw Error("[group] must be a string");
        if (!(typeof column == "string"))
            throw Error("[column] must be a string");
        if (!(cutOffDate instanceof Date))
            throw Error("[cutOffDate] must be a date");

        // Initialize group collections' name
        var coll = {
            name: group
        };
        var coll_bk = {
            name: group + '_bk'
        };

        // Group must have collection
        if (fromDB.getCollectionInfos({name: coll.name}).length != 1)
            throw Error("Cannot run archive because [" + fromDB._name + "." + coll.name + "] does NOT exist");

        // Function for logging
        var log = (type, label, title, str) => {
            d = new Date();
            print(d.toISOString() + ' ' + type.toUpperCase() + '  ' + label.toUpperCase() + ' [' + title + '] ' + str);
        }

        var archiveByBatch = (docs) => {
            try {
                toDB[coll_bk.name].insertMany(docs, {ordered: false});
            } catch (e) {
                log('E', e.name, group, '- insertMany: ' + e.message);
            }
            bulkUpdatePipe = [];
            docs.forEach( (_doc) => {
                var eventtime = new Date();
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

        var docs = [];
        var docs_cnt = 0;

        log('I', 'ARCHIVE', 'CutOffTime', cutOffDate.toISOString());
        var filter = {};
        filter[column] = {$lt: cutOffDate};
        filter['__archive.eventtime'] = {$exists: false};

        fromDB[coll.name].find(filter).forEach( (doc) => {
            docs.push(doc);
            docs_cnt++;

            if (docs_cnt % 1000 === 0) {
                archiveByBatch(docs);
                docs = [];
            }

            if (docs_cnt % 10000 === 0) {
                log('I', 'ARCHIVE', group, '- Archiving ' + docs_cnt + ' docs');
            }
        });
        archiveByBatch(docs);
        log('I', 'ARCHIVE', group, 'Archived ' + docs_cnt + ' docs');
    }
}); db.getSiblingDB('script').loadServerScripts();
