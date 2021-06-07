{
  const idxs = {
    TTL : {
      idxKeys : {'__archive.eventtime': 1},
      idxOpts : {expireAfterSeconds: 3600*24*8},
    },
    uid_phien: {
      idxKeys : {uid: 1, phien: 1},
      idxOpts : {unique: true},
    },
    uid_phien_freeBet: {
      idxKeys : {uid: 1, phien: 1, freeBet: 1},
      idxOpts : {unique: true},
    },
    uid_thanhtoan__id: {
      idxKeys : {uid: 1, thanhtoan: 1, _id: 1},
      idxOpts : {},
    },
    uid__id: {
      idxKeys : {uid: 1, _id: 1},
      idxOpts : {},
    },
    time: {
      idxKeys : {time: 1},
      idxOpts : {},
    },
    timeTTL: {
      idxKeys : {time: 1},
      idxOpts : {expireAfterSeconds: 120},
    },
    id: {
      idxKeys : {id: 1},
      idxOpts : {unique: true},
    },
    phien__id: {
      idxKeys : {phien: 1, _id: 1},
      idxOpts : {},
    },
    currency: {
      idxKeys : {'__archive.currency': 1, memberId: 1, uid: 1},
      idxOpts : {},
    },
    isCash: {
      idxKeys : {'__archive.isCash': 1, memberId: 1, uid: 1},
      idxOpts : {},
    },
    ended: {
      idxKeys : {ended: 1},
      idxOpts : {},
    },
  };

  if ((2 ** Saba.env() & 14) > 0) {   // 01 - Tai Xiu
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.taixiu_phiens, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL           , idxs.phien__id, idxs.uid_thanhtoan__id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.taixiu_cuocs, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.currency, idxs.isCash].
      forEach((idx) => {Maint.createIndex(dbs.minigame.taixiu_ones, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 02 - Xoc Dia
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.xocxoc_phiens, idx.idxKeys, idx.idxOpts)});
    if ((2 ** Saba.env() & 10) > 0) {    // L1 - L3
      [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.uid_thanhtoan__id, idxs.currency, idxs.isCash].
        forEach((idx) => {Maint.createIndex(dbs.minigame.xocxoc_cuocs, idx.idxKeys, idx.idxOpts)});
    }
    if ((2 ** Saba.env() & 4) > 0) {    // L2
      [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien_freeBet, idxs.uid_thanhtoan__id, idxs.currency, idxs.isCash].
        forEach((idx) => {Maint.createIndex(dbs.minigame.xocxoc_cuocs, idx.idxKeys, idx.idxOpts)});
    }
    [idxs.timeTTL       , idxs.phien__id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.xocxoc_tmpcuocs, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 03 - Bau Cua
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.baucua_phiens, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.uid_thanhtoan__id, idxs.currency, idxs.isCash].
      forEach((idx) => {Maint.createIndex(dbs.minigame.baucua_cuocs, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 04 - Tai Xiu Turbo
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.txturbo_phiens, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL           , idxs.phien__id, idxs.uid_thanhtoan__id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.txturbo_cuocs, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.currency, idxs.isCash].
      forEach((idx) => {Maint.createIndex(dbs.minigame.txturbo_ones, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 05 - Chan Le
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.chanle_phiens, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL           , idxs.phien__id, idxs.uid_thanhtoan__id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.chanle_cuocs, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.currency, idxs.isCash].
      forEach((idx) => {Maint.createIndex(dbs.minigame.chanle_ones, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 06 - Chan Le Turbo
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.chanleturbo_phiens, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL           , idxs.phien__id, idxs.uid_thanhtoan__id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.chanleturbo_cuocs, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.currency, idxs.isCash].
      forEach((idx) => {Maint.createIndex(dbs.minigame.chanleturbo_ones, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 07 - Rong Ho
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.minidragontiger_phiens, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.uid_thanhtoan__id, idxs.currency, idxs.isCash].
      forEach((idx) => {Maint.createIndex(dbs.minigame.minidragontiger_cuocs, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 08 - Keno Pro Max
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenopromax_phiens, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.uid_thanhtoan__id, idxs.currency, idxs.isCash].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenopromax_cuocs, idx.idxKeys, idx.idxOpts)});
    [idxs.timeTTL       , idxs.phien__id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenopromax_tmpcuocs, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 6) > 0) {   // 09 - Xoc Dia Mini
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.minisedie_phiens, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.uid_thanhtoan__id, idxs.currency, idxs.isCash].
      forEach((idx) => {Maint.createIndex(dbs.minigame.minisedie_cuocs, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 10 - Baccarat
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.baccarat_phiens, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.uid_thanhtoan__id, idxs.currency, idxs.isCash].
      forEach((idx) => {Maint.createIndex(dbs.minigame.baccarat_cuocs, idx.idxKeys, idx.idxOpts)});
    [idxs.timeTTL       , idxs.phien__id, idxs.uid_phien].
      forEach((idx) => {Maint.createIndex(dbs.minigame.baccarat_tmpcuocs, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 6) > 0) {   // 11 - Keno Pro Viet
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenoproviet_phiens, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenoproviet_phiens_logs, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL           , idxs.phien__id, idxs.uid__id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenoproviet_cuocs, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.currency, idxs.isCash].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenoproviet_ones, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 12 - Keno Max
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenomax_phiens, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL           , idxs.phien__id, idxs.uid__id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenomax_cuocs, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.currency, idxs.isCash].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenomax_ones, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 13 - Keno Max 2
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenomax2_phiens, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL           , idxs.phien__id, idxs.uid__id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenomax2_cuocs, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.currency, idxs.isCash].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenomax2_ones, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 14 - Keno Mini
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenomini_phiens, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL           , idxs.phien__id, idxs.uid__id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenomini_cuocs, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.currency, idxs.isCash].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenomini_ones, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 15 - Keno Mini 2
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenomini2_phiens, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL           , idxs.phien__id, idxs.uid__id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenomini2_cuocs, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.currency, idxs.isCash].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenomini2_ones, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 16 - Keno East
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenoeast_phiens, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL           , idxs.phien__id, idxs.uid__id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenoeast_cuocs, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.currency, idxs.isCash].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenoeast_ones, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 17 - Keno West
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenowest_phiens, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL           , idxs.phien__id, idxs.uid__id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenowest_cuocs, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.currency, idxs.isCash].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenowest_ones, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 18 - Keno South
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenosouth_phiens, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL           , idxs.phien__id, idxs.uid__id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenosouth_cuocs, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.currency, idxs.isCash].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenosouth_ones, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 19 - Keno North
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenonorth_phiens, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL           , idxs.phien__id, idxs.uid__id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenonorth_cuocs, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.currency, idxs.isCash].
      forEach((idx) => {Maint.createIndex(dbs.minigame.kenonorth_ones, idx.idxKeys, idx.idxOpts)});
  }

  {   // 20 - Bola Tangkas
      // Not supported
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 21 - Roulette
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.roulette_phiens, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL           , idxs.phien__id, idxs.uid__id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.roulette_cuocs, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.currency, idxs.isCash].
      forEach((idx) => {Maint.createIndex(dbs.minigame.roulette_ones, idx.idxKeys, idx.idxOpts)});
    [idxs.timeTTL       , idxs.phien__id, idxs.uid_phien].
      forEach((idx) => {Maint.createIndex(dbs.minigame.roulette_tmpones, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 6) > 0) {   // 22 - Xoc Dia VIP
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.vipsedie_phiens, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.uid_thanhtoan__id, idxs.currency, idxs.isCash].
      forEach((idx) => {Maint.createIndex(dbs.minigame.vipsedie_cuocs, idx.idxKeys, idx.idxOpts)});
    [idxs.timeTTL       , idxs.phien__id, idxs.uid_phien].
      forEach((idx) => {Maint.createIndex(dbs.minigame.vipsedie_tmpcuocs, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 23 - Blackjack
    [idxs.TTL, idxs.time, idxs.id, idxs.ended].
      forEach((idx) => {Maint.createIndex(dbs.minigame.blackjack_phiens, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.id, idxs.uid_thanhtoan__id, idxs.currency, idxs.isCash].
      forEach((idx) => {Maint.createIndex(dbs.minigame.blackjack_cuocs, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 6) > 0) {   // 24 - Xoc Dia Can Cua
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.specialsedie_phiens, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_thanhtoan__id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.specialsedie_cuocs, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.currency, idxs.isCash].
      forEach((idx) => {Maint.createIndex(dbs.minigame.specialsedie_ones, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 14) > 0) {   // 25 - Sic Bo
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.sicbo_phiens, idx.idxKeys, idx.idxOpts)});
    if ((2 ** Saba.env() & 6) > 0) {    // L1 - L2
      [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_thanhtoan__id].
        forEach((idx) => {Maint.createIndex(dbs.minigame.sicbo_cuocs, idx.idxKeys, idx.idxOpts)});
      [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.currency, idxs.isCash].
        forEach((idx) => {Maint.createIndex(dbs.minigame.sicbo_ones, idx.idxKeys, idx.idxOpts)});
    }
    if ((2 ** Saba.env() & 8) > 0) {    // L3
      [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.uid_thanhtoan__id, idxs.currency, idxs.isCash].
        forEach((idx) => {Maint.createIndex(dbs.minigame.sicbo_cuocs, idx.idxKeys, idx.idxOpts)});
      [idxs.timeTTL       , idxs.phien__id, idxs.uid_phien].
        forEach((idx) => {Maint.createIndex(dbs.minigame.sicbo_tmpcuocs, idx.idxKeys, idx.idxOpts)});
    }
  }

  if ((2 ** Saba.env() & 6) > 0) {   // 26 - Bau Cua VIP
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.vipfishprawncrab_phiens, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.uid_thanhtoan__id, idxs.currency, idxs.isCash].
      forEach((idx) => {Maint.createIndex(dbs.minigame.vipfishprawncrab_cuocs, idx.idxKeys, idx.idxOpts)});
    [idxs.timeTTL       , idxs.phien__id, idxs.uid_phien].
      forEach((idx) => {Maint.createIndex(dbs.minigame.vipfishprawncrab_tmpcuocs, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 6) > 0) {   // 27 - Cào Baccarat VIP
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.vipbaccarat_phiens, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.uid_thanhtoan__id, idxs.currency, idxs.isCash].
      forEach((idx) => {Maint.createIndex(dbs.minigame.vipbaccarat_cuocs, idx.idxKeys, idx.idxOpts)});
    [idxs.timeTTL       , idxs.phien__id, idxs.uid_phien].
      forEach((idx) => {Maint.createIndex(dbs.minigame.vipbaccarat_tmpcuocs, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 6) > 0) {   // 28 - Xoc Dia Doi Khang
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.vipsediewar_phiens, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_thanhtoan__id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.vipsediewar_cuocs, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.currency, idxs.isCash].
      forEach((idx) => {Maint.createIndex(dbs.minigame.vipsediewar_ones, idx.idxKeys, idx.idxOpts)});
  }

  {   // 29 - Long Lan Quy Phung
      // See GameSlot
  }

  if ((2 ** Saba.env() & 8) > 0) {   // 30 - Bau Cua Pro
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.fishprawncrabpro_phiens, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_phien, idxs.uid_thanhtoan__id, idxs.currency, idxs.isCash].
      forEach((idx) => {Maint.createIndex(dbs.minigame.fishprawncrabpro_cuocs, idx.idxKeys, idx.idxOpts)});
    [idxs.timeTTL       , idxs.phien__id, idxs.uid_phien].
      forEach((idx) => {Maint.createIndex(dbs.minigame.fishprawncrabpro_tmpcuocs, idx.idxKeys, idx.idxOpts)});
  }

  if ((2 ** Saba.env() & 6) > 0) {   // 31 - Xo So
    [idxs.TTL, idxs.time, idxs.id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.lottery_phiens, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid__id].
      forEach((idx) => {Maint.createIndex(dbs.minigame.lottery_cuocs, idx.idxKeys, idx.idxOpts)});
    [idxs.TTL, idxs.time, idxs.phien__id, idxs.uid_thanhtoan__id, idxs.currency, idxs.isCash].
      forEach((idx) => {Maint.createIndex(dbs.minigame.lottery_ones, idx.idxKeys, idx.idxOpts)});
  }

}
