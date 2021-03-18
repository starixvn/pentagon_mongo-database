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
            Object.defineProperties(this, {
                toString            : {value: function () { return _toString() }}
            ,   tojson              : {value: function () { return _toString() }}
            ,   register            : {value: function (label) { return _register(label) }}
            ,   startTimer          : {value: function () { return _startTimer() }}
            ,   stopTimer           : {value: function () { return _stopTimer() }}
            ,   getTimer            : {value: function (label) { return _getTimer(label) }}
            ,   getISOTimer         : {value: function (label) { return _getISOTimer(label) }}
            ,   getElapsedDuration  : {value: function (label) { return _getElapsedDuration(label) }}
            ,   getDifferent        : {value: function (fromLabel, toLabel) { return _getDifferent(fromLabel, toLabel) }}
            ,   getDuration         : {value: function (label) { return _getDuration(label) }}
            ,   getTimerDuration    : {value: function () { return _getTimerDuration() }}
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
            this.logger = new Shell.Log(`FILE-READER`);
            this.assert = new Shell.Assert();
            this.assert.setLogger(this.logger);

            this.assert.setTitle(`Audit`);
            this.assert.do(`Cannot read non-existent file: ${fileName}`, !fileExists(fileName));

            const _toString = () => {
                return `[FileReader] Reading file: ${this.file}`;
            };
            const _loadContent = (reload = false, csv = false) => {
                const _title = `Load Content`;
                const _timer = new Tool.Timer();
                if (reload) {
                    this.logger.warn(_title, `Reload mode, existing content will be overriden.`);
                }
                if (!this.content || reload) {
                    this.logger.info(_title, `Reading from file [${this.file}]...`);
                    this.content = [];
                    cat(this.file).split(/\r\n|\n/).forEach(line => {
                        if (line) {
                            this.content.push(csv ? line.split(/,/) : line);
                        }
                    });
                    this.logger.info(_title, `Finish reading ${(this.content || []).length} lines in ${_timer.getTimerDuration()} ms.`);
                    return;
                }
                this.logger.warn(_title, `The content has been loaded and has ${this.content.length} lines.`);
            };
            const _loadCSVContent = (reload = false) => {
                return _loadContent(reload, true);
            };
            const _getContent = () => {
                return this.content;
            };
            Object.defineProperties(this, {
                toString        : {value: function () { return _toString() }}
            ,   tojson          : {value: function () { return _toString() }}
            ,   loadContent     : {value: function (reload = false, csv = false) { return _loadContent(reload, csv) }}
            ,   loadCSVContent  : {value: function (reload = false) { return _loadCSVContent(reload) }}
            ,   getContent      : {value: function () { return _getContent() }}
            });

            this.file = fileName;
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
    });

    // Reload library
    db.getSiblingDB('script').loadServerScripts();
}
