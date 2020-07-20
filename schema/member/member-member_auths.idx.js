// member_auths
{
    var coll = 'member_auths';

    // memberId - iP
    {
        var idx_keys = {memberId: 1, iP: 1};
        var idx_opts = {name: 'IX_' + coll + '_memberId_iP'};
        createIndex(db.getSiblingDB('member')[coll], idx_keys, idx_opts);
    }

    // token
    {
        var idx_keys = {token: 1};
        var idx_opts = {name: 'IX_' + coll + '_token'};
        createIndex(db.getSiblingDB('member')[coll], idx_keys, idx_opts);
    }

    // TTL index for archive
    {
        var idx_keys = {'__archive.eventtime': 1};
        var idx_opts = {expireAfterSeconds: 3600*24*8, name: 'TTL_' + coll + ''};
        createIndex(db.getSiblingDB('member')[coll], idx_keys, idx_opts);
    }
}
