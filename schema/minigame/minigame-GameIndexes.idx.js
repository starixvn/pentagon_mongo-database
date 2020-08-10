// Archive TTL indexes
db.getSiblingDB('minigame').getCollectionNames().forEach((coll) => {
    if (RegExp('(_phiens|_cuocs|_ones|_phiens_log)$').test(coll)) {
        var idx_keys = {'__archive.eventtime': 1};
        var idx_opts = {expireAfterSeconds: 3600*24*8, name: 'TTL_' + coll};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }
});

// Indexes for bets
db.getSiblingDB('minigame').getCollectionNames().forEach((coll) => {
    // [UNIQUE] uid - phien - red
    if (
        coll == 'baucua_cuocs'
    ||  coll == 'chanle_ones'
    ||  coll == 'chanleturbo_ones'
    ||  coll == 'minidragontiger_cuocs'
    ||  coll == 'xocxoc_cuocs'
    ||  coll == 'taixiu_ones'
    ||  coll == 'txturbo_ones'
    ) {
        var idx_keys = {uid: 1, phien: 1, red: 1};
        var idx_opts = {unique: true, name: 'UIX_' + coll + '_uid_phien_red'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }

    // [UNIQUE] uid - phien
    if (
        coll == 'kenopromax_cuocs'
    ||  coll == 'kenopromax_tmpcuocs'
    ||  coll == 'minisedie_cuocs'
    ||  coll == 'baccarat_cuocs'
    ||  coll == 'baccarat_tmpcuocs'
    ||  coll == 'kenoeast_ones'
    ||  coll == 'kenowest_ones'
    ||  coll == 'kenosouth_ones'
    ||  coll == 'kenonorth_ones'
    ||  coll == 'kenomax_ones'
    ||  coll == 'kenomax2_ones'
    ||  coll == 'kenomini_ones'
    ||  coll == 'kenomini2_ones'
    ||  coll == 'kenoproviet_ones'
    ||  coll == 'roulette_ones'
    ||  coll == 'roulette_tmpones'
    ) {
        var idx_keys = {uid: 1, phien: 1};
        var idx_opts = {unique: true, name: 'UIX_' + coll + '_uid_phien'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }

    // uid - thanhtoan - red - _id
    if (
        coll == 'baucua_cuocs'
    ||  coll == 'xocxoc_cuocs'
    ||  coll == 'minidragontiger_cuocs'
    ) {
        var idx_keys = {uid: 1, thanhtoan: 1, red: 1, _id: 1};
        var idx_opts = {name: 'IX_' + coll + '_uid_thanhtoan__id'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }

    // uid - thanhtoan - _id
    if (
        coll == 'taixiu_cuocs'
    ||  coll == 'txturbo_cuocs'
    ||  coll == 'kenopromax_cuocs'
    ||  coll == 'minisedie_cuocs'
    ||  coll == 'baccarat_cuocs'
    ||  coll == 'chanle_cuocs'
    ||  coll == 'chanleturbo_cuocs'
    ) {
        var idx_keys = {uid: 1, thanhtoan: 1, _id: 1};
        var idx_opts = {name: 'IX_' + coll + '_uid_thanhtoan__id'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }

    // uid - _id
    if (
        coll == 'kenoeast_cuocs'
    ||  coll == 'kenowest_cuocs'
    ||  coll == 'kenosouth_cuocs'
    ||  coll == 'kenonorth_cuocs'
    ||  coll == 'kenomax_cuocs'
    ||  coll == 'kenomax2_cuocs'
    ||  coll == 'kenomini_cuocs'
    ||  coll == 'kenomini2_cuocs'
    ||  coll == 'kenoproviet_cuocs'
    ||  coll == 'roulette_cuocs'
    ) {
        var idx_keys = {uid: 1, _id: 1};
        var idx_opts = {name: 'IX_' + coll + '_uid__id'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }
});

// Time indexes
db.getSiblingDB('minigame').getCollectionNames().forEach((coll) => {
    if (RegExp('_phiens$').test(coll)) {
        var idx_keys = {time: 1};
        var idx_opts = {name: 'IX_' + coll + '_time'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);

        var one = coll.substring(0, coll.length - 7) + '_ones';
        var cuoc = coll.substring(0, coll.length - 7) + '_cuocs';
        var tmpcuoc = coll.substring(0, coll.length - 7) + '_tmpcuocs';
        var tmpone = coll.substring(0, coll.length - 7) + '_tmpones';

        if (db.getSiblingDB('minigame')._getCollectionInfosCommand({name: one})[0]) {
            // Index for one
            idx_opts = {name: 'IX_' + one + '_time'};
            createIndex(db.getSiblingDB('minigame')[one], idx_keys, idx_opts);
        } else if (db.getSiblingDB('minigame')._getCollectionInfosCommand({name: cuoc})[0]) {
            // Index for cuoc
            idx_opts = {name: 'IX_' + cuoc + '_time'};
            createIndex(db.getSiblingDB('minigame')[cuoc], idx_keys, idx_opts);
        } else {
            print('WARNING: No associated one or cuoc available!!!');
        }

        if (db.getSiblingDB('minigame')._getCollectionInfosCommand({name: tmpcuoc})[0]) {
            // Index for tmpcuoc
            idx_opts = {expireAfterSeconds: 120, name: 'IX_TTL_' + tmpcuoc + '_time'};
            createIndex(db.getSiblingDB('minigame')[tmpcuoc], idx_keys, idx_opts);
        }
        if (db.getSiblingDB('minigame')._getCollectionInfosCommand({name: tmpone})[0]) {
            // Index for tmpone
            idx_opts = {expireAfterSeconds: 120, name: 'IX_TTL_' + tmpone + '_time'};
            createIndex(db.getSiblingDB('minigame')[tmpone], idx_keys, idx_opts);
        }
    }
});

// Phien indexes
db.getSiblingDB('minigame').getCollectionNames().forEach((coll) => {
    if (RegExp('_phiens$').test(coll)) {
        var idx_keys = {id: 1};
        var idx_opts = {unique: true, name: 'UIX_' + coll + '_id'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }

    if (RegExp('(_cuocs|_ones)$').test(coll)) {
        var idx_keys = {phien: 1, _id: 1};
        var idx_opts = {name: 'IX_' + coll + '_phien'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }
});

