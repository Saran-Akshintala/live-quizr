import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getCurrentUser(req: any): Promise<import("@shared/types/user.types").IUserWithRoles>;
    getOrganizationUsers(req: any): Promise<import("@shared/types/user.types").IUser[]>;
}
