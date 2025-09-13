import { PrismaService } from '../prisma/prisma.service';
import { IAuditLog } from '@shared/types/api.types';
interface CreateAuditLogDto {
    action: string;
    resource?: string;
    resourceId?: string;
    details?: Record<string, any>;
    ipAddress?: string;
    userAgent?: string;
    organizationId: string;
    userId?: string;
}
export declare class AuditService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    log(data: CreateAuditLogDto): Promise<IAuditLog>;
    getAuditLogs(organizationId: string, options?: {
        page?: number;
        limit?: number;
        userId?: string;
        action?: string;
        resource?: string;
    }): Promise<{
        data: IAuditLog[];
        total: number;
    }>;
}
export {};
