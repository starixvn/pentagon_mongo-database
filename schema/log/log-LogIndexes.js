if ((2 ** Saba.env() & 14) > 0)
{   // bets
    [
        {   idxKeys : {requestTimeStamp: 1}
        ,   idxOpts : {}
        }
    ,   {   idxKeys : {"call.obCustId": 1, "call.gameRoundId": 1, "call.gameTypeId": 1}
        ,   idxOpts : {}
        }
    ,   {   idxKeys : {"__archive.eventtime": 1}
        ,   idxOpts : {expireAfterSeconds: 691200}
        }
    ].forEach((idx) => {
        Maint.createIndex(dbs.log.bets, idx.idxKeys, idx.idxOpts);
    });
}
