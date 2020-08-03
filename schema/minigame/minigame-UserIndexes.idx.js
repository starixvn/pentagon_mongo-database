// users
{
    var coll = 'users';

    // [UNIQUE] username
    {
        var idx_keys = {'local.username': 1};
        var idx_opts = {unique: true, name: 'UIX_' + coll + '_username'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }
}

// userinfos
{
    var coll = 'userinfos';

    // [UNIQUE] id
    {
        var idx_keys = {id: 1};
        var idx_opts = {unique: true, name: 'UIX_' + coll + '_id'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }

    // [UNIQUE] UID
    {
        var idx_keys = {UID: 1};
        var idx_opts = {unique: true, name: 'UIX_' + coll + '_UID'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }

    // [UNIQUE] name (with collation)
    {
        var idx_keys = {name: 1};
        var idx_opts = {unique: true, name: 'UIX_' + coll + '_name'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }

    // currency
    {
        var idx_keys = {currency: 1};
        var idx_opts = {name: 'IX_' + coll + '_currency'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }

    // type - inRoom
    {
        var idx_keys = {type: 1, inRoom: 1, red: 1};
        var idx_opts = {name: 'IX_' + coll + '_type_inRoom_red'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }
}

// usersessions
{
    var coll = 'usersessions';

    // [UNIQUE] sessionId
    {
        var idx_keys = {sessionId: 1};
        var idx_opts = {unique: true, name: 'UIX_' + coll + '_sessionId'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }

    // ssoToken
    {
        var idx_keys = {ssoToken: 1};
        var idx_opts = {name: 'IX_' + coll + '_ssoToken'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }

    // recheckInTime
    {
        var idx_keys = {recheckInTime: 1};
        var idx_opts = {name: 'IX_' + coll + '_recheckInTime'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }

    // Archive TTL
    {
        var idx_keys = {'__archive.eventtime': 1};
        var idx_opts = {expireAfterSeconds: 3600*24*8, name: 'TTL_' + coll + ''};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }
}
