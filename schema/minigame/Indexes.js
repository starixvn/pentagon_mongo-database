// Archive TTL indexes
db.getSiblingDB('minigame').getCollectionNames().forEach((coll) => {
    if (RegExp('_phiens$').test(coll) || RegExp('_ones$').test(coll) || RegExp('_cuocs$').test(coll)) {
        var idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((idx)=>RegExp('^TTL_').test(idx.name))[0];
        if (idx) {
            idx.exists = true;
        }
        else {
            var res = db.getSiblingDB('minigame')[coll].createIndex(
                {'__archive.eventtime': 1}
            ,   {expireAfterSeconds: 3600*24*8, name: 'TTL_' + coll}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((idx)=>RegExp('^TTL_').test(idx.name))[0];
            idx.CREATED = true;
        }
        delete idx.v;
        if (!(idx.expireAfterSeconds > 0)) {
            idx.WARNING = '[expireAfterSeconds] option is NOT correct!!!'
        }
        printjson(idx);
    }
});

// Unique indexes for bets
db.getSiblingDB('minigame').getCollectionNames().forEach((coll) => {
    if (RegExp('_ones$').test(coll) || RegExp('_cuocs$').test(coll)) {
        var idxs = db.getSiblingDB('minigame')[coll].getIndexes().filter((idx)=>RegExp('^UIX_').test(idx.name));

        idxs.forEach((idx) => {
            idx.exists = true;
            delete idx.v;
            if (!(idx.unique == true)) {
                idx.WARNING = '[unique] option is NOT correct!!!'
            }
        });
        printjson(idxs);
    }

    // uid - phien - red
    if (
        coll == 'baucua_cuocs'
    ||  coll == 'chanle_ones'
    ||  coll == 'chanleturbo_ones'
    ||  coll == 'minidragontiger_cuocs'
    ||  coll == 'xocxoc_cuocs'
    ||  coll == 'kenopromax_cuocs'
    ) {
        var idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((_idx)=>RegExp('^UIX_' + coll + '_uid_phien_red$').test(_idx.name))[0];
        if (!idx) {
            var res = db.getSiblingDB('minigame')[coll].createIndex(
                {uid: 1, phien: 1, red: 1}
            ,   {unique: true, name: 'UIX_' + coll + '_uid_phien_red'}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((_idx)=>RegExp('^UIX_' + coll + '_uid_phien_red$').test(_idx.name))[0];
            idx.CREATED = true;
            delete idx.v;
            printjson(idx);
        }
    }

    // uid - phien - taixiu - red
    if (
        coll == 'taixiu_ones'
    ||  coll == 'txturbo_ones'
    ) {
        var idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((_idx)=>RegExp('^UIX_' + coll + '_uid_phien_red$').test(_idx.name))[0];
        if (!idx) {
            var res = db.getSiblingDB('minigame')[coll].createIndex(
                {uid: 1, phien: 1, taixiu: 1, red: 1}
            ,   {unique: true, name: 'UIX_' + coll + '_uid_phien_red'}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((_idx)=>RegExp('^UIX_' + coll + '_uid_phien_red$').test(_idx.name))[0];
            idx.CREATED = true;
            delete idx.v;
            printjson(idx);
        }
    }
});

// Time indexes
db.getSiblingDB('minigame').getCollectionNames().forEach((coll) => {
    if (RegExp('_phiens$').test(coll)) {

        var idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((idx)=>RegExp('^IX_' + coll + '_time$').test(idx.name))[0];
        if (idx) {
            idx.exists = true;
        }
        else {
            var res = db.getSiblingDB('minigame')[coll].createIndex(
                {time: 1}
            ,   {name: 'IX_' + coll + '_time'}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((idx)=>RegExp('^IX_' + coll + '_time$').test(idx.name))[0];
            idx.CREATED = true;
        }
        delete idx.v;
        printjson(idx);

        var one = coll.substring(0, coll.length - 7) + '_ones';
        var cuoc = coll.substring(0, coll.length - 7) + '_cuocs';
        var tmpcuoc = coll.substring(0, coll.length - 7) + '_tmpcuocs';

        if (db.getSiblingDB('minigame')._getCollectionInfosCommand({name: one})[0]) {
            // Index for one
            var idx = db.getSiblingDB('minigame')[one].getIndexes().filter((idx)=>RegExp('^IX_' + one + '_time$').test(idx.name))[0];
            if (idx) {
                idx.exists = true;
            }
            else {
                var res = db.getSiblingDB('minigame')[one].createIndex(
                    {time: 1}
                ,   {name: 'IX_' + one + '_time'}
                );
                if (res.ok != 1) {
                    printjson(res);
                }
                idx = db.getSiblingDB('minigame')[one].getIndexes().filter((idx)=>RegExp('^IX_' + one + '_time$').test(idx.name))[0];
                idx.CREATED = true;
            }
            delete idx.v;
            printjson(idx);
        } else if (db.getSiblingDB('minigame')._getCollectionInfosCommand({name: cuoc})[0]) {
            // Index for cuoc
            var idx = db.getSiblingDB('minigame')[cuoc].getIndexes().filter((idx)=>RegExp('^IX_' + cuoc + '_time$').test(idx.name))[0];
            if (idx) {
                idx.exists = true;
            }
            else {
                var res = db.getSiblingDB('minigame')[cuoc].createIndex(
                    {time: 1}
                ,   {name: 'IX_' + cuoc + '_time'}
                );
                if (res.ok != 1) {
                    printjson(res);
                }
                idx = db.getSiblingDB('minigame')[cuoc].getIndexes().filter((idx)=>RegExp('^IX_' + cuoc + '_time$').test(idx.name))[0];
                idx.CREATED = true;
            }
            delete idx.v;
            printjson(idx);
        } else {
            print('WARNING: No associated one or cuoc available!!!');
        }

        if (db.getSiblingDB('minigame')._getCollectionInfosCommand({name: tmpcuoc})[0]) {
            // Index for tmpcuoc
            var idx = db.getSiblingDB('minigame')[tmpcuoc].getIndexes().filter((idx)=>RegExp('^IX_TTL_' + tmpcuoc + '_time$').test(idx.name))[0];
            if (idx) {
                idx.exists = true;
            }
            else {
                var res = db.getSiblingDB('minigame')[tmpcuoc].createIndex(
                    {time: 1}
                ,   {name: 'IX_TTL_' + tmpcuoc + '_time', expireAfterSeconds: 120}
                );
                if (res.ok != 1) {
                    printjson(res);
                }
                idx = db.getSiblingDB('minigame')[tmpcuoc].getIndexes().filter((idx)=>RegExp('^IX_TTL_' + tmpcuoc + '_time$').test(idx.name))[0];
                idx.CREATED = true;
            }
            delete idx.v;
            if (!(idx.expireAfterSeconds = 120)) {
                idx.WARNING = '[expireAfterSeconds] option is NOT correct!!!'
            }
            printjson(idx);
        }
    }
});