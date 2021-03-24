{
    const logger = new Shell.Logger(`DEPLOY-INDEX-ARC`);

    [   'schema/admin/admin-env.js'
    ,   'schema/log_arc/log_arc-LogIndexes.js'
    ,   'schema/minigame_arc/minigame_arc-GameIndexes.js'
    ,   'schema/minigame_arc/minigame_arc-GameSlotIndexes.js'
    ,   'schema/summary_arc/summary_arc-DailySummaries.js'
    ,   'schema/summary_arc/summary_arc-GameSummaryConfig.js'
    ].forEach((path) => {
        try {
            load(path);
            logger.info(`${db._mongo.host}`, `Deployed [${path}]`);
        } catch (e) {
            logger.err(`${db._mongo.host}`, `${e}`);
        }
    });
}
