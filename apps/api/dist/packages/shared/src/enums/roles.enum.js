"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleHierarchy = exports.Role = void 0;
exports.hasPermission = hasPermission;
var Role;
(function (Role) {
    Role["OWNER"] = "OWNER";
    Role["ADMIN"] = "ADMIN";
    Role["EDITOR"] = "EDITOR";
    Role["MEMBER"] = "MEMBER";
    Role["VIEWER"] = "VIEWER";
})(Role || (exports.Role = Role = {}));
exports.RoleHierarchy = {
    [Role.OWNER]: 5,
    [Role.ADMIN]: 4,
    [Role.EDITOR]: 3,
    [Role.MEMBER]: 2,
    [Role.VIEWER]: 1,
};
function hasPermission(userRole, requiredRole) {
    return exports.RoleHierarchy[userRole] >= exports.RoleHierarchy[requiredRole];
}
//# sourceMappingURL=roles.enum.js.map