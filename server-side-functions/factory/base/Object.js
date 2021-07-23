deploy: {
  const $Object = {
    help: () => {
      return `\
[$Object]
  .deepFreeze(obj)
`;
    },
    deepFreeze: (obj) => {
      if ($Object.isObject(obj) + $Object.isFunction(obj) > 0) {
        Object.getOwnPropertyNames(obj).forEach(k => {
          if (k !== "constructor") {
            $Object.deepFreeze(obj[k]);
          }
        });
      }
      Object.freeze(obj);
    },
    sortProperties: (obj) => {
      return Object.keys(obj).sort().reduce(
        (accumulator, currentValue, index, array) => {
          accumulator[currentValue] = obj[currentValue];
          return accumulator;
        },
        {},
      );
    },
    isObject: (obj) => {
      return typeof obj == "object";
    },
    isNotObject: (obj) => {
      return !$Object.isObject(obj);
    },
    isFunction: (obj) => {
      return typeof obj == "function";
    },
    isNotFunction: (obj) => {
      return !$Object.isFunction(obj);
    },
    isArray: (obj) => {
      return Array.isArray(obj);
    },
    isNotArray: (obj) => {
      return !Array.isArray(obj);
    },
    typeof: (obj) => {
      return typeof obj;
    },
  };

  /** Define deploy object */
  const _id = `$Object`;
  const version = `1.0.0`;
  const changelog = {
    '1.0.0': [
      `Release [${_id}]`,
    ],
  };
  const value = new Code(`\
(() => {
  const $Object = ${tojson($Object)};
  $Object.toString = $Object.tojson = () => {return this.help()};
  $Object.deepFreeze($Object);
  return $Object;
})()`);

  /** Deploy */
  const global = Function('return this;')();
  const title = `BASE-${_id.toUpperCase().pad(10,1)}`;
  if (!global.db) {
    global[_id] = eval("(" + value.code + ")");
    print(`${ISODate().toISOString().pad(29,1)}V  ${title} [Local] • [${_id}@${version}]`);
    break deploy;
  }
  const lastVersion = (db.getSiblingDB('script').system.js.findOne({_id}, {_id: 0, version: 1}) || {version}).version;
  const res = db.getSiblingDB('script').system.js.save({_id, value, version, changelog});
  db.getSiblingDB(`script`).loadServerScripts();

  /** Log */
  if (res.nUpserted) {
    print(`${ISODate().toISOString().pad(29,1)}V  ${title} [Created] • [${_id}@${version}]`);
    break deploy;
  }
  if (res.nModified) {
    print(`${ISODate().toISOString().pad(29,1)}V  ${title} [Modified] • [${_id}@${lastVersion}] => [${_id}@${version}]`);
    break deploy;
  }
}