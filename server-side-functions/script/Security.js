{
    // Sec.resetRolesUser()
    const resetRolesUserFunc = (user, roles = [], authDB = db.getSiblingDB(`admin`)) => {
        // Parameters' type verification
        if (typeof user !== `string`) {
            Misc.log(`User [${tojsononeline(user)}] must be a string.`, `Audit`, `RESETROLES-USER`, `E`);
            return;
        }
        if (!(roles instanceof Array)) {
            Misc.log(`Roles list [${tojsononeline(roles)}] must be an array.`, `Audit`, `RESETROLES-USER`, `E`);
            return;
        }
        if (!(authDB instanceof DB)) {
            Misc.log(`Database [${tojsononeline(authDB)}] must be a database.`, `Audit`, `RESETROLES-USER`, `E`);
            return;
        }

        let sUser = authDB.getUser(user);
        if (!sUser) {
            Misc.log(`User [${tojsononeline(user)}] does not exist in database [${tojsononeline(authDB)}].`, `Audit`, `RESETROLES-USER`, `E`);
            return;
        }

        try {
            authDB.revokeRolesFromUser(user, sUser.roles);
        } catch (e) {
            Misc.log(`${e.toString()}.`, `Remove Roles`, `RESETROLES-USER`, `E`);
        }

        if (roles.length > 0) {
            try {
                authDB.grantRolesToUser(user, roles);
            } catch (e) {
                Misc.log(`${e.toString()}.`, `Grant Roles`, `RESETROLES-USER`, `E`);
            }
        }
    };

    // Sec
    db.getSiblingDB(`script`).system.js.save({
        _id: `Sec`
    ,   value:  new Code(`{
            resetRolesUser: ${resetRolesUserFunc.toString()}
        }`)
    ,   version: 1.0
    ,   name: `Security`
    });

    // Reload scripts
    db.getSiblingDB(`script`).loadServerScripts();
}
