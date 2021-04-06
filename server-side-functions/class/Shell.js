{
    const Format = class {
        constructor () {
            const _compatibility = !_isWindows();

            const _toString = () => {
                return `[Shell.Format] Compatibility: ${_compatibility}`;
            };
            const _isCompatible = () => {
                return _compatibility;
            };
            const _isApllying = (color) => {
                return _compatibility && Shell.Format.CONST[color.toUpperCase()];
            };
            const _end = (color) => {
                if (_isApllying(color)) {
                    return `${Shell.Format.CONST.ESC}${Shell.Format.CONST.MOD}`;
                }
                return ``;
            };
            const _code = (color) => {
                if (_isApllying(color)) {
                    return `${Shell.Format.CONST.ESC}${Shell.Format.CONST[color.toUpperCase()]}${Shell.Format.CONST.MOD}`;
                }
                return ``;
            };
            const _format = (text, color) => {
                return `${_code(color)}${text || ''}${_end(color)}`;
            };

            let _descriptor = {
                writable: false
            ,   enumerable: true
            };
            Object.defineProperties(this, {
                toString    : Object.extend({value: function () { return _toString() }}, _descriptor)
            ,   tojson      : Object.extend({value: function () { return _toString() }}, _descriptor)
            ,   isCompatible: Object.extend({value: function () { return _isCompatible() }}, _descriptor)
            ,   format      : Object.extend({value: function (text, color) { return _format(text, color) }}, _descriptor)
            });
        }
    };
    const FormatExt = {
        CONST: {
            ESC             : String.fromCharCode(0x1B) + '['
        ,   MOD             : 'm'
        ,   BLACK           : 30
        ,   RED             : 31
        ,   GREEN           : 32
        ,   YELLOW          : 33
        ,   BLUE            : 34
        ,   MAGENTA         : 35
        ,   CYAN            : 36
        ,   WHITE           : 37
        ,   BRIGHTBLACK     : 90
        ,   BRIGHTRED       : 91
        ,   BRIGHTGREEN     : 92
        ,   BRIGHTYELLOW    : 93
        ,   BRIGHTBLUE      : 94
        ,   BRIGHTMAGENTA   : 95
        ,   BRIGHTCYAN      : 96
        ,   BRIGHTWHITE     : 97
        }
    };

    const Log = class {
        constructor (label) {
            const _formatter = new Shell.Format();
            let _label = 'VERBOSE ';

            const _toString = () => {
                return `[Shell.Log] Print log for (${_label})`;
            };
            const _getLabel = () => {
                return _label;
            };
            const _setLabel = (label) => {
                _label = (typeof label != "string") ? _label : label.toUpperCase().pad(8,1);
            };
            const _now = () => {
                return ISODate().toISOString().pad(29,1);
            };
            const _paint = (title, message, type, color) => {
                const d  = _now();
                const t  = ((typeof type != "string") ? 'V' : type.ltrim().substr(0,1)).toUpperCase().pad(3,1);
                const tt = (typeof title != "string") ? ' ' : title;
                const m  = (typeof message != "string") ? tojson(message) : message;
    
                const msg = `${d}${t}${_label} [${tt}] • ${m}`;
                print(_formatter.format(msg, color));
            };
            const _verbose = (title, message) => {
                const type = 'VERBOSE';
                _paint(title, message, type, Shell.Log.CONST[type]);
            };
            const _info = (title, message) => {
                const type = 'INFO';
                _paint(title, message, type, Shell.Log.CONST[type]);
            };
            const _warn = (title, message) => {
                const type = 'WARN';
                _paint(title, message, type, Shell.Log.CONST[type]);
            };
            const _err = (title, message) => {
                const type = 'ERR';
                _paint(title, message, type, Shell.Log.CONST[type]);
            };

            let _descriptor = {
                writable: false
            ,   enumerable: true
            };
            Object.defineProperties(this, {
                toString    : Object.extend({value: function () { return _toString() }}, _descriptor)
            ,   tojson      : Object.extend({value: function () { return _toString() }}, _descriptor)
            ,   getLabel    : Object.extend({value: function () { return _getLabel() }}, _descriptor)
            ,   setLabel    : Object.extend({value: function (label) { return _setLabel(label) }}, _descriptor)
            ,   verbose     : Object.extend({value: function (title, message) { return _verbose(title, message) }}, _descriptor)
            ,   info        : Object.extend({value: function (title, message) { return _info(title, message) }}, _descriptor)
            ,   warn        : Object.extend({value: function (title, message) { return _warn(title, message) }}, _descriptor)
            ,   err         : Object.extend({value: function (title, message) { return _err(title, message) }}, _descriptor)
            });

            this.setLabel(label);
        }
    };
    const LogExt = {
        CONST: {
            VERBOSE : 'BRIGHTGREEN'
        ,   INFO    : ''
        ,   WARN    : 'BRIGHTYELLOW'
        ,   ERR     : 'BRIGHTRED'
        }
    };

    const Assert =  class {
        constructor (title) {
            let _logger = new Shell.Log(`ASSERT`);
            let _title = '';

            const _toString = () => {
                return `[Shell.Assert] ${_logger.getLabel()} - ${_title}`;
            };
            const _setLogger = (logger) => {
                _logger = (logger instanceof Shell.Log) ? logger : _logger;
            };
            const _getTitle = () => {
                return _title;
            };
            const _setTitle = (title) => {
                _title = (typeof title != "string") ? _title : title;
                _resetHistory();
            };
            const _try = (msg, ...conds) => {
                if (!conds.every(eval)) {
                    _logger.err(_title, msg);
                    const err = Error(msg);
                    this.history.push(err);
                    return err;
                }
            };
            const _do = (msg, ...conds) => {
                const err = _try(msg, ...conds);
                if (err) {
                    throw err;
                }
            };
            const _hasError = () => {
                if (this.history.some(eval)) {
                    return true;
                }
                return false;
            };
            const _resetHistory = () => {
                this.history = [];
            };

            let _descriptor = {
                writable: false
            ,   enumerable: true
            };
            Object.defineProperties(this, {
                toString    : Object.extend({value: function () { return _toString() }}, _descriptor)
            ,   tojson      : Object.extend({value: function () { return _toString() }}, _descriptor)
            ,   setLogger   : Object.extend({value: function (logger) {return _setLogger(logger)}}, _descriptor)
            ,   getTitle    : Object.extend({value: function () { return _getTitle() }}, _descriptor)
            ,   setTitle    : Object.extend({value: function (title) {return _setTitle(title)}}, _descriptor)
            ,   try         : Object.extend({value: function (msg, ...conds) {return _try(msg, ...conds)}}, _descriptor)
            ,   do          : Object.extend({value: function (msg, ...conds) {return _do(msg, ...conds)}}, _descriptor)
            ,   hasError    : Object.extend({value: function () {return _hasError()}}, _descriptor)
            ,   resetHistory: Object.extend({value: function () {return _resetHistory()}}, _descriptor)
            });

            this.setTitle(title || ``);
        }
    };
    const AssertExt = {};

    // Shell class
    db.getSiblingDB('script').system.js.save({
        _id: `Shell`
    ,   value: new Code(`(() => {
            const cFormat = Object.extend(${tojson(Format)}, ${tojson(FormatExt)});
            const cLog = Object.extend(${tojson(Log)}, ${tojson(LogExt)});
            const cAssert = Object.extend(${tojson(Assert)}, ${tojson(AssertExt)});
            const _toStr = function () {return this.constructor.name};

            return {
                Format: Object.defineProperties(cFormat, {toString: {value: _toStr}, tojson: {value: _toStr}})
            ,   Log: Object.defineProperties(cLog, {toString: {value: _toStr}, tojson: {value: _toStr}})
            ,   Assert: Object.defineProperties(cAssert, {toString: {value: _toStr}, tojson: {value: _toStr}})
            }
        })()`)
    ,   version: `1.0.1`
    ,   changelog: {
            '1.0.1': [
                `Hide internal variables & constants`
            ,   `Add method descriptor for enumerability`
            ]
        ,   '1.0.0': [
                `Release [Shell.Format]`
            ,   `Release [Shell.Log]`
            ,   `Release [Shell.Assert]`
            ]
        }
    });

    // Reload library
    db.getSiblingDB('script').loadServerScripts();
}
