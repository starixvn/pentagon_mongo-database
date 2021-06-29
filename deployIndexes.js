{
  const logger = new Shell.Log(`DEPLOY-INDEX`);

  [ 'schema/admin/admin-env.js',
    'schema/archive/archive-ArchiveConfig.js',
    'schema/log/log-LogIndexes.js',
    'schema/member/member-member_auths.js',
    'schema/minigame/minigame-AdminUserIndexes.js',
    'schema/minigame/minigame-GameIndexes.js',
    'schema/minigame/minigame-GameSlotIndexes.js',
    'schema/minigame/minigame-GlobalConfigs.js',
    'schema/minigame/minigame-MiscIndexes.js',
    'schema/minigame/minigame-SmartBotIndexes.js',
    'schema/minigame/minigame-SpinIndexes.js',
    'schema/minigame/minigame-UserIndexes.js',
    'schema/Proteus/Proteus-BetLogIndexes.js',
    'schema/summary/summary-BetLogSummaries.js',
    'schema/summary/summary-DailySummaries.js',
    'schema/summary/summary-GameSummaryConfig.js',
  ].forEach((path) => {
    try {
      load(path);
      logger.info(`Success`, `Deployed [${path}]`);
    } catch (e) {
      logger.err(`Failure`, `${e}`);
    }
  });
}
