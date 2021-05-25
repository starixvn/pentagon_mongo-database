deploy: {
  const Summary = class {
    constructor (mongo, summaryDB) {
      const _logger = new Shell.Log(`SUMMARY`);
      const _assert = new Shell.Assert();
      _assert.setLogger(_logger);

      _assert.setTitle(`Audit`);
      _assert.try(
        `[mongo] must be a MongoDB connection.`,
        mongo instanceof Mongo,
      );
      _assert.try(
        `[summaryDB] must be a string.`,
        typeof summaryDB == "string",
      );
      if (_assert.hasError()) {
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
        const _time = _getTime(time, round);
        if (String.toLowerCase(round) == 'day') {
          return _time.toISOString().substr(0,10);
        };
        if (String.toLowerCase(round) == 'hour') {
          return `${_time.toISOString().substr(0,10)} ${_time.toISOString().substr(11,8)}`;
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
        _assert.setTitle(`Summary Time`);
        if (_assert.try(
          `[${tojsononeline(time)}] is not a valid time.`,
          _time instanceof Date,
        )) {
          return false;
        }
        _assert.try(
          `[${_getTimeStr(time, round)}] is not valid. It's either expired or not finished.`,
          _getTime(time, round).valueOf() >= _getTime(Date.now(), 'DAY').valueOf() - 7 * _getRoundDuration('DAY'),
          _getTime(time, round).valueOf() <  _getTime(Date.now(), round).valueOf(),
        );
        return !_assert.hasError();
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
          from: conf.coll.group + conf.coll.postfix,
          localField: `id`,
          foreignField: conf.fields.map,
          as: `bets`,
        }});
        agg.push({$unwind: `$bets`});
        agg.push({$replaceWith: `$bets`});

        tmpArr = [];
        tmpArr.push({memberId: {$gt: 0}});
        (tmpObj = {})[conf.fields.settled.replace('$', '')] = true;
        tmpArr.push(tmpObj);
        agg.push({$match: {$and: tmpArr}});

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
      const _insertCurrency = (conf) => {
        const timer = new Tool.Timer();
        const uidsCurrency = [];
        mongo.getDB(conf.coll.db)[`${conf.coll.group}${conf.coll.postfix}`].aggregate([
          {$match: {'__archive.currency': {$exists: false}, memberId: {$gt: 0}}},
          {$project: {_id: 0, uid: 1}},
          {$group: {_id: `$uid`}},
        ]).forEach(doc => {
          uidsCurrency.push(doc._id);
        });

        const uidsCash = [];
        mongo.getDB(conf.coll.db)[`${conf.coll.group}${conf.coll.postfix}`].aggregate([
          {$match: {'__archive.isCash': {$exists: false}, memberId: {$gt: 0}}},
          {$project: {_id: 0, uid: 1}},
          {$group: {_id: `$uid`}},
        ]).forEach(doc => {
          uidsCash.push(doc._id);
        });

        const updCurrencyPipe = [];
        mongo.getDB(conf.coll.db).userinfos.find({id: {$in: uidsCurrency}}, {_id: 0, id: 1, currency: 1}).forEach(doc => {
          updCurrencyPipe.push({updateMany: {
            filter: {uid: doc.id, '__archive.currency': {$exists: false}},
            update: [
              {$set: {'__archive.currency': {$literal: doc.currency}}}
            ],
          }});
        });
        mongo.getDB(conf.coll.db).userinfos.find({id: {$in: uidsCash}}, {_id: 0, id: 1, isCash: 1}).forEach(doc => {
          updCurrencyPipe.push({updateMany: {
            filter: {uid: doc.id, '__archive.isCash': {$exists: false}},
            update: [
              {$set: {'__archive.isCash': {$literal: doc.isCash == null ? null : doc.isCash}}}
            ],
          }});
        });
        const res = mongo.getDB(conf.coll.db)[`${conf.coll.group}${conf.coll.postfix}`].bulkWrite(updCurrencyPipe, {ordered: false});

        if (res.deletedCount + res.insertedCount + res.matchedCount + res.upsertedCount > 0) {
          _logger.info(`${conf.name.en} Insert User's Info`, `Added into [${conf.coll.group + conf.coll.postfix}] collection in ${timer.getTimerDuration()} ms.`);
          _logger.info(`${conf.name.en} Insert User's Info`, ` • D-${res.deletedCount} • I-${res.insertedCount} • M-${res.matchedCount} • U-${res.upsertedCount}`);
        }
      };
      const _getOldSummary = (time, round, conf) => {
        const summaries = [];
        const coll = _getSummaryColl(round);
        mongo.getDB(summaryDB)[coll].find(
          {time: time, gameId: conf.gameId},
          {_id: 0, time: 1, gameId: 1, currency: 1, isCash: 1},
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
        // _logger.info(conf.name.en, `Got old summaries in ${timer.getDifferent(`agg`, `oldSums`)} ms.`);
        const summaries = mongo.getDB(conf.coll.db)[conf.coll.group + conf.coll.round].aggregate(agg).toArray();
        timer.register(`summaries`);
        // _logger.info(conf.name.en, `Calculated summaries in ${timer.getDifferent(`oldSums`, `summaries`)} ms.`);

        summaries.forEach(doc => {
          const res = mongo.getDB(summaryDB)[coll].updateOne(doc.key, {$set: doc.value}, {upsert: true});
          if (res.upsertedId) {
            _logger.info(conf.name.en, `- Inserted new summary record for ${doc.key.currency} ${doc.key.isCash == null ? 'null' : doc.key.isCash ? 'DEP' : 'CRE'}`);
          } else if (res.modifiedCount > 0) {
            _logger.info(conf.name.en, `- Modified summary record for ${doc.key.currency} ${doc.key.isCash == null ? 'null' : doc.key.isCash ? 'DEP' : 'CRE'}`);
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
              _logger.warn(conf.name.en, `- Deleted summary record for ${_doc.currency} ${_doc.isCash == null ? 'null' : _doc.isCash ? 'DEP' : 'CRE'}`);
            } else {
              _logger.info(conf.name.en, `- No summary record deleted for ${_doc.currency} ${_doc.isCash == null ? 'null' : _doc.isCash ? 'DEP' : 'CRE'}`);
            }
          } catch (e) {
            _logger.err(conf.name.en, `- Something is WRONG while deleting summary record for ${doc}`);
          }
        });
        _logger.info(conf.name.en, `Done summarize data in ${timer.getTimerDuration()} ms`);
      };
      const _runSummary = (time, round) => {
        const _time = _getTime(time || (Date.now() - _getRoundDuration(round)), round);
        _logger.info(summaryDB, `Summary for ${_getTimeStr(_time, round)} started.`);
        mongo.getDB(summaryDB).game_summary_config.find().forEach(conf => _runConfSummary(_time, round, conf));
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
        toString          : Object.extend({value: function () { return _toString() }}, _descriptor),
        tojson            : Object.extend({value: function () { return _toString() }}, _descriptor),
        runDailySummary   : Object.extend({value: function (time) { return _runDailySummary(time) }}, _descriptor),
        runHourlySummary  : Object.extend({value: function (time) { return _runHourlySummary(time) }}, _descriptor),
      });
    }
  };
  const SummaryExt = {};

  const SmartBot = class {
    constructor (source, userinfos_source, destination) {
      const _logger = new Shell.Log(`iBOT`);
      const _assert = new Shell.Assert();
      _assert.setLogger(_logger);

      let _gameIds = [];
      let _games = [];
      let _data = [];

      _assert.setTitle(`Audit`);
      _assert.try(
        `[source] must be a MongoDB connection.`,
        source instanceof Mongo,
      );
      _assert.try(
        `[userinfos_source] must be a MongoDB connection.`,
        userinfos_source instanceof Mongo,
      );
      _assert.try(
        `[destination] must be a MongoDB connection.`,
        destination instanceof Mongo,
      );
      if (_assert.hasError()) {
        return;
      }
      _assert.try(
        `[source] must have [summary_arc] database`,
        source.getDBs(undefined, {name: `summary_arc`}).databases.length == 1,
      );
      if (_assert.hasError()) {
        return;
      }

      const _toString = () => {
        return `[SabaClub.SmartBot]\n  Source: ${source.host}\n  UserInfo: ${userinfos_source.host}\n  Destination: ${destination.host}`;
      };
      const _printConfigs = (gameId) => {
        _games.forEach((item, pos, arr) => {
          if ((gameId || pos) != pos) {
            return;
          }
          print(`[${pos.toString().pad(arr.length.toString().length)}] - {`);
          let l = 0;
          Object.keys(item).forEach(field => {l = field.length > l ? field.length : l});
          Object.keys(item).forEach(field => {
            print(`    "${field.pad(l,1)}" : ${tojsononeline(item[field])}`);
          });
          print(`}`);
        });
      };
      const _printData = (gameId) => {
        _data.forEach((item, pos, arr) => {
          if ((gameId || pos) != pos) {
            return;
          }
          print(`[${pos.toString().pad(arr.length.toString().length)}]\n${tojson(item)}`);
        });
      };
      const _loadGameConfigs = (...gameIds) => {
        const ids = (gameIds[0] instanceof Array) ? gameIds[0] : gameIds;
        _gameIds = [];
        _games = [];
        const timer = new Tool.Timer();
        source.getDB('summary_arc').game_summary_config.find(
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
      const _checkDayBank = () => {
        _gameIds.forEach(gameId => {
          _data[gameId].forEach(day => {
            const bankMems = source.getDB(`summary_arc`).smartbot_databank_patterns.find({gameId: gameId, time: day.time}, {_id: 0, memberId: 1}).toArray().map(_ => _.memberId);
            const topMems = day.topMem.map(_ => _.memberId);
            day.missingBankMems = topMems.filter(_ => !bankMems.includes(_));
          });
        });
      };
      const _loadTopDay = (numDay) => {
        _assert.setTitle(`Audit`);
        _assert.try(
          `[numDay] must be a number.`,
          typeof numDay == "number",
        );
        if (_assert.hasError()) {
          return;
        }

        const timer = new Tool.Timer();
        _gameIds.forEach(gameId => {
          timer.register(`start_${gameId}`);
          _data[gameId] = source.getDB(`summary_arc`).daily_summaries.aggregate([
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
        if (_assert.hasError()) {
          return;
        }

        const timer = new Tool.Timer();
        _data.forEach((item, pos) => {
          const conf = _games[pos];
          timer.register(`start_${pos}`);
          item.forEach(day => {
            day.topMem = source.getDB(`minigame_arc`)[`${conf.coll.group}${conf.coll.postfix}`].aggregate([
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
      const _updateDataBank_GameDayMember = (gameId, day, mem, roundData) => {
        const _title = `Update DataBank GDM`;

        // Only update DataBank for missing memberId
        if (!day.missingBankMems.includes(mem.memberId)) {
          return;
        }

        const bets = [];
        const patId = (source.getDB(`summary_arc`).smartbot_databank_patterns.find({}, {_id: 1}, 1).sort({_id: -1}).toArray()[0] || {_id: 0})._id + 1;
        let res = {};

        // Get member name, fallback to member id if not exists
        const memberName = (userinfos_source.getDB(`minigame`).users.findOne(
          {'local.memberId': mem.memberId},
          {_id: 0, 'local.memberName': 1},
        ) || {local: {memberName: mem.memberId.toString()}}).local.memberName;

        const key = {
          gameId: gameId,
          memberId: mem.memberId,
          time: day.time,
        };
        res = source.getDB(`summary_arc`).smartbot_databank_patterns.updateOne(
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
        const _patId = (source.getDB(`summary_arc`).smartbot_databank_patterns.findOne(key, {_id: 1}) || {_id: null})._id;
        const _patName = `${gameId}-${_getDayName(day.time)}-${mem.memberId}`;

        _assert.resetHistory();
        _assert.try(
          `  Pattern #${_patId} ${_patName} unchanged.`,
          !(res.matchedCount == 1 && res.modifiedCount == 0),
        );
        if (_assert.hasError()) {
          return;
        }
        _assert.test(
          `  Inserting new pattern #${_patId} ${_patName}`,
          !res.upsertedId,
        );
        _assert.test(
          `  Pattern #${_patId} ${_patName} updated.`,
          (res.matchedCount == 1 && res.modifiedCount == 0) || res.upsertedId,
        );

        source.getDB(`summary_arc`).smartbot_databank_bets.deleteMany({patId: _patId});
        source.getDB(`log_arc`).bets_bk.find(
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
        res = source.getDB(`summary_arc`).smartbot_databank_bets.insertMany(bets, {ordered: false});
        _logger.info(_title, `- (${_patId}) ${res.insertedIds.length} bets inserted`);
      };
      const _updateDataBank_GameDay = (gameId, day) => {
        const _title = `Update DataBank`;

        // If data bank already have enough data for the day, skip it
        if (day.missingBankMems.length == 0) {
          return;
        }

        const _conf = _games[gameId];
        const _dayName = `${gameId}-${_getDayName(day.time)}`;
        _logger.warn(_title, `Updating for game-day ${_dayName} ...`);

        // Get first round of day
        const roundData = {
          rounds  : {},
          fstRound: 0,
        };
        source.getDB(_conf.coll.db)[`${_conf.coll.group}${_conf.coll.round}`].find(
          {$and: [
            {time: {$gte: day.time}},
            {time: {$lt: new Date(day.time.valueOf() + 25*3600*1000)}},
          ]},
          {_id: 0, id: 1, time: 1},
        ).forEach(round => {
          roundData.rounds[`${round.id}`] = round.time;
        });
        roundData.fstRound = Math.min(...Object.keys(roundData.rounds).map(_ => Number(_)));

        day.topMem.forEach(mem => _updateDataBank_GameDayMember(gameId, day, mem, roundData));
      };
      const _updateDataBank = () => {
        // Re-check DataBank first
        _checkDayBank();

        const _title = `Update DataBank`;
        _assert.setTitle(_title);
        _assert.try(
          `Data is not loaded properly`,
          _data.every(data => data instanceof Array),
          _data.every(data => data.every(obj => typeof obj == "object")),
          _data.every(data => data.every(obj => obj.hasOwnProperty(`missingBankMems`))),
        );
        if (_assert.hasError()) {
          return;
        }

        const timer = new Tool.Timer();
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
        const timer = new Tool.Timer();
        _logger.info(_title, `[${_getDayName(day.time)}]`);

        // Download data from DataBank
        const _pQuery = {gameId: gameId, time: day.time, memberId: {$in: day.topMem.map(_ => _.memberId)}};
        const _patterns = source.getDB(`summary_arc`).smartbot_databank_patterns.find(_pQuery).toArray();

        const _bQuery = {patId: {$in: _patterns.map(_ => _._id)}};
        const _bets = source.getDB(`summary_arc`).smartbot_databank_bets.find(_bQuery, {_id: 0}).toArray();

        timer.register(`patterns`);
        _res = destination.getDB(`minigame`)[`smartbot_${_conf.coll.group}_patterns`].insertMany(_patterns, {ordered: false});
        _logger.info(_title, `  - Inserted ${_res.insertedIds.length}/${_patterns.length} patterns in ${timer.getElapsedDuration(`patterns`)} ms.`);

        timer.register(`bets`);
        _res = destination.getDB(`minigame`)[`smartbot_${_conf.coll.group}_bets`].insertMany(_bets, {ordered: false});
        _logger.info(_title, `  - Inserted ${_res.insertedIds.length}/${_bets.length} bets in ${timer.getElapsedDuration(`bets`)} ms.`);
      };
      const _downloadData = () => {
        // Update DataBank first
        _updateDataBank();

        const _title = `Download Data`;

        const timer = new Tool.Timer();
        _data.forEach((item, gameId) => {
          const _conf = _games[gameId];
          _logger.info(_title, `-------------------- Game #${gameId} - ${_games[gameId].coll.group} --------------------`);
          timer.register(`start_${gameId}`);

          try {
            destination._defaultSession.startTransaction();
            destination.getDB(`minigame`)[`smartbot_${_conf.coll.group}_patterns`].deleteMany({});
            destination.getDB(`minigame`)[`smartbot_${_conf.coll.group}_bets`].deleteMany({});
            item.forEach(day => _downloadData_GameDay(gameId, day));
            destination._defaultSession.commitTransaction();
          } catch (e) {
            destination._defaultSession.abortTransaction();
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
        toString        : Object.extend({value: function () { return _toString() }}, _descriptor),
        tojson          : Object.extend({value: function () { return _toString() }}, _descriptor),
        printConfigs    : Object.extend({value: function (gameId) { return _printConfigs(gameId) }}, _descriptor),
        printData       : Object.extend({value: function (gameId) { return _printData(gameId) }}, _descriptor),
        loadGameConfigs : Object.extend({value: function (...gameIds) { return _loadGameConfigs(...gameIds) }}, _descriptor),
        loadTopDay      : Object.extend({value: function (numDay) { return _loadTopDay(numDay) }}, _descriptor),
        loadTopMem      : Object.extend({value: function (numMem) { return _loadTopMem(numMem) }}, _descriptor),
        loadTop         : Object.extend({value: function (numDay, numMem) { return _loadTop(numDay, numMem) }}, _descriptor),
        updateDataBank  : Object.extend({value: function () { return _updateDataBank() }}, _descriptor),
        downloadData    : Object.extend({value: function () { return _downloadData() }}, _descriptor),
      });
    }
  };
  const SmartBotExt = {};

  const BetLogProcessor = class {
    constructor (source, destination) {
      const _logger = new Shell.Log(`BETLOG-PROCESSOR`);
      const _assert = new Shell.Assert();
      _assert.setLogger(_logger);
      const database = `Proteus`;

      _assert.setTitle(`Audit`);
      _assert.try(
        `[source] must be a MongoDB connection.`,
        source instanceof Mongo,
      );
      _assert.try(
        `[destination] must be a MongoDB connection.`,
        destination instanceof Mongo,
      );
      if (_assert.hasError()) {
        return;
      }

      const _toString = () => {
        return `[SabaClub.BetLogProcessor] Running on [${database}] of ${source.host}`;
      };
      const _cookBetLog = (data) => {
        const cooked      = {_id: data._id};
        const requestTS   = new Type.ExtDate(data.requestTimeStamp);
        const responseTS  = new Type.ExtDate(data.responseTimeStamp);
        const logTS       = new Type.ExtDate(data.logTimeStamp);

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
        cooked.system = data.system | 1;

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
        }
      };
      const _markBetLogDone = (betlog, _ids) => {
        const title = `Mark BetLog Done ${betlog._fullName}`;
        _assert.setTitle(title);
        _assert.try(
          `[betlog] must be a collection.`,
          betlog instanceof DBCollection,
        );
        if (_assert.hasError()) {
          return;
        }

        const res = betlog.updateMany({_id: {$in: _ids}}, {$set: {'__archive.summarized': true}});
        _logger.info(title, `Updated ${res.modifiedCount} / ${res.matchedCount} logs`);
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
        if (_assert.hasError()) {
          return null;
        }

        const data = betlog.find({'__archive.summarized': {$exists: false}}, _projectBetLog(), limit).sort({_id: 1}).map(_cookBetLog);
        let res = {};
        try {
          res = dbsDst[database].betlogs.insertMany(data, {ordered: false});
          _logger.info(title, `${res.insertedIds.length} bets summarized`);
        } catch (e) {
          const err = e.getRawResponse();
          _logger.info(title, `${err.nInserted} bets summarized`);
          const idLen = Math.max(...err.writeErrors.map(_ => _.index)).toString().length;
          err.writeErrors.forEach(_ => {
            _logger.err(title, `[${_.index.toString().pad(idLen)}] ${_.errmsg}`);
          });
        }

        _markBetLogDone(betlog, data.map(_ => _._id))
        return data.length;
      };
      const _processAllBetLog = (limit) => {
        if (dbsSrc.log == null) {
          _logger.err(`Process BetLog`, `[log] database does NOT exist`);
          return;
        }

        while (_processBetLog(dbsSrc.log.bets, limit) > 0) {};
      };
      const _processAllBetLogArc = (limit) => {
        if (dbsSrc.log_arc == null) {
          _logger.err(`Process BetLog Arc`, `[log_arc] database does NOT exist`);
          return;
        }

        while (_processBetLog(dbsSrc.log_arc.bets_bk, limit) > 0) {};
      };

      const _descriptor = {
        writable: false,
        enumerable: true,
      };
      Object.defineProperties(this, {
        toString            : Object.extend({value: function () { return _toString() }}, _descriptor),
        tojson              : Object.extend({value: function () { return _toString() }}, _descriptor),
        processAllBetLog    : Object.extend({value: function (limit) { return _processAllBetLog(limit) }}, _descriptor),
        processAllBetLogArc : Object.extend({value: function (limit) { return _processAllBetLogArc(limit) }}, _descriptor),
      });

      const dbsSrc = new MongoSrv.DBs(source);
      const dbsDst = new MongoSrv.DBs(destination);
      if(dbsDst[database] == null) {
        dbsDst[database] = destination.getDB(database);
      }
    }
  };
  const BetLogProcessorExt = {};

  const BetLogSummary = class {
    constructor (source, destination) {
      const _logger = new Shell.Log(`BETLOG-SUMMARY`);
      const _assert = new Shell.Assert();
      _assert.setLogger(_logger);
      const database = `Proteus`;

      _assert.setTitle(`Audit`);
      _assert.try(
        `[source] must be a MongoDB connection.`,
        source instanceof Mongo,
      );
      _assert.try(
        `[destination] must be a MongoDB connection.`,
        destination instanceof Mongo,
      );
      if (_assert.hasError()) {
        return;
      }

      const _toString = () => {
        return `[SabaClub.BetLogProcessor] Summarize from [${source.host}] to ${destination.host}`;
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
        agg.push({$project: {_id: 0, 'data.gameType': 1, 'data.currency': 1, 'data.amount': 1, system: 1}});
        agg.push({$group: {
          _id: {
            gameId: '$data.gameType',
            currency: '$data.currency',
            system: '$system',
          },
          requestCount: {$sum: 1},
          totalAmount: {$sum: '$data.amount'},
        }});
        agg.push({$project: {
          _id: 0,
          'key.time': {$literal: _from}, 'key.gameId': `$_id.gameId`, 'key.currency': `$_id.currency`, 'key.system': `$_id.system`,
          'value.requestCount': `$requestCount`, 'value.totalAmount': `$totalAmount`,
        }});

        return agg;
      };
      const _getOldSummary = (time, round) => {
        const _time = _getTime(time, round);
        const summaries = [];
        dbsDst.summary.betlog_summaries.find(
          {time: _time},
          {_id: 0, time: 1, gameId: 1, currency: 1, system: 1},
        ).forEach(doc => {
          const _doc = {};
          Object.keys(doc).sort().forEach((k) => {
            _doc[k] = doc[k];
          });
          summaries.push(tojson(_doc));
        });

        return summaries;
      };
      const _runBetLogSummary = (time) => {
        const _round = `hour`;
        const _time = _getTime(time, _round);
        const timer = new Tool.Timer();
        const _coll = `betlog_summaries`;

        timer.register(`start`);
        const agg = _buildSummaryAgg(_time, _round);
        timer.register(`agg`);
        const oldSums = _getOldSummary(_time, _round);
        timer.register(`oldSums`);
        const summaries = dbsSrc[database].betlogs.aggregate(agg).toArray();
        timer.register(`summaries`);

        if (summaries.length > 0) {
          _logger.info(`summary`, `Summary for ${_getTimeStr(_time, _round)} started`);
        }
        summaries.forEach(doc => {
          const res = dbsDst.summary.betlog_summaries.updateOne(doc.key, {$set: doc.value}, {upsert: true});
          if (res.upsertedId) {
            _logger.info(_coll, `- Inserted new summary record for ${doc.key.currency} ${doc.key.system == 1 ? 'Cocos' : doc.key.system == 2 ? 'Mobi' : 'null'}`);
          } else if (res.modifiedCount > 0) {
            _logger.info(_coll, `- Modified summary record for ${doc.key.currency} ${doc.key.system == 1 ? 'Cocos' : doc.key.system == 2 ? 'Mobi' : 'null'}`);
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
            const res = dbsDst.summary.betlog_summaries.deleteOne(_doc);
            if (res.deletedCount > 0) {
              _logger.warn(_coll, `- Deleted summary record for ${_doc.currency} ${_doc.system == 1 ? 'Cocos' : _doc.system == 2 ? 'Mobi' : 'null'}`);
            } else {
              _logger.info(_coll, `- No summary record deleted for ${_doc.currency} ${_doc.system == 1 ? 'Cocos' : _doc.system == 2 ? 'Mobi' : 'null'}`);
            }
          } catch (e) {
            _logger.err(_coll, `- Something is WRONG while deleting summary record for ${doc}`);
            _logger.err(_coll, `    ${tojsononeline(e)}`);
          }
        });
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
        toString          : Object.extend({value: function () { return _toString() }}, _descriptor),
        tojson            : Object.extend({value: function () { return _toString() }}, _descriptor),
        runBetLogSummary  : Object.extend({value: function (time) { return _runBetLogSummary(time) }}, _descriptor),
      });

      const dbsSrc = new MongoSrv.DBs(source);
      if(dbsSrc[database] == null) {
        dbsSrc[database] = source.getDB(database);
      }
      const dbsDst = new MongoSrv.DBs(destination);
    }
  }
  const BetLogSummaryExt = {};

  // SabaClub class
  const _id = `SabaClub`;
  const version = `1.1.0`;
  const changelog = {
    '1.1.0': [
      `Release [SabaClub.BetLogProcessor]`,
      `Release [SabaClub.BetLogSummary]`,
    ],
    '1.0.3': [
      `[SabaClub.SmartBot] Add parameter for input userinfo source`,
    ],
    '1.0.2': [
      `[SabaClub.Summary] Add isCash field to summary`,
    ],
    '1.0.1': [
      `Hide internal variables & constants`,
      `Add method descriptor for enumerability`,
      `[SabaClub.Summary] Set last day/hour as default time`,
      `[SabaClub.Summary] Fix getTimeStr() error when input is not Date`,
      `[SabaClub.Summary] Fix input time being moved to 1 day prior`,
      `Release [SabaClub.SmartBot]`,
      `Add descriptor to class' universal methods`,
    ],
    '1.0.0': [
      `Release [SabaClub.Summary]`,
    ],
  };
  const value = new Code(`(() => {
    const cSummary = Object.extend(${tojson(Summary)}, ${tojson(SummaryExt)});
    const cSmartBot = Object.extend(${tojson(SmartBot)}, ${tojson(SmartBotExt)});
    const cBetLogProcessor = Object.extend(${tojson(BetLogProcessor)}, ${tojson(BetLogProcessorExt)});
    const cBetLogSummary = Object.extend(${tojson(BetLogSummary)}, ${tojson(BetLogSummaryExt)});
    const _toStr = function () {return this.constructor.name};

    const _descriptor = {
      writable: false,
      enumerable: true,
    };
    return {
      Summary: Object.defineProperties(cSummary, {toString: Object.extend({value: _toStr}, _descriptor), tojson: Object.extend({value: _toStr}, _descriptor)}),
      SmartBot: Object.defineProperties(cSmartBot, {toString: Object.extend({value: _toStr}, _descriptor), tojson: Object.extend({value: _toStr}, _descriptor)}),
      BetLogProcessor: Object.defineProperties(cBetLogProcessor, {toString: Object.extend({value: _toStr}, _descriptor), tojson: Object.extend({value: _toStr}, _descriptor)}),
      BetLogSummary: Object.defineProperties(cBetLogSummary, {toString: Object.extend({value: _toStr}, _descriptor), tojson: Object.extend({value: _toStr}, _descriptor)}),
    }
  })()`);
  const lastVersion = (db.getSiblingDB('script').system.js.findOne({_id}, {_id: 0, version: 1}) || {version}).version;
  const res = db.getSiblingDB('script').system.js.save({_id, value, version, changelog});

  // Reload library
  db.getSiblingDB('script').loadServerScripts();

  // Log result
  const logger = new Shell.Log(`CLASS-${_id.toUpperCase().pad(10,1)}`);
  if (res.nUpserted) {
    logger.verbose(`Created`, `[${_id}@${version}]`);
    break deploy;
  }
  if (res.nModified) {
    logger.verbose(`Modified`, `[${_id}@${lastVersion}] => [${_id}@${version}]`);
    break deploy;
  }
  logger.verbose(`Unchanged`, `[${_id}@${version}]`);
}
