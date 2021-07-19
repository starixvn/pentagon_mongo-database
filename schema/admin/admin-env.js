{   // env
    db.getSiblingDB('admin').createCollection('env', {collation: {locale: 'en', strength: 2}});

    const SC = db._mongo.host.split(':').pop().substr(0, 1) - 1 || 1;
    db.getSiblingDB('admin').env.updateOne({_id: 'SC'}, {$set: {value: SC}}, {upsert: true});
}
