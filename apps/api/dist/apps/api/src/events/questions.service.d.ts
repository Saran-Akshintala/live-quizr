import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { IQuestion, IQuestionWithOptions, ICreateQuestionDto, IUpdateQuestionDto, IQuizImportRow } from '@shared/types/event.types';
export declare class QuestionsService {
    private readonly prisma;
    private readonly auditService;
    constructor(prisma: PrismaService, auditService: AuditService);
    create(quizId: string, createQuestionDto: ICreateQuestionDto, organizationId: string, userId: string): Promise<IQuestionWithOptions>;
    findByQuiz(quizId: string, organizationId: string): Promise<IQuestion[]>;
    findOne(id: string, quizId: string, organizationId: string): Promise<IQuestionWithOptions>;
    update(id: string, quizId: string, updateQuestionDto: IUpdateQuestionDto, organizationId: string, userId: string): Promise<IQuestion>;
    remove(id: string, quizId: string, organizationId: string, userId: string): Promise<void>;
    importFromCsv(quizId: string, csvData: IQuizImportRow[], organizationId: string, userId: string): Promise<{
        imported: number;
        errors: string[];
    }>;
    exportToCsv(quizId: string, organizationId: string): Promise<IQuizImportRow[]>;
}
