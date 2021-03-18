{
    const idxs = {
        time_group : {
            idxKeys : {time: 1, group: 1}
        ,   idxOpts : {}
        }
    ,   patId_time: {
            idxKeys : {patId: 1, time: 1}
        ,   idxOpts : {}
        }
    };

    if ((2 ** Saba.env() & 6) > 0)
    {   // xocxoc
        [idxs.time_group].
            forEach((idx) => {Maint.createIndex(dbs.minigame.smartbot_xocxoc_patterns, idx.idxKeys, idx.idxOpts)});
        [idxs.patId_time].
            forEach((idx) => {Maint.createIndex(dbs.minigame.smartbot_xocxoc_bets, idx.idxKeys, idx.idxOpts)});
    }

    if ((2 ** Saba.env() & 6) > 0)
    {   // vipsedie
        [idxs.time_group].
            forEach((idx) => {Maint.createIndex(dbs.minigame.smartbot_vipsedie_patterns, idx.idxKeys, idx.idxOpts)});
        [idxs.patId_time].
            forEach((idx) => {Maint.createIndex(dbs.minigame.smartbot_vipsedie_bets, idx.idxKeys, idx.idxOpts)});
    }

    if ((2 ** Saba.env() & 6) > 0)
    {   // taixiu
        [idxs.time_group].
            forEach((idx) => {Maint.createIndex(dbs.minigame.smartbot_taixiu_patterns, idx.idxKeys, idx.idxOpts)});
        [idxs.patId_time].
            forEach((idx) => {Maint.createIndex(dbs.minigame.smartbot_taixiu_bets, idx.idxKeys, idx.idxOpts)});
    }

    if ((2 ** Saba.env() & 6) > 0)
    {   // txturbo
        [idxs.time_group].
            forEach((idx) => {Maint.createIndex(dbs.minigame.smartbot_txturbo_patterns, idx.idxKeys, idx.idxOpts)});
        [idxs.patId_time].
            forEach((idx) => {Maint.createIndex(dbs.minigame.smartbot_txturbo_bets, idx.idxKeys, idx.idxOpts)});
    }
}
