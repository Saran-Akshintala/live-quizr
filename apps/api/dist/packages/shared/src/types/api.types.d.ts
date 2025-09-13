export interface IApiKey {
    id: string;
    name: string;
    keyPreview: string;
    permissions: string[];
    isActive: boolean;
    expiresAt?: Date;
    lastUsedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    organizationId: string;
    createdById: string;
}
export interface ICreateApiKeyDto {
    name: string;
    permissions: string[];
    expiresAt?: Date;
}
export interface IFeatureFlag {
    id: string;
    key: string;
    name: string;
    description?: string;
    isEnabled: boolean;
    config?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
    organizationId: string;
}
export interface IAuditLog {
    id: string;
    action: string;
    resource?: string;
    resourceId?: string;
    details?: Record<string, any>;
    ipAddress?: string;
    userAgent?: string;
    createdAt: Date;
    organizationId: string;
    userId?: string;
}
export interface IHealthCheck {
    status: 'ok' | 'error';
    timestamp: string;
    uptime: number;
    version: string;
    environment: string;
    database: {
        status: 'connected' | 'disconnected';
        responseTime?: number;
    };
    redis?: {
        status: 'connected' | 'disconnected';
        responseTime?: number;
    };
}
