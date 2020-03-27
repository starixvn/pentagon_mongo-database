active_connstr = 'mongodb://';
archive_connstr = 'mongodb://';

// Active and archive database
db_active = (new Mongo(active_connstr)).getDB('minigame');
db_arc = (new Mongo(archive_connstr)).getDB('minigame_arc');

// Custom log function
log = function(label, str) {
	d = new Date();
	print(d.toISOString() + ' I  ARCHIVE  [' + label + '] ' + str);
}

// Archive data earlier than 24 hours ago
cutoff = new Date((Math.floor(Date.now() / 3600000) - 24) * 3600000);
log("Cutoff Time", cutoff.toISOString());

// Xoc xoc
archiveXocXoc = function(phiens, phiens_id) {
	try {
		db_arc.xocxoc_phiens_bk.insertMany(phiens, {ordered: false});
	} catch (e) {}

	// Get all cuocs related to archived phiens
	cuocs = [];
	cuocs_cnt = 0;
	db_active.xocxoc_cuocs.find({phien: {$in: phiens_id}}).forEach(
		function (cuoc) {
			// Save cuocs into an array
			cuocs.push(cuoc);
			cuocs_cnt++;

			// Archive by batch of 1000 documents
			if (cuocs_cnt % 1000 === 0) {
				try {
					db_arc.xocxoc_cuocs_bk.insertMany(cuocs, {ordered: false});
				} catch (e) {}
				cuocs = [];
			}

			// Report every 10 batches
			if (cuocs_cnt % 10000 === 0) {
				// Keep active connection open
				db_active.runCommand({ping: 1});
				log("xocxoc", "- Archiving " + cuocs_cnt + " cuocs");
			}
		}
	);
	try {
		db_arc.xocxoc_cuocs_bk.insertMany(cuocs, {ordered: false});
		log("xocxoc", "- Archived " + cuocs_cnt + " cuocs");
	} catch (e) {}
	cuocs = [];

	{
		bulkUpdatePipe = [];
		phiens.forEach(
			function(phien) {
				bulkUpdatePipe.push({updateMany: {filter: {phien: phien.id}, update: {$set: {'__archive.eventtime': phien.time}}}})
			}
		);
		db_active.xocxoc_cuocs.bulkWrite(bulkUpdatePipe, {ordered : false});
	}
	db_active.xocxoc_phiens.updateMany({id: {$in: phiens_id}}, [{$set: {'__archive.eventtime': "$time"}}]);
	log("xocxoc", "Archived " + phiens_id.length + " phiens with " + cuocs_cnt + " cuocs.");
}
// Run archive
{
	// Get all phiens that to be archived
	phiens = [];
	phiens_id = [];
	db_active.xocxoc_phiens.find({time: {$lt: cutoff}, '__archive.eventtime': {$exists: false}}).forEach(
		function(phien) {
			phiens.push(phien);
			phiens_id.push(phien.id);

			// Archive by batch of 1000 phiens
			if (phiens_id.length % 1000 === 0) {
				archiveXocXoc(phiens, phiens_id);
				phiens = [];
				phiens_id = [];
			}
		}
	);
	archiveXocXoc(phiens, phiens_id);
}

// Tai xiu
archiveTaiXiu = function(phiens, phiens_id) {
	try {
		db_arc.taixiu_phiens_bk.insertMany(phiens, {ordered: false});
	} catch (e) {}

	// Get all cuocs related to archived phiens
	cuocs = [];
	cuocs_cnt = 0;
	db_active.taixiu_cuocs.find({phien: {$in: phiens_id}}).forEach(
		function (cuoc) {
			// Save cuocs into an array
			cuocs.push(cuoc);
			cuocs_cnt++;

			// Archive by batch of 1000 documents
			if (cuocs_cnt % 1000 === 0) {
				try {
					db_arc.taixiu_cuocs_bk.insertMany(cuocs, {ordered: false});
				} catch (e) {}
				cuocs = [];
			}

			// Report every 10 batches
			if (cuocs_cnt % 10000 === 0) {
				// Keep active connection open
				db_active.runCommand({ping: 1});
				log("taixiu", "- Archiving " + cuocs_cnt + " cuocs");
			}
		}
	);
	try {
		db_arc.taixiu_cuocs_bk.insertMany(cuocs, {ordered: false});
		log("taixiu", "- Archived " + cuocs_cnt + " cuocs");
	} catch (e) {}

	// Get all ones related to archived phiens
	ones = [];
	ones_cnt = 0;
	db_active.taixiu_ones.find({phien: {$in: phiens_id}}).forEach(
		function (one) {
			// Save cuocs into an array
			ones.push(one);
			ones_cnt++;

			// Archive by batch of 1000 documents
			if (ones_cnt % 1000 === 0) {
				try {
					db_arc.taixiu_ones_bk.insertMany(ones, {ordered: false});
				} catch (e) {}
				ones = [];
			}

			// Report every 10 batches
			if (ones_cnt % 10000 === 0) {
				// Keep active connection open
				db_active.runCommand({ping: 1});
				log("taixiu", "- Archiving " + ones_cnt + " ones");
			}
		}
	);
	try {
		db_arc.taixiu_ones_bk.insertMany(ones, {ordered: false});
		log("taixiu", "- Archived " + ones_cnt + " ones");
	} catch (e) {}

	{
		bulkUpdatePipe = [];
		phiens.forEach(
			function(phien) {
				bulkUpdatePipe.push({updateMany: {filter: {phien: phien.id}, update: {$set: {'__archive.eventtime': phien.time}}}})
			}
		);
		db_active.taixiu_cuocs.bulkWrite(bulkUpdatePipe, {ordered : false});
		db_active.taixiu_ones.bulkWrite(bulkUpdatePipe, {ordered : false});
	}
	db_active.taixiu_phiens.updateMany({id: {$in: phiens_id}}, [{$set: {'__archive.eventtime': "$time"}}]);
	log("taixiu", "Archived " + phiens_id.length + " phiens with " + cuocs_cnt + " cuocs & " + ones_cnt + " ones.");
}
// Run archive
{
	// Get all phiens that to be archived
	phiens = [];
	phiens_id = [];
	db_active.taixiu_phiens.find({time: {$lt: cutoff}, '__archive.eventtime': {$exists: false}}).forEach(
		function(phien) {
			phiens.push(phien);
			phiens_id.push(phien.id);

			// Archive by batch of 1000 phiens
			if (phiens_id.length % 1000 === 0) {
				archiveTaiXiu(phiens, phiens_id);

				phiens = [];
				phiens_id = [];
			}
		}
	);
	archiveTaiXiu(phiens, phiens_id);
}

// Bau cua
archiveBauCua = function(phiens, phiens_id) {
	try {
		db_arc.baucua_phiens_bk.insertMany(phiens, {ordered: false});
	} catch (e) {}

	// Get all cuocs related to archived phiens
	cuocs = [];
	cuocs_cnt = 0;
	db_active.baucua_cuocs.find({phien: {$in: phiens_id}}).forEach(
		function (cuoc) {
			// Save cuocs into an array
			cuocs.push(cuoc);
			cuocs_cnt++;

			// Archive by batch of 1000 documents
			if (cuocs_cnt % 1000 === 0) {
				try {
					db_arc.baucua_cuocs_bk.insertMany(cuocs, {ordered: false});
				} catch (e) {}
				cuocs = [];
			}

			// Report every 10 batches
			if (cuocs_cnt % 10000 === 0) {
				// Keep active connection open
				db_active.runCommand({ping: 1});
				log("baucua", "- Archiving " + cuocs_cnt + " cuocs");
			}
		}
	);
	try {
		db_arc.baucua_cuocs_bk.insertMany(cuocs, {ordered: false});
		log("baucua", "- Archived " + cuocs_cnt + " cuocs");
	} catch (e) {}

	{
		bulkUpdatePipe = [];
		phiens.forEach(
			function(phien) {
				bulkUpdatePipe.push({updateMany: {filter: {phien: phien.id}, update: {$set: {'__archive.eventtime': phien.time}}}})
			}
		);
		db_active.baucua_cuocs.bulkWrite(bulkUpdatePipe, {ordered : false});
	}
	db_active.baucua_phiens.updateMany({id: {$in: phiens_id}}, [{$set: {'__archive.eventtime': "$time"}}]);
	log("baucua", "Archived " + phiens_id.length + " phiens with " + cuocs_cnt + " cuocs.");
}
// Run archive
{
	// Get all phiens that to be archived
	phiens = [];
	phiens_id = [];
	db_active.baucua_phiens.find({time: {$lt: cutoff}, '__archive.eventtime': {$exists: false}}).forEach(
		function(phien) {
			phiens.push(phien);
			phiens_id.push(phien.id);

			// Archive by batch of 1000 phiens
			if (phiens_id.length % 1000 === 0) {
				archiveBauCua(phiens, phiens_id);

				phiens = [];
				phiens_id = [];
			}
		}
	);
	archiveBauCua(phiens, phiens_id);
}


// Log
{
	db_active = db_active.getSiblingDB('log');
	db_arc = db_arc.getSiblingDB('log_arc');

	archiveLog = function(srcColl, dstColl) {
		docs = [];
		docs_cnt = 0;
		db_active[srcColl].find({'__archive.eventtime': {$exists: false}}).forEach(
			function(doc) {
				docs.push(doc);
				docs_cnt++;

				if (docs_cnt % 1000 === 0) {
					try {
						db_arc[dstColl].insertMany(docs, {ordered: false});
					} catch (e) {}
					bulkUpdatePipe = [];
					docs.forEach(
						function(_doc) {
							bulkUpdatePipe.push({updateMany: {filter: {_id: _doc._id}, update: {$set: {'__archive.eventtime': ISODate(_doc.requestTimeStamp)}}}})
						}
					);
					db_active[srcColl].bulkWrite(bulkUpdatePipe, {ordered : false});
					docs = [];
				}

				if (docs_cnt % 10000 === 0) {
					log(srcColl, "- Archiving " + docs_cnt + " logs");
				}
			}
		);
		try {
			db_arc[dstColl].insertMany(docs, {ordered: false});
		} catch (e) {}
		bulkUpdatePipe = [];
		docs.forEach(
			function(_doc) {
				bulkUpdatePipe.push({updateMany: {filter: {_id: _doc._id}, update: {$set: {'__archive.eventtime': ISODate(_doc.requestTimeStamp)}}}})
			}
		);
		db_active[srcColl].bulkWrite(bulkUpdatePipe, {ordered : false});
		log(srcColl, "- Archived " + docs_cnt + " logs");
	}

	archiveLog('bets', 'bets_bk');
	archiveLog('end_games', 'end_games_bk');
	archiveLog('failed_requests', 'failed_requests_bk');
}

print("=========================================================================================\n\n");
db_active._session.endSession();
db_arc._session.endSession();
quit();
