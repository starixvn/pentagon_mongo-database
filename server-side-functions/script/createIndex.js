db.getSiblingDB('script').system.js.save({
    _id: 'createIndex'
,   value: (coll, idx_keys, idx_opts, show_exist = false) => {
        if (coll == null || typeof(coll) == "undefined")
            throw Error("[coll] must be defined");
        if (idx_keys == null || typeof(idx_keys) == "undefined")
            throw Error("[idx_keys] must be defined");
        if (idx_opts == null || typeof(idx_opts) == "undefined")
            throw Error("[idx_opts] must be defined");

        // Parameters' type verification
        if (!(coll instanceof DBCollection))
            throw Error("[coll] must be a collection");
        if (!(idx_keys instanceof Object))
            throw Error("[idx_keys] must be an object");
        if (!(idx_opts instanceof Object))
            throw Error("[idx_opts] must be an object");

        // Create index
        let idx;
        idx = coll.getIndexes().filter((_idx) => RegExp('^' + idx_opts.name + '$').test(_idx.name))[0];
        if (!idx) {
            let idx_name = '';
            Object.keys(idx_keys).forEach((key) => {
                idx_name += '_' + key + '_' + JSON.stringify(idx_keys[key]);
            });
            idx_name = idx_name.substr(1);
            idx = coll.getIndexes().filter((_idx) => RegExp('^' + idx_name + '$').test(_idx.name))[0];
        }
        if (!idx) {
            let res = coll.createIndex(idx_keys, idx_opts);
            if (res.ok != 1) {
                printjson(res);
                return;
            }
            idx = coll.getIndexes().filter((_idx) => RegExp('^' + idx_opts.name + '$').test(_idx.name))[0];
            idx.____________________________________________________CREATED = true;
        } else {
            idx._____________exists = true;
        }
        if (JSON.stringify(idx.key) != JSON.stringify(idx_keys)) {
            idx.__________________________WARNING = '[keys] is NOT correct!!!';
        }
        Object.keys(idx_opts).forEach((opt) => {
            if (JSON.stringify(idx[opt]) != JSON.stringify(idx_opts[opt])) {
                idx.__________________________WARNING = '[' + opt + '] option is NOT correct!!!';
            }
        });
        delete idx.v;
        if (show_exist || !idx._____________exists || idx.__________________________WARNING) {
            printjson(idx);
        }
    }
,   version: 1.2
,   process: 'Database Maintenance'
}); db.getSiblingDB('script').loadServerScripts();
