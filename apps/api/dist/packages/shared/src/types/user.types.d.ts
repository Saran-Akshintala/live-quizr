import { Role } from '../enums/roles.enum';
export interface IUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
    isActive: boolean;
    emailVerified: boolean;
    lastLoginAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    organizationId: string;
}
export interface IUserWithRoles extends IUser {
    roles: IUserRole[];
}
export interface IUserRole {
    id: string;
    userId: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}
export interface ICreateUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    organizationId: string;
    role?: Role;
}
export interface IUpdateUserDto {
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    isActive?: boolean;
}
export interface IUserProfile {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    avatarUrl?: string;
    roles: Role[];
    organization: {
        id: string;
        name: string;
        slug: string;
    };
}
