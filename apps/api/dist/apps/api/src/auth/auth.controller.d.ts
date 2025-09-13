import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { IAuthResponse } from '@shared/types/auth.types';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<IAuthResponse>;
    login(loginDto: LoginDto, req: any): Promise<IAuthResponse>;
    refresh(refreshTokenDto: RefreshTokenDto): Promise<IAuthResponse>;
    getProfile(req: any): Promise<import("@shared/types/user.types").IUserProfile>;
}
