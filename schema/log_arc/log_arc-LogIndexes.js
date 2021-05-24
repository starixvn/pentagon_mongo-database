{
  const idxs = {
    requestTimeStamp: {
      idxKeys : {requestTimeStamp: 1},
      idxOpts : {},
    },
    summarized: {
      idxKeys : {'__archive.summarized': 1, _id: 1},
      idxOpts : {},
    },
  };

  if ((2 ** Saba.env() & 14) > 0) {
    [idxs.requestTimeStamp, idxs.summarized].
      forEach(idx => {Maint.createIndex(dbs.log_arc.bets_bk, idx.idxKeys, idx.idxOpts)});
  }
}
