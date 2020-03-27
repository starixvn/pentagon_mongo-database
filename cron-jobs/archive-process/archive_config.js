active_connstr = 'mongodb://';
archive_connstr = 'mongodb://';

// Active and archive database
db_active = (new Mongo(active_connstr)).getDB('minigame');
db_arc = (new Mongo(archive_connstr)).getDB('minigame_arc');

// Functions
log = function(label, str) {
	d = new Date();
	print(d.toISOString() + ' I  CONFIG  [' + label + '] ' + str);
}
copyIndex = function(srcColl, dstColl) {
	db_active[srcColl].getIndexes().forEach(
		function(_idx) {
			if (_idx.expireAfterSeconds == null) {
				delete _idx.v;
				delete _idx.ns;
				key = _idx.key;
				delete _idx.key;
				db_arc[dstColl].createIndex(key, _idx);
				log('copyIndex', 'From [' + srcColl + '] to [' + dstColl + ']: ' + _idx.name);
			}
		}
	)
}

{
	db_active = db_active.getSiblingDB('minigame');
	db_arc = db_arc.getSiblingDB('minigame_arc');

	db_active.baucua_cuocs.dropIndex('TTL_baucua_cuocs');
	db_active.baucua_phiens.dropIndex('TTL_baucua_phiens');
	db_active.taixiu_cuocs.dropIndex('TTL_taixiu_cuocs');
	db_active.taixiu_ones.dropIndex('TTL_taixiu_ones');
	db_active.taixiu_phiens.dropIndex('TTL_taixiu_phiens');
	db_active.xocxoc_cuocs.dropIndex('TTL_xocxoc_cuocs');
	db_active.xocxoc_phiens.dropIndex('TTL_xocxoc_phiens');

	db_active.baucua_cuocs.createIndex({'__archive.eventtime': 1}, {expireAfterSeconds: 3600*24*8, name: 'TTL_baucua_cuocs'});
	db_active.baucua_phiens.createIndex({'__archive.eventtime': 1}, {expireAfterSeconds: 3600*24*8, name: 'TTL_baucua_phiens'});
	db_active.taixiu_cuocs.createIndex({'__archive.eventtime': 1}, {expireAfterSeconds: 3600*24*8, name: 'TTL_taixiu_cuocs'});
	db_active.taixiu_ones.createIndex({'__archive.eventtime': 1}, {expireAfterSeconds: 3600*24*8, name: 'TTL_taixiu_ones'});
	db_active.taixiu_phiens.createIndex({'__archive.eventtime': 1}, {expireAfterSeconds: 3600*24*8, name: 'TTL_taixiu_phiens'});
	db_active.xocxoc_cuocs.createIndex({'__archive.eventtime': 1}, {expireAfterSeconds: 3600*24*8, name: 'TTL_xocxoc_cuocs'});
	db_active.xocxoc_phiens.createIndex({'__archive.eventtime': 1}, {expireAfterSeconds: 3600*24*8, name: 'TTL_xocxoc_phiens'});

	copyIndex('baucua_cuocs', 'baucua_cuocs_bk');
	copyIndex('baucua_phiens', 'baucua_phiens_bk');
	copyIndex('taixiu_cuocs', 'taixiu_cuocs_bk');
	copyIndex('taixiu_ones', 'taixiu_ones_bk');
	copyIndex('taixiu_phiens', 'taixiu_phiens_bk');
	copyIndex('xocxoc_cuocs', 'xocxoc_cuocs_bk');
	copyIndex('xocxoc_phiens', 'xocxoc_phiens_bk');
}

{
	db_active = db_active.getSiblingDB('log');
	db_arc = db_arc.getSiblingDB('log_arc');

	db_active.bets.dropIndex('TTL_bets');
	db_active.end_games.dropIndex('TTL_end_games');
	db_active.failed_requests.dropIndex('TTL_failed_requests');

	db_active.bets.createIndex({'__archive.eventtime': 1}, {expireAfterSeconds: 3600*24*8, name: 'TTL_bets'});
	db_active.end_games.createIndex({'__archive.eventtime': 1}, {expireAfterSeconds: 3600*24*8, name: 'TTL_end_games'});
	db_active.failed_requests.createIndex({'__archive.eventtime': 1}, {expireAfterSeconds: 3600*24*8, name: 'TTL_failed_requests'});

	copyIndex('bets', 'bets_bk');
	copyIndex('end_games', 'end_games_bk');
	copyIndex('failed_requests', 'failed_requests_bk');
}

db_active._session.endSession();
db_arc._session.endSession();
// quit();