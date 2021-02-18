if ((2 ** Saba.env() & 14) > 0)
{   // daily_summaries
    [
        {   idxKeys : {time: 1, currency: 1, gameId: 1}
        ,   idxOpts : {unique: true}
        }
    ,   {   idxKeys : {gameId: 1, currency: 1}
        ,   idxOpts : {}
        }
    ].forEach((idx) => {
        Maint.createIndex(dbs.summary_arc.daily_summaries, idx.idxKeys, idx.idxOpts);
    });
}
