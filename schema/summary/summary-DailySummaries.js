// daily_summaries
{
    let coll = 'daily_summaries';

    // time - currency - gameId
    {
        let idx_keys = {time: 1, currency: 1, gameId: 1};
        let idx_opts = {unique: true, name: 'UIX_' + coll + '_gameId'};
        createIndex(db.getSiblingDB('summary')[coll], idx_keys, idx_opts);
    }

    // TTL index
    {
        let idx_keys = {time: 1};
        let idx_opts = {expireAfterSeconds: 3600*24*8, name: 'TTL_' + coll};
        createIndex(db.getSiblingDB('summary')[coll], idx_keys, idx_opts);
    }
}

