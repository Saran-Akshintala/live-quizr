import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { IQuiz, IQuizWithQuestions, ICreateQuizDto } from '@shared/types/event.types';
export declare class QuizzesService {
    private readonly prisma;
    private readonly auditService;
    constructor(prisma: PrismaService, auditService: AuditService);
    create(eventId: string, createQuizDto: ICreateQuizDto, organizationId: string, userId: string): Promise<IQuiz>;
    findByEvent(eventId: string, organizationId: string): Promise<IQuiz[]>;
    findOne(id: string, eventId: string, organizationId: string): Promise<IQuizWithQuestions>;
    update(id: string, eventId: string, updateData: Partial<ICreateQuizDto>, organizationId: string, userId: string): Promise<IQuiz>;
    remove(id: string, eventId: string, organizationId: string, userId: string): Promise<void>;
}
