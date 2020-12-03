{
    // Saba.summarizeDaily()
    const summarizeDailyFunc = (mongo, summaryDay, bypassExpired = false, summaryDB = `summary`) => {
        if (!mongo) {
            Misc.log(`Must be connected to Mongo instance to run this function.`, `Audit`, `SUMMARY`, `E`);
            return;
        }
        if (!summaryDB) {
            Misc.log(`Must specify the summary DB.`, `Audit`, `SUMMARY`, `E`);
            return;
        }

        const dayLen = 24 * 3600 * 1000;
        summaryDay = summaryDay || new Date(Date.now() - dayLen);

        // Parameters' type verification
        if (!(mongo instanceof Mongo)) {
            Misc.log(`[mongo] must be a MongoDB connection.`, `Audit`, `SUMMARY`, `E`);
            return;
        }
        if (!isNaN(Date.parse(summaryDay))) {
            summaryDay = new Date(Date.parse(summaryDay));
        }
        if (!(summaryDay instanceof Date)) {
            Misc.log(`Summary day [${tojsononeline(summaryDay)}] must be a date.`, `Audit`, `SUMMARY`, `E`);
            return;
        }
        if (typeof summaryDB != "string") {
            Misc.log(`Summary DB [${tojsononeline(summaryDB)}] must be a string.`, `Audit`, `SUMMARY`, `E`);
            return;
        }
        if (!bypassExpired && (Math.floor(Date.now() / dayLen) * dayLen - summaryDay.valueOf() > 7 * dayLen)) {
            Misc.log(`The summary day [${summaryDay.toISOString().substr(0,10)}] is expired. Cannot run data summary for this day.`, `Audit`, `SUMMARY`, `E`);
            return;
        }
        if (Math.floor(Date.now() / dayLen) * dayLen - summaryDay.valueOf() <= 0) {
            Misc.log(`The summary day [${summaryDay.toISOString().substr(0,10)}] is not finished. Cannot run data summary for this day.`, `Audit`, `SUMMARY`, `E`);
            return;
        }

        // Initialize time frame for data summary
        const timeFrom = new Date(Math.floor(summaryDay.valueOf() / dayLen) * dayLen);
        const timeTo = new Date(timeFrom.valueOf() + dayLen);

        // Run summary from config
        Misc.log(`Data summary for ${timeFrom.toISOString().substr(0,10)} started.`, summaryDB, `SUMMARY`, `I`);

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
                    Misc.log(`Added into [${game.coll.group + game.coll.postfix}] collection.`, game.name.en, `SUMMARY`, `I`);
                    Misc.log(` • D-${res.deletedCount} • I-${res.insertedCount} • M-${res.matchedCount} • U-${res.upsertedCount}`, game.name.en, `SUMMARY`, `I`);
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
                    Misc.log(`- Inserted new summary record for ${doc.key.currency}`, game.name.en, `SUMMARY`, `I`);
                } else if (res.modifiedCount > 0) {
                    Misc.log(`- Modified summary record for ${doc.key.currency}`, game.name.en, `SUMMARY`, `I`);
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
                        Misc.log(`- Deleted summary record for ${_doc.currency}`, game.name.en, `SUMMARY`, `I`);
                    } else {
                        Misc.log(`- No summary record deleted for ${_doc.currency}`, game.name.en, `SUMMARY`, `W`);
                    }
                } catch (e) {
                    Misc.log(`- Something is WRONG while deleting summary record for ${doc}`, game.name.en, `SUMMARY`, `W`);
                }
            })
            Misc.log(`Done summarize data in ${(new Date()).valueOf() - time.valueOf()} ms`, game.name.en, `SUMMARY`, `I`);
        });
        Misc.log(`Data summary for ${timeFrom.toISOString().substr(0,10)} finished.`, summaryDB, `SUMMARY`, `I`);
    };

    // Saba.runArchive()
    const runArchiveFunc = (mongoFrom, mongoTo, config) => {
        if (!(mongoFrom instanceof Mongo)) {
            Misc.log(`[mongoFrom] must be a MongoDB connection.`, `Audit`, `ARCHIVE`, `E`);
            return;
        }
        if (!(mongoTo instanceof Mongo)) {
            Misc.log(`[mongoTo] must be a MongoDB connection.`, `Audit`, `ARCHIVE`, `E`);
            return;
        }
        if (!(config instanceof DBCollection)) {
            Misc.log(`[config] must be a collection.`, `Audit`, `ARCHIVE`, `E`);
            return;
        }

        // The schema of config document
        const configSchema = {
            from: {db: "string", coll: "string"}
        ,   to: {db: "string", coll: "string"}
        ,   config: {timeField: "string", cutOffsetHours: "number", join: "string"}
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
                });
            });

            // Run archive
            Archive.archiveByTimes(dbFrom[item.from.coll], dbTo[item.to.coll], arcOpts, childOpts);
        });
    };

    // Saba.removeData()
    const removeDataFunc = (fromDB, toDB, collName, filter, debug = 1) => {
        // Parameters' type verification
        if (!(fromDB instanceof DB)) {
            Misc.log(`[fromDB] must be a database`, `Audit`, `REMOVE`, `E`);
            return;
        }
        if (!(toDB instanceof DB)) {
            Misc.log(`[toDB] must be a database`, `Audit`, `REMOVE`, `E`);
            return;
        }
        if (typeof collName != "string") {
            Misc.log(`[group] must be a string`, `Audit`, `REMOVE`, `E`);
            return;
        }
        if (typeof filter != "object") {
            Misc.log(`[filter] must be a object`, `Audit`, `REMOVE`, `E`);
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
            Misc.log(`Cannot remove data because [${fromDB._name}.${coll.name}] does NOT exist`, collName, `REMOVE`, `E`);
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
            Misc.log(`Cannot remove data because [${fromDB._name}.${coll.name}] has NO documents matching with the filter`, collName, `REMOVE`, `E`);
        } else {
            if (debug === 0) {
                try {
                    toDB[collRM.name].insertMany(docs, {ordered: false});
                    fromDB[coll.name].bulkWrite(bulkUpdatePipe, {ordered : false});
                    Misc.log(`Removed ${docs.length} documents`, collName, `REMOVE`, `I`);
                } catch (e) {
                    Misc.log(e.message, collName, e.name, `E`);
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
        if (!(mongo instanceof Mongo)) {
            Misc.log(`Must be connected to Mongo instance to run this function.`, `Audit`, `IMPORT-SPINS`, `E`);
            return;
        }
        if (typeof file != "string" && !pathExists(file)) {
            Misc.log(`Filepath [${file}] does NOT exist.`, `Audit`, `IMPORT-SPINS`, `E`);
            return;
        }
        if (typeof roundField != "string") {
            Misc.log(`Round field's name [${roundField}] MUST be a string.`, `Audit`, `IMPORT-SPINS`, `E`);
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
            Misc.log(`CSV's schema does NOT have correct format.`, `Audit`, `IMPORT-SPINS`, `E`);
            return;
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
            Misc.log(`The file [${file}] contains incorrect number of rounds = [${round.length}]. Must have only 1.`, `Audit`, `IMPORT-SPINS`, `E`);
            return;
        }

        // Variable
        let res = {};

        // Verify current data with database
        {   let err = 0;

            // If there are key in the database, the file may have been imported before, need to check manually
            if (mongo.getDB(`minigame`).spin_logs.findOne({key: key})) {
                Misc.log(`The file [${file}] may have been imported with key [${key}]`, `Audit`, `IMPORT-SPINS`, `E`);
                err |= 1;
            }

            // If there are roundId in the database, the round has been imported before, need to check manually
            if (mongo.getDB(`minigame`).spin_logs.findOne({roundId: round[0]})) {
                Misc.log(`The round [${round[0]}] has already been imported`, `Audit`, `IMPORT-SPINS`, `E`);
                err |= 2;
            }

            if (!force && err) {
                return;
            }
        }

        Misc.log(`The round [${round[0]}] in file [${file}] will be imported with key [${key}]`, `Audit`, `IMPORT-SPINS`, `I`);
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
                Misc.log(`${tojsononeline(data)}`, `Invalid Data`, `IMPORT-SPINS`, `W`);
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
                Misc.log(`Spins for member [${doc.memberId}] are expired.`, `Add Spins`, `IMPORT-SPINS`, `W`);
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
            Misc.log(`Spins of ${rollbackMembers.length} members are rolled-back.`, `Add Spins`, `IMPORT-SPINS`, `W`);
        }

        // Add data to spin_logs
        res = mongo.getDB(`minigame`).spin_logs.insertMany(fileData, {ordered: false});

        // Update spins
        try {
            res = mongo.getDB(`minigame`).spins.bulkWrite(bulkWritePipe, {ordered: false});
            Misc.log(`Successfully imported ${res.insertedCount + res.upsertedCount + res.matchedCount} / ${dataLength} spins.`, `Add Spins`, `IMPORT-SPINS`, `I`);
        } catch (e) {
            printjson(e);
        }

        // Correct if have rollback
        if (force && rollbackMembers.length > 0) {
            res = mongo.getDB(`minigame`).spins.updateMany({$or: rollbackMembers, availSpins: {$lt: 0}}, [{$set: {availSpins: 0}}]);
            Misc.log(`${res.matchedCount} members have negative spins. Corrected ${res.modifiedCount} members.`, `Add Spins`, `IMPORT-SPINS`, `I`);
        }
    };

    // Saba.Spins.expireSpins()
    const expireSpinsFunc = (mongo) => {
        if (!(mongo instanceof Mongo)) {
            Misc.log(`Must be connected to Mongo instance to run this function.`, `Audit`, `EXPIRE-SPINS`, `E`);
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
            Misc.log(`No members have expired spins.`, `${checkTime.toISOString()}`, `EXPIRE-SPINS`, `I`);
            return;
        }
        Misc.log(`${checkTime.toISOString()}`, `Check Time`, `EXPIRE-SPINS`, `I`);
        Misc.log(`${expiredMembers.length} members have expired spins`, `Check Spins`, `EXPIRE-SPINS`, `I`);

        // Check for expired spins and take action
        const spinsUpdatePipe = [];
        const spinLogsExpirePipe = [];
        const rankLen = String(expiredMembers.length).length;
        expiredMembers.forEach((doc, indexD) => {
            Misc.log(` • ${((" ").repeat(rankLen) + (indexD + 1)).slice(-rankLen)}/${expiredMembers.length}`, `${((" ").repeat(10) + doc._id).slice(-10)}`, `EXPIRE-SPINS`, `I`);
            Misc.log(`   Spins will be corrected [${doc.availSpins}] => [${doc.currentSpins}]`, `${((" ").repeat(10) + doc._id).slice(-10)}`, `EXPIRE-SPINS`, `I`);
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
                const lastLogExpiry = lastLog ? mongo.getDB(`minigame`).spin_logs.findOne({roundId: -lastLog.roundId, memberId: doc._id}) : null;

                // A round cannot be expired twice, or a spin cannot missing associated log.
                // So if these cases happen, we need to revoke the invalid spins.
                if (!lastLog || lastLogExpiry) {
                    Misc.log(`   Cannot find any spin logs that match this expiration. Spins contamination suspected. ${expireSpins} spins will be discarded.`, `${((" ").repeat(10) + doc._id).slice(-10)}`, `EXPIRE-SPINS`, `W`);
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
                Misc.log(`   ${expireSpins} spins in round [${lastLog.roundId || '_'}] are expired.`, `${((" ").repeat(10) + doc._id).slice(-10)}`, `EXPIRE-SPINS`, `I`);

                // If there still are expired spins, check the next closed log in spin_logs, else we're done for this member.
                expireSpins -= lastLog.spinCnt;
                lastTime = lastLog.expiryDate;
            }

            Misc.log(``, `${(" ").repeat(10)}`, `EXPIRE-SPINS`, `E`);
        });

        // All preparation are done, let's do it
        try {
            // Update the spins first
            mongo.getDB(`minigame`).spins.bulkWrite(spinsUpdatePipe, {ordered: false});
        } catch (e) {
            const err = e.getWriteErrors();
            err.forEach((_e) => {
                Misc.log(`   ${_e.errmsg}`, `Update Spins`, `EXPIRE-SPINS`, `E`);
            });
        }
        try {
            // Then write expire|invalid log
            mongo.getDB(`minigame`).spin_logs.bulkWrite(spinLogsExpirePipe, {ordered: false});
        } catch (e) {
            const err = e.getWriteErrors();
            err.forEach((_e) => {
                Misc.log(`   ${_e.errmsg}`, `Insert Spin Logs`, `EXPIRE-SPINS`, `E`);
            });
        }
        Misc.log(`${('=').repeat(100)}`, ``, `EXPIRE-SPINS`, `I`);
    };

    // Saba
    db.getSiblingDB(`script`).system.js.save({
        _id: `Saba`
    ,   value:  new Code(`{
            summarizeDaily: ${summarizeDailyFunc.toString()}
        ,   runArchive: ${runArchiveFunc.toString()}
        ,   removeData: ${removeDataFunc.toString()}
        ,   env: ${envFunc.toString()}
        ,   Spins: {
                importSpins: ${importSpinsFunc.toString()}
            ,   expireSpins: ${expireSpinsFunc.toString()}
            }
        }`)
    ,   version: 2.4
    ,   name: `SabaClub`
    });

    // Reload scripts
    db.getSiblingDB(`script`).loadServerScripts();
}
