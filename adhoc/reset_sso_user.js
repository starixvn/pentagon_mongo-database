{
    let src = '';
    let arc = '';
    let dst = arc;


    let db_src = (new Mongo(src)).getDB('minigame');
    let db_arc = (new Mongo(arc)).getDB('minigame_arc');
    let db_dst = (new Mongo(dst)).getDB('minigame_rm');


    let user = db_src['userinfos'].find({name: 'Ahihi'}).toArray();

    if (user.length != 1) {
        print('Failed because user has ' + user.length + ' documents.');
    } else {
        let _user = user[0];
        print('===== ' + _user.name + ' =====');
        db_src.getCollectionNames().forEach(coll => {
            if (coll != 'userinfos' && coll != 'users' && coll != 'admins' && coll != 'admin_users') {
                let _docs = [];
                let _docsId = [];
                db_src[coll].find({uid: _user.id}).forEach(doc => {
                    _docs.push({rm: doc, rmDate: new ISODate()});
                    _docsId.push(doc._id);
                });
                db_dst[coll + '_rm'].insertMany(_docs);
                db_src[coll].remove({_id: {$in: _docsId}});
                db_arc[coll + '_bk'].remove({_id: {$in: _docsId}});
                print('_____ ' + coll + ' _____');
                printjson(_docs.length);
                printjson(_docsId);
            }
            if (coll == 'users') {
                let _docs = [];
                let _docsId = [];
                db_src[coll].find({_id: ObjectId(_user.id)}).forEach(doc => {
                    _docs.push({rm: doc, rmDate: new ISODate()});
                    _docsId.push(doc._id);
                });
                db_dst[coll + '_rm'].insertMany(_docs);
                db_src[coll].remove({_id: {$in: _docsId}});
                db_arc[coll + '_bk'].remove({_id: {$in: _docsId}});
                print('_____ ' + coll + ' _____');
                printjson(_docs.length);
                printjson(_docsId);
            }
            if (coll == 'userinfos') {
                let _docs = [];
                let _docsId = [];
                db_src[coll].find({_id: _user._id}).forEach(doc => {
                    _docs.push({rm: doc, rmDate: new ISODate()});
                    _docsId.push(doc._id);
                });
                db_dst[coll + '_rm'].insertMany(_docs);
                db_src[coll].remove({_id: {$in: _docsId}});
                db_arc[coll + '_bk'].remove({_id: {$in: _docsId}});
                print('_____ ' + coll + ' _____');
                printjson(_docs.length);
                printjson(_docsId);
            }
        })
    }

    print("=========================================================================================\n\n");
    db_src._session.endSession();
    db_arc._session.endSession();
    db_dst._session.endSession();
    // quit();
}