{
    const idxs = {
        uid_roundId: {
            idxKeys : {uid: 1, roundId: 1}
        ,   idxOpts : {unique: true}
        }
    ,   uid_id: {
            idxKeys : {uid: 1, id: 1}
        ,   idxOpts : {}
        }
    ,   time: {
            idxKeys : {time: 1}
        ,   idxOpts : {}
        }
    ,   expiryTime: {
            idxKeys : {expiryTime: 1}
        ,   idxOpts : {}
        }
    ,   id: {
            idxKeys : {id: 1}
        ,   idxOpts : {unique: true}
        }
    };

    if ((2 ** Saba.env() & 6) > 0)
    {   // Four Guardians
        [idxs.time, idxs.id, idxs.uid_id].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.fourguardians_rounds_bk, idx.idxKeys, idx.idxOpts)});
        [           idxs.id, idxs.expiryTime].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.fourguardians_freespins_bk, idx.idxKeys, idx.idxOpts)});
        [idxs.time, idxs.uid_roundId].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.fourguardians_fames_bk, idx.idxKeys, idx.idxOpts)});
    }
}
