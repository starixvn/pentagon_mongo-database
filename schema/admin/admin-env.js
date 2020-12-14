{   // env
    dbs.admin.createCollection('env', {collation: {locale: 'en', strength: 2}});

    const SC = dbs._mongo.host.split(':').pop().substr(0, 1) - 1 || 1;
    dbs.admin.env.updateOne({_id: 'SC'}, {$set: {value: SC}}, {upsert: true});
}
