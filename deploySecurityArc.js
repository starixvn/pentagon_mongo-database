{
    const logger = new Shell.Log(`DEPLOY-SECURITY-ARC`);

    [   'security/Roles.js'
    ,   'security/arc/ArchiveUsers.js'
    ].forEach((path) => {
        try {
            load(path);
            logger.info(`Success`, `Deployed [${path}]`);
        } catch (e) {
            logger.err(`Failure`, `${e}`);
        }
    });
}
