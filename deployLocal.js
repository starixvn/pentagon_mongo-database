{
    const global = Function('return this;')();

    local.forEach(instance => {
        const oldDB = global.db;
        global.db = instance.admin;
        try { db.runCommand({ping: 1}) } catch { db.runCommand({ping: 1}) };
        load(`server-side-functions/class/Shell.js`);

        const logger = new Shell.Log(`DEPLOY-LOCAL`);

        [   'deployFactories.js'
        ,   'deployScripts.js'
        ,   'deployIndexes.js'
        ,   'deployIndexesArc.js'
        ,   'deployBI.js'
        ].forEach((path) => {
            try {
                load(path);
                logger.info(`${db._mongo.host}`, `Deployed [${path}]\n${'='.repeat(50)}\n\n`);
            } catch (e) {
                logger.err(`${db._mongo.host}`, `${e}\n${'='.repeat(50)}\n\n`);
            }
        });

        global.db = oldDB;
    });
}
