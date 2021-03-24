{
    const logger = new Shell.Logger(`DEPLOY-SECURITY`);

    [   'security/Roles.js'
    ,   'security/main/MainUsers.js'
    ].forEach((path) => {
        try {
            load(path);
            logger.info(`${db._mongo.host}`, `Deployed [${path}]`);
        } catch (e) {
            logger.err(`${db._mongo.host}`, `${e}`);
        }
    });
}
