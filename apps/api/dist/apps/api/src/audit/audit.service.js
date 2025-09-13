"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AuditService = class AuditService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async log(data) {
        const auditLog = await this.prisma.auditLog.create({
            data: {
                action: data.action,
                resource: data.resource,
                resourceId: data.resourceId,
                details: JSON.stringify(data.details),
                ipAddress: data.ipAddress,
                userAgent: data.userAgent,
                organizationId: data.organizationId,
                userId: data.userId,
            },
        });
        return {
            ...auditLog,
            details: JSON.parse(auditLog.details || '{}')
        };
    }
    async getAuditLogs(organizationId, options = {}) {
        const { page = 1, limit = 50, userId, action, resource } = options;
        const skip = (page - 1) * limit;
        const where = {
            organizationId,
            ...(userId && { userId }),
            ...(action && { action: { contains: action } }),
            ...(resource && { resource }),
        };
        const [data, total] = await Promise.all([
            this.prisma.auditLog.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
            }),
            this.prisma.auditLog.count({ where }),
        ]);
        return {
            data: data.map(log => ({
                ...log,
                details: JSON.parse(log.details || '{}')
            })),
            total
        };
    }
};
exports.AuditService = AuditService;
exports.AuditService = AuditService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuditService);
//# sourceMappingURL=audit.service.js.map