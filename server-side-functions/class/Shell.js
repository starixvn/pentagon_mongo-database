{
    const Format = class {
        constructor () {
            const _toString = () => {
                return `[Shell.Format] Compatibility: ${this.isCompatible}`;
            };
            const _isApllying = (color) => {
                return this.isCompatible && Shell.Format.CONST[color.toUpperCase()];
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
            Object.defineProperties(this, {
                toString    : {value: function () { return _toString() }}
            ,   tojson      : {value: function () { return _toString() }}
            ,   format      : {value: function (text, color) { return _format(text, color) }}
            });

            this.isCompatible = !_isWindows();
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
            const _toString = () => {
                return `[Shell.Log] Print log for (${this.label})`;
            };
            const _now = () => {
                return ISODate().toISOString().pad(29,1);
            };
            const _paint = (title, message, type, color) => {
                const d  = _now();
                const t  = ((typeof type != "string") ? 'V' : type.ltrim().substr(0,1)).toUpperCase().pad(3,1);
                const tt = (typeof title != "string") ? ' ' : title;
                const m  = (typeof message != "string") ? tojson(message) : message;
    
                const msg = `${d}${t}${this.label} [${tt}] • ${m}`;
                print(this.formatter.format(msg, color));
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
            Object.defineProperties(this, {
                toString    : {value: function () { return _toString() }}
            ,   tojson      : {value: function () { return _toString() }}
            ,   verbose     : {value: function (title, message) { return _verbose(title, message) }}
            ,   info        : {value: function (title, message) { return _info(title, message) }}
            ,   warn        : {value: function (title, message) { return _warn(title, message) }}
            ,   err         : {value: function (title, message) { return _err(title, message) }}
            });

            this.formatter = new Shell.Format();
            this.label = (typeof label != "string") ? 'VERBOSE ' : label.toUpperCase().pad(8,1);
        }
    };
    const LogExt = {
        CONST: {
            VERBOSE : 'BRIGHTGREEN'
        ,   INFO    : ''
        ,   WARN    : 'BRIGHTYELLOW'
        ,   ERR     : 'BRIGHTRED'
        }
    }

    // Shell class
    db.getSiblingDB('script').system.js.save({
        _id: `Shell`
    ,   value: new Code(`(() => {
            const cFormat = Object.extend(${tojson(Format)}, ${tojson(FormatExt)});
            const cLog = Object.extend(${tojson(Log)}, ${tojson(LogExt)});
            const _toStr = function () {return this.constructor.name};

            return {
                Format: Object.defineProperties(cFormat, {toString: {value: _toStr}, tojson: {value: _toStr}})
            ,   Log: Object.defineProperties(cLog, {toString: {value: _toStr}, tojson: {value: _toStr}})
            }
        })()`)
    ,   version: `1.0.1`
    });

    // Reload library
    db.getSiblingDB('script').loadServerScripts();
}
