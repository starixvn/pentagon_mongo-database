{
  // dbs
  const dbsFunc = () => {
    return new MongoSrv.DBs();
  };

  // prompt
  const promptFunc = () => {
    if (typeof prompt == "undefined" || typeof prompt != "function") {
      return () => {
        try {
          this.dbs = {};
          db.getSiblingDB('script').loadServerScripts();
        } catch (e) {}
        return defaultPrompt();
      }
    } else {
      const promptStr = prompt.toString();
      const promptArr = promptStr.slice(promptStr.indexOf('{') + 1, promptStr.lastIndexOf('}')).split(/\r\n|\n/g);
      if (!promptArr.some((item) => RegExp(/db\.getSiblingDB\('script'\).loadServerScripts\(\)/).test(item))) {
        promptArr.splice(0, 0, `    dbs = {};\n    try {\n        db.getSiblingDB('script').loadServerScripts();\n    } catch (e) {}\n`);
        return Function(promptArr.join('\n'));
      }
      return prompt;
    }
  };

  // Public Variables
  [
    { _id: 'dbs',
      value: new Code(`(${dbsFunc.toString()})()`),
      version: `2.0.0`,
      changelog: {
        '2.0.0': [
          `[dbs] Using MongoSrv.DBs class`
        ],
        '1.0.0': [
          `Release [dbs]`,
        ],
      },
    },
    { _id: 'prompt',
      value: new Code(`(${promptFunc.toString()})()`),
      version: `1.0.0`,
      changelog: {
        '1.0.0': [
          `Release [prompt]`,
        ],
      },
    },
  ].forEach((item) => {db.getSiblingDB('script').system.js.save(item);});

  // Reload scripts
  db.getSiblingDB('script').loadServerScripts();
}
