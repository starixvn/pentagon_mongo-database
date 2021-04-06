{
    const Timer = class {
        constructor () {
            const _toString = () => {
                return `[Timer] Started at ${_getISOTimer(Tool.Timer.CONST.START)}`;
            };
            const _register = (label) => {
                this[label] = Date.now();
            };
            const _startTimer = () => {
                _register(Tool.Timer.CONST.START);
            };
            const _stopTimer = () => {
                _register(Tool.Timer.CONST.FINISH);
            };
            const _getTimer = (label) => {
                return this[label];
            };
            const _getISOTimer = (label) => {
                return new Date(_getTimer(label)).toISOString();
            };
            const _getElapsedDuration = (label) => {
                return Date.now() - this[label];
            };
            const _getDifferent = (fromLabel, toLabel) => {
                return this[toLabel] - this[fromLabel];
            };
            const _getDuration = (label) => {
                return _getDifferent(Tool.Timer.CONST.START, label);
            };
            const _getTimerDuration = () => {
                return _getTimer(Tool.Timer.CONST.FINISH) ? _getDuration(Tool.Timer.CONST.FINISH) : _getElapsedDuration(Tool.Timer.CONST.START);
            };

            let _descriptor = {
                writable: false
            ,   enumerable: true
            };
            Object.defineProperties(this, {
                toString            : Object.extend({value: function () { return _toString() }}, _descriptor)
            ,   tojson              : Object.extend({value: function () { return _toString() }}, _descriptor)
            ,   register            : Object.extend({value: function (label) { return _register(label) }}, _descriptor)
            ,   startTimer          : Object.extend({value: function () { return _startTimer() }}, _descriptor)
            ,   stopTimer           : Object.extend({value: function () { return _stopTimer() }}, _descriptor)
            ,   getTimer            : Object.extend({value: function (label) { return _getTimer(label) }}, _descriptor)
            ,   getISOTimer         : Object.extend({value: function (label) { return _getISOTimer(label) }}, _descriptor)
            ,   getElapsedDuration  : Object.extend({value: function (label) { return _getElapsedDuration(label) }}, _descriptor)
            ,   getDifferent        : Object.extend({value: function (fromLabel, toLabel) { return _getDifferent(fromLabel, toLabel) }}, _descriptor)
            ,   getDuration         : Object.extend({value: function (label) { return _getDuration(label) }}, _descriptor)
            ,   getTimerDuration    : Object.extend({value: function () { return _getTimerDuration() }}, _descriptor)
            });

            this.startTimer();
        }
    };
    const TimerExt = {
        CONST: {
            START: '_start'
        ,   FINISH: '_finish'
        }
    };

    const FileReader = class {
        constructor (fileName) {
            const _logger = new Shell.Log(`FILE-READER`);
            const _assert = new Shell.Assert();
            _assert.setLogger(_logger);

            const _file = fileName;
            let _content = [];

            _assert.setTitle(`Audit`);
            _assert.do(`Cannot read non-existent file: ${_file}`, !fileExists(_file));

            const _toString = () => {
                return `[FileReader] Reading file: ${_file}`;
            };
            const _loadContent = (reload = false, csv = false) => {
                const _title = `Load Content`;
                const _timer = new Tool.Timer();
                if (reload) {
                    _logger.warn(_title, `Reload mode, existing content will be overriden.`);
                }
                if (!_content || reload) {
                    _logger.info(_title, `Reading from file [${_file}]...`);
                    _content = [];
                    cat(_file).split(/\r\n|\n/).forEach(line => {
                        if (line) {
                            _content.push(csv ? line.split(/,/) : line);
                        }
                    });
                    _logger.info(_title, `Finish reading ${(_content || []).length} lines in ${_timer.getTimerDuration()} ms.`);
                    return;
                }
                _logger.warn(_title, `The content has been loaded and has ${_content.length} lines.`);
            };
            const _loadCSVContent = (reload = false) => {
                return _loadContent(reload, true);
            };
            const _getContent = () => {
                return _content;
            };

            let _descriptor = {
                writable: false
            ,   enumerable: true
            };
            Object.defineProperties(this, {
                toString        : Object.extend({value: function () { return _toString() }}, _descriptor)
            ,   tojson          : Object.extend({value: function () { return _toString() }}, _descriptor)
            ,   loadContent     : Object.extend({value: function (reload = false, csv = false) { return _loadContent(reload, csv) }}, _descriptor)
            ,   loadCSVContent  : Object.extend({value: function (reload = false) { return _loadCSVContent(reload) }}, _descriptor)
            ,   getContent      : Object.extend({value: function () { return _getContent() }}, _descriptor)
            });
        }
    };
    const FileReaderExt = {}

    // Tool class
    db.getSiblingDB('script').system.js.save({
        _id: `Tool`
    ,   value: new Code(`(() => {
            const cTimer = Object.extend(${tojson(Timer)}, ${tojson(TimerExt)});
            const cFileReader = Object.extend(${tojson(FileReader)}, ${tojson(FileReaderExt)});
            const _toStr = function () {return this.constructor.name};

            return {
                Timer: Object.defineProperties(cTimer, {toString: {value: _toStr}, tojson: {value: _toStr}})
            ,   FileReader: Object.defineProperties(cFileReader, {toString: {value: _toStr}, tojson: {value: _toStr}})
            }
        })()`)
    ,   version: `1.0.1`
    ,   changelog: {
            '1.0.1': [
                `Hide internal variables & constants`
            ,   `Add method descriptor for enumerability`
            ]
        ,   '1.0.0': [
                `Release [Tool.Timer]`
            ,   `Release [Tool.FileReader]`
            ]
        }
    });

    // Reload library
    db.getSiblingDB('script').loadServerScripts();
}
