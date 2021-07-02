{
  const logger = new Shell.Log(`DEPLOY-BI-ARC`);

  [ { script: 'bi/mongosqld/L1-schema-arc.js',
      env   : 2 ** 1
    },
    { script: 'bi/mongosqld/L2-schema-arc.js',
      env   : 2 ** 2
    },
    { script: 'bi/mongosqld/L3-schema-arc.js',
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
