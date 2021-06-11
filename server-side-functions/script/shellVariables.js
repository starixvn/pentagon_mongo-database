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

      const handler = {
        get: function (target, name) {
          return target.hasOwnProperty(name) ? target[name] : db._mongo.getDB(name);
        },
      };
      const proxy = new Proxy(dbs, handler);
      // Funny part: the autocomplete failed with Proxy object because there is no Symbol.toPrimitive value
      const _descriptor = {writable: false, enumerable: false,};
      Object.defineProperties(proxy, {
        [Symbol.toPrimitive] : Object.extend({value: function () { return null }}, _descriptor),
      });
      return proxy;
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
        version: `1.1.0`,
        changelog: {
          '1.1.0': [
            `[dbs] Proxified dbs to access non-existent DBs`
          ],
          '1.0.0': [
            `Release [dbs]`,
          ],
        },
      },
      { _id: '_',
        value: new Code(`(${_Func.toString()})()`),
        version: `1.0.0`,
        changelog: {
          '1.0.0': [
            `Release [_]`,
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
