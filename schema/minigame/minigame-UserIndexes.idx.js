{   // users
    [
        {
            idxKeys : {'local.username': 1}
        ,   idxOpts : {unique: true}
        }
    ].forEach((idx) => {
        Maint.createIndex(dbs.minigame.users, idx.idxKeys, idx.idxOpts);
    });
}

{   // userinfos
    [
        {
            idxKeys : {id: 1}
        ,   idxOpts : {unique: true}
        }
    ,   {
            idxKeys : {UID: 1}
        ,   idxOpts : {unique: true}
        }
    ,   {
            idxKeys : {name: 1}
        ,   idxOpts : {unique: true, collation: {locale: 'en', strength: 2}}
        }
    ,   {
            idxKeys : {currency: 1}
        ,   idxOpts : {collation: {locale: 'en', strength: 2}}
        }
    ,   {
            idxKeys : {type: 1, inRoom: 1, red: 1}
        ,   idxOpts : {}
        }
    ].forEach((idx) => {
        Maint.createIndex(dbs.minigame.userinfos, idx.idxKeys, idx.idxOpts);
    });
}

{   // usersessions
    [
        {
            idxKeys : {sessionId: 1}
        ,   idxOpts : {unique: true}
        }
    ,   {
            idxKeys : {ssoToken: 1}
        ,   idxOpts : {}
        }
    ,   {
            idxKeys : {recheckInTime: 1}
        ,   idxOpts : {}
        }
    ,   {
            idxKeys : {'__archive.eventtime': 1}
        ,   idxOpts : {expireAfterSeconds: 3600*24*8}
        }
    ].forEach((idx) => {
        Maint.createIndex(dbs.minigame.usersessions, idx.idxKeys, idx.idxOpts);
    });
}
