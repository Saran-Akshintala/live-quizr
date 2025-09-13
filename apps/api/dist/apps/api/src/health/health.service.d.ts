import { PrismaService } from '../prisma/prisma.service';
import { IHealthCheck } from '@shared/types/api.types';
export declare class HealthService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getHealthStatus(): Promise<IHealthCheck>;
    getVersion(): {
        version: string;
        commitSha: string;
        environment: string;
        nodeVersion: string;
        timestamp: string;
    };
}
