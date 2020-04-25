db = db.getSiblingDB('minigame');

db.taixiu_ones.dropIndex('uid_1_phien_1_taixiu_1_red_1');
db.getSiblingDB('minigame').taixiu_ones.createIndex({uid: 1, phien: 1, taixiu: 1, red: 1}, {name: 'UIX_taixiu_ones_uid_phien_red', unique: true});

db.txturbo_ones.dropIndex('uid_1_phien_1_taixiu_1_red_1');
db.getSiblingDB('minigame').txturbo_ones.createIndex({uid: 1, phien: 1, taixiu: 1, red: 1}, {name: 'UIX_txturbo_ones_uid_phien_red', unique: true});

db.chanle_ones.dropIndex('uid_1_phien_1_red_1');
db.getSiblingDB('minigame').chanle_ones.createIndex({uid: 1, phien: 1, red: 1}, {name: 'UIX_chanle_ones_uid_phien_red', unique: true});

db.chanleturbo_ones.dropIndex('uid_1_phien_1_red_1');
db.getSiblingDB('minigame').chanleturbo_ones.createIndex({uid: 1, phien: 1, red: 1}, {name: 'UIX_chanleturbo_ones_uid_phien_red', unique: true});
db