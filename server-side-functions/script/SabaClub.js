deploy: {
    // Saba.summarizeDaily()
    const summarizeDailyFunc = (mongo, summaryDay, bypassExpired = false, summaryDB = `summary`) => {
        const logger = new Shell.Log(`SUMMARY`);

        if (!mongo) {
            logger.err(`Audit`, `Must be connected to Mongo instance to run this function.`);
            return;
        }
        if (!summaryDB) {
            logger.err(`Audit`, `Must specify the summary DB.`);
            return;
        }

        const dayLen = 24 * 3600 * 1000;
        summaryDay = summaryDay || new Date(Date.now() - dayLen);

        // Parameters' type verification
        if (!(mongo instanceof Mongo)) {
            logger.err(`Audit`, `[mongo] must be a MongoDB connection.`);
            return;
        }
        if (!isNaN(Date.parse(summaryDay))) {
            summaryDay = new Date(Date.parse(summaryDay));
        }
        if (!(summaryDay instanceof Date)) {
            logger.err(`Audit`, `Summary day [${tojsononeline(summaryDay)}] must be a date.`);
            return;
        }
        if (typeof summaryDB != "string") {
            logger.err(`Audit`, `Summary DB [${tojsononeline(summaryDB)}] must be a string.`);
            return;
        }
        if (!bypassExpired && (Math.floor(Date.now() / dayLen) * dayLen - summaryDay.valueOf() > 7 * dayLen)) {
            logger.err(`Audit`, `The summary day [${summaryDay.toISOString().substr(0,10)}] is expired. Cannot run data summary for this day.`);
            return;
        }
        if (Math.floor(Date.now() / dayLen) * dayLen - summaryDay.valueOf() <= 0) {
            logger.err(`Audit`, `The summary day [${summaryDay.toISOString().substr(0,10)}] is not finished. Cannot run data summary for this day.`);
            return;
        }

        // Initialize time frame for data summary
        const timeFrom = new Date(Math.floor(summaryDay.valueOf() / dayLen) * dayLen);
        const timeTo = new Date(timeFrom.valueOf() + dayLen);

        // Run summary from config
        logger.info(summaryDB, `Data summary for ${timeFrom.toISOString().substr(0,10)} started.`);

        mongo.getDB(summaryDB).game_summary_config.find().forEach((game) => {
            const agg = [];

            agg.push({$match: {$expr: {$and: [{$gte: [game.fields.time, timeFrom]}, {$lt: [game.fields.time, timeTo]}]}}});
            agg.push({$project: {_id: 0, id: 1}});
            agg.push({$lookup: {
                from: game.coll.group + game.coll.postfix,
                localField: `id`,
                foreignField: game.fields.map,
                as: `bets`
            }});
            agg.push({$unwind: `$bets`});
            agg.push({$replaceWith: `$bets`});
            agg.push({$match: {$expr: {$and: [{$gt: [`$memberId`, 0]}, {$eq: [game.fields.settled, true]}]}}});

            // Add currency to document if not exists
            if (!game.config.hasCurrency) {
                const uids = [];
                mongo.getDB(game.coll.db)[game.coll.group + game.coll.postfix].aggregate([
                    {$match: {'__archive.currency': {$exists: false}, memberId: {$gt: 0}}}
                ,   {$project: {_id: 0, uid: 1}}
                ,   {$group: {_id: `$uid`}}
                ]).forEach(doc => {
                    uids.push(doc._id);
                });
                const updCurrencyPipe = [];
                mongo.getDB(game.coll.db).userinfos.find({id: {$in: uids}}, {_id: 0, id: 1, currency: 1}).forEach(doc => {
                    updCurrencyPipe.push({updateMany: {
                        filter: {uid: doc.id, '__archive.currency': {$exists: false}}
                    ,   update: [
                            {$set: {'__archive.currency': {$literal: doc.currency}}}
                        ]
                    }});
                });
                const res = mongo.getDB(game.coll.db)[game.coll.group + game.coll.postfix].bulkWrite(updCurrencyPipe, {ordered: false});

                if (res.deletedCount + res.insertedCount + res.matchedCount + res.upsertedCount > 0) {
                    logger.info(game.name.en, `Added into [${game.coll.group + game.coll.postfix}] collection.`);
                    logger.info(game.name.en, ` • D-${res.deletedCount} • I-${res.insertedCount} • M-${res.matchedCount} • U-${res.upsertedCount}`);
                }
            }

            agg.push({$project: {_id: 0, stake: {$sum: game.fields.stake}, payout: {$sum: game.fields.payout}, '__archive.currency': 1}});
            agg.push({$group: {_id: `$__archive.currency`, stake: {$sum: `$stake`}, payout: {$sum: `$payout`}, tickets: {$sum: 1}}});
            agg.push({$project: {
                _id: 0,
                'key.time': {$literal: timeFrom}, 'key.gameId': {$literal: game.gameId}, 'key.currency': `$_id`,
                'value.stake': `$stake`, 'value.payout': `$payout`, 'value.tickets': `$tickets`
            }});

            const time = new Date();

            const oldSummaries = [];
            mongo.getDB(summaryDB).daily_summaries.find(
                {time: timeFrom, gameId: game.gameId},
                {_id: 0, time: 1, gameId: 1, currency: 1}
            ).forEach((doc) => {
                const _doc = {};
                Object.keys(doc).sort().forEach((k) => {
                    _doc[k] = doc[k];
                });
                oldSummaries.push(tojson(_doc));
            });

            const summaries = mongo.getDB(game.coll.db)[game.coll.group + game.coll.round].aggregate(agg).toArray();
            summaries.forEach((doc) => {
                const res = mongo.getDB(summaryDB).daily_summaries.updateOne(doc.key, {$set: doc.value}, {upsert: true});
                if (res.upsertedId) {
                    logger.info(game.name.en, `- Inserted new summary record for ${doc.key.currency}`);
                } else if (res.modifiedCount > 0) {
                    logger.info(game.name.en, `- Modified summary record for ${doc.key.currency}`);
                }

                const _doc = {};
                Object.keys(doc.key).sort().forEach((k) => {
                    _doc[k] = doc.key[k];
                });
                const idx = oldSummaries.indexOf(tojson(_doc));
                if (idx >= 0) {
                    oldSummaries.splice(idx, 1);
                }
            });
            oldSummaries.forEach((doc) => {
                try {
                    let _doc = null;
                    eval(`_doc = ${doc}`);
                    if (typeof _doc != "object") {
                        _doc = null;
                    }
                    const res = mongo.getDB(summaryDB).daily_summaries.deleteOne(_doc);
                    if (res.deletedCount > 0) {
                        logger.info(game.name.en, `- Deleted summary record for ${_doc.currency}`);
                    } else {
                        logger.warn(game.name.en, `- No summary record deleted for ${_doc.currency}`);
                    }
                } catch (e) {
                    logger.warn(game.name.en, `- Something is WRONG while deleting summary record for ${doc}`);
                }
            })
            logger.info(game.name.en, `Done summarize data in ${(new Date()).valueOf() - time.valueOf()} ms`);
        });
        logger.info(summaryDB, `Data summary for ${timeFrom.toISOString().substr(0,10)} finished.`);
    };

    // Saba.runArchive()
    const runArchiveFunc = (mongoFrom, mongoTo, config) => {
        const logger = new Shell.Log(`ARCHIVE`);

        if (!(mongoFrom instanceof Mongo)) {
            logger.err(`Audit`, `[mongoFrom] must be a MongoDB connection.`);
            return;
        }
        if (!(mongoTo instanceof Mongo)) {
            logger.err(`Audit`, `[mongoTo] must be a MongoDB connection.`);
            return;
        }
        if (!(config instanceof DBCollection)) {
            logger.err(`Audit`, `[config] must be a collection.`);
            return;
        }

        // The schema of config document
        const configSchema = {
            from: {db: "string", coll: "string"}
        ,   to: {db: "string", coll: "string"}
        ,   config: {
                timeField: "string"
            ,   cutOffsetHours: "number"
            ,   join: "string"
            ,   filter: "object"
            ,   logField: "string"
            ,   logValue: "string"
            }
        ,   childs: Array
        };

        // All needed information is in config collection.
        config.find().forEach((item) => {
            // If the document does NOT have correct schema, skip it
            if (!Misc.auditSchema(item, configSchema)) {
                return;
            }

            const dbFrom = mongoFrom.getDB(item.from.db);
            const dbTo = mongoTo.getDB(item.to.db);

            // Building options
            const arcOpts = {
                timeField: item.config.timeField
            ,   cutOffTime: new Date((Math.floor(Date.now() / 3600000) + item.config.cutOffsetHours) * 3600000)
            ,   filter: item.config.filter
            ,   updateOnly: !!item.config.updateOnly
            ,   logField: item.config.logField
            ,   logValue: item.config.logValue
            };
            const childOpts = [];
            item.childs.forEach((child) => {
                childOpts.push({
                    fromColl: dbFrom[child.from]
                ,   toColl: dbTo[child.to]
                ,   joinParent: item.config.join
                ,   joinChild: child.join
                ,   updateOnly: child.updateOnly
                ,   filter: child.filter
                ,   exCols: child.exCols
                ,   logField: child.logField
                ,   logValue: child.logValue
                });
            });

            // Run archive
            Archive.archiveByTimes(dbFrom[item.from.coll], dbTo[item.to.coll], arcOpts, childOpts);
        });
    };

    // Saba.removeData()
    const removeDataFunc = (fromDB, toDB, collName, filter, debug = 1) => {
        const logger = new Shell.Log(`REMOVE`);

        // Parameters' type verification
        if (!(fromDB instanceof DB)) {
            logger.err(`Audit`, `[fromDB] must be a database`);
            return;
        }
        if (!(toDB instanceof DB)) {
            logger.err(`Audit`, `[toDB] must be a database`);
            return;
        }
        if (typeof collName != "string") {
            logger.err(`Audit`, `[group] must be a string`);
            return;
        }
        if (typeof filter != "object") {
            logger.err(`Audit`, `[filter] must be a object`);
            return;
        }

        // Initialize group collections' name
        const coll = {
            name: `${collName}`
        };
        const collRM = {
            name: `${collName}_rm`
        };

        // Group must have collection
        if (fromDB.getCollectionInfos({name: coll.name}).length !== 1) {
            logger.err(collName, `Cannot remove data because [${fromDB._name}.${coll.name}] does NOT exist`);
            return;
        }

        const docs = [];
        const bulkUpdatePipe = [];
        const rmDate = new Date();
        fromDB[coll.name].find(filter).forEach((doc) => {
            docs.push({rm: doc, rmDate: rmDate});
            bulkUpdatePipe.push({deleteOne: {filter: {_id: doc._id}}});
        });

        if (!docs || docs.length === 0) {
            logger.err(collName, `Cannot remove data because [${fromDB._name}.${coll.name}] has NO documents matching with the filter`);
        } else {
            if (debug === 0) {
                try {
                    toDB[collRM.name].insertMany(docs, {ordered: false});
                    fromDB[coll.name].bulkWrite(bulkUpdatePipe, {ordered : false});
                    logger.info(collName, `Removed ${docs.length} documents`);
                } catch (e) {
                    logger.err(collName, e.message);
                    return;
                }
            } else {
                print(`\n${tojson(docs)}\n`);
            }
        }
    };

    // Saba.env()
    const envFunc = (mongo = db._mongo) => {
        return mongo.getDB(`admin`).env.findOne({_id: `SC`}).value;
    };

    // Saba.Spins.importSpins()
    const importSpinsFunc = (mongo, file, schema, hasHeader = true, force = false, roundField = `roundId`) => {
        const logger = new Shell.Log(`IMPORT-SPINS`);

        if (!(mongo instanceof Mongo)) {
            logger.err(`Audit`, `Must be connected to Mongo instance to run this function.`);
            return 1;
        }
        if (typeof file != "string" && !pathExists(file)) {
            logger.err(`Audit`, `Filepath [${file}] does NOT exist.`);
            return 1;
        }
        if (typeof roundField != "string") {
            logger.err(`Audit`, `Round field's name [${roundField}] MUST be a string.`);
            return 1;
        }

        const schemaSch = {
            name: "string"
        ,   type: {
                class: "string"
            ,   timezone: "string"
            }
        };
        if (!schema || schema.length <= 0 || schema.some((col) => !Misc.auditSchema(col, schemaSch))) {
            logger.err(`Audit`, `CSV's schema does NOT have correct format.`);
            return 2;
        }

        // Generate key
        const key = (new BinData(4, MD5(hex_md5(file)).base64())).toString().replace(/^UUID[(]"|"[)]$/g, ``);
        const time = new Date();

        // Read CSV file
        const fileData = Misc.readCSV(file, schema, hasHeader);

        // The file must contain only 1 round
        const round = [];
        fileData.forEach(item => {
            if (item.roundId && round.indexOf(item.roundId) < 0) {
                round.push(item.roundId);
            }
        });
        if (round.length !== 1) {
            logger.err(`Audit`, `The file [${file}] contains incorrect number of rounds = [${round.length}]. Must have only 1.`);
            return 3;
        }

        // Variable
        let res = {};

        // Verify current data with database
        {   let err = 0;

            // If there are key in the database, the file may have been imported before, need to check manually
            if (mongo.getDB(`minigame`).spin_logs.findOne({key: key})) {
                logger.err(`Audit`, `The file [${file}] may have been imported with key [${key}]`);
                err |= 1;
            }

            // If there are roundId in the database, the round has been imported before, need to check manually
            if (mongo.getDB(`minigame`).spin_logs.findOne({roundId: round[0]})) {
                logger.err(`Audit`, `The round [${round[0]}] has already been imported`);
                err |= 2;
            }

            if (!force && err) {
                return 4;
            }
        }

        logger.info(`Audit`, `The round [${round[0]}] in file [${file}] will be imported with key [${key}]`);
        const dataLength = fileData.length;

        // Check and remove invalid data
        fileData.forEach((data, indexD, objectD) => {
            let ok = true;

            schema.forEach((col) => {
                switch (col.type.class) {
                    case "Number":
                    case "Date":
                    case "ISODate":
                        ok = ok && !isNaN(data[col.name]);
                        break;
                }
            });

            if (!ok) {
                objectD[indexD] = null;
                logger.warn(`Invalid Data`, `${tojsononeline(data)}`);
            }
        });
        fileData.forEach((data, indexD, objectD) => {
            while (!objectD[indexD] && indexD < objectD.length) {
                objectD[indexD] = objectD[objectD.length - 1];
                objectD.pop();
            }
        });

        // Add fields to fileData
        const bulkWritePipe = [];
        fileData.forEach((doc) => {
            // Add field for spin_logs
            doc.time = time;
            doc.key = key;
            doc.source = `csv`;

            // Prepare operation for spins
            if (doc.expiryDate >= doc.time) {
                bulkWritePipe.push({
                    updateOne: {
                        filter: {memberId: doc.memberId}
                    ,   update: [
                            {$set: {
                                availSpins: {$add: [{$ifNull: [`$availSpins`, 0]}, doc.spinCnt]}
                            ,   usedSpins: {$ifNull: [`$usedSpins`, 0]}
                            ,   enabled: true
                            }}
                        ]
                    ,   upsert: true
                    }
                });
            } else {
                logger.warn(`Add Spins`, `Spins for member [${doc.memberId}] are expired.`);
            }
        });

        // Rollback last import
        const rollbackMembers = [];
        if (force) {
            mongo.getDB(`minigame`).spin_logs.find({roundId: round[0]}, {_id: 0, memberId: 1, spinCnt: 1}).forEach((doc) => {
                mongo.getDB(`minigame`).spins.updateOne({memberId: doc.memberId}, [{$set: {availSpins: {$subtract: [{$ifNull: [`$availSpins`, 0]}, doc.spinCnt]}}}]);
                rollbackMembers.push({memberId: doc.memberId});
                mongo.getDB(`minigame`).spin_logs.deleteOne({roundId: round[0], memberId: doc.memberId});
            });
            logger.warn(`Add Spins`, `Spins of ${rollbackMembers.length} members are rolled-back.`);
        }

        // Add data to spin_logs
        res = mongo.getDB(`minigame`).spin_logs.insertMany(fileData, {ordered: false});

        // Update spins
        try {
            res = mongo.getDB(`minigame`).spins.bulkWrite(bulkWritePipe, {ordered: false});
            logger.info(`Add Spins`, `Successfully imported ${res.insertedCount + res.upsertedCount + res.matchedCount} / ${dataLength} spins.`);
        } catch (e) {
            printjson(e);
        }

        // Correct if have rollback
        if (force && rollbackMembers.length > 0) {
            res = mongo.getDB(`minigame`).spins.updateMany({$or: rollbackMembers, availSpins: {$lt: 0}}, [{$set: {availSpins: 0}}]);
            logger.info(`Add Spins`, `${res.matchedCount} members have negative spins. Corrected ${res.modifiedCount} members.`);
        }

        return 0;
    };

    // Saba.Spins.importSpinsNoRound()
    const importSpinsNoRoundFunc = (mongo, file, schema, hasHeader = true, force = false) => {
        const logger = new Shell.Log(`IMPORT-SPINS-NR`);

        if (!(mongo instanceof Mongo)) {
            logger.err(`Audit`, `Must be connected to Mongo instance to run this function.`);
            return;
        }
        if (typeof file != "string" && !pathExists(file)) {
            logger.err(`Audit`, `Filepath [${file}] does NOT exist.`);
            return;
        }

        const schemaSch = {
            name: "string"
        ,   type: {
                class: "string"
            ,   timezone: "string"
            }
        };
        if (!schema || schema.length <= 0 || schema.some((col) => !Misc.auditSchema(col, schemaSch))) {
            logger.err(`Audit`, `CSV's schema does NOT have correct format.`);
            return;
        }

        // Generate key
        const key = (new BinData(4, MD5(hex_md5(file)).base64())).toString().replace(/^UUID[(]"|"[)]$/g, ``);
        const time = new Date();

        // Read CSV file
        const fileData = Misc.readCSV(file, schema, hasHeader);

        // Variable
        let res = {};

        // Verify current data with database
        {   let err = 0;

            // If there are key in the database, the file may have been imported before, need to check manually
            if (mongo.getDB(`minigame`).spin_logs.findOne({key: key})) {
                logger.err(`Audit`, `The file [${file}] may have been imported with key [${key}]`);
                err |= 1;
            }

            if (!force && err) {
                return;
            }
        }

        logger.info(`Audit`, `The spins in file [${file}] will be imported with key [${key}]`);
        const dataLength = fileData.length;

        // Check and remove invalid data
        fileData.forEach((data, indexD, objectD) => {
            let ok = true;

            schema.forEach((col) => {
                switch (col.type.class) {
                    case "Number":
                    case "Date":
                    case "ISODate":
                        ok = ok && !isNaN(data[col.name]);
                        break;
                }
            });

            if (!ok) {
                objectD[indexD] = null;
                logger.warn(`Invalid Data`, `${tojsononeline(data)}`);
            }
        });
        fileData.forEach((data, indexD, objectD) => {
            while (!objectD[indexD] && indexD < objectD.length) {
                objectD[indexD] = objectD[objectD.length - 1];
                objectD.pop();
            }
        });

        // Add fields to fileData
        const bulkWritePipe = [];
        fileData.forEach((doc) => {
            // Add field for spin_logs
            doc.time = time;
            doc.key = key;
            doc.source = `csv`;

            // Prepare operation for spins
            if (doc.expiryDate >= doc.time) {
                bulkWritePipe.push({
                    updateOne: {
                        filter: {memberId: doc.memberId}
                    ,   update: [
                            {$set: {
                                availSpins: {$add: [{$ifNull: [`$availSpins`, 0]}, doc.spinCnt]}
                            ,   usedSpins: {$ifNull: [`$usedSpins`, 0]}
                            ,   enabled: true
                            }}
                        ]
                    ,   upsert: true
                    }
                });
            } else {
                logger.warn(`Add Spins`, `Spins for member [${doc.memberId}] are expired.`);
            }
        });

        // Rollback last import
        const rollbackMembers = [];
        if (force) {
            mongo.getDB(`minigame`).spin_logs.find({key: key}, {_id: 0, memberId: 1, spinCnt: 1}).forEach((doc) => {
                mongo.getDB(`minigame`).spins.updateOne({memberId: doc.memberId}, [{$set: {availSpins: {$subtract: [{$ifNull: [`$availSpins`, 0]}, doc.spinCnt]}}}]);
                rollbackMembers.push({memberId: doc.memberId});
                mongo.getDB(`minigame`).spin_logs.deleteOne({key: key, memberId: doc.memberId});
            });
            logger.warn(`Add Spins`, `Spins of ${rollbackMembers.length} members are rolled-back.`);
        }

        // Add data to spin_logs
        res = mongo.getDB(`minigame`).spin_logs.insertMany(fileData, {ordered: false});

        // Update spins
        try {
            res = mongo.getDB(`minigame`).spins.bulkWrite(bulkWritePipe, {ordered: false});
            logger.info(`Add Spins`, `Successfully imported ${res.insertedCount + res.upsertedCount + res.matchedCount} / ${dataLength} spins.`);
        } catch (e) {
            printjson(e);
        }

        // Correct if have rollback
        if (force && rollbackMembers.length > 0) {
            res = mongo.getDB(`minigame`).spins.updateMany({$or: rollbackMembers, availSpins: {$lt: 0}}, [{$set: {availSpins: 0}}]);
            logger.info(`Add Spins`, `${res.matchedCount} members have negative spins. Corrected ${res.modifiedCount} members.`);
        }
    };

    // Saba.Spins.expireSpins()
    const expireSpinsFunc = (mongo) => {
        const logger = new Shell.Log(`EXPIRE-SPINS`);

        if (!(mongo instanceof Mongo)) {
            logger.err(`Audit`, `Must be connected to Mongo instance to run this function.`);
            return;
        }

        // Get current time to check for expiration
        const checkTime = ISODate();

        // Building aggregate for getting members with expired spins
        const aggGetSpinMembers = [];
        aggGetSpinMembers.push({$match: {
            availSpins: {$gt: 0}
        }});
        aggGetSpinMembers.push({$project: {
            _id: 0
        ,   memberId: 1
        ,   availSpins: 1
        }});
        aggGetSpinMembers.push({$lookup: {
            from: `spin_logs`
        ,   localField: `memberId`
        ,   foreignField: `memberId`
        ,   as: `logs`
        }});
        aggGetSpinMembers.push({$project: {
            memberId: 1
        ,   availSpins: 1
        ,   logs: {$filter: {
                input: `$logs`
            ,   as: `log`
            ,   cond: {$and: [{$gt: [`$$log.spinCnt`, 0]}, {$gt: [`$$log.expiryDate`, checkTime]}]}
            }}
        }});
        aggGetSpinMembers.push({$unwind: {
            path: `$logs`
        ,   preserveNullAndEmptyArrays: true
        }});
        aggGetSpinMembers.push({$group: {
            _id: `$memberId`
        ,   availSpins: {$max: `$availSpins`}
        ,   currentSpins: {$sum: {$ifNull: [`$logs.spinCnt`, 0]}}
        }});
        aggGetSpinMembers.push({$match: {
            $expr: {$gt: [`$availSpins`, `$currentSpins`]}
        }});
    
        const expiredMembers = mongo.getDB(`minigame`).spins.aggregate(aggGetSpinMembers).toArray();
        if (expiredMembers.length === 0) {
            logger.info(`${checkTime.toISOString()}`, `No members have expired spins.`);
            return;
        }
        logger.info(`Check Time`, `${checkTime.toISOString()}`);
        logger.info(`Check Spins`, `${expiredMembers.length} members have expired spins`);

        // Check for expired spins and take action
        const spinsUpdatePipe = [];
        const spinLogsExpirePipe = [];
        const rankLen = String(expiredMembers.length).length;
        expiredMembers.forEach((doc, indexD) => {
            logger.info(`${((" ").repeat(10) + doc._id).slice(-10)}`, ` • ${((" ").repeat(rankLen) + (indexD + 1)).slice(-rankLen)}/${expiredMembers.length}`);
            logger.info(`${((" ").repeat(10) + doc._id).slice(-10)}`, `   Spins will be corrected [${doc.availSpins}] => [${doc.currentSpins}]`);
            spinsUpdatePipe.push({updateOne: {
                filter: {memberId: doc._id}
            ,   update: [{$set: {availSpins: doc.currentSpins}}]
            }});
            let expireSpins = doc.availSpins - doc.currentSpins;
            let lastTime = checkTime;
            while (expireSpins > 0) {
                // From current time, check for the first spin log, that log definitely has expired spins
                const lastLog = mongo.getDB(`minigame`).spin_logs
                    .find(
                        {memberId: doc._id, expiryDate: {$lt: lastTime}, spinCnt: {$gt: 0}} // query
                    ,   {_id: 0, key: 1, roundId: 1, spinCnt: 1, expiryDate: 1} // fields
                    ,   1 // limit
                    ).sort({time: -1}).toArray()[0];

                // Since there are chances that someone add spins to member without logging,
                //   let's check the expiry log to see if we have done any expiration on it yet
                // This step does not need to be done if there are no logs,
                //   which means member has been granted spins without logging.
                let lastLogExpiry = lastLog ? mongo.getDB(`minigame`).spin_logs.findOne({roundId: -lastLog.roundId, memberId: doc._id}) : null;
                // If the last log don't have roundId, it may been added by admin
                //   we will check the key for this type of log
                if (!!lastLog) {
                    lastLogExpiry = !lastLogExpiry ? mongo.getDB(`minigame`).spin_logs.findOne({key: `${lastLog.key}_expired`, memberId: doc._id}) : null;
                }

                // A round cannot be expired twice, or a spin cannot missing associated log.
                // So if these cases happen, we need to revoke the invalid spins.
                if (!lastLog || lastLogExpiry) {
                    logger.warn(`${((" ").repeat(10) + doc._id).slice(-10)}`, `     Cannot find any spin logs that match this expiration. Spins contamination suspected.`);
                    logger.warn(`${((" ").repeat(10) + doc._id).slice(-10)}`, `     ${expireSpins} spins will be discarded.`);
                    spinLogsExpirePipe.push({updateOne: {
                        filter: {
                            key: `${lastLog ? lastLog.key : `EmptyID`}_${doc._id}_${Date.now()}`
                        ,   memberId: doc._id
                        }
                    ,   update: [{
                            $set: {
                                time: lastLog ? lastLog.expiryDate : checkTime
                            ,   spinCnt: {$add: [{$ifNull: [`$spinCnt`, 0]}, expireSpins]}
                            ,   source: `invalid`
                            }
                        }]
                    ,   upsert: true
                    }});
                    break;
                }

                // If everything is ok, we can do the expiration on current spin log
                const action = {insertOne: {
                    document: {
                        time: lastLog.expiryDate
                    ,   key: `${lastLog.key}_expired`
                    ,   memberId: doc._id
                    ,   spinCnt: expireSpins >= lastLog.spinCnt ? - lastLog.spinCnt : - expireSpins
                    ,   source: `expired`
                    }
                }};
                // The roundId may not available if the spins come from admin site
                if (lastLog.roundId) {
                    action.insertOne.document.roundId = -lastLog.roundId;
                }
                spinLogsExpirePipe.push(action);
                logger.info(`${((" ").repeat(10) + doc._id).slice(-10)}`, `     ${lastLog.spinCnt} spins in round [${lastLog.roundId || lastLog.key}] are expired.`);

                // If there still are expired spins, check the next closed log in spin_logs, else we're done for this member.
                expireSpins -= lastLog.spinCnt;
                lastTime = lastLog.expiryDate;
            }

            logger.info(`${(" ").repeat(10)}`, ``);
        });

        // All preparation are done, let's do it
        try {
            // Update the spins first
            mongo.getDB(`minigame`).spins.bulkWrite(spinsUpdatePipe, {ordered: false});
        } catch (e) {
            const err = e.getWriteErrors();
            err.forEach((_e) => {
                logger.err(`Update Spins`, `   ${_e.errmsg}`);
            });
        }
        try {
            // Then write expire|invalid log
            mongo.getDB(`minigame`).spin_logs.bulkWrite(spinLogsExpirePipe, {ordered: false});
        } catch (e) {
            const err = e.getWriteErrors();
            err.forEach((_e) => {
                logger.err(`Insert Spin Logs`, `   ${_e.errmsg}`);
            });
        }
        logger.info(``, `${('=').repeat(50)}`);
    };

    // Saba
    const _id = `Saba`;
    const version = `2.7.0`;
    const changelog = {};
    const value = new Code(`{
        summarizeDaily: ${summarizeDailyFunc.toString()}
    ,   runArchive: ${runArchiveFunc.toString()}
    ,   removeData: ${removeDataFunc.toString()}
    ,   env: ${envFunc.toString()}
    ,   Spins: {
            importSpins: ${importSpinsFunc.toString()}
        ,   importSpinsNoRound: ${importSpinsNoRoundFunc.toString()}
        ,   expireSpins: ${expireSpinsFunc.toString()}
        }
    }`);
    const lastVersion = (db.getSiblingDB('script').system.js.findOne({_id}, {_id: 0, version: 1}) || {version}).version;
    const res = db.getSiblingDB('script').system.js.save({_id, value, version, changelog});

    // Reload library
    db.getSiblingDB('script').loadServerScripts();

    // Log result
    const logger = new Shell.Log(`SCRIPT-${_id.toUpperCase().pad(9,1)}`);
    if (res.nUpserted) {
        logger.verbose(`Created`, `[${_id}@${version}]`);
        break deploy;
    }
    if (res.nModified) {
        logger.verbose(`Modified`, `[${_id}@${lastVersion}] => [${_id}@${version}]`);
        break deploy;
    }
    logger.verbose(`Unchanged`, `[${_id}@${version}]`);
}
