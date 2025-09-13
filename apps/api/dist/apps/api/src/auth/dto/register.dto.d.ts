import { IRegisterDto } from '@shared/types/auth.types';
export declare class RegisterDto implements IRegisterDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    organizationSlug?: string;
}
