deploy: {
    const ExtDate = class {
        constructor (value) {
            const _logger = new Shell.Log(`EXTENDED-DATE`);
            const _assert = new Shell.Assert();
            _assert.setLogger(_logger);

            let _value = 0;
            let _parts = null;
            const _regexp = /^([0-9]{4})-([0-9]{2})-([0-9]{2})([ ]|[T])([0-9]{2}):([0-9]{2}):([0-9]{2})([.][0-9]{0,9})?(Z|[+-]?[0-9]{2}[:]?[0-9]{2})?$/;

            const _toString = () => {
                if (_parts == null) {
                    return 'Invalid Date';
                }
                return `\
${_parts.year.toString().padStart(4,'0')}-\
${_parts.month.toString().padStart(2,'0')}-\
${_parts.date.toString().padStart(2,'0')}T\
${_parts.hour.toString().padStart(2,'0')}:\
${_parts.minute.toString().padStart(2,'0')}:\
${_parts.second.toString().padStart(2,'0')}\
${_parts.subsecond}${_parts.timezone}\
`;
            };
            const _valueOf = () => {
                return _value;
            };
            const _parse = (value) => {
                const parsed = _regexp.exec(value);

                if (parsed == null) {
                    return null;
                }

                const parts = {};
                parts.year      = Number(parsed[1]);
                parts.month     = Number(parsed[2]);
                parts.date      = Number(parsed[3]);
                parts.hour      = Number(parsed[5]);
                parts.minute    = Number(parsed[6]);
                parts.second    = Number(parsed[7]);
                parts.subsecond = parsed[8] ? parsed[8] : '';
                parts.timezone  = parsed[9] ? parsed[9] : '';

                return parts;
            };
            const _toDate = () => {
                return new Date(_value);
            };

            const _descriptor = {
                writable: false,
                enumerable: true,
            };
            Object.defineProperties(this, {
                toString    : Object.extend({value: function () { return _toString() }}, _descriptor),
                tojson      : Object.extend({value: function () { return _toString() }}, _descriptor),
                valueOf     : Object.extend({value: function () { return _valueOf() }}, _descriptor),
                toDate      : Object.extend({value: function () { return _toDate() }}, _descriptor),
            });


            _assert.setTitle(`Audit`);
            if (typeof value === "string") {
                _parts = _parse(value);
                _value = Date.parse(value) + (_parts && _parts.subsecond ? (_parts.subsecond * 1000) % 1 : 0);
            }
            if (typeof value === "number") {
                _parts = _parse((new Date(value)).toISOString());
                _value = value;
            }
        }
    };
    const ExtDateExt = {};

    // Type class
    const _id = `Type`;
    const version = `1.0.0`;
    const changelog = {
        '1.0.0': [
            `Release [${_id}.ExtDate]`
        ],
    };
    const value = new Code(`(() => {
        const cExtDate = Object.extend(${tojson(ExtDate)}, ${tojson(ExtDateExt)});
        const _toStr = function () {return this.constructor.name};

        const _descriptor = {
            writable: false
        ,   enumerable: true
        };
        return {
            ExtDate: Object.defineProperties(cExtDate, {toString: Object.extend({value: _toStr}, _descriptor), tojson: Object.extend({value: _toStr}, _descriptor)}),
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
