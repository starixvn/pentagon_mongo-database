// daily_summaries
{
    const coll = 'daily_summaries';
    let idxKeys = null;
    let idxOpts = null;

    // time - currency - gameId
    {
        idxKeys = {time: 1, currency: 1, gameId: 1};
        idxOpts = {unique: true, name: `UIX_${coll}_gameId`};
        createIndex(db.getSiblingDB('summary')[coll], idxKeys, idxOpts);
    }

    // TTL index
    {
        idxKeys = {time: 1};
        idxOpts = {expireAfterSeconds: 3600*24*8, name: `TTL_${coll}`};
        createIndex(db.getSiblingDB('summary')[coll], idxKeys, idxOpts);
    }
}

