{
  const $Privilege = function (db, collection, ...actions) {
    /** Self construct */
    if (!(this instanceof $Privilege)) return new $Privilege(db, collection, ...actions);

    /** Private constant */
    const _logger = $Log(`PRIVILEGE`);

    const privSchema = $Schema({
      '!resource': {
        '!db': "string",
        '!collection': "string",
      },
      '!actions': "string",
    });

    /** Private variable */
    let privObj = null;

    /** Basic function */
    const _toString = () => {
      if (privObj == null) {
        return `Invalid [$Privilege]`;
      }
      return `\
[$Privilege] ${privObj.resource.db}.${privObj.resource.collection || '*'}`;
    };
    const _valueOf = () => {
      if (privObj == null) {
        return null;
      }
      return `\
${privObj.resource.db}.${privObj.resource.collection || '*'}
(${privObj.actions.sort().join(', ')})`;
    };

    /** Private function */
    const _reduceActions = (accumulator, currentValue) => {
      const data = $Check.isArray(currentValue) ? currentValue : [currentValue];
      accumulator = [...accumulator, ...data];
      return accumulator;
    };
    const _genDataObj = (obj) => {
      if (!privSchema.test(obj)) {
        _logger.err(`Audit`, `Invalid input data for privilege object`);
        return;
      }
      privObj = obj;
    }
    const _genData = () => {
      if ($Privilege.is$Privilege(db)) {
        return _genDataObj(db.getData());
      }
      if (privSchema.test(db)) {
        return _genDataObj(db);
      }
      if (collection instanceof DBCollection) {
        db = collection._db;
        collection = collection._shortName;
      }
      if (db instanceof DB) {
        db = db._name;
      }
      const data = {
        resource: {db, collection},
        actions: actions.reduce(_reduceActions, []),
      }
      return _genDataObj(data);
    };
    const _getData = () => {
      return privObj;
    };

    const _descriptor = {
      writable: false,
      enumerable: true,
    };
    Object.defineProperties(this, {
      toString: Object.extend({value: function (...p) { return _toString(...p) }}, _descriptor),
      tojson  : Object.extend({value: function (...p) { return _toString(...p) }}, _descriptor),
      valueOf : Object.extend({value: function (...p) { return _valueOf (...p) }}, _descriptor),
      getData : Object.extend({value: function (...p) { return _getData (...p) }}, _descriptor),
    });

    _genData();
    $Object.deepFreeze(this);
    return this;
  };
  const __$Privilege__ = $Privilege.prototype = {
    help: function () {
      return `\
[$Privilege](db, collection, ...actions) - Privilege object helper
  .getData() - Return the privilege object
`;
    },
  };
  const $PrivilegeExt = {
    template: {
      public  : [`find`],
      monitor : [`collStats`, `indexStats`],
      read    : [`find`, `listIndexes`],
      list    : [`listCollections`],
    },
    getData: (obj) => {
      if ($Privilege.is$Privilege(obj)) {
        return obj.getData();
      }
      return null;
    },
    is$Privilege: (obj) => {
      return $Schema({'!data': $Privilege}).test({data: obj});
    },
  };

  /** Define deploy object */
  const _id = `$Privilege`;
  const version = `1.0.0`;
  const changelog = {
    '1.0.0': [
      `Release [${_id}]`,
    ],
  };
  const value = new Code(`\
(() => {
  const $Privilege = Object.extend(${tojson($Privilege)}, ${tojson($PrivilegeExt)});
  $Privilege.prototype = ${tojson(__$Privilege__)};
  $Privilege.toString = $Privilege.tojson = function () { return this.prototype.help() };
  $Privilege.prototype.toString = $Privilege.prototype.tojson = function () { return this.help(); }

  $Object.deepFreeze($Privilege);
  return $Privilege;
})()`);

  /** Deploy */
  $Deploy(`SRV`).run(_id, version, changelog, value);
}