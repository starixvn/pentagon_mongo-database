// -- ln-env.js -- //
{
    let active_connstr = 'mongodb://';
    let arc_connstr = 'mongodb://';
    var mongo_active = new Mongo(active_connstr);
    var mongo_arc = new Mongo(arc_connstr);
    let wc = new WriteConcern("majority", 0, true);
    mongo_active.setWriteConcern(wc);
    mongo_arc.setWriteConcern(wc);
    load('run-summary.js');
    quit();
}

// -- run-summary.js -- //
{
    mongo_active.getDB('script').loadServerScripts();
    summarizeDaily(mongo_active);

    print("=========================================================================================\n\n");

    let _ = undefined;
    let yesterday = new Date(Date.now() - 2 * 24 * 3600 * 1000);
    mongo_arc.getDB('script').loadServerScripts();
    summarizeDaily(mongo_arc, yesterday, _, 'summary_arc');

    print("=========================================================================================\n\n");
}