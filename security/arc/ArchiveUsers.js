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
    ,   {   name: `lmn_archive`
        ,   db: `admin`
        ,   roles: [
                {role: `readWrite`  , db: `log_arc`}
            ,   {role: `readWrite`  , db: `member_arc`}
            ,   {role: `readWrite`  , db: `minigame_arc`}
            ,   {role: `readWrite`  , db: `minigame_rm`}
            ]
        }
    ,   {   name: `lmn_backend`
        ,   db: `admin`
        ,   roles: [
                {role: `read`       , db: `log_arc`}
            ,   {role: `read`       , db: `member_arc`}
            ,   {role: `read`       , db: `minigame_arc`}
            ,   {role: `read`       , db: `minigame_rm`}
            ,   {role: `read`       , db: `summary_arc`}
            ]
        }
    ,   {   name: `lmn_readonly`
        ,   db: `admin`
        ,   roles: [
                {role: `read`       , db: `log_arc`}
            ,   {role: `read`       , db: `member_arc`}
            ,   {role: `read`       , db: `minigame_arc`}
            ,   {role: `read`       , db: `minigame_rm`}
            ,   {role: `read`       , db: `summary_arc`}
            ]
        }
    ,   {   name: `mongodb_exporter`
        ,   db: `admin`
        ,   roles: [
                {role: `clusterMonitor` , db: `admin`}
            ,   {role: `monitorSystem`  , db: `admin`}
            ]
        }
    ,   {   name: `mongosqld`
        ,   db: `admin`
        ,   roles: [
                {role: `read`       , db: `log_arc`}
            ,   {role: `read`       , db: `member_arc`}
            ,   {role: `read`       , db: `minigame_arc`}
            ,   {role: `read`       , db: `minigame_rm`}
            ,   {role: `readWrite`  , db: `schema`}
            ,   {role: `read`       , db: `summary_arc`}
            ]
        }
    ,   {   name: `lmn_summary`
        ,   db: `admin`
        ,   roles: [
                {role: `read`       , db: `minigame_arc`}
            ,   {role: `read`       , db: `script`}
            ,   {role: `readWrite`  , db: `summary_arc`}
            ]
        }
    ].forEach(user => {
        user.roles = (user.roles || []).concat({role: 'public', db: 'admin'})
        Sec.definePrincipal(user, `user`);
    });
}
