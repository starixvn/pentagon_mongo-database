// Roles
{
    var monitorActions = ['collStats', 'indexStats'];
    db.getSiblingDB('admin').createRole({
        role: 'monitorSystem'
    ,   roles: []
    ,   privileges: [
            {resource: {db: 'admin', collection: 'system.keys'}, actions: monitorActions}
        ,   {resource: {db: 'admin', collection: 'system.roles'}, actions: monitorActions}
        ,   {resource: {db: 'admin', collection: 'system.users'}, actions: monitorActions}
        ,   {resource: {db: 'admin', collection: 'system.version'}, actions: monitorActions}
        ,   {resource: {db: 'config', collection: 'system.sessions'}, actions: monitorActions}
        ,   {resource: {db: 'local', collection: 'system.profile'}, actions: monitorActions}
        ,   {resource: {db: 'local', collection: 'system.replset'}, actions: monitorActions}
        ,   {resource: {db: 'local', collection: 'system.rollback.id'}, actions: monitorActions}
        ,   {resource: {db: '', collection: ''}, actions: monitorActions}
        ,   {resource: {db: '', collection: 'system.js'}, actions: monitorActions}
        ,   {resource: {db: '', collection: 'system.profile'}, actions: monitorActions}
        ]
    });
}


db.getSiblingDB('admin').createUser({
    user: 'billy.bui'
,   pwd: passwordPrompt()
,   roles: []
});
db.getSiblingDB('admin').createUser({
    user: 'lmn_archive'
,   pwd: passwordPrompt()
,   roles: []
});
db.getSiblingDB('admin').createUser({
    user: 'lmn_backend'
,   pwd: passwordPrompt()
,   roles: []
});
db.getSiblingDB('admin').createUser({
    user: 'lmn_readonly'
,   pwd: passwordPrompt()
,   roles: []
});
db.getSiblingDB('admin').createUser({
    user: 'mongodb_exporter'
,   pwd: passwordPrompt()
,   roles: []
});
db.getSiblingDB('admin').createUser({
    user: 'mongosqld'
,   pwd: passwordPrompt()
,   roles: []
});


db.getSiblingDB('admin').grantRolesToUser('billy.bui', [
    {role: 'root', db: 'admin'}
,   {role: 'dbOwner', db: 'admin'}
,   {role: 'dbOwner', db: 'local'}
,   {role: 'dbOwner', db: 'config'}
]);
db.getSiblingDB('admin').grantRolesToUser('lmn_archive', [
    {role: 'readWrite', db: 'minigame_arc'}
,   {role: 'readWrite', db: 'log_arc'}
,   {role: 'readWrite', db: 'minigame_rm'}
]);
db.getSiblingDB('admin').grantRolesToUser('lmn_backend', [
    {role: 'read', db: 'minigame_arc'}
,   {role: 'read', db: 'log_arc'}
,   {role: 'read', db: 'minigame_rm'}
]);
db.getSiblingDB('admin').grantRolesToUser('lmn_readonly', [
    {role: 'read', db: 'minigame_arc'}
,   {role: 'read', db: 'log_arc'}
,   {role: 'read', db: 'minigame_rm'}
]);
db.getSiblingDB('admin').grantRolesToUser('mongodb_exporter', [
    {role: 'readAnyDatabase', db: 'admin'}
,   {role: 'clusterMonitor', db: 'admin'}
,   {role: 'read', db: 'local'}
,   {role: 'monitorSystem', db: 'admin'}
]);
db.getSiblingDB('admin').grantRolesToUser('mongosqld', [
    {role: 'read', db: 'minigame_arc'}
,   {role: 'read', db: 'log_arc'}
,   {role: 'read', db: 'minigame_rm'}
,   {role: 'readWrite', db: 'schema'}
]);

