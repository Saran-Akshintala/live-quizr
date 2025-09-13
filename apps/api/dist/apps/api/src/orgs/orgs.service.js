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
exports.OrgsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrgsService = class OrgsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOrganizationProfile(organizationId) {
        const organization = await this.prisma.organization.findUnique({
            where: { id: organizationId },
            include: {
                settings: true,
                _count: {
                    select: {
                        users: true,
                        apiKeys: true,
                        featureFlags: true,
                    },
                },
            },
        });
        if (!organization) {
            throw new common_1.NotFoundException('Organization not found');
        }
        return {
            ...organization,
            settings: organization.settings,
        };
    }
    async getOrganizationSettings(organizationId) {
        const settings = await this.prisma.orgSettings.findUnique({
            where: { organizationId },
        });
        if (!settings) {
            throw new common_1.NotFoundException('Organization settings not found');
        }
        return {
            ...settings,
            customBranding: JSON.parse(settings.customBranding || '{}')
        };
    }
};
exports.OrgsService = OrgsService;
exports.OrgsService = OrgsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrgsService);
//# sourceMappingURL=orgs.service.js.map