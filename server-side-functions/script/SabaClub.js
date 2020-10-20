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
                localField: 'id',
                foreignField: game.fields.map,
                as: 'bets'
            }});
            agg.push({$unwind: '$bets'});
            agg.push({$replaceWith: '$bets'});
            agg.push({$match: {$expr: {$and: [{$gt: ['$memberId', 0]}, {$eq: [game.fields.settled, true]}]}}});

            // Add currency to document if not exists
            if (!game.config.hasCurrency) {
                agg.push({$project: {_id: 0, uid: 1}});

                const uids = [];
                mongo.getDB(game.coll.db)[game.coll.group + game.coll.round].aggregate(agg).forEach(doc => {
                    uids.push(doc.uid);
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

                agg.pop();
                if (res.deletedCount + res.insertedCount + res.matchedCount + res.upsertedCount > 0) {
                    Misc.log(`Added into [${game.coll.group + game.coll.postfix}] collection.`, game.name.en, `SUMMARY`, `I`);
                    Misc.log(` • D-${res.deletedCount} • I-${res.insertedCount} • M-${res.matchedCount} • U-${res.upsertedCount}`, game.name.en, `SUMMARY`, `I`);
                }
            }

            agg.push({$project: {_id: 0, stake: {$sum: game.fields.stake}, payout: {$sum: game.fields.payout}, '__archive.currency': 1}});
            agg.push({$group: {_id: '$__archive.currency', stake: {$sum: '$stake'}, payout: {$sum: '$payout'}, tickets: {$sum: 1}}});
            agg.push({$project: {
                _id: 0,
                'key.time': {$literal: timeFrom}, 'key.gameId': {$literal: game.gameId}, 'key.currency': '$_id',
                'value.stake': '$stake', 'value.payout': '$payout', 'value.tickets': '$tickets'
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
    }

    // Saba.removeData()
    const removeDataFunc = (fromDB, toDB, collName, filter, debug = 1) => {
        // Parameters' type verification
        if (!(fromDB instanceof DB)) {
            Misc.log('[fromDB] must be a database', `Audit`, `REMOVE`, `E`);
            return;
        }
        if (!(toDB instanceof DB)) {
            Misc.log('[toDB] must be a database', `Audit`, `REMOVE`, `E`);
            return;
        }
        if (typeof collName != "string") {
            Misc.log('[group] must be a string', `Audit`, `REMOVE`, `E`);
            return;
        }
        if (typeof filter != "object") {
            Misc.log('[filter] must be a object', `Audit`, `REMOVE`, `E`);
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
    }

    // Saba
    db.getSiblingDB('script').system.js.save({
        _id: 'Saba'
    ,   value:  new Code(`{
            summarizeDaily: ${summarizeDailyFunc.toString()}
        ,   runArchive: ${runArchiveFunc.toString()}
        ,   removeData: ${removeDataFunc.toString()}
        ,   env: ${envFunc.toString()}
        }`)
    ,   version: 2.2
    ,   name: 'SabaClub'
    });

    // Reload scripts
    db.getSiblingDB('script').loadServerScripts();
}

