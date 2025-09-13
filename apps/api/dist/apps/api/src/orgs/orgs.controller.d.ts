import { OrgsService } from './orgs.service';
export declare class OrgsController {
    private readonly orgsService;
    constructor(orgsService: OrgsService);
    getOrganizationProfile(req: any): Promise<import("@shared/types/organization.types").IOrganizationWithSettings>;
    getOrganizationSettings(req: any): Promise<import("@shared/types/organization.types").IOrgSettings>;
}
