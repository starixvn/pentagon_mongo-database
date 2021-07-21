{
  const $BetLogSummary = function (source, destination) {
    /** Self construct */
    if (!(this instanceof $BetLogSummary)) return new $BetLogSummary(source, destination);

    /** Private constant */
    const _logger = $Log(`BETLOG-SUMMARY`);
    const _assert = $Assert();
    _assert.setLogger(_logger);

    const src = $DBs(source);
    const dst = $DBs(destination);
    const database = `Proteus`;

    _assert.setTitle(`Audit`);
    _assert.try(
      `[source] must be a MongoDB reference.`,
      src._mongo instanceof Mongo,
    );
    _assert.try(
      `[destination] must be a MongoDB reference.`,
      dst._mongo instanceof Mongo,
    );
    if (_assert.hasError()) return;

    /** Basic function */
    const _toString = () => {
      return `[$BetLogSummary] Summarize from [${src._mongo.host}] to [${dst._mongo.host}]`;
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
      const _time = _getTime(time, round);
      if (String.toLowerCase(round) == 'day') {
        return _time.toISOString().substr(0,10);
      };
      if (String.toLowerCase(round) == 'hour') {
        return `${_time.toISOString().substr(0,10)} ${_time.toISOString().substr(11,8)}`;
      };
    };
    const _buildSummaryAgg = (time, round) => {
      const _roundDuration = _getRoundDuration(round);
      const _from = _getTime(time, round);
      const _to = _getTime(_from.valueOf() + _roundDuration, round);
      const agg = [];

      agg.push({$match: {$and: [
        {'time.request': {$gte: _from.toISOString()}},
        {'time.request': {$lt: _to.toISOString()}},
      ]}});
      agg.push({$project: {_id: 0, data: 1, system: 1}});
      agg.push({$group: {
        _id: {
          gameId: `$data.gameType`,
          currency: `$data.currency`,
          siteId: `$data.siteId`,
          memberId: `$data.memberId`,
          roundId: `$data.roundId`,
          system: `$system`,
        },
        requestCount: {$sum: 1},
        totalAmount: {$sum: `$data.amount`}
      }});
      agg.push({$group: {
        _id: {
          gameId: `$_id.gameId`,
          currency: `$_id.currency`,
          system: `$_id.system`,
        },
        betCount: {$sum: 1},
        requestCount: {$sum: `$requestCount`},
        totalAmount: {$sum: `$totalAmount`},
      }});
      agg.push({$project: {
        _id: 0,
        'key.time': {$literal: _from}, 'key.gameId': `$_id.gameId`, 'key.currency': `$_id.currency`, 'key.system': `$_id.system`,
        'value.betCount': `$betCount`, 'value.requestCount': `$requestCount`, 'value.totalAmount': `$totalAmount`,
      }});

      return agg;
    };
    const _toSortedObjectJson = (obj) => {
      return tojson($Object.sortProperties(obj));
    };
    const _getOldSummary = (time, round) => {
      const _time = _getTime(time, round);
      return dst.summary.betlog_summaries.find(
        {time: _time},
        {_id: 0, time: 1, gameId: 1, currency: 1, system: 1},
      ).map(_toSortedObjectJson);
    };
    const _parseSystem = (value) => {
      switch (value) {
        case 1:
          return `Cocos`;
        case 2:
          return `Mobi`;
        default:
          return `null`;
      }
    }
    const _processSummaryData = function (doc) {
      const res = dst.summary.betlog_summaries.updateOne(doc.key, {$set: doc.value}, {upsert: true});
      if (res.upsertedId) {
        _logger.info(this.coll, `- Inserted new summary record for G${doc.key.gameId} ${doc.key.currency} ${_parseSystem(doc.key.system)}`);
      } else if (res.modifiedCount > 0) {
        _logger.info(this.coll, `- Modified summary record for G${doc.key.gameId} ${doc.key.currency} ${_parseSystem(doc.key.system)}`);
      }

      const idx = this.oldSums.indexOf(_toSortedObjectJson(doc.key));
      if (idx >= 0) {
        this.oldSums.splice(idx, 1);
      }
    };
    const _processOldSummaryData = function (doc) {
      try {
        const _doc = eval(`(${doc})`);
        const res = dst.summary.betlog_summaries.deleteOne(_doc);
        if (res.deletedCount > 0) {
          _logger.warn(this.coll, `- Deleted summary record for G${_doc.gameId} ${_doc.currency} ${_parseSystem(_doc.system)}`);
        } else {
          _logger.info(this.coll, `- No summary record deleted for G${_doc.gameId} ${_doc.currency} ${_parseSystem(_doc.system)}`);
        }
      } catch (e) {
        _logger.err(this.coll, `- Something is WRONG while deleting summary record for ${doc}`);
        _logger.err(this.coll, `    ${tojsononeline(e)}`);
      }
    };
    const _runBetLogSummary = (time) => {
      const _round = `hour`;
      const _time = _getTime(time || (Date.now() - _getRoundDuration(_round)), _round);
      const timer = $Timer();
      const _coll = `betlog_summaries`;

      const agg = _buildSummaryAgg(_time, _round);
      const oldSums = _getOldSummary(_time, _round);
      const summaries = src[database].betlogs.aggregate(agg).toArray();

      if (summaries.length > 0) {
        _logger.info(`summary`, `Summary for ${_getTimeStr(_time, _round)} started`);
      }
      summaries.forEach(_processSummaryData, {coll: _coll, oldSums: oldSums});

      oldSums.forEach(_processOldSummaryData, {coll: _coll});
      if (summaries.length > 0) {
        _logger.info(_coll, `Done summarize data in ${timer.getTimerDuration()} ms`);
        _logger.info(`summary`, `Data summary for ${_getTimeStr(_time, _round)} finished\n\n`);
      }
    };

    const _descriptor = {
      writable: false,
      enumerable: true,
    };
    Object.defineProperties(this, {
      toString        : Object.extend({value: function (...p) { return _toString(...p) }}, _descriptor),
      tojson          : Object.extend({value: function (...p) { return _toString(...p) }}, _descriptor),
      runBetLogSummary: Object.extend({value: function (...p) { return _runBetLogSummary(...p) }}, _descriptor),
    });

    $Object.deepFreeze(this);
    return this;
  };
  const __$BetLogSummary__ = $BetLogSummary.prototype = {
    help: function () {
      return `\
[$BetLogSummary](source, destination) - Summary data from Proteus betlogs
  .runBetLogSummary() - Run summary
`;
    },
  };

  /** Define deploy object */
  const _id = `$BetLogSummary`;
  const version = `1.0.0`;
  const changelog = {
    '1.0.0': [
      `Release [${_id}]`,
    ],
  };
  const value = new Code(`\
(() => {
  const $BetLogSummary = ${tojson($BetLogSummary)};
  $BetLogSummary.prototype = ${tojson(__$BetLogSummary__)};
  $BetLogSummary.toString = $BetLogSummary.tojson = function () {return this.prototype.help()};
  $BetLogSummary.prototype.toString = $BetLogSummary.prototype.tojson = function () { return this.help(); }

  $Object.deepFreeze($BetLogSummary);
  return $BetLogSummary;
})()`);

  /** Deploy */
  $Deploy(`BIZ`).run(_id, version, changelog, value);
}