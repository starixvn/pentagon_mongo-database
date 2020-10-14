{   // Roles
    const roleName = `public`;
    const publicActions = [`find`];
    if (!dbs.admin.getRole(roleName)) {
        dbs.admin.createRole({
            role: roleName
        ,   roles: []
        ,   privileges: []
        });
        Misc.log(`Role [${roleName}] created.`, ``, `ROLE`, `I`);
    }
    dbs.admin.grantPrivilegesToRole(roleName, [
        {resource: {db: 'admin', collection: 'env'}, actions: publicActions}
    ]);

    // Apply public role for every user
    dbs.admin.getUsers().forEach((usr) => {
        dbs.admin.grantRolesToUser(usr.user, [
            {role: 'public', db: 'admin'}
        ]);
        Misc.log(`Role [${roleName}] granted to [${usr.user}].`, ``, `ROLE`, `I`);
    });
}
