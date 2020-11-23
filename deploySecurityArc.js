[   'security/Roles.js'
,   'security/arc/ArchiveUsers.js'
].forEach((path) => {
    try {
        load(path);
        Misc.log(`Deployed [${path}]`, `Success`, `DEPLOY`, `I`);
    } catch (e) {
        Misc.log(`${e}`, `Failure`, `DEPLOY`, `E`);
    }
});
