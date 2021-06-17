{
  run('git', 'pull', '--rebase');

  const global = Function('return this;')();
  const login = {user: 'billy.bui', pwd: passwordPrompt()};
  const readonly = pro_readonly;

  pro.forEach(instance => {
    const oldDB = global.db;
    global.db = instance;
    try { db.runCommand({ping: 1}) } catch { db.runCommand({ping: 1}) };
    db.getSiblingDB('admin').auth(login);
    load(`server-side-functions/class/Shell.js`);

    const logger = new Shell.Log(`DEPLOY-PRO`);

    [ 'deployClasses.js',
      'deployScripts.js',
      'deployIndexes.js',
      'deployBI.js',
    ].forEach((path) => {
      try {
        load(path);
        logger.info(`${db._mongo.host}`, `Deployed [${path}]\n${'='.repeat(50)}\n\n`);
      } catch (e) {
        logger.err(`${db._mongo.host}`, `${e}\n${'='.repeat(50)}\n\n`);
      }
    });

    db.getSiblingDB('admin').auth(readonly);
    global.db = oldDB;
  });

  pro_arc.forEach(instance => {
    const oldDB = db;
    db = instance;
    db.getSiblingDB('admin').auth(login);
    load(`server-side-functions/class/Shell.js`);

    const logger = new Shell.Log(`DEPLOY-PRO-ARC`);

    [ 'deployClasses.js',
      'deployScripts.js',
      'deployIndexesArc.js',
    ].forEach((path) => {
      try {
        load(path);
        logger.info(`${db._mongo.host}`, `Deployed [${path}]\n${'='.repeat(50)}\n\n`);
      } catch (e) {
        logger.err(`${db._mongo.host}`, `${e}\n${'='.repeat(50)}\n\n`);
      }
    });

    db.getSiblingDB('admin').auth(readonly);
    db = oldDB;
  });
}
