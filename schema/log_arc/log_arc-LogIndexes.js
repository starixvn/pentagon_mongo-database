if ((2 ** Saba.env() & 14) > 0)
{   // bets_bk
    [
        {   idxKeys : {requestTimeStamp: 1}
        ,   idxOpts : {}
        }
    ].forEach((idx) => {
        Maint.createIndex(dbs.log_arc.bets_bk, idx.idxKeys, idx.idxOpts);
    });
}
