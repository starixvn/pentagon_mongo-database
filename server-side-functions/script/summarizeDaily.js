db.getSiblingDB('script').system.js.save({
    _id: 'summarizeDaily'
,   value: (summaryDay) => {
        if (db == null || typeof(db) == "undefined") {
            log('Must be connected to Mongo instance to run this function.', 'Audit', 'SUMMARY', 'E');
            return;
        }

        let dayLen = 24 * 3600 * 1000;
        if (summaryDay == null || typeof(summaryDay) == "undefined")
            summaryDay = new Date(Date.now() - dayLen);

        // Parameters' type verification
        if (!(db instanceof DB)) {
            log('[db] must be a database', 'Audit', 'SUMMARY', 'E');
            return;
        }
        if (typeof summaryDay == 'string' && Date.parse(summaryDay)) {
            summaryDay = new Date(Date.parse(summaryDay));
        }
        if (!(summaryDay instanceof Date)) {
            log('[summaryDay] must be a date', 'Audit', 'SUMMARY', 'E');
            return;
        }
        if ((new Date(Math.floor(Date.now() / dayLen) * dayLen)) - summaryDay.valueOf() > 7 * 24 * 3600 * 1000) {
            log('The [summaryDay] is expired. Cannot run data summary for this day.', 'Audit', 'SUMMARY', 'E');
            return;
        }
        if ((new Date(Math.floor(Date.now() / dayLen) * dayLen)) - summaryDay.valueOf() <= 0) {
            log('The [summaryDay] is not finished. Cannot run data summary for this day.', 'Audit', 'SUMMARY', 'E');
            return;
        }

        // Initialize time frame for data summary
        let timeFrom = new Date(Math.floor(summaryDay.valueOf() / dayLen) * dayLen);
        let timeTo = new Date(timeFrom.valueOf() + dayLen);

        // Run summary from config
        log('Data summary started.', timeFrom.toISOString().substr(0,10), 'SUMMARY', 'I');

        db.getSiblingDB('summary').game_summary_config.find().forEach((game) => {
            let agg = [];

            agg[ 0] = {$match: {$and: [{time: {$gte: timeFrom}}, {time: {$lt: timeTo}}]}};
            agg[ 1] = {$project: {_id: 0, id: 1}};
            agg[ 2] = {$lookup: {
                from: game.coll.group + game.coll.postfix,
                localField: 'id',
                foreignField: 'phien',
                as: 'bets'
            }};
            agg[ 3] = {$unwind: '$bets'};
            agg[ 4] = {$replaceWith: '$bets'};
            agg[ 5] = {$match: {$expr: {$and: [{$gt: ['$memberId', 0]}, {$eq: ['$thanhtoan', true]}]}}};
            agg[ 6] = {$project: {_id: 0, stake: {$sum: game.fields.stake}, payout: {$sum: game.fields.payout}, uid: 1}};
            agg[ 7] = {$lookup: {
                from: 'userinfos',
                localField: 'uid',
                foreignField: 'id',
                as: 'usr'
            }};
            agg[ 8] = {$unwind: '$usr'};
            agg[ 9] = {$group: {_id: '$usr.currency', stake: {$sum: '$stake'}, payout: {$sum: '$payout'}, tickets: {$sum: 1}}};
            agg[10] = {$project: {
                _id: 0,
                'key.time': {$literal: timeFrom}, 'key.gameId': {$literal: game.gameId}, 'key.currency': '$_id',
                'value.stake': '$stake', 'value.payout': '$payout', 'value.tickets': '$tickets'
            }};

            let time = new Date();
            let summaries = db.getSiblingDB(game.coll.db)[game.coll.group + game.coll.round].aggregate(agg).toArray();
            summaries.forEach((doc) => {
                let res = db.getSiblingDB('summary').daily_summaries.updateOne(doc.key, {$set: doc.value}, {upsert: true});
                if (res.upsertedId)
                    log('- Inserted new summary record for ' + doc.key.currency, game.name.en, 'SUMMARY', 'I');
                else if (res.modifiedCount > 0)
                    log('- Modified summary record for ' + doc.key.currency, game.name.en, 'SUMMARY', 'I');
            });
            log('Done summarize data in ' + ((new Date()).valueOf() - time.valueOf()) + ' ms', game.name.en, 'SUMMARY', 'I');
        });
        log('Data summary finished.', timeFrom.toISOString().substr(0,10), 'SUMMARY', 'I');
    }
,   version: 1.1
}); db.getSiblingDB('script').loadServerScripts();
