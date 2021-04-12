{
    const global = Function('return this;')();

    local.forEach(instance => {
        const oldDB = global.db;
        global.db = instance;
        load(`server-side-functions/class/Shell.js`);

        const logger = new Shell.Log(`DEPLOY-LOCAL`);

        [   'deployClasses.js'
        ,   'deployScripts.js'
        ,   'deployIndexes.js'
        ,   'deployIndexesArc.js'
        ].forEach((path) => {
            try {
                load(path);
                logger.info(`${db._mongo.host}`, `Deployed [${path}]`);
            } catch (e) {
                logger.err(`${db._mongo.host}`, `${e}`);
            }
        });

        global.db = oldDB;
    });
}
