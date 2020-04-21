db = db.getSiblingDB('minigame');
db_rm = db_rm.getSiblingDB('minigame_rm');
db.messages.find({text: {$regex: /^Xin/}}).forEach(doc => {
    db_rm.messages_rm.insertOne({rm: doc, rmDate: new ISODate()});
    db.messages.remove({_id: doc._id});
});