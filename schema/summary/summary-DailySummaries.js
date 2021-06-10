{
  const idxs = {
    TTL: {
      idxKeys : {time: 1},
      idxOpts : {expireAfterSeconds: 3600*24*8},
    },
    time_currency_gameId_cash: {
      idxKeys : {time: 1, currency: 1, gameId: 1, isCash: 1},
      idxOpts : {unique: true},
    },
  }

  if ((2 ** Saba.env() & 14) > 0) { // daily_summaries
    [idxs.TTL, idxs.time_currency_gameId_cash].
      forEach((idx) => {Maint.createIndex(dbs.summary.daily_summaries, idx.idxKeys, idx.idxOpts)});
  }
  if ((2 ** Saba.env() & 14) > 0) { // hourly_summaries
    [idxs.TTL, idxs.time_currency_gameId_cash].
      forEach((idx) => {Maint.createIndex(dbs.summary.hourly_summaries, idx.idxKeys, idx.idxOpts)});
  }
}