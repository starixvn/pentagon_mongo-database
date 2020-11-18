if ((2 ** Saba.env() & 4) > 0)
{   // spins
    [
        {   idxKeys : {memberId: 1}
        ,   idxOpts : {unique: true}
        }
    ].forEach(idx => {
        Maint.createIndex(dbs.minigame.spins, idx.idxKeys, idx.idxOpts);
    });
}

if ((2 ** Saba.env() & 4) > 0)
{   // spin_results
    [
        {   idxKeys : {id: 1}
        ,   idxOpts : {unique: true}
        }
    ].forEach(idx => {
        Maint.createIndex(dbs.minigame.spin_results, idx.idxKeys, idx.idxOpts);
    });
}

if ((2 ** Saba.env() & 4) > 0)
{   // spin_logs
    [   {   idxKeys : {roundId: 1, memberId: 1}
        ,   idxOpts : {unique: true}
        }
    ,   {   idxKeys : {memberId: 1, time: 1}
        ,   idxOpts : {unique: true}
        }
    ].forEach(idx => {
        Maint.createIndex(dbs.minigame.spin_logs, idx.idxKeys, idx.idxOpts);
    });
}
