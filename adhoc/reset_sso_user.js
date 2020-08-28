{
    const src = '';
    const arc = '';
    const dst = arc;


    const dbSrc = (new Mongo(src)).getDB('minigame');
    const dbArc = (new Mongo(arc)).getDB('minigame_arc');
    const dbDst = (new Mongo(dst)).getDB('minigame_rm');


    const user = dbSrc['userinfos'].find({name: 'Ahihi'}).toArray();

    if (user.length !== 1) {
        print(`Failed because user has ${user.length} documents.`);
    } else {
        const _user = user[0];
        print(`===== ${_user.name} =====`);
        dbSrc.getCollectionNames().forEach((coll) => {
            let query;
            if (coll !== 'userinfos' && coll !== 'users' && coll !== 'admins' && coll !== 'admin_users') {
                query = {uid: _user.id};
            }
            if (coll === 'users') {
                query = {_id: ObjectId(_user.id)};
            }
            if (coll === 'userinfos') {
                query = {_id: _user._id};
            }

            const _docs = [];
            const _docsId = [];
            dbSrc[coll].find(query).forEach(doc => {
                _docs.push({rm: doc, rmDate: new ISODate()});
                _docsId.push(doc._id);
            });
            dbDst[`${coll}_rm`].insertMany(_docs);
            dbSrc[`${coll}`].remove({_id: {$in: _docsId}});
            dbArc[`${coll}_bk`].remove({_id: {$in: _docsId}});
            print(`_____ ${coll} _____`);
            printjson(_docs.length);
            printjson(_docsId);
        })
    }

    print("=========================================================================================\n\n");
    dbSrc._session.endSession();
    dbArc._session.endSession();
    dbDst._session.endSession();
}
