{   // daily_summaries
    [
        {
            idxKeys : {time: 1, currency: 1, gameId: 1}
        ,   idxOpts : {unique: true}
        }
    ,   {
            idxKeys : {time: 1}
        ,   idxOpts : {expireAfterSeconds: 3600*24*8}
        }
    ].forEach((idx) => {
        Maint.createIndex(dbs.summary.daily_summaries, idx.idxKeys, idx.idxOpts);
    });
}
