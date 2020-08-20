{   // baccarat_cuocs
    let coll = 'baccarat_cuocs';
    let keys;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_NOT_USED'});
}
{   // baccarat_tmpcuocs
    let coll = 'baccarat_tmpcuocs';
    let keys;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_NOT_USED'});
}
{   // baucua_cuocs
    let coll = 'baucua_cuocs';
    let keys;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_NOT_USED'});

    keys = {uid: 1, red: 1, thanhtoan: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('uid_1_red_1_thanhtoan_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_uid_red_thanhtoan_NOT_USED'});
}
{   // chanle_cuocs
    let coll = 'chanle_cuocs';
    let keys;

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
    let coll = 'chanle_ones';
    let keys;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_NOT_USED'});

    keys = {uid: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('uid_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_uid_NOT_USED'});
}

{   // chanleturbo_cuocs
    let coll = 'chanleturbo_cuocs';
    let keys;

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
    let coll = 'chanleturbo_ones';
    let keys;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_NOT_USED'});

    keys = {uid: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('uid_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_uid_NOT_USED'});
}
{   // kenopromax_cuocs
    let coll = 'kenopromax_cuocs';
    let keys;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_NOT_USED'});
}
{   // kenopromax_tmpcuocs
    let coll = 'kenopromax_tmpcuocs';
    let keys;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_NOT_USED'});
}
{   // minidragontiger_cuocs
    let coll = 'minidragontiger_cuocs';
    let keys;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_NOT_USED'});
}
{   // minisedie_cuocs
    let coll = 'minisedie_cuocs';
    let keys;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_NOT_USED'});
}
{   // taixiu_cuocs
    let coll = 'taixiu_cuocs';
    let keys;

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
    let coll = 'taixiu_ones';
    let keys;

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
    let coll = 'txturbo_cuocs';
    let keys;

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
    let coll = 'txturbo_ones';
    let keys;

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
    let coll = 'xocxoc_cuocs';
    let keys;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_' + coll + '_phien_NOT_USED'});
}

