// admins
{
    var coll = 'admins';

    // [UNIQUE] username
    {
        var idx_keys = {username: 1};
        var idx_opts = {unique: true, name: 'UIX_' + coll + '_username'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }
}

// admin_users
{
    var coll = 'admin_users';

    // [UNIQUE] username
    {
        var idx_keys = {username: 1};
        var idx_opts = {unique: true, name: 'UIX_' + coll + '_username'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }
}
