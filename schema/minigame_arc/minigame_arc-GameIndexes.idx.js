// Phien indexes
db.getSiblingDB('minigame_arc').getCollectionNames().forEach((coll) => {
    if (RegExp('_phiens_bk$').test(coll)) {
        var idx_name = 'IX_' + coll + '_id';
        var idx = db.getSiblingDB('minigame_arc')[coll].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
        if (idx) {
            idx.exists = true;
        }
        else {
            var res = db.getSiblingDB('minigame_arc')[coll].createIndex(
                {id: 1}
            ,   {name: idx_name}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('minigame_arc')[coll].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
            idx._____CREATED = true;
        }
        delete idx.v;
        printjson(idx);
    }

    if (RegExp('(_cuocs|_ones)_bk$').test(coll)) {
        var idx_name = 'IX_' + coll + '_phien';
        var idx = db.getSiblingDB('minigame_arc')[coll].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
        if (idx) {
            idx.exists = true;
        }
        else {
            var res = db.getSiblingDB('minigame_arc')[coll].createIndex(
                {phien: 1}
            ,   {name: idx_name}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('minigame_arc')[coll].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
            idx._____CREATED = true;
        }
        delete idx.v;
        printjson(idx);
    }
});

// Time indexes
db.getSiblingDB('minigame_arc').getCollectionNames().forEach((coll) => {
    if (RegExp('(_phiens|_cuocs|_ones)_bk$').test(coll)) {
        var idx_name = 'IX_' + coll + '_time';
        var idx = db.getSiblingDB('minigame_arc')[coll].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
        if (idx) {
            idx.exists = true;
        }
        else {
            var res = db.getSiblingDB('minigame_arc')[coll].createIndex(
                {time: 1}
            ,   {name: idx_name}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('minigame_arc')[coll].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
            idx._____CREATED = true;
        }
        delete idx.v;
        printjson(idx);
    }
});

// Unique indexes for bets
db.getSiblingDB('minigame_arc').getCollectionNames().forEach((coll) => {
    if (RegExp('(_cuocs|_ones)_bk$').test(coll)) {
        var idxs = db.getSiblingDB('minigame_arc')[coll].getIndexes().filter((idx)=>RegExp('^UIX_').test(idx.name));

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
        coll == 'baucua_cuocs_bk'
    ||  coll == 'chanle_ones_bk'
    ||  coll == 'chanleturbo_ones_bk'
    ||  coll == 'minidragontiger_cuocs_bk'
    ||  coll == 'xocxoc_cuocs_bk'
    ||  coll == 'kenopromax_cuocs_bk'
    ) {
        var idx_name = 'UIX_' + coll + '_uid_phien_red';
        var idx = db.getSiblingDB('minigame_arc')[coll].getIndexes().filter((_idx)=>RegExp('^' + idx_name + '$').test(_idx.name))[0];
        if (!idx) {
            var res = db.getSiblingDB('minigame_arc')[coll].createIndex(
                {uid: 1, phien: 1, red: 1}
            ,   {unique: true, name: idx_name}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('minigame_arc')[coll].getIndexes().filter((_idx)=>RegExp('^' + idx_name + '$').test(_idx.name))[0];
            idx._____CREATED = true;
            delete idx.v;
            printjson(idx);
        }
    }

    // uid - phien (non-unique)
    if (
        coll == 'chanle_cuocs_bk'
    ||  coll == 'chanleturbo_cuocs_bk'
    ) {
        var idx_name = 'IX_' + coll + '_uid_phien';
        var idx = db.getSiblingDB('minigame_arc')[coll].getIndexes().filter((_idx)=>RegExp('^' + idx_name + '$').test(_idx.name))[0];
        if (!idx) {
            var res = db.getSiblingDB('minigame_arc')[coll].createIndex(
                {uid: 1, phien: 1}
            ,   {name: idx_name}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('minigame_arc')[coll].getIndexes().filter((_idx)=>RegExp('^' + idx_name + '$').test(_idx.name))[0];
            idx._____CREATED = true;
            delete idx.v;
            printjson(idx);
        }
    }

    // uid - phien - taixiu - red
    if (
        coll == 'taixiu_ones_bk'
    ||  coll == 'txturbo_ones_bk'
    ) {
        var idx_name = 'UIX_' + coll + '_uid_phien_red';
        var idx = db.getSiblingDB('minigame_arc')[coll].getIndexes().filter((_idx)=>RegExp('^' + idx_name + '$').test(_idx.name))[0];
        if (!idx) {
            var res = db.getSiblingDB('minigame_arc')[coll].createIndex(
                {uid: 1, phien: 1, taixiu: 1, red: 1}
            ,   {unique: true, name: idx_name}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('minigame_arc')[coll].getIndexes().filter((_idx)=>RegExp('^' + idx_name + '$').test(_idx.name))[0];
            idx._____CREATED = true;
            delete idx.v;
            printjson(idx);
        }
    }

    // uid - phien (non-unique)
    if (
        coll == 'taixiu_cuocs_bk'
    ||  coll == 'txturbo_cuocs_bk'
    ) {
        var idx_name = 'IX_' + coll + '_uid_phien';
        var idx = db.getSiblingDB('minigame_arc')[coll].getIndexes().filter((_idx)=>RegExp('^' + idx_name + '$').test(_idx.name))[0];
        if (!idx) {
            var res = db.getSiblingDB('minigame_arc')[coll].createIndex(
                {uid: 1, phien: 1}
            ,   {name: idx_name}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('minigame_arc')[coll].getIndexes().filter((_idx)=>RegExp('^' + idx_name + '$').test(_idx.name))[0];
            idx._____CREATED = true;
            delete idx.v;
            printjson(idx);
        }
    }
});

