[   'schema/admin/admin-env.js'
,   'schema/log_arc/log_arc-LogIndexes.js'
,   'schema/minigame_arc/minigame_arc-GameIndexes.js'
,   'schema/minigame_arc/minigame_arc-GameSlotIndexes.js'
,   'schema/summary_arc/summary_arc-DailySummaries.js'
,   'schema/summary_arc/summary_arc-GameSummaryConfig.js'
].forEach((path) => {
    try {
        load(path);
        Misc.log(`Deployed [${path}]`, `Success`, `DEPLOY`, `I`);
    } catch (e) {
        Misc.log(`${e}`, `Failure`, `DEPLOY`, `E`);
    }
});
