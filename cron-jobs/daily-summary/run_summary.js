// -- ln-env.js -- //
{
    let db_connstr = 'mongodb://';
    let db = (new Mongo(db_connstr)).getDB('minigame');
    load('run-summary.js');
    print("=========================================================================================\n\n");
    db._session.endSession();
    quit();
}

// -- run-summary.js -- //
{
    db.getSiblingDB('script').loadServerScripts();
    summarizeDaily();
}