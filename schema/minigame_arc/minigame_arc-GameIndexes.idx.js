// Phien indexes
db.getSiblingDB('minigame_arc').getCollectionNames().forEach((coll) => {
    if (RegExp('_phiens_bk$').test(coll)) {
        var idx_keys = {id: 1};
        var idx_opts = {unique: true, name: 'UIX_' + coll + '_id'};
        createIndex(db.getSiblingDB('minigame_arc')[coll], idx_keys, idx_opts);
    }

    if (RegExp('(_cuocs|_ones)_bk$').test(coll)) {
        var idx_keys = {phien: 1};
        var idx_opts = {name: 'IX_' + coll + '_phien'};
        createIndex(db.getSiblingDB('minigame_arc')[coll], idx_keys, idx_opts);
    }
});

// Time indexes
db.getSiblingDB('minigame_arc').getCollectionNames().forEach((coll) => {
    if (RegExp('(_phiens|_cuocs|_ones)_bk$').test(coll)) {
        var idx_keys = {time: 1};
        var idx_opts = {name: 'IX_' + coll + '_time'};
        createIndex(db.getSiblingDB('minigame_arc')[coll], idx_keys, idx_opts);
    }
});

// Indexes for bets
db.getSiblingDB('minigame_arc').getCollectionNames().forEach((coll) => {
    // [UNIQUE] uid - phien
    if (
        coll == 'baucua_cuocs_bk'
    ||  coll == 'chanle_ones_bk'
    ||  coll == 'chanleturbo_ones_bk'
    ||  coll == 'minidragontiger_cuocs_bk'
    ||  coll == 'xocxoc_cuocs_bk'
    ||  coll == 'taixiu_ones_bk'
    ||  coll == 'txturbo_ones_bk'
    ||  coll == 'kenopromax_cuocs_bk'
    ||  coll == 'minisedie_cuocs_bk'
    ||  coll == 'baccarat_cuocs_bk'
    ||  coll == 'kenoeast_ones_bk'
    ||  coll == 'kenowest_ones_bk'
    ||  coll == 'kenosouth_ones_bk'
    ||  coll == 'kenonorth_ones_bk'
    ||  coll == 'kenomax_ones_bk'
    ||  coll == 'kenomax2_ones_bk'
    ||  coll == 'kenomini_ones_bk'
    ||  coll == 'kenomini2_ones_bk'
    ||  coll == 'kenoproviet_ones_bk'
    ) {
        var idx_keys = {uid: 1, phien: 1};
        var idx_opts = {unique: true, name: 'UIX_' + coll + '_uid_phien'};
        createIndex(db.getSiblingDB('minigame_arc')[coll], idx_keys, idx_opts);
    }

    // uid - phien
    if (
        coll == 'chanle_cuocs_bk'
    ||  coll == 'chanleturbo_cuocs_bk'
    ||  coll == 'taixiu_cuocs_bk'
    ||  coll == 'txturbo_cuocs_bk'
    ||  coll == 'kenoeast_cuocs_bk'
    ||  coll == 'kenowest_cuocs_bk'
    ||  coll == 'kenosouth_cuocs_bk'
    ||  coll == 'kenonorth_cuocs_bk'
    ||  coll == 'kenomax_cuocs_bk'
    ||  coll == 'kenomax2_cuocs_bk'
    ||  coll == 'kenomini_cuocs_bk'
    ||  coll == 'kenomini2_cuocs_bk'
    ||  coll == 'kenoproviet_cuocs_bk'
    ) {
        var idx_keys = {uid: 1, phien: 1};
        var idx_opts = {name: 'IX_' + coll + '_uid_phien'};
        createIndex(db.getSiblingDB('minigame_arc')[coll], idx_keys, idx_opts);
    }
});

