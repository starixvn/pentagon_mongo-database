db.getSiblingDB('script').system.js.save({
    _id: 'readCSV'
,   value:  (file, schema, hasHeader = false) => {
        if (!(typeof(file) == "string" && fileExists(file))) {
            log(`File [${tojsononeline(file)}] does NOT exist.`, `Audit`, `READ-CSV`, `E`);
            return [];
        }
        if (!(schema instanceof Array && schema.every((item) => item && item.name != null && item.type != null))) {
            log(`Schema [${tojsononeline(schema)}] must be an array of object.`, `Audit`, `READ-CSV`, `E`);
        }

        // Making sure hasHeader is boolean
        hasHeader = hasHeader ? true : false;

        // Timer
        const timer = {};

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
        log(`- File [${file}] has ${fileContent.length} readable lines.`, `File Reading`, `READ-CSV`, `I`);
        log(`Finish reading file [${file}] in ${timer.finishReading - timer.startReading} ms.`, `File Reading`, `READ-CSV`, `I`);

        // Header check and parse content
        if (hasHeader) {
            timer.startHeaderChecking = Date.now();
            if (fileContent[0].length !== schema.length) {
                log(`- Schema length [${schema.length}] does not match with Header length [${fileContent[0].length}]`, `Header Checking`, `READ-CSV`, `E`);
                return;
            }
            for (let index = 0; index < schema.length; index++) {
                if (fileContent[0][index] !== schema[index].name) {
                    log(`- Schema column [${schema[index].name}] will be matched with Data header [${fileContent[0][index]}]`, `Header Checking`, `READ-CSV`, `W`);
                }
            }
            fileContent.splice(0,1);
            timer.finishHeaderChecking = Date.now();
            log(`Finish checking header in ${timer.finishHeaderChecking - timer.startHeaderChecking} ms.`, `Header Checking`, `READ-CSV`, `I`);
        } else {
            log(`File specified as no header, skipping header checking step.`, `Header Checking`, `READ-CSV`, `I`);
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
                            item[schema[index].name] = line[index] ? new this[schema[index].type.class](`${line[index]} ${schema[index].type.timezone ? schema[index].type.timezone : 'UTC'}`) : new Date();
                            break;
                        case "ISODate":
                            item[schema[index].name] = this[schema[index].type.class](line[index]);
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
                    log(`Cannot map value [${line[index]}] to datatype ${schema[index].type.class}:`, `Data Mapping`, `READ-CSV`, `W`);
                    log(`- ${tojsononeline(err)}`, `Data Mapping`, `READ-CSV`, `W`);
                    log(``, `Data Mapping`, `READ-CSV`, `W`);
                }
            }
            fileData.push(item);
        });
        timer.finishMapping = Date.now();
        log(`- ${fileData.length} lines have been mapped.`, `Data Mapping`, `READ-CSV`, `I`);
        log(`- Current data object size is ${bsonsize(fileData)} bytes.`, `Data Mapping`, `READ-CSV`, `I`);
        log(`Finish mapping data in ${timer.finishMapping - timer.startMapping} ms.`, `Data Mapping`, `READ-CSV`, `I`);

        return fileData;
    }
,   version: 1.0
,   process: 'Global Functions'
});
db.getSiblingDB('script').loadServerScripts();
