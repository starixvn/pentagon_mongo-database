db.createRole({
    role: 'monitorSystem'
,   roles: []
,   privileges: [
        {resource: {db: 'admin', collection: 'system.version'}, actions: ['collStats', 'indexStats']}
    ,   {resource: {db: 'admin', collection: 'system.keys'}, actions: ['collStats', 'indexStats']}
    ,   {resource: {db: 'admin', collection: 'system.users'}, actions: ['collStats', 'indexStats']}
    ,   {resource: {db: 'config', collection: 'system.sessions'}, actions: ['collStats', 'indexStats']}
    ,   {resource: {db: 'local', collection: 'system.rollback.id'}, actions: ['collStats', 'indexStats']}
    ,   {resource: {db: 'local', collection: 'system.profile'}, actions: ['collStats', 'indexStats']}
    ,   {resource: {db: 'local', collection: 'system.replset'}, actions: ['collStats', 'indexStats']}
    ,   {resource: {db: '', collection: 'system.profile'}, actions: ['collStats', 'indexStats']}
    ,   {resource: {db: 'admin', collection: 'system.roles'}, actions: ['collStats', 'indexStats']}
    ,   {resource: {db: '', collection: 'system.js'}, actions: ['collStats','indexStats']}
    ]
});


db.createUser({
    user: 'billy.bui'
,   pwd: passwordPrompt()
,   roles: [
        {role: 'root', db: 'admin'}
    ,   {role: 'dbOwner', db: 'admin'}
    ,   {role: 'dbOwner', db: 'local'}
    ,   {role: 'dbOwner', db: 'config'}
    ]
});


db.createUser({
    user: 'lmn_archive'
,   pwd: passwordPrompt()
,   roles: [
        {role: 'readWrite', db: 'minigame'}
    ,   {role: 'readWrite', db: 'log'}
    ,   {role: 'read', db: 'script'}
    ]
});


db.createUser({
    user: 'lmn_backend'
,   pwd: passwordPrompt()
,   roles: [
        {role: 'readWrite', db: 'minigame'}
    ,   {role: 'readWrite', db: 'member'}
    ,   {role: 'readWrite', db: 'log'}
    ]
});


db.createUser({
    user: 'lmn_readonly'
,   pwd: passwordPrompt()
,   roles: [
        {role: 'read', db: 'minigame'}
    ,   {role: 'read', db: 'member'}
    ,   {role: 'read', db: 'log'}
    ]
});


db.createUser({
    user: 'lmn_bi'
,   pwd: passwordPrompt()
,   roles: [
        {role: 'read', db: 'minigame'}
    ,   {role: 'read', db: 'member'}
    ,   {role: 'read', db: 'log'}
    ]
});


db.createUser({
    user: 'mongodb_exporter'
,   pwd: passwordPrompt()
,   roles: [
        {role: 'readAnyDatabase', db: 'admin'}
    ,   {role: 'clusterMonitor', db: 'admin'}
    ,   {role: 'read', db: 'local'}
    ,   {role: 'monitorSystem', db: 'admin'}
    ,   {role: 'monitorSystem', db: 'admin'}
    ]
});


db.createUser({
    user: 'mongosqld'
,   pwd: passwordPrompt()
,   roles: [
        {role: 'read', db: 'minigame'}
    ,   {role: 'read', db: 'member'}
    ,   {role: 'read', db: 'log'}
    ,   {role: 'readWrite', db: 'schema'}
    ]
});

