{
  const idxs = {
    time : {
      idxKeys : {'time.request': 1},
      idxOpts : {},
    },
  };

  if ((2 ** Saba.env() & 14) > 0) {
    [idxs.time].
      forEach(idx => {Maint.createIndex(dbs.Proteus.betlogs, idx.idxKeys, idx.idxOpts)});
  }
}
