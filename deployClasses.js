{
    const logger = new Shell.Log(`DEPLOY-CLASS`);

    [   'server-side-functions/class/SabaClub.js'
    ,   'server-side-functions/class/Shell.js'
    ,   'server-side-functions/class/Tool.js'
    ].forEach((path) => {
        try {
            load(path);
            logger.info(`${db._mongo.host}`, `Deployed [${path}]`);
        } catch (e) {
            logger.err(`${db._mongo.host}`, `${e}`);
        }
    });
}
