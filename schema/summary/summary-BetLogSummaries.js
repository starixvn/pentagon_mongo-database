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
  }

  if ((2 ** Saba.env() & 14) > 0) { // betlog_summaries
      [idxs.TTL, idxs.time_currency_gameId_system].
        forEach((idx) => {Maint.createIndex(dbs.summary.betlog_summaries, idx.idxKeys, idx.idxOpts)});
  }
}
