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

        let dayLen = 24 * 3600 * 1000;
        if (summaryDay == null || typeof(summaryDay) == "undefined")
            summaryDay = new Date(Date.now() - dayLen);

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
        if (!bypassExpired && (new Date(Math.floor(Date.now() / dayLen) * dayLen)) - summaryDay.valueOf() > 7 * dayLen) {
            log(`The [summaryDay] is expired. Cannot run data summary for this day.`, 'Audit', 'SUMMARY', 'E');
            return;
        }
        if ((new Date(Math.floor(Date.now() / dayLen) * dayLen)) - summaryDay.valueOf() <= 0) {
            log(`The [summaryDay] is not finished. Cannot run data summary for this day.`, 'Audit', 'SUMMARY', 'E');
            return;
        }

        // Initialize time frame for data summary
        let timeFrom = new Date(Math.floor(summaryDay.valueOf() / dayLen) * dayLen);
        let timeTo = new Date(timeFrom.valueOf() + dayLen);

        // Run summary from config
        log(`Data summary for ${timeFrom.toISOString().substr(0,10)} started.`, summaryDB, 'SUMMARY', 'I');

        mongo.getDB(summaryDB).game_summary_config.find().forEach((game) => {
            let agg = [];

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

            let time = new Date();

            let oldSummaries = [];
            mongo.getDB(summaryDB).daily_summaries.find(
                {time: timeFrom, gameId: game.gameId},
                {_id: 0, time: 1, gameId: 1, currency: 1}
            ).forEach((doc) => {
                let _doc = {};
                Object.keys(doc).sort().forEach((k) => {
                    _doc[k] = doc[k];
                });
                oldSummaries.push(tojson(_doc));
            });

            let summaries = mongo.getDB(game.coll.db)[game.coll.group + game.coll.round].aggregate(agg).toArray();
            summaries.forEach((doc) => {
                let res = mongo.getDB(summaryDB).daily_summaries.updateOne(doc.key, {$set: doc.value}, {upsert: true});
                if (res.upsertedId)
                    log(`- Inserted new summary record for ${doc.key.currency}`, game.name.en, 'SUMMARY', 'I');
                else if (res.modifiedCount > 0)
                    log(`- Modified summary record for ${doc.key.currency}`, game.name.en, 'SUMMARY', 'I');

                let _doc = {};
                Object.keys(doc.key).sort().forEach((k) => {
                    _doc[k] = doc.key[k];
                });
                let idx = oldSummaries.indexOf(tojson(_doc));
                if (idx >= 0)
                    oldSummaries.splice(idx, 1);
            });
            oldSummaries.forEach((doc) => {
                let _doc;
                eval(`_doc = ${doc}`);
                let res = mongo.getDB(summaryDB).daily_summaries.deleteOne(_doc);
                if (res.deletedCount > 0)
                    log(`- Deleted summary record for ${doc.currency}`, game.name.en, 'SUMMARY', 'I');
                else
                    log(`- Something is WRONG while deleting summary record for ${doc.currency}`, game.name.en, 'SUMMARY', 'W');
            })
            log(`Done summarize data in ${(new Date()).valueOf() - time.valueOf()} ms`, game.name.en, 'SUMMARY', 'I');
        });
        log(`Data summary for ${timeFrom.toISOString().substr(0,10)} finished.`, summaryDB, 'SUMMARY', 'I');
    }
,   version: 1.4
,   process: 'Daily Summary'
}); dbs.script.loadServerScripts();
