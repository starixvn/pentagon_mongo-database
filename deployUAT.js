{
  const global = Function('return this;')();

  run('git', 'pull', '--rebase');

  uat.forEach(instance => {
    const oldDB = global.db;
    global.db = instance.admin;
    const oldUser = global.loadDBs()._getUser();
    try { db.runCommand({ping: 1}) } catch { db.runCommand({ping: 1}) };
    global.auth();
    load(`server-side-functions/class/Shell.js`);

    const logger = new Shell.Log(`DEPLOY-UAT`);

    [ 'deployClasses.js',
      'deployScripts.js',
      'deployIndexes.js',
      'deployIndexesArc.js',
      'deployBI.js',
    ].forEach((path) => {
      try {
        load(path);
        logger.info(`${db._mongo.host}`, `Deployed [${path}]\n${'='.repeat(50)}\n\n`);
      } catch (e) {
        logger.err(`${db._mongo.host}`, `${e}\n${'='.repeat(50)}\n\n`);
      }
    });

    if (oldUser[0]) {
      global.auth(global.db, oldUser[0].user);
    }
    global.db = oldDB;
  });
}
