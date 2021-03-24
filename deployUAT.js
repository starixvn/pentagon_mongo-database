{
    const login = {user: 'billy.bui', pwd: passwordPrompt()};
    const readonly = uat_readonly;

    uat.forEach(instance => {
        const oldDB = db;
        db = instance;
        db.getSiblingDB('admin').auth(login);
        load(`server-side-functions/class/Shell.js`);

        const logger = new Shell.Logger(`DEPLOY-UAT`);

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

        db.getSiblingDB('admin').auth(readonly);
        db = oldDB;
    });
}
