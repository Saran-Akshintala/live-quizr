"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
const audit_service_1 = require("../audit/audit.service");
const roles_enum_1 = require("../../../../packages/shared/src/enums/roles.enum");
let AuthService = class AuthService {
    prisma;
    jwtService;
    configService;
    usersService;
    auditService;
    constructor(prisma, jwtService, configService, usersService, auditService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
        this.usersService = usersService;
        this.auditService = auditService;
    }
    async validateUser(email, password) {
        const user = await this.prisma.user.findUnique({
            where: { email },
            include: {
                roles: true,
                organization: true,
            },
        });
        if (user && await bcrypt.compare(password, user.passwordHash)) {
            const { passwordHash, ...result } = user;
            return result;
        }
        return null;
    }
    async register(registerDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: registerDto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        let organization;
        if (registerDto.organizationSlug) {
            organization = await this.prisma.organization.findUnique({
                where: { slug: registerDto.organizationSlug },
            });
            if (!organization) {
                throw new common_1.UnauthorizedException('Invalid organization');
            }
        }
        else {
            const orgSlug = registerDto.email.split('@')[1].replace('.', '-');
            organization = await this.prisma.organization.create({
                data: {
                    name: `${registerDto.firstName} ${registerDto.lastName}'s Organization`,
                    slug: orgSlug,
                    description: 'Auto-created organization',
                },
            });
        }
        const passwordHash = await bcrypt.hash(registerDto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: registerDto.email,
                passwordHash,
                firstName: registerDto.firstName,
                lastName: registerDto.lastName,
                organizationId: organization.id,
                emailVerified: true,
            },
        });
        const userCount = await this.prisma.user.count({
            where: { organizationId: organization.id },
        });
        const role = userCount === 1 ? roles_enum_1.Role.OWNER : roles_enum_1.Role.MEMBER;
        await this.prisma.userRole.create({
            data: {
                userId: user.id,
                role,
            },
        });
        if (userCount === 1) {
            await this.prisma.orgSettings.create({
                data: {
                    organizationId: organization.id,
                },
            });
        }
        await this.auditService.log({
            action: 'user.register',
            resource: 'user',
            resourceId: user.id,
            details: { email: user.email, role },
            organizationId: organization.id,
            userId: user.id,
        });
        return this.generateTokens(user, [role]);
    }
    async login(user) {
        const userWithRoles = await this.prisma.user.findUnique({
            where: { id: user.id },
            include: {
                roles: true,
            },
        });
        const roles = userWithRoles.roles.map(r => r.role);
        await this.prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });
        await this.auditService.log({
            action: 'user.login',
            resource: 'user',
            resourceId: user.id,
            details: { email: user.email },
            organizationId: user.organizationId,
            userId: user.id,
        });
        return this.generateTokens(user, roles);
    }
    async refreshToken(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken);
            const user = await this.prisma.user.findUnique({
                where: { id: payload.sub },
                include: { roles: true },
            });
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid token');
            }
            const roles = user.roles.map(r => r.role);
            return this.generateTokens(user, roles);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async getProfile(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                roles: true,
                organization: true,
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: `${user.firstName} ${user.lastName}`,
            avatarUrl: user.avatarUrl,
            roles: user.roles.map(userRole => userRole.role),
            organization: {
                id: user.organization.id,
                name: user.organization.name,
                slug: user.organization.slug,
            },
        };
    }
    async generateTokens(user, roles) {
        const payload = {
            sub: user.id,
            email: user.email,
            organizationId: user.organizationId,
            roles,
        };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d'),
        });
        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                roles,
                organizationId: user.organizationId,
            },
            tokens: {
                accessToken,
                refreshToken,
                expiresIn: 24 * 60 * 60,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService,
        users_service_1.UsersService,
        audit_service_1.AuditService])
], AuthService);
//# sourceMappingURL=auth.service.js.map