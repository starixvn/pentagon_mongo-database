{
  const idxs = {
    TTL: {
      idxKeys : {time: 1},
      idxOpts : {expireAfterSeconds: 3600*24*8},
    },
    time_currency_gameId_system: {
      idxKeys : {time: 1, currency: 1, gameId: 1, system: 1},
      idxOpts : {unique: true},
    },
    gameId_system_time: {
      idxKeys : {gameId: 1, system: 1, time: 1},
      idxOpts : {},
    }
  }

  if ((2 ** Saba.env() & 14) > 0) { // betlog_summaries
      [idxs.TTL, idxs.time_currency_gameId_system, idxs.gameId_system_time].
        forEach((idx) => {Maint.createIndex(db.getSiblingDB('summary').betlog_summaries, idx.idxKeys, idx.idxOpts)});
  }
}
