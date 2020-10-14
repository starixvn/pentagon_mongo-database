{
    const idxs = {
        TTL : {
            idxKeys : {'__archive.eventtime': 1}
        ,   idxOpts : {expireAfterSeconds: 3600*24*8}
        }
    ,   uid_phien: {
            idxKeys : {uid: 1, phien: 1}
        ,   idxOpts : {unique: true}
        }
    ,   uid_phien_freeBet: {
            idxKeys : {uid: 1, phien: 1, freeBet: 1}
        ,   idxOpts : {unique: true}
        }
    ,   uid_thanhtoan__id: {
            idxKeys : {uid: 1, thanhtoan: 1, _id: 1}
        ,   idxOpts : {}
        }
    ,   uid__id: {
            idxKeys : {uid: 1, _id: 1}
        ,   idxOpts : {}
        }
    ,   time: {
            idxKeys : {time: 1}
        ,   idxOpts : {}
        }
    ,   timeTTL: {
            idxKeys : {time: 1}
        ,   idxOpts : {expireAfterSeconds: 120}
        }
    ,   id: {
            idxKeys : {id: 1}
        ,   idxOpts : {unique: true}
        }
    ,   phien__id: {
            idxKeys : {phien: 1, _id: 1}
        ,   idxOpts : {}
        }
    };

    {   // 01 - Tai Xiu
        [idxs.TTL, idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.taixiu_phiens, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL           , idxs.phien__id, idxs.uid_thanhtoan__id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.taixiu_cuocs, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame.taixiu_ones, idx.idxKeys, idx.idxOpts)});
    }

    {   // 02 - Xoc Dia
        [idxs.TTL, idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.xocxoc_phiens, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien_freeBet, idxs.uid_thanhtoan__id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.xocxoc_cuocs, idx.idxKeys, idx.idxOpts)});
        [idxs.timeTTL       , idxs.phien__id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.xocxoc_tmpcuocs, idx.idxKeys, idx.idxOpts)});
    }

    {   // 03 - Bau Cua
        [idxs.TTL, idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.baucua_phiens, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.uid_thanhtoan__id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.baucua_cuocs, idx.idxKeys, idx.idxOpts)});
    }

    {   // 04 - Tai Xiu Turbo
        [idxs.TTL, idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.txturbo_phiens, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL           , idxs.phien__id, idxs.uid_thanhtoan__id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.txturbo_cuocs, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame.txturbo_ones, idx.idxKeys, idx.idxOpts)});
    }

    {   // 05 - Chan Le
        [idxs.TTL, idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.chanle_phiens, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL           , idxs.phien__id, idxs.uid_thanhtoan__id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.chanle_cuocs, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame.chanle_ones, idx.idxKeys, idx.idxOpts)});
    }

    {   // 06 - Chan Le Turbo
        [idxs.TTL, idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.chanleturbo_phiens, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL           , idxs.phien__id, idxs.uid_thanhtoan__id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.chanleturbo_cuocs, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame.chanleturbo_ones, idx.idxKeys, idx.idxOpts)});
    }

    {   // 07 - Rong Ho
        [idxs.TTL, idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.minidragontiger_phiens, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.uid_thanhtoan__id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.minidragontiger_cuocs, idx.idxKeys, idx.idxOpts)});
    }

    {   // 08 - Keno Pro Max
        [idxs.TTL, idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenopromax_phiens, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.uid_thanhtoan__id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenopromax_cuocs, idx.idxKeys, idx.idxOpts)});
        [idxs.timeTTL       , idxs.phien__id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenopromax_tmpcuocs, idx.idxKeys, idx.idxOpts)});
    }

    {   // 09 - Xoc Dia Mini
        [idxs.TTL, idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.minisedie_phiens, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.uid_thanhtoan__id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.minisedie_cuocs, idx.idxKeys, idx.idxOpts)});
    }

    {   // 10 - Baccarat
        [idxs.TTL, idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.baccarat_phiens, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.uid_thanhtoan__id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.baccarat_cuocs, idx.idxKeys, idx.idxOpts)});
        [idxs.timeTTL       , idxs.phien__id, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame.baccarat_tmpcuocs, idx.idxKeys, idx.idxOpts)});
    }

    {   // 11 - Keno Pro Viet
        [idxs.TTL, idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenoproviet_phiens, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenoproviet_phiens_logs, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL           , idxs.phien__id, idxs.uid__id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenoproviet_cuocs, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenoproviet_ones, idx.idxKeys, idx.idxOpts)});
    }

    {   // 12 - Keno Max
        [idxs.TTL, idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenomax_phiens, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL           , idxs.phien__id, idxs.uid__id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenomax_cuocs, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenomax_ones, idx.idxKeys, idx.idxOpts)});
    }

    {   // 13 - Keno Max 2
        [idxs.TTL, idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenomax2_phiens, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL           , idxs.phien__id, idxs.uid__id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenomax2_cuocs, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenomax2_ones, idx.idxKeys, idx.idxOpts)});
    }

    {   // 14 - Keno Mini
        [idxs.TTL, idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenomini_phiens, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL           , idxs.phien__id, idxs.uid__id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenomini_cuocs, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenomini_ones, idx.idxKeys, idx.idxOpts)});
    }

    {   // 15 - Keno Mini 2
        [idxs.TTL, idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenomini2_phiens, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL           , idxs.phien__id, idxs.uid__id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenomini2_cuocs, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenomini2_ones, idx.idxKeys, idx.idxOpts)});
    }

    {   // 16 - Keno East
        [idxs.TTL, idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenoeast_phiens, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL           , idxs.phien__id, idxs.uid__id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenoeast_cuocs, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenoeast_ones, idx.idxKeys, idx.idxOpts)});
    }

    {   // 17 - Keno West
        [idxs.TTL, idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenowest_phiens, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL           , idxs.phien__id, idxs.uid__id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenowest_cuocs, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenowest_ones, idx.idxKeys, idx.idxOpts)});
    }

    {   // 18 - Keno South
        [idxs.TTL, idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenosouth_phiens, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL           , idxs.phien__id, idxs.uid__id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenosouth_cuocs, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenosouth_ones, idx.idxKeys, idx.idxOpts)});
    }

    {   // 19 - Keno North
        [idxs.TTL, idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenonorth_phiens, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL           , idxs.phien__id, idxs.uid__id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenonorth_cuocs, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame.kenonorth_ones, idx.idxKeys, idx.idxOpts)});
    }

    {   // 20 - Bola Tangkas
        // Not supported
    }

    {   // 21 - Roulette
        [idxs.TTL, idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.roulette_phiens, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL           , idxs.phien__id, idxs.uid__id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.roulette_cuocs, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame.roulette_ones, idx.idxKeys, idx.idxOpts)});
        [idxs.timeTTL       , idxs.phien__id, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame.roulette_tmpones, idx.idxKeys, idx.idxOpts)});
    }

    {   // 22 - Xoc Dia VIP
        [idxs.TTL, idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.vipsedie_phiens, idx.idxKeys, idx.idxOpts)});
        [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.uid_thanhtoan__id].
            forEach((idx) => {Maint.createIndex(dbs.minigame.vipsedie_cuocs, idx.idxKeys, idx.idxOpts)});
        [idxs.timeTTL       , idxs.phien__id, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame.vipsedie_tmpcuocs, idx.idxKeys, idx.idxOpts)});
    }
}
