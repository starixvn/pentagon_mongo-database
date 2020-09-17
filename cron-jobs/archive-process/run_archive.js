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
    load('run-archive.js');
    quit();
}

// -- run-archive.js -- //
{
    // Active and archive database
    let dbActive = mongoActive.getDB('minigame');
    let dbArc = mongoArc.getDB('minigame_arc');

    // Load script
    mongoActive.getDB('script').loadServerScripts();

    // Run archive
    archiveGame(dbActive, dbArc, 'taixiu');
    archiveGame(dbActive, dbArc, 'baucua');
    archiveGame(dbActive, dbArc, 'xocxoc');
    archiveGame(dbActive, dbArc, 'txturbo');
    archiveGame(dbActive, dbArc, 'chanle');
    archiveGame(dbActive, dbArc, 'chanleturbo');
    archiveGame(dbActive, dbArc, 'minidragontiger');
    archiveGame(dbActive, dbArc, 'kenopromax');
    archiveGame(dbActive, dbArc, 'minisedie');
    archiveGame(dbActive, dbArc, 'baccarat');
    archiveGame(dbActive, dbArc, 'kenoeast');
    archiveGame(dbActive, dbArc, 'kenowest');
    archiveGame(dbActive, dbArc, 'kenosouth');
    archiveGame(dbActive, dbArc, 'kenonorth');
    archiveGame(dbActive, dbArc, 'kenomax');
    archiveGame(dbActive, dbArc, 'kenomax2');
    archiveGame(dbActive, dbArc, 'kenomini');
    archiveGame(dbActive, dbArc, 'kenomini2');
    archiveGame(dbActive, dbArc, 'kenoproviet');
    archiveGame(dbActive, dbArc, 'roulette');
    archiveGame(dbActive, dbArc, 'vipsedie');

    // Archive user
    archiveTable(dbActive, dbArc, 'usersessions', 'recheckInTime');

    // Archive Log
    dbActive = mongoActive.getDB('log');
    dbArc = mongoArc.getDB('log_arc');
    // Run archive
    archiveLog(dbActive, dbArc, 'bets');
    archiveLog(dbActive, dbArc, 'end_games');
    archiveLog(dbActive, dbArc, 'failed_requests');

    // Archive Member
    dbActive = mongoActive.getDB('member');
    dbArc = mongoArc.getDB('member_arc');
    // Run archive
    archiveTable(dbActive, dbArc, 'member_auths', 'time');

    print("=========================================================================================\n\n");
}
