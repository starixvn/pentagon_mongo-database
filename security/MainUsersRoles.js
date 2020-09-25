// Roles
{
    const monitorActions = ['collStats', 'indexStats'];
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
db.getSiblingDB('admin').createUser({
    user: 'lmn_summary'
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
    {role: 'readWrite', db: 'minigame'}
,   {role: 'readWrite', db: 'member'}
,   {role: 'readWrite', db: 'log'}
,   {role: 'read', db: 'script'}
,   {role: 'read', db: 'archive'}
]);
db.getSiblingDB('admin').grantRolesToUser('lmn_backend', [
    {role: 'readWrite', db: 'minigame'}
,   {role: 'readWrite', db: 'member'}
,   {role: 'readWrite', db: 'log'}
,   {role: 'read', db: 'summary'}
]);
db.getSiblingDB('admin').grantRolesToUser('lmn_readonly', [
    {role: 'read', db: 'minigame'}
,   {role: 'read', db: 'member'}
,   {role: 'read', db: 'log'}
,   {role: 'read', db: 'summary'}
]);
db.getSiblingDB('admin').grantRolesToUser('mongodb_exporter', [
    {role: 'clusterMonitor', db: 'admin'}
,   {role: 'monitorSystem', db: 'admin'}
]);
db.getSiblingDB('admin').grantRolesToUser('mongosqld', [
    {role: 'read', db: 'minigame'}
,   {role: 'read', db: 'member'}
,   {role: 'read', db: 'log'}
,   {role: 'read', db: 'summary'}
,   {role: 'readWrite', db: 'schema'}
]);
db.getSiblingDB('admin').grantRolesToUser('lmn_summary', [
    {role: 'read', db: 'minigame'}
,   {role: 'read', db: 'script'}
,   {role: 'readWrite', db: 'summary'}
]);

