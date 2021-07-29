{
  const $SmartBot = function (source, userinfos_source, destination) {
    /** Self construct */
    if (!(this instanceof $SmartBot)) return new $SmartBot(source, userinfos_source, destination);

    /** Private constant */
    const _logger = $Log(`iBOT`);
    const _assert = $Assert();
    _assert.setLogger(_logger);

    const src = $DBs(source);
    const uSrc = $DBs(userinfos_source);
    const dst = $DBs(destination);

    _assert.setTitle(`Audit`);
    _assert.try(
      `[source] must be a MongoDB reference.`,
      src._mongo instanceof Mongo,
    );
    _assert.try(
      `[userinfos_source] must be a MongoDB reference.`,
      uSrc._mongo instanceof Mongo,
    );
    _assert.try(
      `[destination] must be a MongoDB reference.`,
      dst._mongo instanceof Mongo,
    );
    if (_assert.hasError()) return;
    _assert.try(
      `[source] must have archive databases`,
      Object.keys(src).indexOf(`summary_arc`) >= 0,
      Object.keys(src).indexOf(`minigame_arc`) >= 0,
      Object.keys(src).indexOf(`log_arc`) >= 0,
    );
    _assert.try(
      `[userinfos_source] must have [minigame] database`,
      Object.keys(uSrc).indexOf(`minigame`) >= 0,
    );
    if (_assert.hasError()) return;

    /** Private variable */
    let _gameIds = [];
    let _games = [];
    let _data = [];

    /** Basic function */
    const _toString = () => {
      return `\
[$SmartBot]
  Source: ${src._mongo.host}
  UserInfo: ${uSrc._mongo.host}
  Destination: ${dst._mongo.host}
`;
    };

    /** Private function */
    const _printData = (gameId) => {
      _data.forEach((item, pos, arr) => {
        if ((gameId || pos) != pos) {
          return;
        }
        print(`[${pos.toString().pad(arr.length.toString().length)}] - ${tojson(item)}`);
      });
    };
    const _loadGameConfigs = (...gameIds) => {
      const ids = (gameIds[0] instanceof Array) ? gameIds[0] : gameIds;
      _gameIds = [];
      _games = [];
      const timer = $Timer();
      src.summary_arc.game_summary_config.find(
        {gameId: {$in: ids}},
        {_id: 0, gameId: 1, coll: 1, 'fields.stake': 1},
      ).forEach(conf => {
        _gameIds.push(conf.gameId);
        _games[conf.gameId] = conf;
      });
      _assert.setTitle(`Load Configs`);
      _assert.try(
        `No configs were loaded`,
        _gameIds.length > 0,
        _games.every(eval),
      );
      _logger.info(`Load Configs`, `${_gameIds.length} configs loaded in ${timer.getTimerDuration()} ms`);
    };
    const _toMemberId = (_) => {
      return _ ? _.memberId : null;
    };
    const _dataNotIncludes = function (_) {
      return this.data instanceof Array ? !this.data.includes(_) : null;
    };
    const _checkDayBank = () => {
      _gameIds.forEach(gameId => {
        _data[gameId].forEach(day => {
          const bankMems = src.summary_arc.smartbot_databank_patterns.find(
            {gameId: gameId, time: day.time},
            {_id: 0, memberId: 1}
          ).map(_toMemberId);
          const topMems = day.topMem.map(_toMemberId);
          day.missingBankMems = topMems.filter(_dataNotIncludes, {data: bankMems});
        });
      });
    };
    const _loadTopDay = (numDay) => {
      _assert.setTitle(`Audit`);
      _assert.try(
        `[numDay] must be a number.`,
        typeof numDay == "number",
      );
      if (_assert.hasError()) return;

      const timer = $Timer();
      _gameIds.forEach(gameId => {
        timer.register(`start_${gameId}`);
        _data[gameId] = src.summary_arc.daily_summaries.aggregate([
          {$match: {gameId: gameId, currency: {$ne: `UUS`}}},
          {$group: {_id: `$time`, stake: {$sum: `$stake`}}},
          {$project: {_id: 0, time: `$_id`, stake: `$stake`}},
          {$sort: {stake: -1}},
          {$limit: numDay},
        ]).toArray();
        _logger.info(`Top TO`, `Done loading game #${gameId} in ${timer.getElapsedDuration(`start_${gameId}`)} ms`);
      });
    };
    const _loadTopMem = (numMem) => {
      _assert.setTitle(`Audit`);
      _assert.try(
        `[numMem] must be a number.`,
        typeof numMem == "number",
      );
      if (_assert.hasError()) return;

      const timer = $Timer();
      _data.forEach((item, pos) => {
        const conf = _games[pos];
        timer.register(`start_${pos}`);
        item.forEach(day => {
          day.topMem = src.minigame_arc[`${conf.coll.group}${conf.coll.postfix}`].aggregate([
            {$match: {$and: [
              {time: {$gte: day.time}},
              {time: {$lt: new Date(day.time.valueOf() + 24 * 3600 * 1000)}},
              {'__archive.currency': {$ne: `UUS`}},
            ]}},
            {$group: {
              _id: {memberId: `$memberId`, day: day.time},
              stake: {$sum: {$add: conf.fields.stake}},
            }},
            {$project: {_id: 0, memberId: `$_id.memberId`, stake: `$stake`}},
            {$sort: {stake: -1}},
            {$limit: numMem},
          ]).toArray();
        });
        _logger.info(`Top Mem`, `Done loading game #${pos} in ${timer.getElapsedDuration(`start_${pos}`)} ms`);
      });

      _checkDayBank();
    };
    const _loadTop = (numDay, numMem) => {
      _loadTopDay(numDay);
      _loadTopMem(numMem);
    };
    const _getDayName = (day) => {
      return `${day.getFullYear()}${day.getMonth().toString().padStart(2,'0')}${day.getDate().toString().padStart(2,'0')}`;
    };
    const _getPatternId = (query) => {
      const patId = src.summary_arc.smartbot_databank_patterns.find(query, {_id: 1}, 1).sort({_id: -1}).toArray()[0];
      return patId ? patId._id : null;
    };
    const _getMemberName = (memberId) => {
      const memberName = uSrc.minigame.users.findOne(
        {'local.memberId': memberId},
        {_id: 0, 'local.memberName': 1},
      );
      return memberName ? memberName.local.memberName : memberId.toString();
    };
    const _updateDataBank_GameDayMember = (gameId, day, mem, roundData) => {
      const _title = `Update DataBank GDM`;

      /** Only update DataBank for missing memberId */
      if (day.missingBankMems.includes(mem.memberId)) return;

      const bets = [];
      const patId = _getPatternId({}) + 1;
      let res = {};

      /** Get member name, fallback to member id if not exists */
      const memberName = _getMemberName(mem.memberId);

      /** Update pattern info */
      const key = {
        gameId: gameId,
        memberId: mem.memberId,
        time: day.time,
      };
      res = src.summary_arc.smartbot_databank_patterns.updateOne(
        key,
        { $set: {
            group: String.substr(memberName, 0, 3).toUpperCase(),
            stake: mem.stake,
          },
          $setOnInsert: {
            _id: patId,
          },
        },
        {upsert: true},
      );
      const _patId = _getPatternId(key);
      const _patName = `${gameId}-${_getDayName(day.time)}-${mem.memberId}`;

      /** Check pattern status */
      _assert.resetHistory();
      _assert.try(
        `  Pattern #${_patId} ${_patName} unchanged.`,
        (res.matchedCount != 1) + (res.modifiedCount != 0) > 0,
      );
      if (_assert.hasError()) return;
      _assert.test(
        `  Inserting new pattern #${_patId} ${_patName}`,
        !res.upsertedId,
      );
      _assert.test(
        `  Pattern #${_patId} ${_patName} updated.`,
        ((res.matchedCount == 1) * (res.modifiedCount == 0)) + !!res.upsertedId,
      );

      /** If pattern changed, update its bets */
      src.summary_arc.smartbot_databank_bets.deleteMany({patId: _patId});
      src.log_arc.bets_bk.find(
        {$and: [
          {requestTimeStamp: {$gte: day.time.toISOString()}},
          {requestTimeStamp: {$lt: (new Date(day.time.valueOf() + 24 * 3600 * 1000)).toISOString()}},
          {'call.gameTypeId': gameId},
          {'call.obCustId': mem.memberId},
        ]},
        {_id: 0, requestTimeStamp: 1, 'call.gameRoundId': 1, 'call.choiceId': 1, 'call.amount': 1},
      ).forEach(bet => {
        bets.push({
          patId: _patId,
          time: roundData.rounds[`${bet.call.gameRoundId}`].valueOf() % (24*3600*1000),
          round: bet.call.gameRoundId - roundData.fstRound,
          second: Math.round((roundData.rounds[`${bet.call.gameRoundId}`].valueOf() - ISODate(bet.requestTimeStamp).valueOf()) / 1000),
          choiceId: bet.call.choiceId,
          amount: Number(bet.call.amount),
        });
      });
      res = src.summary_arc.smartbot_databank_bets.insertMany(bets, {ordered: false});
      _logger.info(_title, `- (${_patId}) ${res.insertedIds.length} bets inserted`);
    };
    const _updateDataBank_GameDay = (gameId, day) => {
      const _title = `Update DataBank`;

      /** If data bank already have enough data for the day, skip it */
      if (day.missingBankMems.length == 0) return;

      const _conf = _games[gameId];
      const _dayName = `${gameId}-${_getDayName(day.time)}`;
      _logger.warn(_title, `Updating for game-day ${_dayName} ...`);

      /** Get first round of day */
      const roundData = {
        rounds  : {},
        fstRound: 0,
      };
      src[_conf.coll.db][`${_conf.coll.group}${_conf.coll.round}`].find(
        {$and: [
          {time: {$gte: day.time}},
          {time: {$lt: new Date(day.time.valueOf() + 25*3600*1000)}},
        ]},
        {_id: 0, id: 1, time: 1},
      ).forEach(round => {
        roundData.rounds[round.id] = round.time;
      });
      roundData.fstRound = Math.min(...Object.keys(roundData.rounds).map(Number));

      day.topMem.forEach(mem => _updateDataBank_GameDayMember(gameId, day, mem, roundData));
    };
    const _isDataOK = () => {
      const _title = `Verify Data`;
      _assert.setTitle(_title);
      _assert.try(
        `Data is not loaded properly`,
        _data.every($Check.isArray),
        _data.every(data => data.every($Check.isObject)),
        _data.every(data => data.every(obj => obj.hasOwnProperty(`missingBankMems`))),
      );
      return !_assert.hasError();
    }
    const _updateDataBank = () => {
      const _title = `Update DataBank`;

      // Re-check DataBank first
      _checkDayBank();

      if (!_isDataOK()) return;

      const timer = $Timer();
      _data.forEach((item, gameId) => {
        _logger.info(_title, `-------------------- Game #${gameId} - ${_games[gameId].coll.group} --------------------`);
        timer.register(`start_${gameId}`);
        item.forEach(day => _updateDataBank_GameDay(gameId, day));
        _logger.info(_title, `Finished update DataBank for game #${gameId} in ${timer.getElapsedDuration(`start_${gameId}`)} ms.`);
        _logger.info(_title, `-------------------- Game #${gameId} - ${_games[gameId].coll.group} --------------------`);
      });

      // Re-check DataBank
      _checkDayBank();
    };
    const _downloadData_GameDay = (gameId, day) => {
      const _title = `Download Data`;
      const _conf = _games[gameId];

      let _res = {};
      const timer = $Timer();
      _logger.info(_title, `[${_getDayName(day.time)}]`);

      // Download data from DataBank
      const _pQuery = {gameId: gameId, time: day.time, memberId: {$in: day.topMem.map(_ => _.memberId)}};
      const _patterns = src.summary_arc.smartbot_databank_patterns.find(_pQuery).toArray();

      const _bQuery = {patId: {$in: _patterns.map(_ => _._id)}};
      const _bets = src.summary_arc.smartbot_databank_bets.find(_bQuery, {_id: 0}).toArray();

      timer.register(`patterns`);
      _res = dst.minigame[`smartbot_${_conf.coll.group}_patterns`].insertMany(_patterns, {ordered: false});
      _logger.info(_title, `  - Inserted ${_res.insertedIds.length}/${_patterns.length} patterns in ${timer.getElapsedDuration(`patterns`)} ms.`);

      timer.register(`bets`);
      _res = dst.minigame[`smartbot_${_conf.coll.group}_bets`].insertMany(_bets, {ordered: false});
      _logger.info(_title, `  - Inserted ${_res.insertedIds.length}/${_bets.length} bets in ${timer.getElapsedDuration(`bets`)} ms.`);
    };
    const _downloadData = () => {
      // Update DataBank first
      _updateDataBank();

      const _title = `Download Data`;

      const timer = $Timer();
      _data.forEach((item, gameId) => {
        const _conf = _games[gameId];
        _logger.info(_title, `-------------------- Game #${gameId} - ${_games[gameId].coll.group} --------------------`);
        timer.register(`start_${gameId}`);

        try {
          dst._mongo._defaultSession.startTransaction();
          dst.minigame[`smartbot_${_conf.coll.group}_patterns`].deleteMany({});
          dst.minigame[`smartbot_${_conf.coll.group}_bets`].deleteMany({});
          item.forEach(day => _downloadData_GameDay(gameId, day));
          dst._mongo._defaultSession.commitTransaction();
        } catch (e) {
          dst._mongo._defaultSession.abortTransaction();
          _logger.err(_title, `${e.toString()}`);
          return;
        }

        _logger.info(_title, `Finished download data for game #${gameId} in ${timer.getElapsedDuration(`start_${gameId}`)} ms.`);
        _logger.info(_title, `-------------------- Game #${gameId} - ${_games[gameId].coll.group} --------------------`);
      });
    };

    const _descriptor = {
      writable: false,
      enumerable: true,
    };
    Object.defineProperties(this, {
      toString        : Object.extend({value: function (...p) { return _toString(...p) }}, _descriptor),
      tojson          : Object.extend({value: function (...p) { return _toString(...p) }}, _descriptor),
      printData       : Object.extend({value: function (...p) { return _printData(...p) }}, _descriptor),
      loadGameConfigs : Object.extend({value: function (...p) { return _loadGameConfigs(...p) }}, _descriptor),
      loadTopDay      : Object.extend({value: function (...p) { return _loadTopDay(...p) }}, _descriptor),
      loadTopMem      : Object.extend({value: function (...p) { return _loadTopMem(...p) }}, _descriptor),
      loadTop         : Object.extend({value: function (...p) { return _loadTop(...p) }}, _descriptor),
      updateDataBank  : Object.extend({value: function (...p) { return _updateDataBank(...p) }}, _descriptor),
      downloadData    : Object.extend({value: function (...p) { return _downloadData(...p) }}, _descriptor),
    });

    $Object.deepFreeze(this);
    return this;
  };
  const __$SmartBot__ = $SmartBot.prototype = {
    help: function () {
      return `\
[$SmartBot](source, userinfos_source, destination) - Report and prepare data for Smart Bot
  .printData() - Print collected data
  .loadGameConfigs(...gameIds) - Load config of input games
  .loadTopDay(numDay) - Collect top days that have the most turnover
  .loadTopMem(numMem) - Collect top mems in each day that have the most turnover
  .loadTop(numDay, numMem) - loadTopDay then loadTopMem
  .updateDataBank() - Update missing data into data bank
  .downloadData() - Load data to destination from data bank
`;
    },
  };

  /** Define deploy object */
  const _id = `$SmartBot`;
  const version = `1.0.0`;
  const changelog = {
    '1.0.0': [
      `Release [${_id}]`,
    ],
  };
  const value = new Code(`\
(() => {
  const $SmartBot = ${tojson($SmartBot)};
  $SmartBot.prototype = ${tojson(__$SmartBot__)};
  $SmartBot.toString = $SmartBot.tojson = function () {return this.prototype.help()};
  $SmartBot.prototype.toString = $SmartBot.prototype.tojson = function () { return this.help(); }

  $Object.deepFreeze($SmartBot);
  return $SmartBot;
})()`);

  /** Deploy */
  $Deploy(`BIZ`).run(_id, version, changelog, value);
}