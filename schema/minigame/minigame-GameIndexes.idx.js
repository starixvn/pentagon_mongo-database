// Archive TTL indexes
db.getSiblingDB('minigame').getCollectionNames().forEach((coll) => {
    if (RegExp('(_phiens|_cuocs|_ones)$').test(coll)) {
        var idx_name = 'TTL_' + coll;
        var idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
        if (idx) {
            idx.exists = true;
        }
        else {
            var res = db.getSiblingDB('minigame')[coll].createIndex(
                {'__archive.eventtime': 1}
            ,   {expireAfterSeconds: 3600*24*8, name: idx_name}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
            idx.__________________________________________________CREATED = true;
        }
        if (!(idx.expireAfterSeconds > 0)) {
            idx.__________________________________________________WARNING = '[expireAfterSeconds] option is NOT correct!!!'
        }
        delete idx.v;
        printjson(idx);
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
    ) {
        var idx_name = 'UIX_' + coll + '_uid_phien_red';
        var idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((_idx)=>RegExp('^' + idx_name + '$').test(_idx.name))[0];
        if (!idx) {
            var res = db.getSiblingDB('minigame')[coll].createIndex(
                {uid: 1, phien: 1, red: 1}
            ,   {unique: true, name: idx_name}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((_idx)=>RegExp('^' + idx_name + '$').test(_idx.name))[0];
            idx.__________________________________________________CREATED = true;
        } else {
            idx.exists = true;
            if (!(idx.unique == true)) {
                idx.__________________________________________________WARNING = '[unique] option is NOT correct!!!'
            }
        }
        delete idx.v;
        printjson(idx);
    }

    // [UNIQUE] uid - phien - taixiu - red
    if (
        coll == 'taixiu_ones'
    ||  coll == 'txturbo_ones'
    ) {
        var idx_name = 'UIX_' + coll + '_uid_phien_red';
        var idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((_idx)=>RegExp('^' + idx_name + '$').test(_idx.name))[0];
        if (!idx) {
            var res = db.getSiblingDB('minigame')[coll].createIndex(
                {uid: 1, phien: 1, taixiu: 1, red: 1}
            ,   {unique: true, name: idx_name}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((_idx)=>RegExp('^' + idx_name + '$').test(_idx.name))[0];
            idx.__________________________________________________CREATED = true;
        } else {
            idx.exists = true;
            if (!(idx.unique == true)) {
                idx.__________________________________________________WARNING = '[unique] option is NOT correct!!!'
            }
        }
        delete idx.v;
        printjson(idx);
    }

    // [UNIQUE] uid - phien
    if (
        coll == 'kenopromax_cuocs'
    ||  coll == 'kenopromax_tmpcuocs'
    ||  coll == 'minisedie_cuocs'
    ) {
        var idx_name = 'UIX_' + coll + '_uid_phien';
        var idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((_idx)=>RegExp('^' + idx_name + '$').test(_idx.name))[0];
        if (!idx) {
            var res = db.getSiblingDB('minigame')[coll].createIndex(
                {uid: 1, phien: 1}
            ,   {unique: true, name: idx_name}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((_idx)=>RegExp('^' + idx_name + '$').test(_idx.name))[0];
            idx.__________________________________________________CREATED = true;
        } else {
            idx.exists = true;
            if (!(idx.unique == true)) {
                idx.__________________________________________________WARNING = '[unique] option is NOT correct!!!'
            }
        }
        delete idx.v;
        printjson(idx);
    }

    // uid - thanhtoan - _id
    if (
        coll == 'chanle_cuocs'
    ||  coll == 'chanleturbo_cuocs'
    ) {
        var idx_name = 'IX_' + coll + '_uid_thanhtoan__id';
        var idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((_idx)=>RegExp('^' + idx_name + '$').test(_idx.name))[0];
        if (!idx) {
            var res = db.getSiblingDB('minigame')[coll].createIndex(
                {uid: 1, thanhtoan: 1, _id: 1}
            ,   {name: idx_name}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((_idx)=>RegExp('^' + idx_name + '$').test(_idx.name))[0];
            idx.__________________________________________________CREATED = true;
        } else {
            idx.exists = true;
        }
        delete idx.v;
        printjson(idx);
    }

    // uid - thanhtoan - red - _id
    if (
        coll == 'baucua_cuocs'
    ||  coll == 'xocxoc_cuocs'
    ||  coll == 'minidragontiger_cuocs'
    ) {
        var idx_name = 'IX_' + coll + '_uid_thanhtoan__id';
        var idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((_idx)=>RegExp('^' + idx_name + '$').test(_idx.name))[0];
        if (!idx) {
            var res = db.getSiblingDB('minigame')[coll].createIndex(
                {uid: 1, thanhtoan: 1, red: 1, _id: 1}
            ,   {name: idx_name}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((_idx)=>RegExp('^' + idx_name + '$').test(_idx.name))[0];
            idx.__________________________________________________CREATED = true;
        } else {
            idx.exists = true;
        }
        delete idx.v;
        printjson(idx);
    }

    // uid - thanhtoan - _id
    if (
        coll == 'taixiu_cuocs'
    ||  coll == 'txturbo_cuocs'
    ||  coll == 'kenopromax_cuocs'
    ||  coll == 'minisedie_cuocs'
    ) {
        var idx_name = 'IX_' + coll + '_uid_thanhtoan__id';
        var idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((_idx)=>RegExp('^' + idx_name + '$').test(_idx.name))[0];
        if (!idx) {
            var res = db.getSiblingDB('minigame')[coll].createIndex(
                {uid: 1, thanhtoan: 1, _id: 1}
            ,   {name: idx_name}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((_idx)=>RegExp('^' + idx_name + '$').test(_idx.name))[0];
            idx.__________________________________________________CREATED = true;
        } else {
            idx.exists = true;
        }
        delete idx.v;
        printjson(idx);
    }
});

// Time indexes
db.getSiblingDB('minigame').getCollectionNames().forEach((coll) => {
    if (RegExp('_phiens$').test(coll)) {
        var idx_name = 'IX_' + coll + '_time';
        var idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
        if (idx) {
            idx.exists = true;
        }
        else {
            var res = db.getSiblingDB('minigame')[coll].createIndex(
                {time: 1}
            ,   {name: idx_name}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
            idx.__________________________________________________CREATED = true;
        }
        delete idx.v;
        printjson(idx);

        var one = coll.substring(0, coll.length - 7) + '_ones';
        var cuoc = coll.substring(0, coll.length - 7) + '_cuocs';
        var tmpcuoc = coll.substring(0, coll.length - 7) + '_tmpcuocs';

        if (db.getSiblingDB('minigame')._getCollectionInfosCommand({name: one})[0]) {
            // Index for one
            var idx_name = 'IX_' + one + '_time';
            var idx = db.getSiblingDB('minigame')[one].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
            if (idx) {
                idx.exists = true;
            }
            else {
                var res = db.getSiblingDB('minigame')[one].createIndex(
                    {time: 1}
                ,   {name: idx_name}
                );
                if (res.ok != 1) {
                    printjson(res);
                }
                idx = db.getSiblingDB('minigame')[one].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
                idx.__________________________________________________CREATED = true;
            }
            delete idx.v;
            printjson(idx);
        } else if (db.getSiblingDB('minigame')._getCollectionInfosCommand({name: cuoc})[0]) {
            // Index for cuoc
            var idx_name = 'IX_' + cuoc + '_time';
            var idx = db.getSiblingDB('minigame')[cuoc].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
            if (idx) {
                idx.exists = true;
            }
            else {
                var res = db.getSiblingDB('minigame')[cuoc].createIndex(
                    {time: 1}
                ,   {name: idx_name}
                );
                if (res.ok != 1) {
                    printjson(res);
                }
                idx = db.getSiblingDB('minigame')[cuoc].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
                idx.__________________________________________________CREATED = true;
            }
            delete idx.v;
            printjson(idx);
        } else {
            print('WARNING: No associated one or cuoc available!!!');
        }

        if (db.getSiblingDB('minigame')._getCollectionInfosCommand({name: tmpcuoc})[0]) {
            // Index for tmpcuoc
            var idx_name = 'IX_TTL_' + tmpcuoc + '_time';
            var idx = db.getSiblingDB('minigame')[tmpcuoc].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
            if (idx) {
                idx.exists = true;
            }
            else {
                var res = db.getSiblingDB('minigame')[tmpcuoc].createIndex(
                    {time: 1}
                ,   {expireAfterSeconds: 120, name: idx_name}
                );
                if (res.ok != 1) {
                    printjson(res);
                }
                idx = db.getSiblingDB('minigame')[tmpcuoc].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
                idx.__________________________________________________CREATED = true;
            }
            if (!(idx.expireAfterSeconds = 120)) {
                idx.__________________________________________________WARNING = '[expireAfterSeconds] option is NOT correct!!!'
            }
            delete idx.v;
            printjson(idx);
        }
    }
});

// Phien indexes
db.getSiblingDB('minigame').getCollectionNames().forEach((coll) => {
    if (RegExp('_phiens$').test(coll)) {
        var idx_name = 'UIX_' + coll + '_id';
        var idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
        if (idx) {
            idx.exists = true;
            if (!(idx.unique == true)) {
                idx.__________________________________________________WARNING = '[unique] option is NOT correct!!!'
            }
        }
        else {
            var res = db.getSiblingDB('minigame')[coll].createIndex(
                {id: 1}
            ,   {unique: true, name: idx_name}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
            idx.__________________________________________________CREATED = true;
        }
        delete idx.v;
        printjson(idx);
    }

    if (RegExp('(_cuocs|_ones)$').test(coll)) {
        var idx_name = 'IX_' + coll + '_phien';
        var idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
        if (idx) {
            idx.exists = true;
        }
        else {
            var res = db.getSiblingDB('minigame')[coll].createIndex(
                {phien: 1, _id: 1}
            ,   {name: idx_name}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
            idx.__________________________________________________CREATED = true;
        }
        delete idx.v;
        printjson(idx);
    }
});

