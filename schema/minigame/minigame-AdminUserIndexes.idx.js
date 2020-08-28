// admins
{
    const coll = 'admins';
    let idxKeys = null;
    let idxOpts = null;

    // [UNIQUE] username
    {
        idxKeys = {username: 1};
        idxOpts = {unique: true, name: `UIX_${coll}_username`};
        createIndex(db.getSiblingDB('minigame')[coll], idxKeys, idxOpts);
    }
}

// admin_users
{
    const coll = 'admin_users';
    let idxKeys = null;
    let idxOpts = null;

    // [UNIQUE] username
    {
        idxKeys = {username: 1};
        idxOpts = {unique: true, name: `UIX_${coll}_username`};
        createIndex(db.getSiblingDB('minigame')[coll], idxKeys, idxOpts);
    }
}
