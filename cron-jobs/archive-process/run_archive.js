// -- ln-env.js -- //
{
    let active_connstr = 'mongodb://';
    let arc_connstr = 'mongodb://';
    var mongo_active = new Mongo(active_connstr);
    var mongo_arc = new Mongo(arc_connstr);
    let wc = new WriteConcern("majority", 0, true);
    mongo_active.setWriteConcern(wc);
    mongo_arc.setWriteConcern(wc);
    load('run-archive.js');
    quit();
}

// -- run-archive.js -- //
{
    // Active and archive database
    let db_active = mongo_active.getDB('minigame');
    let db_arc = mongo_arc.getDB('minigame_arc');

    // Load script
    mongo_active.getDB('script').loadServerScripts();

    // Run archive
    archiveGame(db_active, db_arc, 'taixiu');
    archiveGame(db_active, db_arc, 'baucua');
    archiveGame(db_active, db_arc, 'xocxoc');
    archiveGame(db_active, db_arc, 'txturbo');
    archiveGame(db_active, db_arc, 'chanle');
    archiveGame(db_active, db_arc, 'chanleturbo');
    archiveGame(db_active, db_arc, 'minidragontiger');
    archiveGame(db_active, db_arc, 'kenopromax');
    archiveGame(db_active, db_arc, 'minisedie');
    archiveGame(db_active, db_arc, 'baccarat');
    archiveGame(db_active, db_arc, 'kenoeast');
    archiveGame(db_active, db_arc, 'kenowest');
    archiveGame(db_active, db_arc, 'kenosouth');
    archiveGame(db_active, db_arc, 'kenonorth');
    archiveGame(db_active, db_arc, 'kenomax');
    archiveGame(db_active, db_arc, 'kenomax2');
    archiveGame(db_active, db_arc, 'kenomini');
    archiveGame(db_active, db_arc, 'kenomini2');
    archiveGame(db_active, db_arc, 'kenoproviet');
    archiveGame(db_active, db_arc, 'roulette');

    // Archive user
    archiveTable(db_active, db_arc, 'usersessions', 'recheckInTime');

    // Archive Log
    db_active = mongo_active.getDB('log');
    db_arc = mongo_arc.getDB('log_arc');
    // Run archive
    archiveLog(db_active, db_arc, 'bets');
    archiveLog(db_active, db_arc, 'end_games');
    archiveLog(db_active, db_arc, 'failed_requests');

    // Archive Member
    db_active = mongo_active.getDB('member');
    db_arc = mongo_arc.getDB('member_arc');
    // Run archive
    archiveTable(db_active, db_arc, 'member_auths', 'time');

    print("=========================================================================================\n\n");
}