// Phien indexes
db.getSiblingDB('minigame_arc').getCollectionNames().forEach((coll) => {
    if (RegExp('_phiens_bk$').test(coll)) {
        var idx = db.getSiblingDB('minigame_arc')[coll].getIndexes().filter((idx)=>RegExp('^IX_' + coll + '_id$').test(idx.name))[0];
        if (idx) {
            idx.exists = true;
        }
        else {
            var res = db.getSiblingDB('minigame_arc')[coll].createIndex(
                {id: 1}
            ,   {name: 'IX_' + coll + '_id'}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('minigame_arc')[coll].getIndexes().filter((idx)=>RegExp('^IX_' + coll + '_id$').test(idx.name))[0];
            idx.CREATED = true;
        }
        delete idx.v;
        printjson(idx);
    }

    if (RegExp('_ones_bk$').test(coll) || RegExp('_cuocs_bk$').test(coll)) {
        var idx = db.getSiblingDB('minigame_arc')[coll].getIndexes().filter((idx)=>RegExp('^IX_' + coll + '_phien$').test(idx.name))[0];
        if (idx) {
            idx.exists = true;
        }
        else {
            var res = db.getSiblingDB('minigame_arc')[coll].createIndex(
                {phien: 1}
            ,   {name: 'IX_' + coll + '_phien'}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('minigame_arc')[coll].getIndexes().filter((idx)=>RegExp('^IX_' + coll + '_phien$').test(idx.name))[0];
            idx.CREATED = true;
        }
        delete idx.v;
        printjson(idx);
    }
});

// Time indexes
db.getSiblingDB('minigame_arc').getCollectionNames().forEach((coll) => {
    if (RegExp('(_phiens|_cuocs|_ones)_bk$').test(coll)) {

        var idx = db.getSiblingDB('minigame_arc')[coll].getIndexes().filter((idx)=>RegExp('^IX_' + coll + '_time$').test(idx.name))[0];
        if (idx) {
            idx.exists = true;
        }
        else {
            var res = db.getSiblingDB('minigame_arc')[coll].createIndex(
                {time: 1}
            ,   {name: 'IX_' + coll + '_time'}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('minigame_arc')[coll].getIndexes().filter((idx)=>RegExp('^IX_' + coll + '_time$').test(idx.name))[0];
            idx.CREATED = true;
        }
        delete idx.v;
        printjson(idx);
    }
});

// Uid indexes
db.getSiblingDB('minigame_arc').getCollectionNames().forEach((coll) => {
    if (RegExp('(_cuocs|_ones)_bk$').test(coll)) {

        var idx = db.getSiblingDB('minigame_arc')[coll].getIndexes().filter((idx)=>RegExp('^IX_' + coll + '_uid$').test(idx.name))[0];
        if (idx) {
            idx.exists = true;
        }
        else {
            var res = db.getSiblingDB('minigame_arc')[coll].createIndex(
                {uid: 1}
            ,   {name: 'IX_' + coll + '_uid'}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('minigame_arc')[coll].getIndexes().filter((idx)=>RegExp('^IX_' + coll + '_uid$').test(idx.name))[0];
            idx.CREATED = true;
        }
        delete idx.v;
        printjson(idx);
    }
});