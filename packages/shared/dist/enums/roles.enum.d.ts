export declare enum Role {
    OWNER = "OWNER",
    ADMIN = "ADMIN",
    EDITOR = "EDITOR",
    MEMBER = "MEMBER",
    VIEWER = "VIEWER"
}
export declare const RoleHierarchy: {
    readonly OWNER: 5;
    readonly ADMIN: 4;
    readonly EDITOR: 3;
    readonly MEMBER: 2;
    readonly VIEWER: 1;
};
export declare function hasPermission(userRole: Role, requiredRole: Role): boolean;
//# sourceMappingURL=roles.enum.d.ts.map