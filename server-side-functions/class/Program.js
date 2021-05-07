/*  =============================================================================
 *  class/Program.js v1.0.0
 *  =============================================================================
 */
{
    const SQLCMD = class {
        constructor (obj) {
            const _logger = new Shell.Log(`SQLCMD`);
            const _assert = new Shell.Assert();
            _assert.setLogger(_logger);

            let _ok = false;
            const _args = {
                prog    : [`sqlcmd`]
            ,   host    : [`-H`, `Mongo`]   // -H
            ,   srv     : []                // -S
            ,   db      : []                // -d
            ,   usr     : []                // -U
            ,   pwd     : []                // -P
            ,   query   : []                // -Q
            ,   header  : []                // -h
            ,   colsep  : []                // -s
            ,   output  : []                // -o
            ,   flags   : [
                    `-I`                    // -I (enable quoted identifiers)
                ,   `-W`                    // -W (remove trailing spaces)
                ,   `-b`                    // -b (terminate batch job if there is an error)
                ]
            };

            const _toString = () => {
                if (!_ok) {
                    return Program.SQLCMD.help();
                } else {
                    return `\
[Program.SQLCMD]
    srv    : ${_args.srv[1]}
    db     : ${_args.db[1]}
    usr    : ${_args.usr[1]}
    pwd    : ${_args.pwd[1] ? '********' : _args.pwd[1]}
    query  : ${_args.query[1] ? '<QUERY>' : _args.query[1]}
    header : ${_args.header[1]}
    colsep : ${_args.colsep[1]}
    output : ${_args.output[1]}
`
                }
            };
            const _testProg = () => {
                try {
                    if (_isWindows()) {
                        run(..._args.prog, `-?`, `-o`, `nul`);
                    } else {
                        run(`bash`, `-c`, `${_args.prog[0]} -? > /dev/null`);
                    }
                    clearRawMongoProgramOutput();
                    _ok = true;
                } catch (e) {
                    _logger.err(`Audit`, e.valueOf());
                    throw(e);
                };
            };
            const _setServer = (obj) => {
                const _obj = Object.extend({}, typeof obj == "string" ? {srv: obj} : obj);
                _args.srv = _obj.srv ? [`-S`, _obj.srv] : _args.srv;
            };
            const _setDatabase = (obj) => {
                const _obj = Object.extend({}, typeof obj == "string" ? {db: obj} : obj);
                _args.db = _obj.db ? [`-d`, _obj.db] : _args.db;
            };
            const _setLogin = (obj) => {
                const _obj = Object.extend({}, obj);
                _args.usr = _obj.usr ? [`-U`, _obj.usr] : _args.usr;
                _args.pwd = _obj.pwd ? [`-P`, _obj.pwd] : _args.pwd;
            };
            const _setQuery = (obj) => {
                const _obj = Object.extend({}, typeof obj == "string" ? {query: obj} : obj);
                _args.query = _obj.query ? [`-Q`, `SET NOCOUNT ON;\n${_obj.query}`] : _args.query;
            };
            const _setHeader = (obj) => {
                const _obj = Object.extend({}, typeof obj == "string" ? {header: obj} : obj);
                _args.header = _obj.header ? [`-h`, _obj.header] : _args.header;
            };
            const _setColSeparator = (obj) => {
                const _obj = Object.extend({}, typeof obj == "string" ? {colsep: obj} : obj);
                _args.colsep = _obj.colsep ? [`-s`, _obj.colsep] : _args.colsep;
            };
            const _setOutput = (obj) => {
                const _obj = Object.extend({}, typeof obj == "string" ? {output: obj} : obj);
                _args.output = _obj.output ? [`-o`, _obj.output] : _args.output;
            };
            const _CSVOutput = () => {
                _setHeader(`-1`);
                _setColSeparator(`,`);
            };
            const _delOutput = () => {
                if (_args.output[1]) {
                    if (_isWindows()) {
                        run(`cmd`, `/C`, `del ${_args.output[1]}`);
                    } else {
                        run(`rm`, `${_args.output[1]}`);
                    }
                    _logger.warn(`Delete Output`, `File [${_args.output[1]}] deleted.`);
                }
            }
            const _execute = () => {
                let cmd = [];
                Object.getOwnPropertyNames(_args).forEach(arg => {
                    if ((! arg in ['prog', 'flags']) && _args[arg][1] == null) {
                        return;
                    }
                    cmd = [...cmd, ..._args[arg]];
                });
                const r = run(...cmd);
                if (fileExists(_args.output[1])) {
                    _logger.warn(`Execute`, `File [${_args.output[1]}] created.`);
                }
                return r;
            };

            const _descriptor = {
                writable: false
            ,   enumerable: true
            };
            Object.defineProperties(this, {
                toString            : Object.extend({value: function () { return _toString() }}, _descriptor)
            ,   tojson              : Object.extend({value: function () { return _toString() }}, _descriptor)
            ,   help                : Object.extend({value: function () { return Program.SQLCMD.help() }}, _descriptor)
            ,   setServer           : Object.extend({value: function (obj) { return _setServer(obj) }}, _descriptor)
            ,   setDatabase         : Object.extend({value: function (obj) { return _setDatabase(obj) }}, _descriptor)
            ,   setLogin            : Object.extend({value: function (obj) { return _setLogin(obj) }}, _descriptor)
            ,   setQuery            : Object.extend({value: function (obj) { return _setQuery(obj) }}, _descriptor)
            ,   setHeader           : Object.extend({value: function (obj) { return _setHeader(obj) }}, _descriptor)
            ,   setColSeparator     : Object.extend({value: function (obj) { return _setColSeparator(obj) }}, _descriptor)
            ,   setOutput           : Object.extend({value: function (obj) { return _setOutput(obj) }}, _descriptor)
            ,   CSVOutput           : Object.extend({value: function () { return _CSVOutput() }}, _descriptor)
            ,   delOutput           : Object.extend({value: function () { return _delOutput() }}, _descriptor)
            ,   execute             : Object.extend({value: function () { return _execute() }}, _descriptor)
            });

            _testProg();
            _setServer(obj);
            _setDatabase(obj);
            _setLogin(obj);
            _setQuery(obj);
            _setHeader(obj);
            _setColSeparator(obj);
            _setOutput(obj);
            if (Object.extend({}, obj).csv) {
                _CSVOutput();
            }
        }
    };
    const SQLCMDExt = {
        help: function () {
            return `\
[Program.SQLCMD] Input object: {
      srv:    [server]      , db:     [use database name]
    , usr:    [login id]    , pwd:    [password]
    , query:  ["cmdline query" and exit]
    , header: [headers]     , colsep: [colseparator]
    , output: [outputfile]  , csv:    [output in csv format]
}`;
        }
    };

    // Program class
    db.getSiblingDB('script').system.js.save({
        _id: `Program`
    ,   value: new Code(`(() => {
            const cSQLCMD = Object.extend(${tojson(SQLCMD)}, ${tojson(SQLCMDExt)});
            const _toStr = function () {return this.constructor.name};

            const _descriptor = {
                writable: false
            ,   enumerable: true
            };
            return {
                SQLCMD: Object.defineProperties(cSQLCMD, {toString: Object.extend({value: _toStr}, _descriptor), tojson: Object.extend({value: _toStr}, _descriptor)})
            }
        })()`)
    ,   version: `1.1.0`
    ,   changelog: {
            '1.1.0': [
                `Add global help() method`
            ,   `Add delOutput() method`
            ,   `Fix output issue when input is null`
            ,   `Add log message for execute() method`
            ]
        ,   '1.0.0': [
                `Release [Program.SQLCMD]`
            ]
        }
    });

    // Reload library
    db.getSiblingDB('script').loadServerScripts();
}
