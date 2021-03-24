{
    const Summary = class {
        constructor (mongo, summaryDB) {
            this.logger = new Shell.Log(`SUMMARY`);
            this.assert = new Shell.Assert();
            this.assert.setLogger(this.logger);

            this.assert.setTitle(`Audit`);
            this.assert.try(
                `[mongo] must be a MongoDB connection.`
            ,   mongo instanceof Mongo
            );
            this.assert.try(
                `[summaryDB] must be a string.`
            ,   typeof summaryDB == "string"
            );
            if (this.assert.hasError()) {
                return;
            }

            const _toString = () => {
                return `[SabaClub.Summary] Running on [${summaryDB}] of ${mongo.host}`;
            };
            const _getRoundDuration = (round) => {
                let roundDuration = 1000;

                if (String.toLowerCase(round) == 'day') {
                    roundDuration = 24 * 3600 * 1000;
                };
                if (String.toLowerCase(round) == 'hour') {
                    roundDuration = 3600 * 1000;
                };

                return roundDuration;
            };
            const _getTime = (time, round) => {
                let _time = Date.now();
                const _roundDuration = _getRoundDuration(round);

                if (time instanceof Date) {
                    _time = time.valueOf();
                };
                if (typeof time == "number") {
                    _time = time;
                }
                else {
                    _time = Date.parse(time);
                };

                return _time ? new Date(Math.floor(_time / _roundDuration) * _roundDuration) : null;
            };
            const _getTimeStr = (time, round) => {
                if (String.toLowerCase(round) == 'day') {
                    return time.toISOString().substr(0,10);
                };
                if (String.toLowerCase(round) == 'hour') {
                    return `${time.toISOString().substr(0,10)} ${time.toISOString().substr(11,8)}`;
                };
            };
            const _getSummaryColl = (round) => {
                let coll = `summaries`;

                if (String.toLowerCase(round) == 'day') {
                    coll = `daily_summaries`;
                };
                if (String.toLowerCase(round) == 'hour') {
                    coll = `hourly_summaries`;
                };

                return coll;
            };
            const _checkSummaryTime = (time, round) => {
                const _time = _getTime(time, round);
                this.assert.setTitle(`Summary Time`);
                if (this.assert.try(
                    `[${tojsononeline(time)}] is not a valid time.`
                ,   _time instanceof Date
                )) {
                    return false;
                }
                this.assert.try(
                    `[${_getTimeStr(time, round)}] is not valid. It's either expired or not finished.`
                ,   _getTime(time, round).valueOf() >= _getTime(Date.now(), 'DAY').valueOf() - 7 * _getRoundDuration('DAY')
                ,   _getTime(time, round).valueOf() <  _getTime(Date.now(), round).valueOf()
                );
                return !this.assert.hasError();
            };
            const _buildSummaryAgg = (time, round, conf) => {
                const _roundDuration = _getRoundDuration(round);
                const _from = _getTime(time, round);
                const _to = _getTime(_from.valueOf() + _roundDuration, round);
                const agg = [];

                let tmpArr, tmpObj;

                tmpArr = [];
                (tmpObj = {})[conf.fields.time.replace('$', '')] = {$gte: _from};
                tmpArr.push(tmpObj);
                (tmpObj = {})[conf.fields.time.replace('$', '')] = {$lt: _to};
                tmpArr.push(tmpObj);
                agg.push({$match: {$and: tmpArr}});

                agg.push({$project: {_id: 0, id: 1}});
                agg.push({$lookup: {
                    from: conf.coll.group + conf.coll.postfix
                ,   localField: `id`
                ,   foreignField: conf.fields.map
                ,   as: `bets`
                }});
                agg.push({$unwind: `$bets`});
                agg.push({$replaceWith: `$bets`});

                tmpArr = [];
                tmpArr.push({memberId: {$gt: 0}});
                (tmpObj = {})[conf.fields.settled.replace('$', '')] = true;
                tmpArr.push(tmpObj);
                agg.push({$match: {$and: tmpArr}});

                agg.push({$project: {
                    _id: 0
                ,   stake: {$sum: conf.fields.stake}
                ,   payout: {$sum: conf.fields.payout}
                ,   '__archive.currency': 1
                }});
                agg.push({$group: {
                    _id: `$__archive.currency`
                ,   stake: {$sum: `$stake`}
                ,   payout: {$sum: `$payout`}
                ,   tickets: {$sum: 1}
                }});
                agg.push({$project: {
                    _id: 0,
                    'key.time': {$literal: _from}, 'key.gameId': {$literal: conf.gameId}, 'key.currency': `$_id`,
                    'value.stake': `$stake`, 'value.payout': `$payout`, 'value.tickets': `$tickets`
                }});

                return agg;
            };
            const _insertCurrency = (conf) => {
                const timer = new Tool.Timer();
                const uids = [];
                mongo.getDB(conf.coll.db)[`${conf.coll.group}${conf.coll.postfix}`].aggregate([
                    {$match: {'__archive.currency': {$exists: false}, memberId: {$gt: 0}}}
                ,   {$project: {_id: 0, uid: 1}}
                ,   {$group: {_id: `$uid`}}
                ]).forEach(doc => {
                    uids.push(doc._id);
                });

                const updCurrencyPipe = [];
                mongo.getDB(conf.coll.db).userinfos.find({id: {$in: uids}}, {_id: 0, id: 1, currency: 1}).forEach(doc => {
                    updCurrencyPipe.push({updateMany: {
                        filter: {uid: doc.id, '__archive.currency': {$exists: false}}
                    ,   update: [
                            {$set: {'__archive.currency': {$literal: doc.currency}}}
                        ]
                    }});
                });
                const res = mongo.getDB(conf.coll.db)[`${conf.coll.group}${conf.coll.postfix}`].bulkWrite(updCurrencyPipe, {ordered: false});

                if (res.deletedCount + res.insertedCount + res.matchedCount + res.upsertedCount > 0) {
                    this.logger.info(`${conf.name.en} Insert Currency`, `Added into [${conf.coll.group + conf.coll.postfix}] collection in ${timer.getTimerDuration()} ms.`);
                    this.logger.info(`${conf.name.en} Insert Currency`, ` • D-${res.deletedCount} • I-${res.insertedCount} • M-${res.matchedCount} • U-${res.upsertedCount}`);
                }
            };
            const _getOldSummary = (time, round, conf) => {
                const summaries = [];
                const coll = _getSummaryColl(round);
                mongo.getDB(summaryDB)[coll].find(
                    {time: time, gameId: conf.gameId}
                ,   {_id: 0, time: 1, gameId: 1, currency: 1}
                ).forEach(doc => {
                    const _doc = {};
                    Object.keys(doc).sort().forEach((k) => {
                        _doc[k] = doc[k];
                    });
                    summaries.push(tojson(_doc));
                });

                return summaries;
            };
            const _runConfSummary = (time, round, conf) => {
                const _time = _getTime(time, round);
                const timer = new Tool.Timer();
                const coll = _getSummaryColl(round);

                if (!_checkSummaryTime(_time, round)) {
                    return;
                }

                // If tickets do not have currency field, insert currency for them
                if (!conf.config.hasCurrency) {
                    _insertCurrency(conf);
                }

                timer.register(`start`);
                const agg = _buildSummaryAgg(_time, round, conf);
                timer.register(`agg`);
                const oldSums = _getOldSummary(_time, round, conf);
                timer.register(`oldSums`);
                // this.logger.info(conf.name.en, `Got old summaries in ${timer.getDifferent(`agg`, `oldSums`)} ms.`);
                const summaries = mongo.getDB(conf.coll.db)[conf.coll.group + conf.coll.round].aggregate(agg).toArray();
                timer.register(`summaries`);
                // this.logger.info(conf.name.en, `Calculated summaries in ${timer.getDifferent(`oldSums`, `summaries`)} ms.`);

                summaries.forEach(doc => {
                    const res = mongo.getDB(summaryDB)[coll].updateOne(doc.key, {$set: doc.value}, {upsert: true});
                    if (res.upsertedId) {
                        this.logger.info(conf.name.en, `- Inserted new summary record for ${doc.key.currency}`);
                    } else if (res.modifiedCount > 0) {
                        this.logger.info(conf.name.en, `- Modified summary record for ${doc.key.currency}`);
                    }

                    const _doc = {};
                    Object.keys(doc.key).sort().forEach((k) => {
                        _doc[k] = doc.key[k];
                    });
                    const idx = oldSums.indexOf(tojson(_doc));
                    if (idx >= 0) {
                        oldSums.splice(idx, 1);
                    }
                });

                oldSums.forEach(doc => {
                    try {
                        let _doc = null;
                        eval(`_doc = ${doc}`);
                        if (typeof _doc != "object") {
                            _doc = null;
                        }
                        const res = mongo.getDB(summaryDB)[coll].deleteOne(_doc);
                        if (res.deletedCount > 0) {
                            this.logger.warn(conf.name.en, `- Deleted summary record for ${_doc.currency}`);
                        } else {
                            this.logger.info(conf.name.en, `- No summary record deleted for ${_doc.currency}`);
                        }
                    } catch (e) {
                        this.logger.err(conf.name.en, `- Something is WRONG while deleting summary record for ${doc}`);
                    }
                })
                this.logger.info(conf.name.en, `Done summarize data in ${timer.getTimerDuration()} ms`);
            };
            const _runSummary = (time, round) => {
                const _time = _getTime(time, round);
                this.logger.info(summaryDB, `Summary for ${_getTimeStr(time, round)} started.`);
                mongo.getDB(summaryDB).game_summary_config.find().forEach(conf => _runConfSummary(_time, round, conf));
                this.logger.info(summaryDB, `Data summary for ${_getTimeStr(time, round)} finished.`);
            };
            const _runDailySummary = (time) => {
                return _runSummary(time, 'DAY');
            };
            const _runHourlySummary = (time) => {
                return _runSummary(time, 'HOUR');
            };

            Object.defineProperties(this, {
                toString        : {value: function () { return _toString() }}
            ,   tojson          : {value: function () { return _toString() }}
            ,   runDailySummary : {value: function (time) { return _runDailySummary(time) }}
            ,   runHourlySummary: {value: function (time) { return _runHourlySummary(time) }}
            });
        }
    };
    const SummaryExt = {};

    // SabaClub class
    db.getSiblingDB('script').system.js.save({
        _id: `SabaClub`
    ,   value: new Code(`(() => {
            const cSummary = Object.extend(${tojson(Summary)}, ${tojson(SummaryExt)});
            const _toStr = function () {return this.constructor.name};

            return {
                Summary: Object.defineProperties(cSummary, {toString: {value: _toStr}, tojson: {value: _toStr}})
            }
        })()`)
    ,   version: `1.0.0`
    });

    // Reload library
    db.getSiblingDB('script').loadServerScripts();
}
