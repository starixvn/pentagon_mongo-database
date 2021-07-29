{
  const $Role = function (db, role, roles, privileges) {
    /** Self construct */
    if (!(this instanceof $Role)) return new $Role(db, role, roles, privileges);

    /** Private constant */
    const _logger = $Log(`ROLE`);

    const roleSchema = $Schema({
      '!db'         : DB,
      '!role'       : "string",
      'roles'      : $Role,
      'privileges' : $Privilege,
    });

    /** Private variable */
    let usrRoleObj = null;
    let srvRoleObj = null;

    /** Basic function */
    const _toString = () => {
      if (usrRoleObj == null) {
        return `Invalid [$Role]`;
      }
      return `\
[$Role] ${usrRoleObj.db._name}.${usrRoleObj.role}`;
    };
    const _valueOf = () => {
      if (srvRoleObj == null) {
        return null;
      }
      return `\
${srvRoleObj.db._name}.${srvRoleObj.role}
(${srvRoleObj.roles.sort().join(', ')})
(${srvRoleObj.privileges.sort().join(', ')})`;
    };

    /** Private function */
    const _parseRoleObj = (obj) => {
      if (!obj.roles) {
        obj.roles = [];
      }
      if (!obj.privileges) {
        obj.privileges = [];
      }
      if (!roleSchema.test(obj)) {
        _logger.err(`Audit`, `Invalid input data for role object`);
        return null;
      }
      return obj;
    };
    const _genData = () => {
      if ($Role.is$Role(db)) {
        usrRoleObj = _parseRoleObj(db.getRaw());
        return;
      }
      if (roleSchema.test(db)) {
        usrRoleObj = _parseRoleObj(db);
        return;
      }
      const data = {
        db        : db,
        role      : role,
        roles     : $Object.toArrayIfNot(roles).filter($Check.isNotNull).map($Role).sort(),
        privileges: $Object.toArrayIfNot(privileges).filter($Check.isNotNull).map($Privilege).sort(),
      };
      usrRoleObj = _parseRoleObj(data);
    };
    const _getRaw = () => {
      return usrRoleObj;
    };
    const _getRef = () => {
      if (!usrRoleObj) return null;
      return {
        db  : usrRoleObj.db._name,
        role: usrRoleObj.role,
      };
    };
    const _getDef = () => {
      if (!usrRoleObj) return null;
      return {
        role      : usrRoleObj.role,
        roles     : usrRoleObj.roles.map($Role.getRef).filter($Check.isNotNull),
        privileges: usrRoleObj.privileges.map($Privilege.getData).filter($Check.isNotNull),
      };
    };
    const _mapRoleDB = (obj) => {
      obj.db = usrRoleObj.db.getSiblingDB(obj.db);
      return obj;
    }
    const _loadServerRole = () => {
      if (usrRoleObj == null) return;
      const cmd = {
        rolesInfo: _getRef(),
        showPrivileges: true,
      };
      const res = usrRoleObj.db.runCommand(cmd);
      if (!res.ok) {
        _logger.err(`ServerRole`, res.errmsg);
        srvRoleObj = null;
        return;
      }
      if (res.roles.length == 0) {
        _logger.warn(`ServerRole`, `The role does not exist on server.`);
        srvRoleObj = null;
        return;
      }
      const data = res.roles[0];
      data.db = usrRoleObj.db.getSiblingDB(data.db);
      data.roles = data.roles.map(_mapRoleDB).map($Role);
      data.privileges = data.privileges.map($Privilege);
      delete data.inheritedRoles;
      delete data.inheritedPrivileges;
      srvRoleObj = _parseRoleObj(data);
    };
    const _getSrv = () => {
      _loadServerRole();
      return srvRoleObj;
    };
    const _syncRole = () => {
      _loadServerRole();
      if (!srvRoleObj) {
        _logger.warn(`Sync`, `Error loading server role. Local role is not synced.`);
        return;
      }
      if (usrRoleObj == srvRoleObj) {
        _logger.info(`Sync`, `Local role has already matched with server.`);
        return;
      }
      usrRoleObj = srvRoleObj;
    };
    const _deployGrantedRoles = () => {
      const title = `GrantRoles`;
      const cmd = {
        grantRolesToRole: srvRoleObj.role,
        writeConcern: {w: `majority`},
      };
      const granting = usrRoleObj.roles.filter($Object.filterNotEqualUsingValueOf, {arr: srvRoleObj.roles});
      if (granting.length > 0) {
        cmd.roles = granting.map($Role.getRef);
        const res = srvRoleObj.db.runCommand(cmd);
        if (!res.ok) {
          _logger.err(title, res.errmsg);
        }
        _logger.info(title, `${cmd.roles.length} roles granted to [${cmd.grantRolesToRole}]`);
      }
    };
    const _deployGrantedPrivileges = () => {
      const title = `GrantPrivileges`;
      const cmd = {
        grantPrivilegesToRole: srvRoleObj.role,
        writeConcern: {w: `majority`},
      };
      const granting = usrRoleObj.privileges.filter($Object.filterNotEqualUsingValueOf, {arr: srvRoleObj.privileges});
      if (granting.length > 0) {
        cmd.privileges = granting.map($Privilege.getData);
        const res = srvRoleObj.db.runCommand(cmd);
        if (!res.ok) {
          _logger.err(title, res.errmsg);
        }
        _logger.info(title, `${cmd.privileges.length} privileges granted to [${cmd.grantRolesToRole}]`);
      }
    };
    const _deployGrantedRole = () => {
      _loadServerRole();
      if (srvRoleObj.isBuiltin) return;
      _deployGrantedRoles();
      _deployGrantedPrivileges();
    };
    const _deployRevokedRoles = () => {
      const title = `RevokeRoles`;
      const cmd = {
        revokeRolesFromRole: srvRoleObj.role,
        writeConcern: {w: `majority`},
      };
      const revoking = srvRoleObj.roles.filter($Object.filterNotEqualUsingValueOf, {arr: usrRoleObj.roles});
      if (revoking.length > 0) {
        cmd.roles = revoking.map($Role.getRef);
        const res = srvRoleObj.db.runCommand(cmd);
        if (!res.ok) {
          _logger.err(title, res.errmsg);
        }
        _logger.info(title, `${cmd.roles.length} roles revoked from [${cmd.revokeRolesFromRole}]`);
      }
    };
    const _deployRevokedPrivileges = () => {
      const title = `RevokePrivileges`;
      const cmd = {
        revokePrivilegesFromRole: srvRoleObj.role,
        writeConcern: {w: `majority`},
      };
      const revoking = srvRoleObj.privileges.filter($Object.filterNotEqualUsingValueOf, {arr: usrRoleObj.privileges});
      if (revoking.length > 0) {
        cmd.privileges = revoking.map($Privilege.getData);
        const res = srvRoleObj.db.runCommand(cmd);
        if (!res.ok) {
          _logger.err(title, res.errmsg);
        }
        _logger.info(title, `${cmd.privileges.length} privileges granted to [${cmd.grantRolesToRole}]`);
      }
    };
    const _deployRevokedRole = () => {
      _loadServerRole();
      if (srvRoleObj.isBuiltin) return;
      _deployRevokedRoles();
      _deployRevokedPrivileges();
    };
    const _deployRole = () => {
      _deployGrantedRole();
      _deployRevokedRole();
    }

    const _descriptor = {
      writable: false,
      enumerable: true,
    };
    Object.defineProperties(this, {
      toString          : Object.extend({value: function (...p) { return _toString          (...p) }}, _descriptor),
      tojson            : Object.extend({value: function (...p) { return _toString          (...p) }}, _descriptor),
      valueOf           : Object.extend({value: function (...p) { return _valueOf           (...p) }}, _descriptor),
      getRaw            : Object.extend({value: function (...p) { return _getRaw            (...p) }}, _descriptor),
      getRef            : Object.extend({value: function (...p) { return _getRef            (...p) }}, _descriptor),
      getDef            : Object.extend({value: function (...p) { return _getDef            (...p) }}, _descriptor),
      getSrv            : Object.extend({value: function (...p) { return _getSrv            (...p) }}, _descriptor),
      syncRole          : Object.extend({value: function (...p) { return _syncRole          (...p) }}, _descriptor),
      deployGrantedRole : Object.extend({value: function (...p) { return _deployGrantedRole (...p) }}, _descriptor),
      deployRevokedRole : Object.extend({value: function (...p) { return _deployRevokedRole (...p) }}, _descriptor),
      deployRole        : Object.extend({value: function (...p) { return _deployRole        (...p) }}, _descriptor),
    });

    _genData();
    _loadServerRole();
    if (roles == null && privileges == null) {
      _syncRole();
    }
    $Object.deepFreeze(this);
    return this;
  };
  const __$Role__ = $Role.prototype = {
    help: function () {
      return `\
[$Role](db, role, roles, privileges) - Role object helper
  .getRaw() - Return raw role object
  .getRef() - Return the role object used for reference
  .getDef() - Return the role object used for definition
  .getSrv() - Return server's role object
  .syncRole() - Update local role object to match with server's one
  .deployGrantedRole() - Deploy granted changes in role object to server
  .deployRevokedRole() - Deploy revoked changes in role object to server
  .deployRole() - Deploy all changes in role object to server
`;
    },
  };
  const $RoleExt = {
    getRef: (obj) => {
      if ($Role.is$Role(obj)) {
        return obj.getRef();
      }
      return null;
    },
    getDef: (obj) => {
      if ($Role.is$Role(obj)) {
        return obj.getDef();
      }
      return null;
    },
    is$Role: (obj) => {
      return $Schema({'!data': $Role}).test({data: obj});
    },
  };

  /** Define deploy object */
  const _id = `$Role`;
  const version = `1.0.0`;
  const changelog = {
    '1.0.0': [
      `Release [${_id}]`,
    ],
  };
  const value = new Code(`\
(() => {
  const $Role = Object.extend(${tojson($Role)}, ${tojson($RoleExt)});
  $Role.prototype = ${tojson(__$Role__)};
  $Role.toString = $Role.tojson = function () {return this.prototype.help()};
  $Role.prototype.toString = $Role.prototype.tojson = function () { return this.help(); }

  $Object.deepFreeze($Role);
  return $Role;
})()`);

  /** Deploy */
  $Deploy(`SRV`).run(_id, version, changelog, value);
}