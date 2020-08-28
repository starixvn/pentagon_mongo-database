// users
{
    const coll = 'users';
    let idxKeys = null;
    let idxOpts = null;

    // [UNIQUE] username
    {
        idxKeys = {'local.username': 1};
        idxOpts = {unique: true, name: `UIX_${coll}_username`};
        createIndex(db.getSiblingDB('minigame')[coll], idxKeys, idxOpts);
    }
}

// userinfos
{
    const coll = 'userinfos';
    let idxKeys = null;
    let idxOpts = null;

    // [UNIQUE] id
    {
        idxKeys = {id: 1};
        idxOpts = {unique: true, name: `UIX_${coll}_id`};
        createIndex(db.getSiblingDB('minigame')[coll], idxKeys, idxOpts);
    }

    // [UNIQUE] UID
    {
        idxKeys = {UID: 1};
        idxOpts = {unique: true, name: `UIX_${coll}_UID`};
        createIndex(db.getSiblingDB('minigame')[coll], idxKeys, idxOpts);
    }

    // [UNIQUE] name (with collation)
    {
        idxKeys = {name: 1};
        idxOpts = {unique: true, name: `UIX_${coll}_name`};
        createIndex(db.getSiblingDB('minigame')[coll], idxKeys, idxOpts);
    }

    // currency
    {
        idxKeys = {currency: 1};
        idxOpts = {name: `IX_${coll}_currency`};
        createIndex(db.getSiblingDB('minigame')[coll], idxKeys, idxOpts);
    }

    // type - inRoom
    {
        idxKeys = {type: 1, inRoom: 1, red: 1};
        idxOpts = {name: `IX_${coll}_type_inRoom_red`};
        createIndex(db.getSiblingDB('minigame')[coll], idxKeys, idxOpts);
    }
}

// usersessions
{
    const coll = 'usersessions';
    let idxKeys = null;
    let idxOpts = null;

    // [UNIQUE] sessionId
    {
        idxKeys = {sessionId: 1};
        idxOpts = {unique: true, name: `UIX_${coll}_sessionId`};
        createIndex(db.getSiblingDB('minigame')[coll], idxKeys, idxOpts);
    }

    // ssoToken
    {
        idxKeys = {ssoToken: 1};
        idxOpts = {name: `IX_${coll}_ssoToken`};
        createIndex(db.getSiblingDB('minigame')[coll], idxKeys, idxOpts);
    }

    // recheckInTime
    {
        idxKeys = {recheckInTime: 1};
        idxOpts = {name: `IX_${coll}_recheckInTime`};
        createIndex(db.getSiblingDB('minigame')[coll], idxKeys, idxOpts);
    }

    // Archive TTL
    {
        idxKeys = {'__archive.eventtime': 1};
        idxOpts = {expireAfterSeconds: 3600*24*8, name: `TTL_${coll}`};
        createIndex(db.getSiblingDB('minigame')[coll], idxKeys, idxOpts);
    }
}
