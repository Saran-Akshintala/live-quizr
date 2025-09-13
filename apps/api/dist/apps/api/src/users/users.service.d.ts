import { PrismaService } from '../prisma/prisma.service';
import { IUser, IUserWithRoles } from '@shared/types/user.types';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<IUserWithRoles | null>;
    findById(id: string): Promise<IUserWithRoles | null>;
    findByOrganization(organizationId: string): Promise<IUser[]>;
}
