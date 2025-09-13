export interface ILoginDto {
    email: string;
    password: string;
}
export interface IRegisterDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    organizationSlug?: string;
}
export interface IAuthResponse {
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        roles: string[];
        organizationId: string;
    };
    tokens: {
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    };
}
export interface IRefreshTokenDto {
    refreshToken: string;
}
export interface IJwtPayload {
    sub: string;
    email: string;
    organizationId: string;
    roles: string[];
    iat?: number;
    exp?: number;
}
export interface IChangePasswordDto {
    currentPassword: string;
    newPassword: string;
}
export interface IForgotPasswordDto {
    email: string;
}
export interface IResetPasswordDto {
    token: string;
    newPassword: string;
}
//# sourceMappingURL=auth.types.d.ts.map