db.getSiblingDB('script').system.js.save({
    _id: 'reIndex'
,   value: (coll, filter) => {
        if (coll == null || typeof(coll) == "undefined") {
            throw Error("[coll] must be defined");
        }

        // Parameters' type verification
        if (!(coll instanceof DBCollection)) {
            throw Error("[coll] must be a collection");
        }

        // Get list of indexes
        let indexes = coll.getIndexes();
        if (typeof filter == "string") {
            indexes = indexes.filter((doc) => doc.name === filter);
        } else if (filter instanceof RegExp) {
            indexes = indexes.filter((doc) => filter.test(doc.name));
        }

        // Re-create indexes
        indexes.forEach((idx) => {
            const key = idx.key;
            delete idx.key;
            delete idx.v;
            delete idx.ns;

            if (tojson(Object.keys(key)) === tojson(['_id'])) {
                log(`Index ${idx.name} cannot be re-indexed.`, coll._shortName, 'REINDEX', 'E');
                return;
            }

            let res;
            res = coll.dropIndex(idx.name);
            if (!(res.ok)) {
                log(`dropIndex ${tojson(res)}`, coll._shortName, 'REINDEX', 'E');
                return;
            }
            res = coll.createIndex(key, idx);
            if (!(res.ok)) {
                log(`createIndex ${tojson(res)}`, coll._shortName, 'REINDEX', 'E');
                return;
            }
            log(`Index ${idx.name} re-created: ${tojsononeline(key)}`, coll._shortName, 'REINDEX', 'I');
        });
    }
,   version: 1.2
,   process: 'Database Maintenance'
});
db.getSiblingDB('script').loadServerScripts();
