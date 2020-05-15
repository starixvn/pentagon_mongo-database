// userinfos - currency
{
    var coll = 'userinfos';
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
        idx._____CREATED = true;
    }
    delete idx.v;
    printjson(idx);
}

// usersessions - ssoToken
{
    var coll = 'usersessions';
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
        idx._____CREATED = true;
    }
    delete idx.v;
    printjson(idx);
}

