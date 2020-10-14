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

    [   dbs.minigame.baccarat_cuocs
    ,   dbs.minigame.baccarat_tmpcuocs
    ,   dbs.minigame.baucua_cuocs
    ,   dbs.minigame.chanle_cuocs
    ,   dbs.minigame.chanle_ones
    ,   dbs.minigame.chanleturbo_cuocs
    ,   dbs.minigame.chanleturbo_ones
    ,   dbs.minigame.kenopromax_cuocs
    ,   dbs.minigame.kenopromax_tmpcuocs
    ,   dbs.minigame.minidragontiger_cuocs
    ,   dbs.minigame.minisedie_cuocs
    ,   dbs.minigame.taixiu_cuocs
    ,   dbs.minigame.taixiu_ones
    ,   dbs.minigame.txturbo_cuocs
    ,   dbs.minigame.txturbo_ones
    ,   dbs.minigame.xocxoc_cuocs
    ].forEach((coll) => {
        coll.dropIndexes(idxs.phien.oldName);
        Maint.createIndex(coll, idxs.phien.idxKeys, idxs.phien.idxOpts);
    });

    [   dbs.minigame.chanle_cuocs
    ,   dbs.minigame.chanleturbo_cuocs
    ,   dbs.minigame.taixiu_cuocs
    ,   dbs.minigame.txturbo_cuocs
    ].forEach((coll) => {
        coll.dropIndexes(idxs.uid_thanhtoan.oldName);
        Maint.createIndex(coll, idxs.uid_thanhtoan.idxKeys, idxs.uid_thanhtoan.idxOpts);
    });

    [   dbs.minigame.chanle_cuocs
    ,   dbs.minigame.chanleturbo_cuocs
    ].forEach((coll) => {
        coll.dropIndexes(idxs.phien_red.oldName);
        Maint.createIndex(coll, idxs.phien_red.idxKeys, idxs.phien_red.idxOpts);
    });

    [   dbs.minigame.chanle_ones
    ,   dbs.minigame.chanleturbo_ones
    ,   dbs.minigame.taixiu_ones
    ,   dbs.minigame.txturbo_ones
    ].forEach((coll) => {
        coll.dropIndexes(idxs.uid.oldName);
        Maint.createIndex(coll, idxs.uid.idxKeys, idxs.uid.idxOpts);
    });

    [   dbs.minigame.chanle_ones
    ,   dbs.minigame.chanleturbo_ones
    ].forEach((coll) => {
        coll.dropIndexes(idxs.uid_phien_red.oldName);
        Maint.createIndex(coll, idxs.uid_phien_red.idxKeys, idxs.uid_phien_red.idxOpts);
    });

    [   dbs.minigame.taixiu_cuocs
    ,   dbs.minigame.txturbo_cuocs
    ].forEach((coll) => {
        coll.dropIndexes(idxs.phien_taixiu_red.oldName);
        Maint.createIndex(coll, idxs.phien_taixiu_red.idxKeys, idxs.phien_taixiu_red.idxOpts);
    });

    [   dbs.minigame.taixiu_ones
    ,   dbs.minigame.txturbo_ones
    ].forEach((coll) => {
        coll.dropIndexes(idxs.uid_phien_taixiu_red.oldName);
        Maint.createIndex(coll, idxs.uid_phien_taixiu_red.idxKeys, idxs.uid_phien_taixiu_red.idxOpts);
    });
}
