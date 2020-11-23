[   'security/Roles.js'
,   'security/main/MainUsers.js'
].forEach((path) => {
    try {
        load(path);
        Misc.log(`Deployed [${path}]`, `Success`, `DEPLOY`, `I`);
    } catch (e) {
        Misc.log(`${e}`, `Failure`, `DEPLOY`, `E`);
    }
});
