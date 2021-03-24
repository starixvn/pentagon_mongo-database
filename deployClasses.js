[   'server-side-functions/class/SabaClub.js'
,   'server-side-functions/class/Shell.js'
,   'server-side-functions/class/Tool.js'
].forEach((path) => {
    try {
        load(path);
        Misc.log(`Deployed [${path}]`, `Success`, `DEPLOY`, `I`);
    } catch (e) {
        Misc.log(`${e}`, `Failure`, `DEPLOY`, `E`);
    }
});
