// Archive TTL indexes
db.getSiblingDB('minigame').getCollectionNames().forEach((coll) => {
    if (RegExp('(_phiens|_cuocs|_ones|_phiens_log)$').test(coll)) {
        const idxKeys = {'__archive.eventtime': 1};
        const idxOpts = {expireAfterSeconds: 3600*24*8, name: `TTL_${coll}`};
        createIndex(db.getSiblingDB('minigame')[coll], idxKeys, idxOpts);
    }
});

// Indexes for bets
db.getSiblingDB('minigame').getCollectionNames().forEach((coll) => {
    // [UNIQUE] uid - phien - red
    if (
        coll === 'baucua_cuocs'
    ||  coll === 'chanle_ones'
    ||  coll === 'chanleturbo_ones'
    ||  coll === 'minidragontiger_cuocs'
    ||  coll === 'xocxoc_cuocs'
    ||  coll === 'taixiu_ones'
    ||  coll === 'txturbo_ones'
    ) {
        const idxKeys = {uid: 1, phien: 1, red: 1};
        const idxOpts = {unique: true, name: `UIX_${coll}_uid_phien_red`};
        createIndex(db.getSiblingDB('minigame')[coll], idxKeys, idxOpts);
    }

    // [UNIQUE] uid - phien
    if (
        coll === 'kenopromax_cuocs'
    ||  coll === 'kenopromax_tmpcuocs'
    ||  coll === 'minisedie_cuocs'
    ||  coll === 'baccarat_cuocs'
    ||  coll === 'baccarat_tmpcuocs'
    ||  coll === 'kenoeast_ones'
    ||  coll === 'kenowest_ones'
    ||  coll === 'kenosouth_ones'
    ||  coll === 'kenonorth_ones'
    ||  coll === 'kenomax_ones'
    ||  coll === 'kenomax2_ones'
    ||  coll === 'kenomini_ones'
    ||  coll === 'kenomini2_ones'
    ||  coll === 'kenoproviet_ones'
    ||  coll === 'roulette_ones'
    ||  coll === 'roulette_tmpones'
    ) {
        const idxKeys = {uid: 1, phien: 1};
        const idxOpts = {unique: true, name: `UIX_${coll}_uid_phien`};
        createIndex(db.getSiblingDB('minigame')[coll], idxKeys, idxOpts);
    }

    // uid - thanhtoan - red - _id
    if (
        coll === 'baucua_cuocs'
    ||  coll === 'minidragontiger_cuocs'
    ) {
        const idxKeys = {uid: 1, thanhtoan: 1, red: 1, _id: 1};
        const idxOpts = {name: `IX_${coll}_uid_thanhtoan__id`};
        createIndex(db.getSiblingDB('minigame')[coll], idxKeys, idxOpts);
    }

    // uid - thanhtoan - _id
    if (
        coll === 'taixiu_cuocs'
    ||  coll === 'txturbo_cuocs'
    ||  coll === 'kenopromax_cuocs'
    ||  coll === 'minisedie_cuocs'
    ||  coll === 'baccarat_cuocs'
    ||  coll === 'chanle_cuocs'
    ||  coll === 'chanleturbo_cuocs'
    ||  coll === 'xocxoc_cuocs'
    ) {
        const idxKeys = {uid: 1, thanhtoan: 1, _id: 1};
        const idxOpts = {name: `IX_${coll}_uid_thanhtoan__id`};
        createIndex(db.getSiblingDB('minigame')[coll], idxKeys, idxOpts);
    }

    // uid - _id
    if (
        coll === 'kenoeast_cuocs'
    ||  coll === 'kenowest_cuocs'
    ||  coll === 'kenosouth_cuocs'
    ||  coll === 'kenonorth_cuocs'
    ||  coll === 'kenomax_cuocs'
    ||  coll === 'kenomax2_cuocs'
    ||  coll === 'kenomini_cuocs'
    ||  coll === 'kenomini2_cuocs'
    ||  coll === 'kenoproviet_cuocs'
    ||  coll === 'roulette_cuocs'
    ) {
        const idxKeys = {uid: 1, _id: 1};
        const idxOpts = {name: `IX_${coll}_uid__id`};
        createIndex(db.getSiblingDB('minigame')[coll], idxKeys, idxOpts);
    }
});

// Time indexes
db.getSiblingDB('minigame').getCollectionNames().forEach((coll) => {
    if (RegExp('_phiens$').test(coll)) {
        const idxKeys = {time: 1};
        let idxOpts = {name: `IX_${coll}_time`};
        createIndex(db.getSiblingDB('minigame')[coll], idxKeys, idxOpts);

        const one = `${coll.substring(0, coll.length - 7)}_ones`;
        const cuoc = `${coll.substring(0, coll.length - 7)}_cuocs`;
        const tmpcuoc = `${coll.substring(0, coll.length - 7)}_tmpcuocs`;
        const tmpone = `${coll.substring(0, coll.length - 7)}_tmpones`;

        if (db.getSiblingDB('minigame')._getCollectionInfosCommand({name: one})[0]) {
            // Index for one
            idxOpts = {name: `IX_${one}_time`};
            createIndex(db.getSiblingDB('minigame')[one], idxKeys, idxOpts);
        } else if (db.getSiblingDB('minigame')._getCollectionInfosCommand({name: cuoc})[0]) {
            // Index for cuoc
            idxOpts = {name: `IX_${cuoc}_time`};
            createIndex(db.getSiblingDB('minigame')[cuoc], idxKeys, idxOpts);
        } else {
            log(`WARNING: No associated one or cuoc available!!!`, coll, 'INDEX', 'W');
        }

        if (db.getSiblingDB('minigame')._getCollectionInfosCommand({name: tmpcuoc})[0]) {
            // Index for tmpcuoc
            idxOpts = {expireAfterSeconds: 120, name: `IX_TTL_${tmpcuoc}_time`};
            createIndex(db.getSiblingDB('minigame')[tmpcuoc], idxKeys, idxOpts);
        }
        if (db.getSiblingDB('minigame')._getCollectionInfosCommand({name: tmpone})[0]) {
            // Index for tmpone
            idxOpts = {expireAfterSeconds: 120, name: `IX_TTL_${tmpone}_time`};
            createIndex(db.getSiblingDB('minigame')[tmpone], idxKeys, idxOpts);
        }
    }
});

// Phien indexes
db.getSiblingDB('minigame').getCollectionNames().forEach((coll) => {
    if (RegExp('_phiens$').test(coll)) {
        const idxKeys = {id: 1};
        const idxOpts = {unique: true, name: `UIX_${coll}_id`};
        createIndex(db.getSiblingDB('minigame')[coll], idxKeys, idxOpts);
    }

    if (RegExp('(_cuocs|_ones)$').test(coll)) {
        const idxKeys = {phien: 1, _id: 1};
        const idxOpts = {name: `IX_${coll}_phien`};
        createIndex(db.getSiblingDB('minigame')[coll], idxKeys, idxOpts);
    }
});

