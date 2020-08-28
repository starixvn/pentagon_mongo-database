db.getSiblingDB('script').system.js.save({
    _id: 'createIndex'
,   value: (coll, idxKeys, idxOpts, showExist = false) => {
        if (coll == null || typeof(coll) == "undefined") {
            throw Error("[coll] must be defined");
        }
        if (idxKeys == null || typeof(idxKeys) == "undefined") {
            throw Error("[idx_keys] must be defined");
        }
        if (idxOpts == null || typeof(idxOpts) == "undefined") {
            throw Error("[idx_opts] must be defined");
        }

        // Parameters' type verification
        if (!(coll instanceof DBCollection)) {
            throw Error("[coll] must be a collection");
        }
        if (!(idxKeys instanceof Object)) {
            throw Error("[idx_keys] must be an object");
        }
        if (!(idxOpts instanceof Object)) {
            throw Error("[idx_opts] must be an object");
        }

        // Create index
        let idx = null;
        idx = coll.getIndexes().filter((_idx) => RegExp(`^${idxOpts.name}$`).test(_idx.name))[0];
        if (!idx) {
            let idxName = '';
            Object.keys(idxKeys).forEach((key) => {
                idxName += `_${key}_${JSON.stringify(idxKeys[key])}`;
            });
            idxName = idxName.substr(1);
            idx = coll.getIndexes().filter((_idx) => RegExp(`^${idxName}$`).test(_idx.name))[0];
        }
        if (!idx) {
            const res = coll.createIndex(idxKeys, idxOpts);
            if (res.ok !== 1) {
                printjson(res);
                return;
            }
            idx = coll.getIndexes().filter((_idx) => RegExp(`^${idxOpts.name}$`).test(_idx.name))[0];
            idx.____________________________________________________CREATED = true;
        } else {
            idx._____________exists = true;
        }
        if (JSON.stringify(idx.key) !== JSON.stringify(idxKeys)) {
            idx.__________________________WARNING = '[keys] is NOT correct!!!';
        }
        Object.keys(idxOpts).forEach((opt) => {
            if (JSON.stringify(idx[opt]) !== JSON.stringify(idxOpts[opt])) {
                idx.__________________________WARNING = `[${opt}] option is NOT correct!!!`;
            }
        });
        delete idx.v;
        if (showExist || !idx._____________exists || idx.__________________________WARNING) {
            printjson(idx);
        }
    }
,   version: 1.3
,   process: 'Database Maintenance'
});
db.getSiblingDB('script').loadServerScripts();
