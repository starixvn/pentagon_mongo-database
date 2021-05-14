{
    const logger = new Shell.Log(`DEPLOY-CLASS`);

    [   'server-side-functions/class/Program.js'
    ,   'server-side-functions/class/SabaClub.js'
    ,   'server-side-functions/class/Tool.js'
    ].forEach((path) => {
        try {
            load(path);
        } catch (e) {
            logger.err(`Failure`, `${e}\n\n`);
        }
    });
}
