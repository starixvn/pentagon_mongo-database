{
    // Maint.createIndex()
    const createIndexFunc = (coll, idxKeys, idxOpts = {}) => {
        // Parameters' type verification
        if (!(coll instanceof DBCollection)) {
            Misc.log(`Collection [${tojsononeline(coll)}] must be a collection.`, `Audit`, `CREATE-IDX`, `E`);
            return;
        }
        if (!(idxKeys instanceof Object)) {
            Misc.log(`Index keys [${tojsononeline(idxKeys)}] must be an object.`, `Audit`, `CREATE-IDX`, `E`);
            return;
        }
        if (!(idxOpts instanceof Object)) {
            Misc.log(`Index options [${tojsononeline(idxOpts)}] must be an object.`, `Audit`, `CREATE-IDX`, `E`);
            return;
        }

        // Copy params
        const _idxKeys = Object.extend({}, idxKeys);
        const _idxOpts = Object.extend({}, idxOpts);

        // Index name generation
        if (!_idxOpts.name) {
            let name = `IX`;
            name = _idxOpts.unique ? `U${name}` : name;
            name = _idxOpts.partialFilterExpression ? `F${name}` : name;
            name = `${name}_${coll._shortName}_${Object.keys(_idxKeys).join('_')}`;
            name = _idxOpts.expireAfterSeconds ? `TTL_${coll._shortName}` : name;

            _idxOpts.name = name;
        }

        // Deprecated options
        delete _idxOpts.background;

        // Create index
        let idx = null;
        let idxName = ``;
        Object.keys(_idxKeys).forEach((key) => {
            idxName += `_${key}_${String(_idxKeys[key]).toString()}`;
        });
        idxName = idxName.substr(1);
        idx = coll.getIndexes().filter((_idx) => RegExp(`^${_idxOpts.name}$`).test(_idx.name))[0];
        idx = idx || coll.getIndexes().filter((_idx) => RegExp(`^${idxName}$`).test(_idx.name))[0];
        if (!idx) {
            const res = coll.createIndex(_idxKeys, _idxOpts);
            if (res.ok !== 1) {
                Misc.log(`• • (${res.codeName}) ${res.errmsg}`, `${coll._shortName}`, `CREATE-IDX`, `E`);
                return;
            }
            idx = coll.getIndexes().filter((_idx) => RegExp(`^${_idxOpts.name}$`).test(_idx.name))[0];
            Misc.log(`  • Index ${_idxOpts.name} has been CREATED.`, `${coll._shortName}`, `CREATE-IDX`, `I`);
        }

        delete idx.v;
        if (JSON.stringify(idx.key) !== JSON.stringify(_idxKeys)) {
            Misc.log(
                `  • Index ${_idxOpts.name} with keys ${tojsononeline(idx.key)} is NOT MATCHED with input ${tojsononeline(_idxKeys)}.`
            ,   `${coll._shortName}`
            ,   `CREATE-IDX`
            ,   `W`
            );
        }
        const warning = [];
        [...Object.keys(idx), ...Object.keys(_idxOpts)].
            filter((opt) => !RegExp(`^_|ns|key|collation`).test(opt)).
            filter((val, idx, self) => {return self.indexOf(val) === idx}).forEach((opt) => {
            if (JSON.stringify(idx[opt]) !== JSON.stringify(_idxOpts[opt])) {
                warning.push(`  • • Option ${opt}: [IDX] ${tojsononeline(idx[opt])} vs. ${tojsononeline(_idxOpts[opt])} [INPUT]`);
            }
        });
        if (warning.length > 0) {
            Misc.log(`  • Index ${tojsononeline(_idxKeys)} has options that NOT MATCHED with input:`, `${coll._shortName}`, `CREATE-IDX`, `W`);
            warning.forEach((msg) => {
                Misc.log(`${msg}`, `${coll._shortName}`, `CREATE-IDX`, `W`);
            })
        }
    };

    // Maint.reIndex()
    const reIndexFunc = (coll, filter) => {
        // Parameters` type verification
        if (!(coll instanceof DBCollection)) {
            throw Error(`Collection [${tojsononeline(coll)}] must be a collection`);
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

            if (tojson(Object.keys(key)) === tojson([`_id`])) {
                Misc.log(`Index ${idx.name} cannot be re-indexed.`, coll._shortName, `REINDEX`, `E`);
                return;
            }

            let res;
            res = coll.dropIndex(idx.name);
            if (!(res.ok)) {
                Misc.log(`dropIndex ${tojson(res)}`, coll._shortName, `REINDEX`, `E`);
                return;
            }
            res = coll.createIndex(key, idx);
            if (!(res.ok)) {
                Misc.log(`createIndex ${tojson(res)}`, coll._shortName, `REINDEX`, `E`);
                return;
            }
            Misc.log(`Index ${idx.name} re-created: ${tojsononeline(key)}`, coll._shortName, `REINDEX`, `I`);
        });
    };

    // Maint
    db.getSiblingDB(`script`).system.js.save({
        _id: `Maint`
    ,   value:  new Code(`{
            createIndex: ${createIndexFunc.toString()}
        ,   reIndex: ${reIndexFunc.toString()}
        }`)
    ,   version: 2.1
    ,   name: `Maintenance`
    });

    // Reload scripts
    db.getSiblingDB(`script`).loadServerScripts();
}
