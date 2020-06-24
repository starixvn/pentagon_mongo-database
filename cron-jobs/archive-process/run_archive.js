active_connstr = 'mongodb://';
archive_connstr = 'mongodb://';

// Active and archive database
db_active = (new Mongo(active_connstr)).getDB('minigame');
db_arc = (new Mongo(archive_connstr)).getDB('minigame_arc');

// Load script
db_active.getSiblingDB('script').loadServerScripts();

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

// Archive user
archiveTable(db_active, db_arc, 'usersessions', 'recheckInTime');

// Archive Log
db_active = db_active.getSiblingDB('log');
db_arc = db_arc.getSiblingDB('log_arc');
// Run archive
archiveLog(db_active, db_arc, 'bets');
archiveLog(db_active, db_arc, 'end_games');
archiveLog(db_active, db_arc, 'failed_requests');

// Archive Member
db_active = db_active.getSiblingDB('member');
db_arc = db_arc.getSiblingDB('member_arc');
// Run archive
archiveTable(db_active, db_arc, 'member_auths', 'time');

print("=========================================================================================\n\n");
db_active._session.endSession();
db_arc._session.endSession();
quit();