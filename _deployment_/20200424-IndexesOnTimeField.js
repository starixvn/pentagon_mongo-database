db = db.getSiblingDB('minigame');

db.getSiblingDB('minigame').taixiu_phiens.createIndex({time: 1}, {name: 'IX_taixiu_phiens_time'});
db.getSiblingDB('minigame').taixiu_ones.createIndex({time: 1}, {name: 'IX_taixiu_ones_time'});

db.getSiblingDB('minigame').xocxoc_phiens.createIndex({time: 1}, {name: 'IX_xocxoc_phiens_time'});
db.getSiblingDB('minigame').xocxoc_cuocs.createIndex({time: 1}, {name: 'IX_xocxoc_cuocs_time'});

db.getSiblingDB('minigame').baucua_phiens.createIndex({time: 1}, {name: 'IX_baucua_phiens_time'});
db.getSiblingDB('minigame').baucua_cuocs.createIndex({time: 1}, {name: 'IX_baucua_cuocs_time'});

db.getSiblingDB('minigame').txturbo_phiens.createIndex({time: 1}, {name: 'IX_txturbo_phiens_time'});
db.getSiblingDB('minigame').txturbo_ones.createIndex({time: 1}, {name: 'IX_txturbo_ones_time'});

db.getSiblingDB('minigame').chanle_phiens.createIndex({time: 1}, {name: 'IX_chanle_phiens_time'});
db.getSiblingDB('minigame').chanle_ones.createIndex({time: 1}, {name: 'IX_chanle_ones_time'});

db.getSiblingDB('minigame').chanleturbo_phiens.createIndex({time: 1}, {name: 'IX_chanleturbo_phiens_time'});
db.getSiblingDB('minigame').chanleturbo_ones.createIndex({time: 1}, {name: 'IX_chanleturbo_ones_time'});
