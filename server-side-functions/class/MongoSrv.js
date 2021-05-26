deploy: {
    const DBs = class {
        constructor (mongo) {
            const _logger = new Shell.Log(`DBs`);
            const _assert = new Shell.Assert();
            _assert.setLogger(_logger);

            _assert.setTitle(`Audit`);
            _assert.try(
                `[mongo] must be a MongoDB connection.`,
                mongo instanceof Mongo,
            );
            if (_assert.hasError()) {
                return;
            }

            let cnt = 0;

            const _toString = () => {
                return `[MongoSrv.DBs] Number of database: ${cnt}`;
            };
            const _update = () => {
                const _dbs = mongo.getDBs().databases;
                _dbs.forEach(_db => {
                    Object.defineProperty(this, _db.name, Object.extend({value: mongo.getDB(_db.name)}, _descriptor));
                });
                cnt = _dbs.length;
            };

            const _descriptor = {
                writable: false,
                enumerable: true,
            };
            Object.defineProperties(this, {
                toString    : Object.extend({value: function () { return _toString() }}, _descriptor),
                tojson      : Object.extend({value: function () { return _toString() }}, _descriptor),
                update      : Object.extend({value: function () { return _update() }}, _descriptor),
            });

            _update();
        }
    };
    const DBsExt = {};

    // MongoSrv class
    const _id = `MongoSrv`;
    const version = `1.0.0`;
    const changelog = {
        '1.0.0': [
            `Release [${_id}.DBs]`
        ],
    };
    const value = new Code(`(() => {
        const cDBs = Object.extend(${tojson(DBs)}, ${tojson(DBsExt)});
        const _toStr = function () {return this.constructor.name};

        const _descriptor = {
            writable: false,
            enumerable: true,
        };
        return {
            DBs: Object.defineProperties(cDBs, {toString: Object.extend({value: _toStr}, _descriptor), tojson: Object.extend({value: _toStr}, _descriptor)}),
        }
    })()`);
    const lastVersion = (db.getSiblingDB('script').system.js.findOne({_id}, {_id: 0, version: 1}) || {version}).version;
    const res = db.getSiblingDB('script').system.js.save({_id, value, version, changelog});

    // Reload library
    db.getSiblingDB('script').loadServerScripts();

    // Log result
    const logger = new Shell.Log(`CLASS-${_id.toUpperCase().pad(10,1)}`);
    if (res.nUpserted) {
        logger.verbose(`Created`, `[${_id}@${version}]`);
        break deploy;
    }
    if (res.nModified) {
        logger.verbose(`Modified`, `[${_id}@${lastVersion}] => [${_id}@${version}]`);
        break deploy;
    }
    logger.verbose(`Unchanged`, `[${_id}@${version}]`);
}
