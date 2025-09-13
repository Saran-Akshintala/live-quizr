import { HealthService } from './health.service';
import { IHealthCheck } from '@shared/types/api.types';
export declare class HealthController {
    private readonly healthService;
    constructor(healthService: HealthService);
    getHealth(): Promise<IHealthCheck>;
    getVersion(): {
        version: string;
        commitSha: string;
        environment: string;
        nodeVersion: string;
        timestamp: string;
    };
}
