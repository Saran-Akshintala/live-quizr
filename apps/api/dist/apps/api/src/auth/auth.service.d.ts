import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { AuditService } from '../audit/audit.service';
import { RegisterDto } from './dto/register.dto';
import { IAuthResponse } from '@shared/types/auth.types';
import { IUserProfile } from '@shared/types/user.types';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly configService;
    private readonly usersService;
    private readonly auditService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService, usersService: UsersService, auditService: AuditService);
    validateUser(email: string, password: string): Promise<any>;
    register(registerDto: RegisterDto): Promise<IAuthResponse>;
    login(user: any): Promise<IAuthResponse>;
    refreshToken(refreshToken: string): Promise<IAuthResponse>;
    getProfile(userId: string): Promise<IUserProfile>;
    private generateTokens;
}
