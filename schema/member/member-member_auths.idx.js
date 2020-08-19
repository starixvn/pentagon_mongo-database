// member_auths
{
    let coll = 'member_auths';

    // memberId - iP
    {
        let idx_keys = {memberId: 1, iP: 1};
        let idx_opts = {name: 'IX_' + coll + '_memberId_iP'};
        createIndex(db.getSiblingDB('member')[coll], idx_keys, idx_opts);
    }

    // token
    {
        let idx_keys = {token: 1};
        let idx_opts = {name: 'IX_' + coll + '_token'};
        createIndex(db.getSiblingDB('member')[coll], idx_keys, idx_opts);
    }

    // TTL index for archive
    {
        let idx_keys = {'__archive.eventtime': 1};
        let idx_opts = {expireAfterSeconds: 3600*24*8, name: 'TTL_' + coll + ''};
        createIndex(db.getSiblingDB('member')[coll], idx_keys, idx_opts);
    }
}
