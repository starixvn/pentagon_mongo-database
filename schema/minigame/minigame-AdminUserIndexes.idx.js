// admins
{
    let coll = 'admins';

    // [UNIQUE] username
    {
        let idx_keys = {username: 1};
        let idx_opts = {unique: true, name: 'UIX_' + coll + '_username'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }
}

// admin_users
{
    let coll = 'admin_users';

    // [UNIQUE] username
    {
        let idx_keys = {username: 1};
        let idx_opts = {unique: true, name: 'UIX_' + coll + '_username'};
        createIndex(db.getSiblingDB('minigame')[coll], idx_keys, idx_opts);
    }
}
