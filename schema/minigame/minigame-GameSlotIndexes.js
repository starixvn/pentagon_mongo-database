{
    const idxs = {
        TTL : {
            idxKeys : {'__archive.eventtime': 1}
        ,   idxOpts : {expireAfterSeconds: 3600*24*8}
        }
    ,   uid_roundId: {
            idxKeys : {uid: 1, roundId: 1}
        ,   idxOpts : {unique: true}
        }
    ,   uid_paid__id: {
            idxKeys : {uid: 1, paid: 1, _id: 1}
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
    ,   currency: {
            idxKeys : {'__archive.currency': 1, memberId: 1, uid: 1}
        ,   idxOpts : {}
        }
    ,   game_pool_createdAt: {
            idxKeys : {game: 1, pool: 1, createdAt: 1}
        ,   idxOpts : {unique: true}
        }
    };

    if ((2 ** Saba.env() & 4) > 0)
    {   // Jackpot
        [idxs.game_pool_createdAt].
            forEach((idx) => {Maint.createIndex(dbs.minigame.jackpots, idx.idxKeys, idx.idxOpts)});
    }

    if ((2 ** Saba.env() & 4) > 0)
    {   // Four Guardians
        [idxs.TTL, idxs.time, idxs.id, idxs.uid_paid__id, idxs.currency].
            forEach((idx) => {Maint.createIndex(dbs.minigame.fourguardians_rounds, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL           , idxs.id, idxs.expiryTime].
            forEach((idx) => {Maint.createIndex(dbs.minigame.fourguardians_freespins, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL, idxs.time, idxs.uid_roundId].
            forEach((idx) => {Maint.createIndex(dbs.minigame.fourguardians_fames, idx.idxKeys, idx.idxOpts)});
    }
}
