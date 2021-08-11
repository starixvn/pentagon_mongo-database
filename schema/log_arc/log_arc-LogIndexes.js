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
      forEach(idx => {Maint.createIndex(db.getSiblingDB('log_arc').bets_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.requestTimeStamp, idxs.summarized].
      forEach(idx => {Maint.createIndex(db.getSiblingDB('log_arc').end_games_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.requestTimeStamp, idxs.summarized].
      forEach(idx => {Maint.createIndex(db.getSiblingDB('log_arc').failed_requests_bk, idx.idxKeys, idx.idxOpts)});
  }
  if ((2 ** Saba.env() & 6) > 0) {
    [idxs.requestTimeStamp].
      forEach(idx => {Maint.createIndex(db.getSiblingDB('log_arc').signin_requests_bk, idx.idxKeys, idx.idxOpts)});
  }
  if ((2 ** Saba.env() & 8) > 0) {
    [idxs.requestTimeStamp].
      forEach(idx => {Maint.createIndex(db.getSiblingDB('log_arc').signins_bk, idx.idxKeys, idx.idxOpts)});
  }
}
