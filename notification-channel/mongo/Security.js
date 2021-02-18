{
    [
        {   name: `billy.bui`
        ,   db: `admin`
        ,   roles: [
                {role: `root`       , db: `admin`}
            ,   {role: `dbOwner`    , db: `admin`}
            ,   {role: `dbOwner`    , db: `local`}
            ,   {role: `dbOwner`    , db: `config`}
            ]
        }
    ,   {   name: `mongosqld`
        ,   db: `admin`
        ,   roles: [
                {role: `read`       , db: `notification`}
            ,   {role: `readWrite`  , db: `schema`}
            ]
        }
    ,   {   name: `lmn_readonly`
        ,   db: `admin`
        ,   roles: [
                {role: `read`       , db: `notification`}
            ]
        }
    ].forEach(user => {
        user.roles = (user.roles || []).concat({role: 'public', db: 'admin'})
        Sec.definePrincipal(user, `user`);
    });
}
