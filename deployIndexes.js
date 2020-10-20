[   'schema/admin/admin-env.js'
,   'schema/archive/archive-ArchiveConfig.js'
,   'schema/log/log-LogIndexes.js'
,   'schema/member/member-member_auths.js'
,   'schema/minigame/minigame-AdminUserIndexes.js'
,   'schema/minigame/minigame-GameIndexes.js'
,   'schema/minigame/minigame-SpinIndexes.js'
,   'schema/minigame/minigame-UserIndexes.js'
,   'schema/summary/summary-DailySummaries.js'
,   'schema/summary/summary-GameSummaryConfig.js'
].forEach((path) => {
    try {
        load(path);
        Misc.log(`Deployed [${path}]`, `Success`, `DEPLOY`, `I`);
    } catch (e) {
        Misc.log(`${e}`, `Failure`, `DEPLOY`, `E`);
    }
});
