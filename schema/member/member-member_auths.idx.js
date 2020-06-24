// member_auths
{
    var coll = 'member_auths';

    // memberId - iP
    {
        var idx_name = 'IX_' + coll + '_memberId_iP';
        var idx = db.getSiblingDB('member')[coll].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
        if (idx) {
            idx.exists = true;
        } else {
            var res = db.getSiblingDB('member')[coll].createIndex(
                {memberId: 1, iP: 1}
            ,   {name: idx_name}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('member')[coll].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
            idx.__________________________________________________CREATED = true;
        }
        delete idx.v;
        printjson(idx);
    }

    // token
    {
        var idx_name = 'IX_' + coll + '_token';
        var idx = db.getSiblingDB('member')[coll].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
        if (idx) {
            idx.exists = true;
        } else {
            var res = db.getSiblingDB('member')[coll].createIndex(
                {token: 1}
            ,   {name: idx_name}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('member')[coll].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
            idx.__________________________________________________CREATED = true;
        }
        delete idx.v;
        printjson(idx);
    }

    // TTL index for archive
    {
        var idx_name = 'TTL_' + coll;
        var idx = db.getSiblingDB('member')[coll].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
        if (idx) {
            idx.exists = true;
        }
        else {
            var res = db.getSiblingDB('member')[coll].createIndex(
                {'__archive.eventtime': 1}
            ,   {expireAfterSeconds: 3600*24*8, name: idx_name}
            );
            if (res.ok != 1) {
                printjson(res);
            }
            idx = db.getSiblingDB('member')[coll].getIndexes().filter((idx)=>RegExp('^' + idx_name + '$').test(idx.name))[0];
            idx.__________________________________________________CREATED = true;
        }
        if (!(idx.expireAfterSeconds > 0)) {
            idx.__________________________________________________WARNING = '[expireAfterSeconds] option is NOT correct!!!'
        }
        delete idx.v;
        printjson(idx);
    }
}
