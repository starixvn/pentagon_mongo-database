db = db.getSiblingDB('minigame');
db.txturbo_users.aggregate([
    {$set: {_uid: {$toObjectId: '$uid'}}}
,   {$lookup: {from: 'userinfos', localField: '_uid', foreignField: '_id', as: '_userinfo'}}
,   {$unwind: '$_userinfo'}
,   {$project: {_id: 1, '_userinfo.id': 1}}
]).forEach(doc => {
    db.txturbo_users.updateOne({_id: doc._id}, {$set: {uid: doc._userinfo.id}});
});
