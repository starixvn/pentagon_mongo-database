{
    const Timer = class {
        constructor () {
            this.CONST = {
                START: '_start'
            ,   FINISH: '_finish'
            };
            this.startTimer();
        }
        toString () {
            return `[Timer] Started at ${this.startTime.toISOString()}`;
        }
        register (label) {
            this[label] = Date.now();
        }
        startTimer () {
            this.register([this.CONST.START]);
        }
        stopTimer () {
            this.register([this.CONST.FINISH]);
        }
        getTimer (label) {
            return this[label];
        }
        getDifferent (fromLabel, toLabel) {
            return this[toLabel] - this[fromLabel];
        }
        getDuration (label) {
            return this.getDifferent(this.CONST.START, label);
        }
        getTimerDuration () {
            return this.getDuration(this.CONST.FINISH);
        }
    };
    const TimerExt = {
        toString: function () {
            return `class [Tool.Timer]`;
        }
    }

    const FileReader = class {
        constructor (fileName) {
            if (!fileExists(fileName)) {
                throw `Cannot read non-existent file: ${fileName}`;
            }
            this.file = fileName;
        }
        toString () {
            return `[FileReader] Reading file: ${this.file}`;
        }
        loadRawContent (reload = false) {
            if (!this.content || reload) {
                this.content = cat(this.file);
            }
        }
        getRawContent () {
            this.loadRawContent();
            return this.content;
        }
        getArrContent (csv = false) {
            this.loadRawContent();
            const fileContent = [];
            this.content.split(/\r\n|\n/).forEach(line => {
                if (line) {
                    fileContent.push(csv ? line.split(/,/) : line);
                }
            });
            return fileContent;
        }
    };
    const FileReaderExt = {
        toString: function () {
            return `class [Tool.FileReader]`;
        }
    }

    

    // Tool class
    db.getSiblingDB('script').system.js.save({
        _id: `Tool`
    ,   value: new Code(`(() => {
            const _Obj = {
                Timer: Object.extend(${tojson(Timer)}, ${tojson(TimerExt)})
            ,   FileReader: Object.extend(${tojson(FileReader)}, ${tojson(FileReaderExt)})
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
