{
    const Format = class {
        constructor () {
            this._init();
            this.isCompatible = !_isWindows();
            return this.isCompatible;
        }
        _init () {
            this._initCONST();
            [].concat(
                Object.getOwnPropertyNames(this)
            ).forEach(prop => {
                const toStr = function () {return '';};
                this[prop].toString = toStr;
                this[prop].tojson = toStr;
                Object.defineProperty(this, prop, {value: this[prop], enumerable: false, writable: false});
            });
        }
        _initCONST () {
            this.CONST = {
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
            };
        }
        toString () {
            return `[Format] Compatibility: ${this.isCompatible}`;
        }
        tojson () {
            return this.toString();
        }
        isApllying (color) {
            return this.isCompatible && this.CONST[color.toUpperCase()];
        }
        end (color) {
            if (this.isApllying(color)) {
                return `${this.CONST.ESC}${this.CONST.MOD}`;
            }
            return ``;
        }
        code (color) {
            if (this.isApllying(color)) {
                return `${this.CONST.ESC}${this.CONST[color.toUpperCase()]}${this.CONST.MOD}`;
            }
            return ``;
        }
        format (text, color) {
            return `${this.code(color)}${text || ''}${this.end(color)}`;
        }
    };
    const FormatExt = {
        toString: function () {
            return `class [Shell.Format]`;
        }
    }

    const Log = class {
        constructor (label) {
            this._init();
            this.label = (typeof label != "string") ? 'VERBOSE ' : label.toUpperCase().pad(8,1);
            this.formatter = new Shell.Format();
        }
        _init () {
            this._initCONST();
            Object.getOwnPropertyNames(this).concat(Object.getOwnPropertyNames(Shell.Log.prototype)).forEach(prop => {
                Object.defineProperty(this, prop, {value: this[prop], enumerable: false, writable: false});
            });
        }
        _initCONST () {
            this.color = {
                VERBOSE: 'BRIGHTGREEN'
            ,   INFO: ''
            ,   WARN: 'BRIGHTYELLOW'
            ,   ERR: 'BRIGHTRED'
            };
        }
        toString () {
            return `[Log] Print log for (${this.label})`;
        }
        now () {
            return ISODate().toISOString().pad(29,1);
        }
        paint (title, message, type, color) {
            const d = this.now();
            const t = ((typeof type != "string") ? 'V' : type.ltrim().substr(0,1)).toUpperCase().pad(3,1);
            const tt = (typeof title != "string") ? ' ' : title;
            const m = (typeof message != "string") ? tojson(message) : message;

            const msg = `${d}${t}${this.label} [${tt}] • ${m}`;
            print(this.formatter.format(msg, color));
        }
        verbose (title, message) {
            const type = 'VERBOSE';
            this.paint(title, message, type, this.color[type]);
        }
        info (title, message) {
            const type = 'INFO';
            this.paint(title, message, type, this.color[type]);
        }
        warn (title, message) {
            const type = 'WARN';
            this.paint(title, message, type, this.color[type]);
        }
        err (title, message) {
            const type = 'ERR';
            this.paint(title, message, type, this.color[type]);
        }
    };
    const LogExt = {
        toString: function () {
            return `class [Shell.Log]`;
        }
    }

    // Shell class
    db.getSiblingDB('script').system.js.save({
        _id: `Shell`
    ,   value: new Code(`(() => {
            const _Obj = {
                Format: Object.extend(${tojson(Format)}, ${tojson(FormatExt)})
            ,   Log: Object.extend(${tojson(Log)}, ${tojson(LogExt)})
            };
            Object.keys(_Obj).forEach(obj => {
                [].concat(
                    Object.getOwnPropertyNames(_Obj[obj])
                ).forEach(prop => {
                    toStr = function () {return ''};
                    _Obj[obj][prop].toString = toStr;
                    _Obj[obj][prop].tojson = toStr;
                    Object.defineProperty(_Obj[obj], prop, {value: _Obj[obj][prop], enumerable: false, writable: false});
                });
            });
            return _Obj;
        })()`)
    ,   version: `1.0.0`
    });

    // Reload library
    db.getSiblingDB('script').loadServerScripts();
}
