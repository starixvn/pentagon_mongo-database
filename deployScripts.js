[   'server-side-functions/script/Maintenance.js'
,   'server-side-functions/script/Miscellaneous.js'
,   'server-side-functions/script/PublicVariables.js'
,   'server-side-functions/script/SabaClub.js'
,   'server-side-functions/script/Archive.js'
,   'server-side-functions/script/Security.js'
].forEach((path) => {
    try {
        load(path);
        Misc.log(`Deployed [${path}]`, `Success`, `DEPLOY`, `I`);
    } catch (e) {
        Misc.log(`${e}`, `Failure`, `DEPLOY`, `E`);
    }
});
