// userinfos
{
    var coll = 'userinfos';

    // [UNIQUE] id
    {
        var idx_name = 'UIX_userinfos_id';
        var idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
        if (idx) {
            idx.exists = true;
        } else {
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

    // [UNIQUE] UID
    {
        var idx_name = 'UIX_userinfos_UID';
        var idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
        if (idx) {
            idx.exists = true;
        } else {
            var res = db.getSiblingDB('minigame')[coll].createIndex(
                {UID: 1}
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

    // [UNIQUE] name (with collation)
    {
        var idx_name = 'UIX_userinfos_name';
        var idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
        if (idx) {
            idx.exists = true;
        } else {
            var res = db.getSiblingDB('minigame')[coll].createIndex(
                {name: 1}
            ,   {unique: true, collation: {locale: 'en', strength: 2}, name: idx_name}
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

    // currency
    {
        var idx_name = 'IX_userinfos_currency';
        var idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
        if (idx) {
            idx.exists = true;
        } else {
            var res = db.getSiblingDB('minigame')[coll].createIndex(
                {currency: 1}
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

    // type - inRoom
    {
        var idx_name = 'IX_userinfos_type_inRoom_red';
        var idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
        if (idx) {
            idx.exists = true;
        } else {
            var res = db.getSiblingDB('minigame')[coll].createIndex(
                {type: 1, inRoom: 1, red: 1}
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
}

// usersessions
{
    var coll = 'usersessions';

    // ssoToken
    {
        var idx_name = 'IX_usersessions_ssoToken';
        var idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
        if (idx) {
            idx.exists = true;
        } else {
            var res = db.getSiblingDB('minigame')[coll].createIndex(
                {ssoToken: 1}
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

    // recheckInTime
    {
        var idx_name = 'IX_usersessions_recheckInTime';
        var idx = db.getSiblingDB('minigame')[coll].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
        if (idx) {
            idx.exists = true;
        } else {
            var res = db.getSiblingDB('minigame')[coll].createIndex(
                {recheckInTime: 1}
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

    // Archive TTL
    {
        var idx_name = 'TTL_usersessions';
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
}
