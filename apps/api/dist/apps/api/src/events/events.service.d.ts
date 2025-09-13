import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { IEvent, IEventWithDetails, ICreateEventDto, IUpdateEventDto, IEventOverview } from '@shared/types/event.types';
export declare class EventsService {
    private readonly prisma;
    private readonly auditService;
    constructor(prisma: PrismaService, auditService: AuditService);
    create(createEventDto: ICreateEventDto, organizationId: string, userId: string): Promise<IEvent>;
    findAll(organizationId: string): Promise<IEvent[]>;
    findOne(id: string, organizationId: string): Promise<IEventWithDetails>;
    update(id: string, updateEventDto: IUpdateEventDto, organizationId: string, userId: string): Promise<IEvent>;
    transitionStatus(id: string, newStatus: string, organizationId: string, userId: string): Promise<IEvent>;
    getOverview(id: string, organizationId: string): Promise<IEventOverview>;
    remove(id: string, organizationId: string, userId: string): Promise<void>;
}
