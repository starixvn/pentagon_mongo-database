{
    const logger = new Shell.Log(`DEPLOY-SCRIPT`);

    [   'server-side-functions/script/Maintenance.js'
    ,   'server-side-functions/script/Miscellaneous.js'
    ,   'server-side-functions/script/PublicVariables.js'
    ,   'server-side-functions/script/SabaClub.js'
    ,   'server-side-functions/script/Archive.js'
    ,   'server-side-functions/script/Security.js'
    ,   'server-side-functions/script/shellExtension.js'
    ].forEach((path) => {
        try {
            load(path);
            logger.info(`Success`, `Deployed [${path}]`);
        } catch (e) {
            logger.err(`Failure`, `${e}`);
        }
    });
}
