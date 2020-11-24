{
    const actions = {
        public:     [`find`]
    ,   monitor:    [`collStats`, `indexStats`]
    ,   read:       [`find`, `listIndexes`]
    ,   list:       [`listCollections`]
    };

    [
        {   name: `public`
        ,   db: `admin`
        ,   roles: []
        ,   privileges: [
                {resource: {db: `admin`, collection: `env`}, actions: actions.public}
            ]
        }
    ,   {   name: `monitorSystem`
        ,   db: `admin`
        ,   roles: []
        ,   privileges: [
                {resource: {db: 'admin' , collection: 'system.keys'}        , actions: actions.monitor}
            ,   {resource: {db: 'admin' , collection: 'system.roles'}       , actions: actions.monitor}
            ,   {resource: {db: 'admin' , collection: 'system.users'}       , actions: actions.monitor}
            ,   {resource: {db: 'admin' , collection: 'system.version'}     , actions: actions.monitor}
            ,   {resource: {db: 'config', collection: 'system.sessions'}    , actions: actions.monitor}
            ,   {resource: {db: 'local' , collection: 'system.profile'}     , actions: actions.monitor}
            ,   {resource: {db: 'local' , collection: 'system.replset'}     , actions: actions.monitor}
            ,   {resource: {db: 'local' , collection: 'system.rollback.id'} , actions: actions.monitor}
            ,   {resource: {db: ''      , collection: ''}                   , actions: actions.monitor}
            ,   {resource: {db: ''      , collection: 'system.js'}          , actions: actions.monitor}
            ,   {resource: {db: ''      , collection: 'system.profile'}     , actions: actions.monitor}
            ]
        }
    ,   {   name: `readSystem`
        ,   db: `admin`
        ,   roles: [
                {role: 'readAnyDatabase', db: 'admin'}
            ]
        ,   privileges: [
                {resource: {db: 'admin' , collection: ''}                   , actions: actions.read}
            ,   {resource: {db: 'admin' , collection: 'system.keys'}        , actions: actions.read}
            ,   {resource: {db: 'admin' , collection: 'system.profile'}     , actions: actions.read}
            ,   {resource: {db: 'admin' , collection: 'system.roles'}       , actions: actions.read}
            ,   {resource: {db: 'admin' , collection: 'system.users'}       , actions: actions.read}
            ,   {resource: {db: 'admin' , collection: 'system.version'}     , actions: actions.read}
            ,   {resource: {db: 'admin' , collection: 'system.views'}       , actions: actions.read}
            ,   {resource: {db: 'config', collection: ''}                   , actions: actions.list}
            ,   {resource: {db: 'config', collection: ''}                   , actions: actions.read}
            ,   {resource: {db: 'config', collection: 'system.profile'}     , actions: actions.read}
            ,   {resource: {db: 'config', collection: 'system.sessions'}    , actions: actions.read}
            ,   {resource: {db: 'local' , collection: ''}                   , actions: actions.read}
            ,   {resource: {db: 'local' , collection: 'system.profile'}     , actions: actions.read}
            ,   {resource: {db: 'local' , collection: 'system.replset'}     , actions: actions.read}
            ,   {resource: {db: 'local' , collection: 'system.rollback.id'} , actions: actions.read}
            ]
        }
    ].forEach(role => Sec.definePrincipal(role, `role`));
}
