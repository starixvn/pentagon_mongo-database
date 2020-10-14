{   // daily_summaries
    [
        {   idxKeys : {time: 1, currency: 1, gameId: 1}
        ,   idxOpts : {unique: true}
        }
    ].forEach((idx) => {
        Maint.createIndex(dbs.summary_arc.daily_summaries, idx.idxKeys, idx.idxOpts);
    });
}
