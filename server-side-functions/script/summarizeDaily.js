dbs.script.system.js.save({
    _id: 'summarizeDaily'
,   value: (mongo, summaryDay, bypassExpired = false, summaryDB = 'summary') => {
        if (!mongo) {
            log(`Must be connected to Mongo instance to run this function.`, 'Audit', 'SUMMARY', 'E');
            return;
        }
        if (!summaryDB) {
            log(`Must specify the summary DB.`, 'Audit', 'SUMMARY', 'E');
            return;
        }

        const dayLen = 24 * 3600 * 1000;
        if (summaryDay == null || typeof(summaryDay) == "undefined") {
            summaryDay = new Date(Date.now() - dayLen);
        }

        // Parameters' type verification
        if (!(mongo instanceof Mongo)) {
            log(`[mongo] must be a MongoDB connection.`, 'Audit', 'SUMMARY', 'E');
            return;
        }
        if (typeof(summaryDay) == 'string' && Date.parse(summaryDay)) {
            summaryDay = new Date(Date.parse(summaryDay));
        }
        if (!(summaryDay instanceof Date)) {
            log(`[summaryDay] must be a date.`, 'Audit', 'SUMMARY', 'E');
            return;
        }
        if (typeof(summaryDB) != 'string') {
            log(`[summaryDB] must be a string.`, 'Audit', 'SUMMARY', 'E');
            return;
        }
        if (!bypassExpired && (Math.floor(Date.now() / dayLen) * dayLen - summaryDay.valueOf() > 7 * dayLen)) {
            log(`The [summaryDay] is expired. Cannot run data summary for this day.`, 'Audit', 'SUMMARY', 'E');
            return;
        }
        if (Math.floor(Date.now() / dayLen) * dayLen - summaryDay.valueOf() <= 0) {
            log(`The [summaryDay] is not finished. Cannot run data summary for this day.`, 'Audit', 'SUMMARY', 'E');
            return;
        }

        // Initialize time frame for data summary
        const timeFrom = new Date(Math.floor(summaryDay.valueOf() / dayLen) * dayLen);
        const timeTo = new Date(timeFrom.valueOf() + dayLen);

        // Run summary from config
        log(`Data summary for ${timeFrom.toISOString().substr(0,10)} started.`, summaryDB, 'SUMMARY', 'I');

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
            if (game.config.hasCurrency) {
                agg.push({$project: {_id: 0, stake: {$sum: game.fields.stake}, payout: {$sum: game.fields.payout}, currency: 1}});
                agg.push({$group: {_id: '$currency', stake: {$sum: '$stake'}, payout: {$sum: '$payout'}, tickets: {$sum: 1}}});
            }
            else {
                agg.push({$project: {_id: 0, stake: {$sum: game.fields.stake}, payout: {$sum: game.fields.payout}, uid: 1}});
                agg.push({$lookup: {
                    from: 'userinfos',
                    localField: 'uid',
                    foreignField: 'id',
                    as: 'usr'
                }});
                agg.push({$unwind: '$usr'});
                agg.push({$group: {_id: '$usr.currency', stake: {$sum: '$stake'}, payout: {$sum: '$payout'}, tickets: {$sum: 1}}});
            }
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
                    log(`- Inserted new summary record for ${doc.key.currency}`, game.name.en, 'SUMMARY', 'I');
                } else if (res.modifiedCount > 0) {
                    log(`- Modified summary record for ${doc.key.currency}`, game.name.en, 'SUMMARY', 'I');
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
                    if (typeof(_doc) != "object") {
                        _doc = null;
                    }
                    const res = mongo.getDB(summaryDB).daily_summaries.deleteOne(_doc);
                    if (res.deletedCount > 0) {
                        log(`- Deleted summary record for ${doc.currency}`, game.name.en, 'SUMMARY', 'I');
                    } else {
                        log(`- No summary record deleted for ${doc.currency}`, game.name.en, 'SUMMARY', 'W');
                    }
                } catch (e) {
                    log(`- Something is WRONG while deleting summary record for ${doc.currency}`, game.name.en, 'SUMMARY', 'W');
                }
            })
            log(`Done summarize data in ${(new Date()).valueOf() - time.valueOf()} ms`, game.name.en, 'SUMMARY', 'I');
        });
        log(`Data summary for ${timeFrom.toISOString().substr(0,10)} finished.`, summaryDB, 'SUMMARY', 'I');
    }
,   version: 1.5
,   process: 'Daily Summary'
});
dbs.script.loadServerScripts();
