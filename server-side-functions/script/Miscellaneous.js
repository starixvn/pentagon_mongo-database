deploy: {
    // Misc.log()
    const logFunc = (message, title, label, type) => {
        try {
            // Input validation & correction
            message = (typeof message != "string") ? tojson(message) : message;
            title   = (typeof title != "string") ? ' ' : title;
            label   = (typeof label != "string") ? 'VERBOSE ' : label.toUpperCase().pad(8,1);
            type    = (typeof type != "string") ? 'V  ' : type.ltrim().substr(0,1).toUpperCase().pad(3,1);

            // Print message
            const d = ISODate().toISOString().pad(29,1);
            print(`${d}${type}${label} [${title}] • ${message}`);
        } catch (e) {}
    };

    // Misc.readCSV()
    const readCSVFunc = (file, schema, hasHeader = false) => {
        // Timer
        const timer = {start: Date.now()};

        if (!(fileExists(String(file)))) {
            Misc.log(`File [${tojsononeline(file)}] does NOT exist.`, `Audit`, `READ-CSV`, `E`);
            return [];
        }
        if (!(schema instanceof Array && schema.length > 0 && schema.every((item) => item && item.name != null && item.type != null))) {
            Misc.log(`Schema [${tojsononeline(schema)}] must be an array of object.`, `Audit`, `READ-CSV`, `E`);
            return [];
        }

        // Start reading file
        timer.startReading = Date.now();
        const fileCat = cat(file);
        const fileContent = [];
        fileCat.split(/\r\n|\n/).forEach((line) => {
            if (line) {
                fileContent.push(line.split(/,/));
            }
        });
        timer.finishReading = Date.now();
        Misc.log(`- File [${file}] has ${fileContent.length} readable lines.`, `File Reading`, `READ-CSV`, `I`);
        Misc.log(`Finish reading file [${file}] in ${timer.finishReading - timer.startReading} ms.`, `File Reading`, `READ-CSV`, `I`);

        // Header check and parse content
        if (hasHeader) {
            timer.startHeaderChecking = Date.now();
            if (fileContent[0].length !== schema.length) {
                Misc.log(`- Schema length [${schema.length}] does not match with Header length [${fileContent[0].length}]`, `Header Checking`, `READ-CSV`, `E`);
                return [];
            }
            for (let index = 0; index < schema.length; index++) {
                if (fileContent[0][index] !== schema[index].name) {
                    Misc.log(`- Schema column [${schema[index].name}] will be matched with Data header [${fileContent[0][index]}]`, `Header Checking`, `READ-CSV`, `W`);
                }
            }
            fileContent.splice(0,1);
            timer.finishHeaderChecking = Date.now();
            Misc.log(`Finish checking header in ${timer.finishHeaderChecking - timer.startHeaderChecking} ms.`, `Header Checking`, `READ-CSV`, `I`);
        } else {
            Misc.log(`File specified as no header, skipping header checking step.`, `Header Checking`, `READ-CSV`, `I`);
        }

        // Mapping data with schema
        timer.startMapping = Date.now();
        const fileData = [];
        fileContent.forEach((line) => {
            const item = {};
            for (let index = 0; index < schema.length; index++) {
                try {
                    switch (schema[index].type.class) {
                        case "Boolean":
                            item[schema[index].name] = this[schema[index].type.class](line[index] && !(line[index] in ["false", "0"]));
                            break;
                        case "Date":
                            if (!line[index]) {
                                item[schema[index].name] = new Date();
                            } else if (schema[index].type.timezone) {
                                item[schema[index].name] = new this[schema[index].type.class](`${line[index]} ${schema[index].type.timezone}`);
                            } else {
                                item[schema[index].name] = new this[schema[index].type.class](`${line[index]} UTC`);
                            }
                            break;
                        case "ISODate":
                            if (!line[index]) {
                                item[schema[index].name] = ISODate();
                            } else if (schema[index].type.timezone) {
                                item[schema[index].name] = new this[schema[index].type.class](`${line[index]}${schema[index].type.timezone}`);
                            } else {
                                item[schema[index].name] = this[schema[index].type.class](line[index]);
                            }
                            break;
                        case "Number":
                        case "NumberDecimal":
                        case "NumberInt":
                        case "NumberLong":
                            item[schema[index].name] = this[schema[index].type.class](line[index]);
                            break;
                        default:
                            item[schema[index].name] = new this[schema[index].type.class](line[index]);
                            break;
                    }
                } catch (err) {
                    Misc.log(`Cannot map value [${line[index]}] to datatype ${schema[index].type.class}:`, `Data Mapping`, `READ-CSV`, `W`);
                    Misc.log(`- ${tojsononeline(err)}`, `Data Mapping`, `READ-CSV`, `W`);
                    Misc.log(``, `Data Mapping`, `READ-CSV`, `W`);
                }
            }
            fileData.push(item);
        });
        timer.finishMapping = Date.now();
        Misc.log(`- ${fileData.length} lines have been mapped.`, `Data Mapping`, `READ-CSV`, `I`);
        Misc.log(`- Current data object size is ${bsonsize(fileData)} bytes.`, `Data Mapping`, `READ-CSV`, `I`);
        Misc.log(`Finish mapping data in ${timer.finishMapping - timer.startMapping} ms.`, `Data Mapping`, `READ-CSV`, `I`);

        timer.finish = Date.now();
        Misc.log(`Function finished in ${timer.finish - timer.start} ms.`, `Timer`, `READ-CSV`, `I`);
        return fileData;
    };

    // Misc.auditSchema()
    const auditSchemaFunc = (_obj, _sch) => {
        const obj = Object.extend({}, _obj);
        const sch = Object.extend({}, _sch);
        const mandatory = sch['!'] ? true : false;
        delete sch['!'];
        if (obj == null || sch == null) {
            return false;
        }
        for (const k in sch) {
            if (!mandatory && obj[k] == null) {
                continue;
            } else if (!sch[k] && obj.hasOwnProperty(k)) {
                continue;
            } else if (typeof sch[k] == "string" && typeof obj[k] == sch[k]) {
                continue;
            } else if (typeof sch[k] == "function" && obj[k] instanceof sch[k]) {
                continue;
            } else if (typeof sch[k] == "object") {
                Misc.auditSchema(obj[k], sch[k]);
            } else {
                return false;
            }
        }
        return true;
    };

    // Misc
    const _id = `Misc`;
    const version = `2.2.0`;
    const changelog = {};
    const value = new Code(`{
        log: ${logFunc.toString()}
    ,   readCSV: ${readCSVFunc.toString()}
    ,   auditSchema: ${auditSchemaFunc.toString()}
    }`);
    const lastVersion = (db.getSiblingDB('script').system.js.findOne({_id}, {_id: 0, version: 1}) || {version}).version;
    const res = db.getSiblingDB('script').system.js.save({_id, value, version, changelog});

    // Reload library
    db.getSiblingDB('script').loadServerScripts();

    // Log result
    const logger = new Shell.Log(`SCRIPT-${_id.toUpperCase().pad(9,1)}`);
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
