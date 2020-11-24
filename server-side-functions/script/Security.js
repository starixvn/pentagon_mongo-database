{
    // Sec.defineRole()
    const definePrincipalFunc = (principal, type) => {
        if (!type) {
            Misc.log(`Must specify the principal type.`, `Audit`, `PRINCIPAL`, `E`);
            return;
        }

        const principalSchema = {
            name: "string"
        ,   db: "string"
        ,   roles: Array
        ,   privileges: Array
        };
        if (!Misc.auditSchema(principal, principalSchema)) {
            Misc.log(`principal' schema is NOT correct.`, `Audit`, `PRINCIPAL`, `E`);
            return;
        }

        // Verify database existence
        if (!dbs || !dbs[principal.db]) {
            Misc.log(`Database [${principal.db}] does not exists.`, `Audit`, `PRINCIPAL`, `E`);
            return;
        }

        let principalType;
        switch (String.toLowerCase(type)) {
            case `r`:
            case `role`:
                principalType = `Role`;
                if (!dbs[principal.db].getRole(principal.name)) {
                    dbs[principal.db].createRole({
                        role: principal.name
                    ,   roles: []
                    ,   privileges: []
                    });
                    Misc.log(`${principalType} created.`, `${principal.db}.${principal.name}`, `${principalType}`, `I`);
                }
                break;
            case `u`:
            case `usr`:
            case `user`:
                principalType = `User`;
                if (!dbs[principal.db].getUser(principal.name)) {
                    Misc.log(`${principalType} does NOT exist. Creating one...`, `${principal.db}.${principal.name}`, `${principalType}`, `I`);
                    dbs[principal.db].createUser({
                        user: principal.name
                    ,   pwd: passwordPrompt()
                    ,   roles: []
                    });
                    Misc.log(`${principalType} created.`, `${principal.db}.${principal.name}`, `${principalType}`, `I`);
                }
                break;
            default:
                Misc.log(`Principal type [${type}] is not correct.`, `Audit`, `PRINCIPAL`, `E`);
        };

        // Check and create principal

        // Grant roles
        if ((principal.roles || []).length > 0) {
            dbs[principal.db][`grantRolesTo${principalType}`](principal.name, principal.roles);
            Misc.log(`${principal.roles.length} roles was granted to the ${principalType.toLowerCase()}.`, `${principal.db}.${principal.name}`, `${principalType}`, `I`);
        }

        // Grant privileges
        if ((principal.privileges || []).length > 0) {
            dbs[principal.db][`grantPrivilegesTo${principalType}`](principal.name, principal.privileges);
            Misc.log(`${principal.privileges.length} privileges was granted to the ${principalType.toLowerCase()}.`, `${principal.db}.${principal.name}`, `${principalType}`, `I`);
        }
    };

    // Sec
    db.getSiblingDB(`script`).system.js.save({
        _id: `Sec`
    ,   value:  new Code(`{
            definePrincipal: ${definePrincipalFunc.toString()}
        }`)
    ,   version: 1.1
    ,   name: `Security`
    });

    // Reload scripts
    db.getSiblingDB(`script`).loadServerScripts();
}
