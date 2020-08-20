// users
{
    let coll = 'users';

    // [UNIQUE] username
    {
        let idx_keys = {'local.username': 1};
        let idx_opts = {unique: true, name: 'UIX_' + coll + '_username'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }
}

// userinfos
{
    let coll = 'userinfos';

    // [UNIQUE] id
    {
        let idx_keys = {id: 1};
        let idx_opts = {unique: true, name: 'UIX_' + coll + '_id'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }

    // [UNIQUE] UID
    {
        let idx_keys = {UID: 1};
        let idx_opts = {unique: true, name: 'UIX_' + coll + '_UID'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }

    // [UNIQUE] name (with collation)
    {
        let idx_keys = {name: 1};
        let idx_opts = {unique: true, name: 'UIX_' + coll + '_name'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }

    // currency
    {
        let idx_keys = {currency: 1};
        let idx_opts = {name: 'IX_' + coll + '_currency'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }

    // type - inRoom
    {
        let idx_keys = {type: 1, inRoom: 1, red: 1};
        let idx_opts = {name: 'IX_' + coll + '_type_inRoom_red'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }
}

// usersessions
{
    let coll = 'usersessions';

    // [UNIQUE] sessionId
    {
        let idx_keys = {sessionId: 1};
        let idx_opts = {unique: true, name: 'UIX_' + coll + '_sessionId'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }

    // ssoToken
    {
        let idx_keys = {ssoToken: 1};
        let idx_opts = {name: 'IX_' + coll + '_ssoToken'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }

    // recheckInTime
    {
        let idx_keys = {recheckInTime: 1};
        let idx_opts = {name: 'IX_' + coll + '_recheckInTime'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }

    // Archive TTL
    {
        let idx_keys = {'__archive.eventtime': 1};
        let idx_opts = {expireAfterSeconds: 3600*24*8, name: 'TTL_' + coll + ''};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }
}
