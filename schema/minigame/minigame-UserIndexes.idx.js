// userinfos
{
    db.getSiblingDB('minigame').userinfos.createIndex({currency: 1}, {name: 'IX_userinfos_currency'});
}

// usersessions
{
    db.getSiblingDB('minigame').usersessions.createIndex({ssoToken: 1}, {name: 'IX_usersessions_ssoToken'});
}