import { PrismaService } from '../prisma/prisma.service';
import { IOrganizationWithSettings, IOrgSettings } from '@shared/types/organization.types';
export declare class OrgsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getOrganizationProfile(organizationId: string): Promise<IOrganizationWithSettings>;
    getOrganizationSettings(organizationId: string): Promise<IOrgSettings>;
}
