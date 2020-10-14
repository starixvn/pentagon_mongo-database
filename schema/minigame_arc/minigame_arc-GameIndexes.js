{
    const idxs = {
        uid_phien_U: {
            idxKeys : {uid: 1, phien: 1}
        ,   idxOpts : {unique: true}
        }
    ,   uid_phien_freeBet_U: {
            idxKeys : {uid: 1, phien: 1, freeBet: 1}
        ,   idxOpts : {unique: true}
        }
    ,   uid_phien: {
            idxKeys : {uid: 1, phien: 1}
        ,   idxOpts : {}
        }
    ,   time: {
            idxKeys : {time: 1}
        ,   idxOpts : {}
        }
    ,   id: {
            idxKeys : {id: 1}
        ,   idxOpts : {unique: true}
        }
    ,   phien: {
            idxKeys : {phien: 1}
        ,   idxOpts : {}
        }
    };

    {   // 01 - Tai Xiu
        [idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.taixiu_phiens_bk, idx.idxKeys, idx.idxOpts)});
        [           idxs.phien, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.taixiu_cuocs_bk, idx.idxKeys, idx.idxOpts)});
        [idxs.time, idxs.phien, idxs.uid_phien_U].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.taixiu_ones_bk, idx.idxKeys, idx.idxOpts)});
    }

    {   // 02 - Xoc Dia
        [idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.xocxoc_phiens_bk, idx.idxKeys, idx.idxOpts)});
        [idxs.time, idxs.phien, idxs.uid_phien_freeBet_U].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.xocxoc_cuocs_bk, idx.idxKeys, idx.idxOpts)});
    }

    {   // 03 - Bau Cua
        [idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.baucua_phiens_bk, idx.idxKeys, idx.idxOpts)});
        [idxs.time, idxs.phien, idxs.uid_phien_U].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.baucua_cuocs_bk, idx.idxKeys, idx.idxOpts)});
    }

    {   // 04 - Tai Xiu Turbo
        [idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.txturbo_phiens_bk, idx.idxKeys, idx.idxOpts)});
        [           idxs.phien, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.txturbo_cuocs_bk, idx.idxKeys, idx.idxOpts)});
        [idxs.time, idxs.phien, idxs.uid_phien_U].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.txturbo_ones_bk, idx.idxKeys, idx.idxOpts)});
    }

    {   // 05 - Chan Le
        [idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.chanle_phiens_bk, idx.idxKeys, idx.idxOpts)});
        [           idxs.phien, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.chanle_cuocs_bk, idx.idxKeys, idx.idxOpts)});
        [idxs.time, idxs.phien, idxs.uid_phien_U].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.chanle_ones_bk, idx.idxKeys, idx.idxOpts)});
    }

    {   // 06 - Chan Le Turbo
        [idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.chanleturbo_phiens_bk, idx.idxKeys, idx.idxOpts)});
        [           idxs.phien, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.chanleturbo_cuocs_bk, idx.idxKeys, idx.idxOpts)});
        [idxs.time, idxs.phien, idxs.uid_phien_U].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.chanleturbo_ones_bk, idx.idxKeys, idx.idxOpts)});
    }

    {   // 07 - Rong Ho
        [idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.minidragontiger_phiens_bk, idx.idxKeys, idx.idxOpts)});
        [idxs.time, idxs.phien, idxs.uid_phien_U].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.minidragontiger_cuocs_bk, idx.idxKeys, idx.idxOpts)});
    }

    {   // 08 - Keno Pro Max
        [idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenopromax_phiens_bk, idx.idxKeys, idx.idxOpts)});
        [idxs.time, idxs.phien, idxs.uid_phien_U].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenopromax_cuocs_bk, idx.idxKeys, idx.idxOpts)});
    }

    {   // 09 - Xoc Dia Mini
        [idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.minisedie_phiens_bk, idx.idxKeys, idx.idxOpts)});
        [idxs.time, idxs.phien, idxs.uid_phien_U].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.minisedie_cuocs_bk, idx.idxKeys, idx.idxOpts)});
    }

    {   // 10 - Baccarat
        [idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.baccarat_phiens_bk, idx.idxKeys, idx.idxOpts)});
        [idxs.time, idxs.phien, idxs.uid_phien_U].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.baccarat_cuocs_bk, idx.idxKeys, idx.idxOpts)});
    }

    {   // 11 - Keno Pro Viet
        [idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenoproviet_phiens_bk, idx.idxKeys, idx.idxOpts)});
        [           idxs.phien, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenoproviet_cuocs_bk, idx.idxKeys, idx.idxOpts)});
        [idxs.time, idxs.phien, idxs.uid_phien_U].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenoproviet_ones_bk, idx.idxKeys, idx.idxOpts)});
    }

    {   // 12 - Keno Max
        [idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenomax_phiens_bk, idx.idxKeys, idx.idxOpts)});
        [           idxs.phien, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenomax_cuocs_bk, idx.idxKeys, idx.idxOpts)});
        [idxs.time, idxs.phien, idxs.uid_phien_U].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenomax_ones_bk, idx.idxKeys, idx.idxOpts)});
    }

    {   // 13 - Keno Max 2
        [idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenomax2_phiens_bk, idx.idxKeys, idx.idxOpts)});
        [           idxs.phien, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenomax2_cuocs_bk, idx.idxKeys, idx.idxOpts)});
        [idxs.time, idxs.phien, idxs.uid_phien_U].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenomax2_ones_bk, idx.idxKeys, idx.idxOpts)});
    }

    {   // 14 - Keno Mini
        [idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenomini_phiens_bk, idx.idxKeys, idx.idxOpts)});
        [           idxs.phien, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenomini_cuocs_bk, idx.idxKeys, idx.idxOpts)});
        [idxs.time, idxs.phien, idxs.uid_phien_U].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenomini_ones_bk, idx.idxKeys, idx.idxOpts)});
    }

    {   // 15 - Keno Mini 2
        [idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenomini2_phiens_bk, idx.idxKeys, idx.idxOpts)});
        [           idxs.phien, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenomini2_cuocs_bk, idx.idxKeys, idx.idxOpts)});
        [idxs.time, idxs.phien, idxs.uid_phien_U].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenomini2_ones_bk, idx.idxKeys, idx.idxOpts)});
    }

    {   // 16 - Keno East
        [idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenoeast_phiens_bk, idx.idxKeys, idx.idxOpts)});
        [           idxs.phien, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenoeast_cuocs_bk, idx.idxKeys, idx.idxOpts)});
        [idxs.time, idxs.phien, idxs.uid_phien_U].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenoeast_ones_bk, idx.idxKeys, idx.idxOpts)});
    }

    {   // 17 - Keno West
        [idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenowest_phiens_bk, idx.idxKeys, idx.idxOpts)});
        [           idxs.phien, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenowest_cuocs_bk, idx.idxKeys, idx.idxOpts)});
        [idxs.time, idxs.phien, idxs.uid_phien_U].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenowest_ones_bk, idx.idxKeys, idx.idxOpts)});
    }

    {   // 18 - Keno South
        [idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenosouth_phiens_bk, idx.idxKeys, idx.idxOpts)});
        [           idxs.phien, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenosouth_cuocs_bk, idx.idxKeys, idx.idxOpts)});
        [idxs.time, idxs.phien, idxs.uid_phien_U].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenosouth_ones_bk, idx.idxKeys, idx.idxOpts)});
    }

    {   // 19 - Keno North
        [idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenonorth_phiens_bk, idx.idxKeys, idx.idxOpts)});
        [           idxs.phien, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenonorth_cuocs_bk, idx.idxKeys, idx.idxOpts)});
        [idxs.time, idxs.phien, idxs.uid_phien_U].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenonorth_ones_bk, idx.idxKeys, idx.idxOpts)});
    }

    {   // 20 - Bola Tangkas
        // Not supported
    }

    {   // 21 - Roulette
        [idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.roulette_phiens_bk, idx.idxKeys, idx.idxOpts)});
        [           idxs.phien, idxs.uid_phien].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.roulette_cuocs_bk, idx.idxKeys, idx.idxOpts)});
        [idxs.time, idxs.phien, idxs.uid_phien_U].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.roulette_ones_bk, idx.idxKeys, idx.idxOpts)});
    }

    {   // 22 - Xoc Dia VIP
        [idxs.time, idxs.id].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.vipsedie_phiens_bk, idx.idxKeys, idx.idxOpts)});
        [idxs.time, idxs.phien, idxs.uid_phien_U].
            forEach((idx) => {Maint.createIndex(dbs.minigame_arc.vipsedie_cuocs_bk, idx.idxKeys, idx.idxOpts)});
    }
}
