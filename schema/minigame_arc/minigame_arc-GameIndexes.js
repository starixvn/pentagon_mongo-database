{
  const idxs = {
    uid_phien_U: {
      idxKeys : {uid: 1, phien: 1},
      idxOpts : {unique: true},
    },
    uid_phien_freeBet_U: {
      idxKeys : {uid: 1, phien: 1, freeBet: 1},
      idxOpts : {unique: true},
    },
    uid_phien: {
      idxKeys : {uid: 1, phien: 1},
      idxOpts : {},
    },
    time: {
      idxKeys : {time: 1},
      idxOpts : {},
    },
    id: {
      idxKeys : {id: 1},
      idxOpts : {unique: true},
    },
    phien: {
      idxKeys : {phien: 1},
      idxOpts : {},
    },
  };

  if ((2 ** Saba.env() & 14) > 0) {   // 01 - Tai Xiu
    [idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.taixiu_phiens_bk, idx.idxKeys, idx.idxOpts)});
    [           idxs.phien, idxs.uid_phien].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.taixiu_cuocs_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.time, idxs.phien, idxs.uid_phien_U].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.taixiu_ones_bk, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 02 - Xoc Dia
    [idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.xocxoc_phiens_bk, idx.idxKeys, idx.idxOpts)});
    if ((2 ** Saba.env() & 2) > 0) {    // L1
      [idxs.time, idxs.phien, idxs.uid_phien_U].
        forEach((idx) => {Maint.createIndex(dbs.minigame_arc.xocxoc_cuocs_bk, idx.idxKeys, idx.idxOpts)});
    }
    if ((2 ** Saba.env() & 4) > 0) {    // L2
      [idxs.time, idxs.phien, idxs.uid_phien_freeBet_U].
        forEach((idx) => {Maint.createIndex(dbs.minigame_arc.xocxoc_cuocs_bk, idx.idxKeys, idx.idxOpts)});
    }
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 03 - Bau Cua
    [idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.baucua_phiens_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.time, idxs.phien, idxs.uid_phien_U].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.baucua_cuocs_bk, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 04 - Tai Xiu Turbo
    [idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.txturbo_phiens_bk, idx.idxKeys, idx.idxOpts)});
    [           idxs.phien, idxs.uid_phien].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.txturbo_cuocs_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.time, idxs.phien, idxs.uid_phien_U].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.txturbo_ones_bk, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 05 - Chan Le
    [idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.chanle_phiens_bk, idx.idxKeys, idx.idxOpts)});
    [           idxs.phien, idxs.uid_phien].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.chanle_cuocs_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.time, idxs.phien, idxs.uid_phien_U].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.chanle_ones_bk, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 06 - Chan Le Turbo
    [idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.chanleturbo_phiens_bk, idx.idxKeys, idx.idxOpts)});
    [           idxs.phien, idxs.uid_phien].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.chanleturbo_cuocs_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.time, idxs.phien, idxs.uid_phien_U].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.chanleturbo_ones_bk, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 07 - Rong Ho
    [idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.minidragontiger_phiens_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.time, idxs.phien, idxs.uid_phien_U].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.minidragontiger_cuocs_bk, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 08 - Keno Pro Max
    [idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenopromax_phiens_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.time, idxs.phien, idxs.uid_phien_U].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenopromax_cuocs_bk, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 09 - Xoc Dia Mini
    [idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.minisedie_phiens_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.time, idxs.phien, idxs.uid_phien_U].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.minisedie_cuocs_bk, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 10 - Baccarat
    [idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.baccarat_phiens_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.time, idxs.phien, idxs.uid_phien_U].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.baccarat_cuocs_bk, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 11 - Keno Pro Viet
    [idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenoproviet_phiens_bk, idx.idxKeys, idx.idxOpts)});
    [           idxs.phien, idxs.uid_phien].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenoproviet_cuocs_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.time, idxs.phien, idxs.uid_phien_U].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenoproviet_ones_bk, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 12 - Keno Max
    [idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenomax_phiens_bk, idx.idxKeys, idx.idxOpts)});
    [           idxs.phien, idxs.uid_phien].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenomax_cuocs_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.time, idxs.phien, idxs.uid_phien_U].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenomax_ones_bk, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 13 - Keno Max 2
    [idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenomax2_phiens_bk, idx.idxKeys, idx.idxOpts)});
    [           idxs.phien, idxs.uid_phien].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenomax2_cuocs_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.time, idxs.phien, idxs.uid_phien_U].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenomax2_ones_bk, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 14 - Keno Mini
    [idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenomini_phiens_bk, idx.idxKeys, idx.idxOpts)});
    [           idxs.phien, idxs.uid_phien].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenomini_cuocs_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.time, idxs.phien, idxs.uid_phien_U].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenomini_ones_bk, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 15 - Keno Mini 2
    [idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenomini2_phiens_bk, idx.idxKeys, idx.idxOpts)});
    [           idxs.phien, idxs.uid_phien].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenomini2_cuocs_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.time, idxs.phien, idxs.uid_phien_U].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenomini2_ones_bk, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 16 - Keno East
    [idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenoeast_phiens_bk, idx.idxKeys, idx.idxOpts)});
    [           idxs.phien, idxs.uid_phien].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenoeast_cuocs_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.time, idxs.phien, idxs.uid_phien_U].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenoeast_ones_bk, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 17 - Keno West
    [idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenowest_phiens_bk, idx.idxKeys, idx.idxOpts)});
    [           idxs.phien, idxs.uid_phien].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenowest_cuocs_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.time, idxs.phien, idxs.uid_phien_U].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenowest_ones_bk, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 18 - Keno South
    [idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenosouth_phiens_bk, idx.idxKeys, idx.idxOpts)});
    [           idxs.phien, idxs.uid_phien].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenosouth_cuocs_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.time, idxs.phien, idxs.uid_phien_U].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.kenosouth_ones_bk, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 19 - Keno North
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

  if ((2 ** Saba.env() & 14) > 0) {   // 21 - Roulette
    [idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.roulette_phiens_bk, idx.idxKeys, idx.idxOpts)});
    [           idxs.phien, idxs.uid_phien].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.roulette_cuocs_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.time, idxs.phien, idxs.uid_phien_U].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.roulette_ones_bk, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 22 - Xoc Dia VIP
    [idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.vipsedie_phiens_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.time, idxs.phien, idxs.uid_phien_U].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.vipsedie_cuocs_bk, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 23 - Blackjack
    [idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.blackjack_phiens_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.time, idxs.phien, idxs.id, idxs.uid_phien].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.blackjack_cuocs_bk, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 24 - Xoc Dia Can Cua
    [idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.specialsedie_phiens_bk, idx.idxKeys, idx.idxOpts)});
    [           idxs.phien, idxs.uid_phien].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.specialsedie_cuocs_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.time, idxs.phien, idxs.uid_phien_U].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.specialsedie_ones_bk, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 25 - Sic Bo
    [idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.sicbo_phiens_bk, idx.idxKeys, idx.idxOpts)});
    [           idxs.phien, idxs.uid_phien].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.sicbo_cuocs_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.time, idxs.phien, idxs.uid_phien_U].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.sicbo_ones_bk, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 26 - Bau Cua VIP
    [idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.vipfishprawncrab_phiens_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.time, idxs.phien, idxs.uid_phien_U].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.vipfishprawncrab_cuocs_bk, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 27 - Cào Baccarat VIP
    [idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.vipbaccarat_phiens_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.time, idxs.phien, idxs.uid_phien_U].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.vipbaccarat_cuocs_bk, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 28 - Xoc Dia Doi Khang
    [idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.vipsediewar_phiens_bk, idx.idxKeys, idx.idxOpts)});
    [           idxs.phien, idxs.uid_phien].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.vipsediewar_cuocs_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.time, idxs.phien, idxs.uid_phien_U].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.vipsediewar_ones_bk, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 6) > 0) {   // 31 - Xo So
    [idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.lottery_phiens_bk, idx.idxKeys, idx.idxOpts)});
    [           idxs.phien, idxs.uid_phien].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.lottery_cuocs_bk, idx.idxKeys, idx.idxOpts)});
    [idxs.time, idxs.phien, idxs.uid_phien_U].
      forEach((idx) => {Maint.createIndex(dbs.minigame_arc.lottery_ones_bk, idx.idxKeys, idx.idxOpts)});
  }

}
