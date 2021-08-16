{
  const $Summary = function (mongo, summaryDB) {
    /** Self construct */
    if (!(this instanceof $Summary)) return new $Summary(mongo, summaryDB);

    /** Private constant */
    const dbs = $DBs(mongo);
    const _logger = $Log(`SUMMARY`);
    const _assert = $Assert();
    _assert.setLogger(_logger);

    _assert.setTitle(`Audit`);
    _assert.try(
      `[mongo] must be a MongoDB reference.`,
      dbs._mongo instanceof Mongo,
    );
    _assert.try(
      `[summaryDB] must be a string.`,
      typeof summaryDB == "string",
    );
    if (_assert.hasError()) return null;

    /** Basic function */
    const _toString = () => {
      return `[$Summary] Running on [${summaryDB}] of ${dbs._mongo.host}`;
    };

    /** Private function */
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
    const _parseEpoch = (time) => {
      let _time = Date.now();
      if (time instanceof Date) {
        _time = time.valueOf();
      }
      if (typeof time == "number") {
        _time = time;
      } else {
        _time = Date.parse(time);
      }
      return _time;
    };
    const _getRoundedTime = (time, round) => {
      const _time = _parseEpoch(time);
      const _roundDuration = _getRoundDuration(round);
      return new Date(Math.floor(_time / _roundDuration) * _roundDuration);
    };
    const _getTimeStr = (time, round) => {
      const _time = _getRoundedTime(time, round);
      let _str = _time.toString();
      if (String.toLowerCase(round) == 'day') {
        _str = _time.toISOString().substr(0,10);
      };
      if (String.toLowerCase(round) == 'hour') {
        _str = `${_time.toISOString().substr(0,10)} ${_time.toISOString().substr(11,8)}`;
      };
      return _str;
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
      const _time = _getRoundedTime(time, round);
      _assert.setTitle(`Summary Time`);
      if (_assert.try(
        `[${tojsononeline(time)}] is not a valid time.`,
        _time instanceof Date,
      )) {
        return false;
      }
      _assert.try(
        `[${_getTimeStr(time, round)}] is not valid. It's either expired or not finished.`,
        _getRoundedTime(time, round).valueOf() >= _getRoundedTime(Date.now(), 'DAY').valueOf() - 7 * _getRoundDuration('DAY'),
        _getRoundedTime(time, round).valueOf() <  _getRoundedTime(Date.now(), round).valueOf(),
      );
      return !_assert.hasError();
    };
    const _buildSummaryAgg = (time, round, conf) => {
      const _roundDuration = _getRoundDuration(round);
      const _from = _getRoundedTime(time, round);
      const _to = _getRoundedTime(_from.valueOf() + _roundDuration, round);
      const agg = [];

      agg.push({$match: {$and: [
        {[conf.fields.time.replace('$', '')]: {$gte: _from}},
        {[conf.fields.time.replace('$', '')]: {$lt: _to}},
      ]}});
      agg.push({$project: {_id: 0, id: 1}});
      agg.push({$lookup: {
        from: conf.coll.group + conf.coll.postfix,
        localField: `id`,
        foreignField: conf.fields.map,
        as: `bets`,
      }});
      agg.push({$unwind: `$bets`});
      agg.push({$replaceWith: `$bets`});
      agg.push({$match: {$and: [
        {memberId: {$gt: 0}},
        {[conf.fields.settled.replace('$', '')]: true},
      ]}});
      agg.push({$project: {
        _id: 0,
        stake: {$sum: conf.fields.stake},
        payout: {$sum: conf.fields.payout},
        '__archive.currency': 1,
        '__archive.isCash': 1,
      }});
      agg.push({$group: {
        _id: {
          currency: `$__archive.currency`,
          isCash: {$ifNull: [`$__archive.isCash`, null]},
        },
        stake: {$sum: `$stake`},
        payout: {$sum: `$payout`},
        tickets: {$sum: 1},
      }});
      agg.push({$project: {
        _id: 0,
        'key.time': {$literal: _from}, 'key.gameId': {$literal: conf.gameId}, 'key.currency': `$_id.currency`, 'key.isCash': `$_id.isCash`,
        'value.stake': `$stake`, 'value.payout': `$payout`, 'value.tickets': `$tickets`,
      }});

      return agg;
    };
    const _getUidsOfNonexistingField = (conf, field) => {
      return dbs[conf.coll.db][`${conf.coll.group}${conf.coll.postfix}`].aggregate([
        {$match: {[`__archive.${field}`]: {$exists: false}, memberId: {$gt: 0}}},
        {$project: {_id: 0, uid: 1}},
        {$group: {_id: `$uid`}},
      ]).map(_ => _._id);;
    };
    const _getUpdateNonexistingFieldPipe = (conf, field, uids) => {
      return dbs[conf.coll.db].userinfos.find(
        {id: {$in: uids}},
        {_id: 0, id: 1, [field]: 1},
      ).map(_ => {
        return { updateMany: {
          filter: {uid: _.id, [`__archive.${field}`]: {$exists: false}},
          update: [
            {$set: {[`__archive.${field}`]: {$literal: _[field]}}}
          ],
        }};
      });
    };
    const _insertInternalField = (conf, field) => {
      const timer = $Timer();
      const uids = _getUidsOfNonexistingField(conf, field);
      const updPipe = _getUpdateNonexistingFieldPipe(conf, field, uids);
      const res = dbs[conf.coll.db][`${conf.coll.group}${conf.coll.postfix}`].bulkWrite(updPipe, {ordered: false});
      if (res.deletedCount + res.insertedCount + res.matchedCount + res.upsertedCount > 0) {
        _logger.info(`${conf.name.en} Insert User's Info`, `Added ${field} into [${conf.coll.group + conf.coll.postfix}] collection in ${timer.getTimerDuration()} ms.`);
        _logger.info(`${conf.name.en} Insert User's Info`, ` • D-${res.deletedCount} • I-${res.insertedCount} • M-${res.matchedCount} • U-${res.upsertedCount}`);
      }
    };
    const _insertInternalData = (conf) => {
      if (conf.config.hasCurrency) return;

      const fields = [`currency`, `isCash`];
      fields.forEach(_ => _insertInternalField(conf, _));
    };
    const _toSortedObjectJson = (obj) => {
      return tojson($Object.sortProperties(obj));
    };
    const _getOldSummary = (time, round, conf) => {
      const coll = _getSummaryColl(round);
      return dbs[summaryDB][coll].find(
        {time: time, gameId: conf.gameId},
        {_id: 0, time: 1, gameId: 1, currency: 1, isCash: 1},
      ).map(_toSortedObjectJson);
    };
    const _parseIsCash = (value) => {
      let result = `CRE`;
      if (value == null) {
        result = null;
      }
      if (value) {
        result = `DEP`;
      }
      return result;
    }
    const _processSummaryData = (doc, coll, conf, oldSums) => {
      const res = dbs[summaryDB][coll].updateOne(doc.key, {$set: doc.value}, {upsert: true});
      if (res.upsertedId) {
        _logger.info(conf.name.en, `- Inserted new summary record for ${doc.key.currency} ${_parseIsCash(doc.key.isCash)}`);
      }
      if (res.modifiedCount > 0) {
        _logger.info(conf.name.en, `- Modified summary record for ${doc.key.currency} ${_parseIsCash(doc.key.isCash)}`);
      }

      const idx = oldSums.indexOf(_toSortedObjectJson(doc.key));
      if (idx >= 0) {
        oldSums.splice(idx, 1);
      }
    };
    const _processOldSummaryData = (doc, coll, conf) => {
      try {
        const _doc = eval(`(${doc})`);
        const res = dbs[summaryDB][coll].deleteOne(_doc);
        if (res.deletedCount > 0) {
          _logger.warn(conf.name.en, `- Deleted summary record for ${_doc.currency} ${_parseIsCash(_doc.isCash)}`);
        } else {
          _logger.info(conf.name.en, `- No summary record deleted for ${_doc.currency} ${_parseIsCash(_doc.isCash)}`);
        }
      } catch (e) {
        _logger.err(conf.name.en, `- Something is WRONG while deleting summary record for ${doc}`);
      }
    };
    const _runConfSummary = (time, round, conf) => {
      const _time = _getRoundedTime(time, round);
      const timer = $Timer();
      const coll = _getSummaryColl(round);

      if (!_checkSummaryTime(_time, round)) return;

      /** If tickets do not have currency field, insert currency for them */
      _insertInternalData(conf);

      const agg = _buildSummaryAgg(_time, round, conf);
      const oldSums = _getOldSummary(_time, round, conf);
      dbs[conf.coll.db][conf.coll.group + conf.coll.round].aggregate(agg).forEach(doc => _processSummaryData(doc, coll, conf, oldSums));

      oldSums.forEach(doc => _processOldSummaryData(doc, coll, conf));
      _logger.info(conf.name.en, `Done summarize data in ${timer.getTimerDuration()} ms`);
    };
    const _runSummary = (time, round) => {
      const _time = _getRoundedTime(time || (Date.now() - _getRoundDuration(round)), round);
      _logger.info(summaryDB, `Summary for ${_getTimeStr(_time, round)} started.`);
      dbs[summaryDB].game_summary_config.find().forEach(conf => _runConfSummary(_time, round, conf));
      _logger.info(summaryDB, `Data summary for ${_getTimeStr(_time, round)} finished.`);
    };
    const _runDailySummary = (time) => {
      return _runSummary(time, 'DAY');
    };
    const _runHourlySummary = (time) => {
      return _runSummary(time, 'HOUR');
    };

    const _descriptor = {
      writable: false,
      enumerable: true,
    };
    Object.defineProperties(this, {
      toString        : Object.extend({value: function (...p) { return _toString(...p) }}, _descriptor),
      tojson          : Object.extend({value: function (...p) { return _toString(...p) }}, _descriptor),
      runDailySummary : Object.extend({value: function (...p) { return _runDailySummary(...p) }}, _descriptor),
      runHourlySummary: Object.extend({value: function (...p) { return _runHourlySummary(...p) }}, _descriptor),
    });

    $Object.deepFreeze(this);
    return this;
  };
  const __$Summary__ = $Summary.prototype = {
    help: function () {
      return `\
[$Summary](mongo, summaryDB) - Run data summary using config data at summaryDB on mongo server
  .runDailySummary(time) - Run daily summary for period that contains time
  .runHourlySummary(time) - Run hourly summary for period that contains time
`;
    },
  };

  /** Define deploy object */
  const _id = `$Summary`;
  const version = `1.0.0`;
  const changelog = {
    '1.0.0': [
      `Release [${_id}]`,
    ],
  };
  const value = new Code(`\
(() => {
  const $Summary = ${tojson($Summary)};
  $Summary.prototype = ${tojson(__$Summary__)};
  $Summary.toString = $Summary.tojson = function () {return this.prototype.help()};
  $Summary.prototype.toString = $Summary.prototype.tojson = function () { return this.help(); }

  $Object.deepFreeze($Summary);
  return $Summary;
})()`);

  /** Deploy */
  $Deploy(`BIZ`).run(_id, version, changelog, value);
}