// Indexes for phien
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
    if (RegExp('_phiens_bk$').test(coll)) {

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

        var one = coll.substring(0, coll.length - 10) + '_ones_bk';
        var cuoc = coll.substring(0, coll.length - 10) + '_cuocs_bk';

        if (db.getSiblingDB('minigame_arc')._getCollectionInfosCommand({name: one})[0]) {
            var idx = db.getSiblingDB('minigame_arc')[one].getIndexes().filter((idx)=>RegExp('^IX_' + one + '_time$').test(idx.name))[0];
            if (idx) {
                idx.exists = true;
            }
            else {
                var res = db.getSiblingDB('minigame_arc')[one].createIndex(
                    {time: 1}
                ,   {name: 'IX_' + one + '_time'}
                );
                if (res.ok != 1) {
                    printjson(res);
                }
                idx = db.getSiblingDB('minigame_arc')[one].getIndexes().filter((idx)=>RegExp('^IX_' + one + '_time$').test(idx.name))[0];
                idx.CREATED = true;
            }
            delete idx.v;
            printjson(idx);
        } else if (db.getSiblingDB('minigame_arc')._getCollectionInfosCommand({name: cuoc})[0]) {
            var idx = db.getSiblingDB('minigame_arc')[cuoc].getIndexes().filter((idx)=>RegExp('^IX_' + cuoc + '_time$').test(idx.name))[0];
            if (idx) {
                idx.exists = true;
            }
            else {
                var res = db.getSiblingDB('minigame_arc')[cuoc].createIndex(
                    {time: 1}
                ,   {name: 'IX_' + cuoc + '_time'}
                );
                if (res.ok != 1) {
                    printjson(res);
                }
                idx = db.getSiblingDB('minigame_arc')[cuoc].getIndexes().filter((idx)=>RegExp('^IX_' + cuoc + '_time$').test(idx.name))[0];
                idx.CREATED = true;
            }
            delete idx.v;
            printjson(idx);
        } else {
            print('WARNING: No associated one or cuoc available!!!');
        }
    }
});

