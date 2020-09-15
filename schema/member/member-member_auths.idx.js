{   // member_auths
    [
        {
            idxKeys : {memberId: 1, iP: 1}
        ,   idxOpts : {}
        }
    ,   {
            idxKeys : {token: 1}
        ,   idxOpts : {}
        }
    ,   {
            idxKeys : {'__archive.eventtime': 1}
        ,   idxOpts : {expireAfterSeconds: 3600*24*8}
        }
    ].forEach((idx) => {
        Maint.createIndex(dbs.member.member_auths, idx.idxKeys, idx.idxOpts);
    });
}
