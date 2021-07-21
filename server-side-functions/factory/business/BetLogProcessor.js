{
  const $BetLogProcessor = function (source, destination) {
    /** Self construct */
    if (!(this instanceof $BetLogProcessor)) return new $BetLogProcessor(source, destination);

    /** Private constant */
    const _logger = $Log(`BETLOG-PROCESSOR`);
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
      return `[$BetLogProcessor] Running on [${database}] of ${src._mongo.host}`;
    };

    /** Private function */
    const _cookBetLog = (data) => {
      const cooked      = {_id: data._id};
      const requestTS   = $ExtDate(data.requestTimeStamp);
      const responseTS  = $ExtDate(data.responseTimeStamp);
      const logTS       = $ExtDate(data.logTimeStamp);

      cooked.time = {
        request   : requestTS.toString(),
        response  : responseTS - requestTS,
        log       : logTS - requestTS,
      };
      cooked.data = {
        siteId    : data.call.siteId,
        memberId  : data.call.obCustId,
        currency  : data.call.currency,
        gameType  : data.call.gameTypeId,
        roundId   : data.call.gameRoundId,
        choiceId  : data.call.choiceId,
        amount    : Number(data.call.amount),
        balance   : Number(data.result.balance),
      };
      cooked.system = data.system || 1;

      return cooked;
    };
    const _projectBetLog = () => {
      return {
        _id                 : 1,
        requestTimeStamp    : 1,
        responseTimeStamp   : 1,
        logTimeStamp        : 1,
        'call.siteId'       : 1,
        'call.obCustId'     : 1,
        'call.currency'     : 1,
        'call.gameTypeId'   : 1,
        'call.gameRoundId'  : 1,
        'call.choiceId'     : 1,
        'call.amount'       : 1,
        'result.balance'    : 1,
        system              : 1,
      }
    };
    const _markBetLogDone = (betlog, _ids) => {
      const title = `Mark BetLog Done ${betlog._fullName}`;
      _assert.setTitle(title);
      _assert.try(
        `[betlog] must be a collection.`,
        betlog instanceof DBCollection,
      );
      if (_assert.hasError()) return;

      const res = betlog.updateMany({_id: {$in: _ids}}, {$set: {'__archive.summarized': true}});
      _logger.info(title, `Updated ${res.modifiedCount} / ${res.matchedCount} logs`);
    };
    const _toIndex = (_) => {
      return _ ? _.index : ``;
    };
    const _to_id = (_) => {
      return _ ? _._id : null;
    };
    const _processBetLog = (betlog, limit = 1000) => {
      const title = `Process BetLog ${betlog._fullName}`;
      _assert.setTitle(title);
      _assert.try(
        `[betlog] must be a collection.`,
        betlog instanceof DBCollection,
      );
      _assert.try(
        `[limit] must be a number.`,
        typeof limit === "number",
      );
      if (_assert.hasError()) return null;

      const data = betlog.find({'__archive.summarized': {$exists: false}}, _projectBetLog(), limit).sort({_id: 1}).map(_cookBetLog);
      let res = {};
      try {
        res = dst[database].betlogs.insertMany(data, {ordered: false});
        _logger.info(title, `${res.insertedIds.length} bets summarized`);
      } catch (e) {
        const err = e.getRawResponse();
        _logger.info(title, `${err.nInserted} bets summarized`);
        const idLen = Math.max(...err.writeErrors.map(_toIndex)).toString().length;
        err.writeErrors.forEach(_ => {
          _logger.err(title, `[${_.index.toString().pad(idLen)}] ${_.errmsg}`);
        });
      }

      _markBetLogDone(betlog, data.map(_to_id))
      return data.length;
    };
    const _processAllBetLog = (limit) => {
      while (_processBetLog(src.log.bets, limit) > 0) {};
    };
    const _processAllBetLogArc = (limit) => {
      while (_processBetLog(src.log_arc.bets_bk, limit) > 0) {};
    };

    const _descriptor = {
      writable: false,
      enumerable: true,
    };
    Object.defineProperties(this, {
      toString            : Object.extend({value: function (...p) { return _toString(...p) }}, _descriptor),
      tojson              : Object.extend({value: function (...p) { return _toString(...p) }}, _descriptor),
      processAllBetLog    : Object.extend({value: function (...p) { return _processAllBetLog(...p) }}, _descriptor),
      processAllBetLogArc : Object.extend({value: function (...p) { return _processAllBetLogArc(...p) }}, _descriptor),
    });

    $Object.deepFreeze(this);
    return this;
  };
  const __$BetLogProcessor__ = $BetLogProcessor.prototype = {
    help: function () {
      return `\
[$BetLogProcessor](source, destination) - Processing bet logs data and save to Proteus database
  .processAllBetLog() - run processing for log.bets
  .processAllBetLogArc() - run processing for log_arc.bets_bk
`;
    },
  };

  /** Define deploy object */
  const _id = `$BetLogProcessor`;
  const version = `1.0.0`;
  const changelog = {
    '1.0.0': [
      `Release [${_id}]`,
    ],
  };
  const value = new Code(`\
(() => {
  const $BetLogProcessor = ${tojson($BetLogProcessor)};
  $BetLogProcessor.prototype = ${tojson(__$BetLogProcessor__)};
  $BetLogProcessor.toString = $BetLogProcessor.tojson = function () {return this.prototype.help()};
  $BetLogProcessor.prototype.toString = $BetLogProcessor.prototype.tojson = function () { return this.help(); }

  $Object.deepFreeze($BetLogProcessor);
  return $BetLogProcessor;
})()`);

  /** Deploy */
  $Deploy(`BIZ`).run(_id, version, changelog, value);
}