{
  const idxs = {
    TTL : {
      idxKeys : {'__archive.eventtime': 1},
      idxOpts : {expireAfterSeconds: 3600*24*8},
    },
    requestTimeStamp: {
      idxKeys : {requestTimeStamp: 1},
      idxOpts : {},
    },
    obCustId_gameRoundId_gameTypeId: {
      idxKeys : {'call.obCustId': 1, 'call.gameRoundId': 1, 'call.gameTypeId': 1},
      idxOpts : {},
    },
    gameTypeId_gameRoundId_obCustId: {
      idxKeys : {'call.gameTypeId': 1, 'call.gameRoundId': 1, 'call.obCustId': 1},
      idxOpts : {},
    },
    obTransId: {
      idxKeys : {'result.obTransId': 1},
      idxOpts : {},
    },
    summarized: {
      idxKeys : {'__archive.summarized': 1, _id: 1},
      idxOpts : {},
    },
    memberId: {
      idxKeys : {'request.memberId': 1},
      idxOpts : {},
    },
    memberId3: {
      idxKeys : {'memberAuth.memberId': 1},
      idxOpts : {},
    },
  };

  if ((2 ** Saba.env() & 14) > 0) {
    [idxs.TTL, idxs.requestTimeStamp, idxs.obCustId_gameRoundId_gameTypeId, idxs.gameTypeId_gameRoundId_obCustId, idxs.obTransId, idxs.summarized].
      forEach(idx => {Maint.createIndex(dbs.log.bets, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.requestTimeStamp, idxs.obCustId_gameRoundId_gameTypeId, idxs.gameTypeId_gameRoundId_obCustId].
      forEach(idx => {Maint.createIndex(dbs.log.end_games, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.requestTimeStamp, idxs.obCustId_gameRoundId_gameTypeId, idxs.gameTypeId_gameRoundId_obCustId].
      forEach(idx => {Maint.createIndex(dbs.log.failed_requests, idx.idxKeys, idx.idxOpts)});
  }
  if ((2 ** Saba.env() & 6) > 0) {
    [idxs.TTL, idxs.requestTimeStamp, idxs.memberId].
      forEach(idx => {Maint.createIndex(dbs.log.signin_requests, idx.idxKeys, idx.idxOpts)});
  }
  if ((2 ** Saba.env() & 8) > 0) {
    [idxs.TTL, idxs.requestTimeStamp, idxs.memberId3].
      forEach(idx => {Maint.createIndex(dbs.log.signins, idx.idxKeys, idx.idxOpts)});
  }
}
