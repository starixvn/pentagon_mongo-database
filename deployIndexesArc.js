{
    const logger = new Shell.Log(`DEPLOY-INDEX-ARC`);

    [   'schema/admin/admin-env.js'
    ,   'schema/log_arc/log_arc-LogIndexes.js'
    ,   'schema/minigame_arc/minigame_arc-GameIndexes.js'
    ,   'schema/minigame_arc/minigame_arc-GameSlotIndexes.js'
    ,   'schema/summary_arc/summary_arc-DailySummaries.js'
    ,   'schema/summary_arc/summary_arc-GameSummaryConfig.js'
    ,   'schema/summary_arc/summary_arc-SmartBotDataBank.js'
    ].forEach((path) => {
        try {
            load(path);
            logger.info(`Success`, `Deployed [${path}]`);
        } catch (e) {
            logger.err(`Failure`, `${e}`);
        }
    });
}
