// member_auths
{
    const coll = 'member_auths';

    // memberId - iP
    {
        const idxKeys = {memberId: 1, iP: 1};
        const idxOpts = {name: `IX_${coll}_memberId_iP`};
        createIndex(db.getSiblingDB('member')[coll], idxKeys, idxOpts);
    }

    // token
    {
        const idxKeys = {token: 1};
        const idxOpts = {name: `IX_${coll}_token`};
        createIndex(db.getSiblingDB('member')[coll], idxKeys, idxOpts);
    }

    // TTL index for archive
    {
        const idxKeys = {'__archive.eventtime': 1};
        const idxOpts = {expireAfterSeconds: 3600*24*8, name: `TTL_${coll}`};
        createIndex(db.getSiblingDB('member')[coll], idxKeys, idxOpts);
    }
}
