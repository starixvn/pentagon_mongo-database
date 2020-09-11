{
    // dbs
    const dbsFunc = () => {
        const dbs = {};
        if (typeof db != "undefined" && db instanceof DB) {
            dbs._mongo = db._mongo;
            db._mongo.getDBNames().forEach((database) => {
                dbs[database] = db._mongo.getDB(database);
            });
        }
        return dbs;
    };

    // _
    const _Func = () => {
        return undefined;
    };

    // prompt
    const promptFunc = () => {
        if (typeof prompt == "undefined" || typeof prompt != "function") {
            return () => {
                try {
                    db.getSiblingDB('script').loadServerScripts();
                } catch (e) {}
                return defaultPrompt();
            }
        } else {
            const promptStr = prompt.toString();
            const promptArr = promptStr.slice(promptStr.indexOf('{') + 1, promptStr.lastIndexOf('}')).split(/\r\n|\n/g);
            if (!promptArr.some((item) => RegExp(/db.getSiblingDB\('script'\).loadServerScripts\(\)/).test(item))) {
                promptArr.splice(0, 0, `    try {\n        db.getSiblingDB('script').loadServerScripts();\n    } catch (e) {}\n`);
                return Function(promptArr.join('\n'));
            }
            return prompt;
        }
    };

    // Public Variables
    [
        {   _id: 'dbs'
        ,   value: new Code(`(${dbsFunc.toString()})()`)
        ,   version: 1.0
        ,   name: 'PublicVariables'
        }
    ,   {   _id: '_'
        ,   value: new Code(`(${_Func.toString()})()`)
        ,   version: 1.0
        ,   name: 'PublicVariables'
        }
    ,   {   _id: 'prompt'
        ,   value: new Code(`(${promptFunc.toString()})()`)
        ,   version: 1.0
        ,   name: 'PublicVariables'
        }
    ].forEach((item) => {db.getSiblingDB('script').system.js.save(item);});

    // Reload scripts
    db.getSiblingDB('script').loadServerScripts();
}
