{
    const global = Function('return this;')();
    const login = {user: 'billy.bui', pwd: passwordPrompt()};
    const readonly = pro_readonly;

    pro.forEach(instance => {
        const oldDB = global.db;
        global.db = instance;
        db.getSiblingDB('admin').auth(login);
        load(`server-side-functions/class/Shell.js`);

        const logger = new Shell.Log(`DEPLOY-PRO`);

        [   'deployClasses.js'
        ,   'deployScripts.js'
        ,   'deployIndexes.js'
        ].forEach((path) => {
            try {
                load(path);
                logger.info(`${db._mongo.host}`, `Deployed [${path}]`);
            } catch (e) {
                logger.err(`${db._mongo.host}`, `${e}`);
            }
        });

        db.getSiblingDB('admin').auth(readonly);
        global.db = oldDB;
    });

    pro_arc.forEach(instance => {
        const oldDB = db;
        db = instance;
        db.getSiblingDB('admin').auth(login);
        load(`server-side-functions/class/Shell.js`);

        const logger = new Shell.Log(`DEPLOY-PRO-ARC`);

        [   'deployClasses.js'
        ,   'deployScripts.js'
        ,   'deployIndexesArc.js'
        ].forEach((path) => {
            try {
                load(path);
                logger.info(`${db._mongo.host}`, `Deployed [${path}]`);
            } catch (e) {
                logger.err(`${db._mongo.host}`, `${e}`);
            }
        });

        db.getSiblingDB('admin').auth(readonly);
        db = oldDB;
    });
}
