{
  const idxs = {
    name : {
      idxKeys : {name: 1},
      idxOpts : {unique: true, collation: {locale: 'en', strength: 2}},
    },
  };

  if ((2 ** Saba.env() & 14) > 0) {   // archive_statuses
    dbs.minigame.createCollection('archive_statuses', {collation: {locale: 'en', strength: 2}});
    [idxs.name].
        forEach(idx => {Maint.createIndex(dbs.minigame.archive_statuses, idx.idxKeys, idx.idxOpts)});
  }
}
