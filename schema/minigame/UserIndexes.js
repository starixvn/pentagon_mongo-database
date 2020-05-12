// userinfos currency
db.getSiblingDB('minigame').userinfos.createIndex({currency: 1}, {name: 'IX_userinfos_currency'});

