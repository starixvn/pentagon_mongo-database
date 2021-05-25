// -- ln-env.js -- //
var mongoActive;
var mongoArc;
{
  const activeConnstr = 'mongodb://';
  const arcConnstr = 'mongodb://';
  mongoActive = new Mongo(activeConnstr);
  mongoArc = new Mongo(arcConnstr);
  const wc = new WriteConcern("majority", 0, true);
  mongoActive.setWriteConcern(wc);
  mongoArc.setWriteConcern(wc);
  load('run-bl-summary.js');
  quit();
}

// -- run-bl-summary.js -- //
{
  mongoActive.getDB('script').loadServerScripts();

  processor = new SabaClub.BetLogProcessor(mongoActive, mongoActive);
  processor.processAllBetLog(10000);

  summary = new SabaClub.BetLogSummary(mongoActive, mongoActive);
  summary.runBetLogSummary();

  print("=========================================================================================\n\n");
}
