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
      if (_assert.hasError()) { return {}; }

      let cnt = 0;

      const _toString = () => {
        return `[MongoSrv.DBs] Number of database: ${cnt}`;
      };
      const _update = () => {
        const databases = mongo.getDBNames();
        const descriptor = {writable: true, enumerable: true,};
        databases.forEach(db => {
            Object.defineProperty(this, db, Object.extend({value: mongo.getDB(db)}, descriptor));
        });
        cnt = databases.length;
      };
      const _list = () => {
        _update();
        const prop = Object.getOwnPropertyNames(this).filter(_ => this[_] instanceof DB);
        const propLen = Math.max(...prop.map(_ => _.length));
        if (prop.length == 0) return '{ }';
        return `${prop.map(_ => `  ${_.pad(propLen)} : ${this[_]}\n`).join('')}`;
      };

      const _descriptor = {writable: false, enumerable: true,};
      Object.defineProperties(this, {
        _mongo    : Object.extend({value: mongo}, _descriptor),
        toString  : Object.extend({value: function () { return _toString() }}, _descriptor),
        tojson    : Object.extend({value: function () { return _toString() }}, _descriptor),
        update    : Object.extend({value: function () { return _update() }}, _descriptor),
        list      : Object.extend({value: function () { return _list() }}, _descriptor),
      });

      _update();

      const handler = {
        get: function (target, name) {
          return target.hasOwnProperty(name) ? target[name] : mongo.getDB(name);
        },
      };
      const proxy = new Proxy(this, handler);
      // Funny part: the autocomplete failed with Proxy object because there is no Symbol.toPrimitive value
      Object.defineProperties(proxy, {
        [Symbol.toPrimitive] : Object.extend({value: function () { return null }}, _descriptor),
      });
      return proxy;
    }
  };
  const DBsExt = {};

  // MongoSrv class
  const _id = `MongoSrv`;
  const version = `1.1.0`;
  const changelog = {
    '1.1.0': [
      `[${_id}.DBs] Proxify instance to access non-existing DB`,
      `[${_id}.DBs] Add list() function`,
    ],
    '1.0.0': [
      `Release [${_id}.DBs]`,
    ],
  };
  const value = new Code(`(() => {
    const cDBs = Object.extend(${tojson(DBs)}, ${tojson(DBsExt)});
    const _toStr = function () {return this.constructor.name};

    const _descriptor = {writable: false, enumerable: true,};
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
