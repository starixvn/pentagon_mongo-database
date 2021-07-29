{
  const $Deploy = function (category) {
    /** Self construct */
    if (!(this instanceof $Deploy)) return new $Deploy(category);

    /** Private constant */
    const global = Function('return this;')();
    const prefix = category || 'CODE';
    let label = prefix;

    /** Basic function */
    const _toString = () => {
      return `Deployment object of [${prefix}]`;
    };

    /** Private function */
    const _log = (label, title, message, type) => {
      const d  = ISODate().toISOString().pad(29,1);
      const t  = ((typeof type != "string") ? 'V' : type.ltrim().substr(0,1)).toUpperCase().pad(3,1);
      const tt = (typeof title != "string") ? ' ' : title;
      const m  = (typeof message != "string") ? tojson(message) : message;

      print(`${d}${t}${label} [${tt}] • ${m}`);
    };
    const _logUpserted = (value, _id, version) => {
      if (value) {
        _log(label, `Created`, `[${_id}@${version}]`);
      }
    }
    const _logModified = (value, _id, lastVersion, version) => {
      if (value) {
        _log(label, `Modified`, `[${_id}@${lastVersion.version}] => [${_id}@${version}]`);
      }
    }
    const _runLocal = (_id, version, value) => {
      global[_id] = eval("(" + value.code + ")");
      _log(label, `Local`, `[${_id}@${version}]`);
    }
    const _runServer = (_id, version, changelog, value) => {
      const lastVersion = db.getSiblingDB('script').system.js.findOne({_id}, {_id: 0, version: 1});
      const res = db.getSiblingDB('script').system.js.save({_id, value, version, changelog});

      _logUpserted(res.nUpserted, _id, version);
      _logModified(res.nModified, _id, lastVersion, version);

      db.getSiblingDB(`script`).loadServerScripts();
    }
    const _run = (_id, version, changelog, value) => {
      label = `${prefix}-${_id.toUpperCase().pad(10,1)}`;

      if (!global.db) {
        _runLocal(_id, version, value);
      }
      if (global.db) {
        _runServer(_id, version, changelog, value);
      }
    }

    const _descriptor = {
      writable: false,
      enumerable: true,
    };
    Object.defineProperties(this, {
      toString: Object.extend({value: function (...p) { return _toString(...p) }}, _descriptor),
      tojson  : Object.extend({value: function (...p) { return _toString(...p) }}, _descriptor),
      run     : Object.extend({value: function (...p) { return _run     (...p) }}, _descriptor),
    });

    $Object.deepFreeze(this);
    return this;
  };
  const __$Deploy__ = $Deploy.prototype = {
    help: function () {
      return `\
[$Deploy](category)
  .run(_id, version, changelog, value)
`;
    },
  };

  /** Define deploy object */
  const _id = `$Deploy`;
  const version = `1.0.0`;
  const changelog = {
    '1.0.0': [
      `Release [${_id}]`,
    ],
  };
  const value = new Code(`\
(() => {
  const $Class = ${tojson($Deploy)};
  $Class.prototype = ${tojson(__$Deploy__)};
  $Class.toString = $Class.tojson = function () {return this.prototype.help()};
  $Class.prototype.toString = $Class.prototype.tojson = function () { return this.help(); }

  $Object.deepFreeze($Class);
  return $Class;
})()`);

  /** Deploy */
  $Deploy(`BASE`).run(_id, version, changelog, value);
}