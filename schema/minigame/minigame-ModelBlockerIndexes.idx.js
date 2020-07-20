{   // baccarat_cuocs
    var coll = 'baccarat_cuocs';
    var keys;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_NOT_USED'});
}
{   // baccarat_tmpcuocs
    var coll = 'baccarat_tmpcuocs';
    var keys;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_NOT_USED'});
}
{   // baucua_cuocs
    var coll = 'baucua_cuocs';
    var keys;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_NOT_USED'});

    keys = {uid: 1, red: 1, thanhtoan: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('uid_1_red_1_thanhtoan_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_uid_red_thanhtoan_NOT_USED'});
}
{   // chanle_cuocs
    var coll = 'chanle_cuocs';
    var keys;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_NOT_USED'});

    keys = {phien: 1, red: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1_red_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_red_NOT_USED'});

    keys = {uid: 1, thanhtoan: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('uid_1_thanhtoan_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_uid_thanhtoan_NOT_USED'});
}
{   // chanle_ones
    var coll = 'chanle_ones';
    var keys;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_NOT_USED'});

    keys = {uid: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('uid_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_uid_NOT_USED'});
}

{   // chanleturbo_cuocs
    var coll = 'chanleturbo_cuocs';
    var keys;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_NOT_USED'});

    keys = {phien: 1, red: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1_red_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_red_NOT_USED'});

    keys = {uid: 1, thanhtoan: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('uid_1_thanhtoan_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_uid_thanhtoan_NOT_USED'});
}
{   // chanleturbo_ones
    var coll = 'chanleturbo_ones';
    var keys;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_NOT_USED'});

    keys = {uid: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('uid_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_uid_NOT_USED'});
}
{   // kenopromax_cuocs
    var coll = 'kenopromax_cuocs';
    var keys;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_NOT_USED'});
}
{   // kenopromax_tmpcuocs
    var coll = 'kenopromax_tmpcuocs';
    var keys;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_NOT_USED'});
}
{   // minidragontiger_cuocs
    var coll = 'minidragontiger_cuocs';
    var keys;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_NOT_USED'});
}
{   // minisedie_cuocs
    var coll = 'minisedie_cuocs';
    var keys;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_NOT_USED'});
}
{   // taixiu_cuocs
    var coll = 'taixiu_cuocs';
    var keys;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_NOT_USED'});

    keys = {phien: 1, taixiu: 1, red: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1_taixiu_1_red_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_taixiu_red_NOT_USED'});

    keys = {uid: 1, thanhtoan: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('uid_1_thanhtoan_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_uid_thanhtoan_NOT_USED'});
}
{   // taixiu_ones
    var coll = 'taixiu_ones';
    var keys;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_NOT_USED'});

    keys = {uid: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('uid_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_uid_NOT_USED'});

    keys = {uid: 1, phien: 1, taixiu: 1, red: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('uid_1_phien_1_taixiu_1_red_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_uid_phien_taixiu_red_NOT_USED'});
}
{   // txturbo_cuocs
    var coll = 'txturbo_cuocs';
    var keys;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_NOT_USED'});

    keys = {phien: 1, taixiu: 1, red: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1_taixiu_1_red_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_taixiu_red_NOT_USED'});

    keys = {uid: 1, thanhtoan: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('uid_1_thanhtoan_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_uid_thanhtoan_NOT_USED'});
}
{   // txturbo_ones
    var coll = 'txturbo_ones';
    var keys;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_NOT_USED'});

    keys = {uid: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('uid_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_uid_NOT_USED'});

    keys = {uid: 1, phien: 1, taixiu: 1, red: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('uid_1_phien_1_taixiu_1_red_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_uid_phien_taixiu_red_NOT_USED'});
}
{   // xocxoc_cuocs
    var coll = 'xocxoc_cuocs';
    var keys;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_NOT_USED'});
}

