import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IJwtPayload } from '@shared/types/auth.types';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: IJwtPayload): Promise<{
        userId: string;
        email: string;
        organizationId: string;
        roles: string[];
    }>;
}
export {};
