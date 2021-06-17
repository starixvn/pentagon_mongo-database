{
  const logger = new Shell.Log(`DEPLOY-BI`);

  [ { script: 'bi/mongosqld/L1-schema.js',
      env   : 2 ** 1
    },
    { script: 'bi/mongosqld/L2-schema.js',
      env   : 2 ** 2
    },
    { script: 'bi/mongosqld/L3-schema.js',
      env   : 2 ** 3
    },
  ].forEach((path) => {
    if ((2 ** Saba.env() & path.env) == 0) return;
    try {
      load(path.script);
      logger.info(`Success`, `Deployed [${path.script}]`);
    } catch (e) {
      logger.err(`Failure`, `${e}`);
    }
  });
}
