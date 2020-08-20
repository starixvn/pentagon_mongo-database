// -- ln-env.js -- //
{
    let db_connstr = 'mongodb://';
    var mongo = new Mongo(db_connstr);
    let wc = new WriteConcern("majority", 0, true);
    mongo.setWriteConcern(wc);
    load('run-summary.js');
    quit();
}

// -- run-summary.js -- //
{
    mongo.getDB('script').loadServerScripts();
    summarizeDaily(mongo);
    print("=========================================================================================\n\n");
}