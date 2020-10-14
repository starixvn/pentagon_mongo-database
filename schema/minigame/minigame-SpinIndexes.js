{   // spins
    [
        {   idxKeys : {memberId: 1}
        ,   idxOpts : {unique: true}
        }
    ].forEach(idx => {
        Maint.createIndex(dbs.minigame.spins, idx.idxKeys, idx.idxOpts);
    });
}

{   // spin_results
    [
        {   idxKeys : {id: 1}
        ,   idxOpts : {unique: true}
        }
    ].forEach(idx => {
        Maint.createIndex(dbs.minigame.spin_results, idx.idxKeys, idx.idxOpts);
    });
}

{   // spin_logs
    [   {   idxKeys : {key: 1, memberId: 1}
        ,   idxOpts : {unique: true}
        }
    ,   {   idxKeys : {memberId: 1, time: 1}
        ,   idxOpts : {unique: true}
        }
    ].forEach(idx => {
        Maint.createIndex(dbs.minigame.spin_logs, idx.idxKeys, idx.idxOpts);
    });
}
