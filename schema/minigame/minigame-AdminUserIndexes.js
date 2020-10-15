if ((2 ** Saba.env() & 6) > 0)
{   // admins
    [
        {   idxKeys : {username: 1}
        ,   idxOpts : {unique: true}
        }
    ].forEach((idx) => {
        Maint.createIndex(dbs.minigame.admins, idx.idxKeys, idx.idxOpts);
    });
}

if ((2 ** Saba.env() & 6) > 0)
{   // admin_users
    [
        {   idxKeys : {username: 1}
        ,   idxOpts : {unique: true}
        }
    ].forEach((idx) => {
        Maint.createIndex(dbs.minigame.admin_users, idx.idxKeys, idx.idxOpts);
    });
}
