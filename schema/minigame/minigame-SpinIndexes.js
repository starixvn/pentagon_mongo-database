// spins
{
    const coll = 'spins';
    let idxKeys = null;
    let idxOpts = null;

    // [UNIQUE] memberId
    {
        idxKeys = {memberId: 1};
        idxOpts = {unique: true, name: `UIX_${coll}_memberId`};
        createIndex(db.getSiblingDB('minigame')[coll], idxKeys, idxOpts);
    }
}

// spin_results
{
    const coll = 'spin_results';
    let idxKeys = null;
    let idxOpts = null;

    // [UNIQUE] memberId
    {
        idxKeys = {id: 1};
        idxOpts = {unique: true, name: `UIX_${coll}_id`};
        createIndex(db.getSiblingDB('minigame')[coll], idxKeys, idxOpts);
    }
}

// spin_logs
{
    const coll = 'spin_logs';
    let idxKeys = null;
    let idxOpts = null;

    // [UNIQUE] memberId
    {
        idxKeys = {key: 1, memberId: 1};
        idxOpts = {unique: true, name: `UIX_${coll}_key_memberId`};
        createIndex(db.getSiblingDB('minigame')[coll], idxKeys, idxOpts);
    }

    // memberId - time
    {
        idxKeys = {memberId: 1, time: 1};
        idxOpts = {name: `IX_${coll}_memberId_time`};
        createIndex(db.getSiblingDB('minigame')[coll], idxKeys, idxOpts);
    }
}
