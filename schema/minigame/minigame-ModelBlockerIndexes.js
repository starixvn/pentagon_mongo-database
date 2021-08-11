{
    const idxs = {
        phien : {
            idxKeys : {phien: 1}
        ,   idxOpts : {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_phien_NOT_USED'}
        ,   oldName : 'phien_1'
        }
    ,   uid_thanhtoan : {
            idxKeys : {uid: 1, thanhtoan: 1}
        ,   idxOpts : {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_uid_thanhtoan_NOT_USED'}
        ,   oldName : 'uid_1_thanhtoan_1'
        }
    ,   phien_red : {
            idxKeys : {phien: 1, red: 1}
        ,   idxOpts : {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_phien_red_NOT_USED'}
        ,   oldName : 'phien_1_red_1'
        }
    ,   uid : {
            idxKeys : {uid: 1}
        ,   idxOpts : {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_uid_NOT_USED'}
        ,   oldName : 'uid_1'
        }
    ,   uid_phien_red : {
            idxKeys : {uid: 1, phien: 1, red: 1}
        ,   idxOpts : {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_uid_phien_red_NOT_USED'}
        ,   oldName : 'uid_1_phien_1_red_1'
        }
    ,   phien_taixiu_red : {
            idxKeys : {phien: 1, taixiu: 1, red: 1}
        ,   idxOpts : {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_phien_taixiu_red_NOT_USED'}
        ,   oldName : 'phien_1_taixiu_1_red_1'
        }
    ,   uid_phien_taixiu_red : {
            idxKeys : {uid: 1, phien: 1, taixiu: 1, red: 1}
        ,   idxOpts : {partialFilterExpression: {_id: {$lt: 0}}, name: 'BL_uid_phien_taixiu_red_NOT_USED'}
        ,   oldName : 'uid_1_phien_1_taixiu_1_red_1'
        }
    };

    [   db.getSiblingDB('minigame').baccarat_cuocs
    ,   db.getSiblingDB('minigame').baccarat_tmpcuocs
    ,   db.getSiblingDB('minigame').baucua_cuocs
    ,   db.getSiblingDB('minigame').chanle_cuocs
    ,   db.getSiblingDB('minigame').chanle_ones
    ,   db.getSiblingDB('minigame').chanleturbo_cuocs
    ,   db.getSiblingDB('minigame').chanleturbo_ones
    ,   db.getSiblingDB('minigame').kenopromax_cuocs
    ,   db.getSiblingDB('minigame').kenopromax_tmpcuocs
    ,   db.getSiblingDB('minigame').minidragontiger_cuocs
    ,   db.getSiblingDB('minigame').minisedie_cuocs
    ,   db.getSiblingDB('minigame').taixiu_cuocs
    ,   db.getSiblingDB('minigame').taixiu_ones
    ,   db.getSiblingDB('minigame').txturbo_cuocs
    ,   db.getSiblingDB('minigame').txturbo_ones
    ,   db.getSiblingDB('minigame').xocxoc_cuocs
    ].forEach((coll) => {
        coll.dropIndexes(idxs.phien.oldName);
        Maint.createIndex(coll, idxs.phien.idxKeys, idxs.phien.idxOpts);
    });

    [   db.getSiblingDB('minigame').chanle_cuocs
    ,   db.getSiblingDB('minigame').chanleturbo_cuocs
    ,   db.getSiblingDB('minigame').taixiu_cuocs
    ,   db.getSiblingDB('minigame').txturbo_cuocs
    ].forEach((coll) => {
        coll.dropIndexes(idxs.uid_thanhtoan.oldName);
        Maint.createIndex(coll, idxs.uid_thanhtoan.idxKeys, idxs.uid_thanhtoan.idxOpts);
    });

    [   db.getSiblingDB('minigame').chanle_cuocs
    ,   db.getSiblingDB('minigame').chanleturbo_cuocs
    ].forEach((coll) => {
        coll.dropIndexes(idxs.phien_red.oldName);
        Maint.createIndex(coll, idxs.phien_red.idxKeys, idxs.phien_red.idxOpts);
    });

    [   db.getSiblingDB('minigame').chanle_ones
    ,   db.getSiblingDB('minigame').chanleturbo_ones
    ,   db.getSiblingDB('minigame').taixiu_ones
    ,   db.getSiblingDB('minigame').txturbo_ones
    ].forEach((coll) => {
        coll.dropIndexes(idxs.uid.oldName);
        Maint.createIndex(coll, idxs.uid.idxKeys, idxs.uid.idxOpts);
    });

    [   db.getSiblingDB('minigame').chanle_ones
    ,   db.getSiblingDB('minigame').chanleturbo_ones
    ].forEach((coll) => {
        coll.dropIndexes(idxs.uid_phien_red.oldName);
        Maint.createIndex(coll, idxs.uid_phien_red.idxKeys, idxs.uid_phien_red.idxOpts);
    });

    [   db.getSiblingDB('minigame').taixiu_cuocs
    ,   db.getSiblingDB('minigame').txturbo_cuocs
    ].forEach((coll) => {
        coll.dropIndexes(idxs.phien_taixiu_red.oldName);
        Maint.createIndex(coll, idxs.phien_taixiu_red.idxKeys, idxs.phien_taixiu_red.idxOpts);
    });

    [   db.getSiblingDB('minigame').taixiu_ones
    ,   db.getSiblingDB('minigame').txturbo_ones
    ].forEach((coll) => {
        coll.dropIndexes(idxs.uid_phien_taixiu_red.oldName);
        Maint.createIndex(coll, idxs.uid_phien_taixiu_red.idxKeys, idxs.uid_phien_taixiu_red.idxOpts);
    });
}
