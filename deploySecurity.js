{
    const logger = new Shell.Log(`DEPLOY-SECURITY`);

    [   'security/Roles.js'
    ,   'security/main/MainUsers.js'
    ].forEach((path) => {
        try {
            load(path);
            logger.info(`Success`, `Deployed [${path}]`);
        } catch (e) {
            logger.err(`Failure`, `${e}`);
        }
    });
}
