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
    load('run-summary.js');
    quit();
}

// -- run-summary.js -- //
{
    mongoActive.getDB('script').loadServerScripts();
    summarizeDaily(mongoActive);

    print("=========================================================================================\n\n");

    const yesterday = new Date(Date.now() - 2 * 24 * 3600 * 1000);
    mongoArc.getDB('script').loadServerScripts();
    summarizeDaily(mongoArc, yesterday, undefined, 'summary_arc');

    print("=========================================================================================\n\n");
}
