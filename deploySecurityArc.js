{
    const logger = new Shell.Logger(`DEPLOY-SECURITY-ARC`);

    [   'security/Roles.js'
    ,   'security/arc/ArchiveUsers.js'
    ].forEach((path) => {
        try {
            load(path);
            logger.info(`${db._mongo.host}`, `Deployed [${path}]`);
        } catch (e) {
            logger.err(`${db._mongo.host}`, `${e}`);
        }
    });
}
