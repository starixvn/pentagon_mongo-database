{   // baccarat_cuocs
    const coll = 'baccarat_cuocs';
    let keys = null;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_phien_NOT_USED`});
}
{   // baccarat_tmpcuocs
    const coll = 'baccarat_tmpcuocs';
    let keys = null;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_phien_NOT_USED`});
}
{   // baucua_cuocs
    const coll = 'baucua_cuocs';
    let keys = null;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_phien_NOT_USED`});

    keys = {uid: 1, red: 1, thanhtoan: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('uid_1_red_1_thanhtoan_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_uid_red_thanhtoan_NOT_USED`});
}
{   // chanle_cuocs
    const coll = 'chanle_cuocs';
    let keys = null;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_phien_NOT_USED`});

    keys = {phien: 1, red: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1_red_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_phien_red_NOT_USED`});

    keys = {uid: 1, thanhtoan: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('uid_1_thanhtoan_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_uid_thanhtoan_NOT_USED`});
}
{   // chanle_ones
    const coll = 'chanle_ones';
    let keys = null;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_phien_NOT_USED`});

    keys = {uid: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('uid_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_uid_NOT_USED`});
}

{   // chanleturbo_cuocs
    const coll = 'chanleturbo_cuocs';
    let keys = null;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_phien_NOT_USED`});

    keys = {phien: 1, red: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1_red_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_phien_red_NOT_USED`});

    keys = {uid: 1, thanhtoan: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('uid_1_thanhtoan_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_uid_thanhtoan_NOT_USED`});
}
{   // chanleturbo_ones
    const coll = 'chanleturbo_ones';
    let keys = null;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_phien_NOT_USED`});

    keys = {uid: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('uid_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_uid_NOT_USED`});
}
{   // kenopromax_cuocs
    const coll = 'kenopromax_cuocs';
    let keys = null;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_phien_NOT_USED`});
}
{   // kenopromax_tmpcuocs
    const coll = 'kenopromax_tmpcuocs';
    let keys = null;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_phien_NOT_USED`});
}
{   // minidragontiger_cuocs
    const coll = 'minidragontiger_cuocs';
    let keys = null;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_phien_NOT_USED`});
}
{   // minisedie_cuocs
    const coll = 'minisedie_cuocs';
    let keys = null;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_phien_NOT_USED`});
}
{   // taixiu_cuocs
    const coll = 'taixiu_cuocs';
    let keys = null;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_phien_NOT_USED`});

    keys = {phien: 1, taixiu: 1, red: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1_taixiu_1_red_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_phien_taixiu_red_NOT_USED`});

    keys = {uid: 1, thanhtoan: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('uid_1_thanhtoan_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_uid_thanhtoan_NOT_USED`});
}
{   // taixiu_ones
    const coll = 'taixiu_ones';
    let keys = null;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_phien_NOT_USED`});

    keys = {uid: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('uid_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_uid_NOT_USED`});

    keys = {uid: 1, phien: 1, taixiu: 1, red: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('uid_1_phien_1_taixiu_1_red_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_uid_phien_taixiu_red_NOT_USED`});
}
{   // txturbo_cuocs
    const coll = 'txturbo_cuocs';
    let keys = null;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_phien_NOT_USED`});

    keys = {phien: 1, taixiu: 1, red: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1_taixiu_1_red_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_phien_taixiu_red_NOT_USED`});

    keys = {uid: 1, thanhtoan: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('uid_1_thanhtoan_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_uid_thanhtoan_NOT_USED`});
}
{   // txturbo_ones
    const coll = 'txturbo_ones';
    let keys = null;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_phien_NOT_USED`});

    keys = {uid: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('uid_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_uid_NOT_USED`});

    keys = {uid: 1, phien: 1, taixiu: 1, red: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('uid_1_phien_1_taixiu_1_red_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_uid_phien_taixiu_red_NOT_USED`});
}
{   // xocxoc_cuocs
    const coll = 'xocxoc_cuocs';
    let keys = null;

    keys = {phien: 1};
    db.getSiblingDB('minigame')[coll].dropIndex('phien_1');
    db.getSiblingDB('minigame')[coll].createIndex(keys, {partialFilterExpression: {_id: {$lt: 0}}, name: `BL_${coll}_phien_NOT_USED`});
}

