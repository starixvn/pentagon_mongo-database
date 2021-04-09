{
    const idxs = {
        time_group : {
            idxKeys : {gameId: 1, time: 1, group: 1}
        ,   idxOpts : {}
        }
    ,   memberId_time: {
            idxKeys : {gameId: 1, memberId: 1, time: 1}
        ,   idxOpts : {unique: true}
        }
    ,   patId_time: {
            idxKeys : {gameId: 1, patId: 1, time: 1}
        ,   idxOpts : {}
        }
    };

    if ((2 ** Saba.env() & 6) > 0)
    {   // Data Bank
        [idxs.memberId_time, idxs.time_group].
            forEach((idx) => {Maint.createIndex(dbs.summary_arc.smartbot_databank_patterns, idx.idxKeys, idx.idxOpts)});
        [idxs.patId_time].
            forEach((idx) => {Maint.createIndex(dbs.summary_arc.smartbot_databank_bets, idx.idxKeys, idx.idxOpts)});
    }
}
