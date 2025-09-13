export interface IOrganization {
    id: string;
    name: string;
    slug: string;
    description?: string;
    logoUrl?: string;
    website?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface IOrganizationWithSettings extends IOrganization {
    settings?: IOrgSettings;
}
export interface IOrgSettings {
    id: string;
    organizationId: string;
    allowPublicQuizzes: boolean;
    maxQuizzesPerUser: number;
    maxParticipantsPerQuiz: number;
    customBranding?: Record<string, any>;
    notificationSettings?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
export interface ICreateOrganizationDto {
    name: string;
    slug: string;
    description?: string;
    website?: string;
}
export interface IUpdateOrganizationDto {
    name?: string;
    description?: string;
    logoUrl?: string;
    website?: string;
    isActive?: boolean;
}
export interface IUpdateOrgSettingsDto {
    allowPublicQuizzes?: boolean;
    maxQuizzesPerUser?: number;
    maxParticipantsPerQuiz?: number;
    customBranding?: Record<string, any>;
    notificationSettings?: Record<string, any>;
}
//# sourceMappingURL=organization.types.d.ts.map