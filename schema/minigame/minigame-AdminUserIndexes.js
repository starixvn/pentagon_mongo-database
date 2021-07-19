if ((2 ** Saba.env() & 14) > 0)
{   // admins
    [
        {   idxKeys : {username: 1}
        ,   idxOpts : {unique: true}
        }
    ].forEach((idx) => {
        Maint.createIndex(db.getSiblingDB('minigame').admins, idx.idxKeys, idx.idxOpts);
    });
}

if ((2 ** Saba.env() & 14) > 0)
{   // admin_users
    [
        {   idxKeys : {username: 1}
        ,   idxOpts : {unique: true}
        }
    ].forEach((idx) => {
        Maint.createIndex(db.getSiblingDB('minigame').admin_users, idx.idxKeys, idx.idxOpts);
    });
}
