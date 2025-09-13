import { Response } from 'express';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
export declare class QuestionsController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    create(quizId: string, createQuestionDto: CreateQuestionDto, req: any): Promise<import("@shared/types/event.types").IQuestionWithOptions>;
    findAll(quizId: string, req: any): Promise<import("@shared/types/event.types").IQuestion[]>;
    findOne(quizId: string, id: string, req: any): Promise<import("@shared/types/event.types").IQuestionWithOptions>;
    update(quizId: string, id: string, updateQuestionDto: UpdateQuestionDto, req: any): Promise<import("@shared/types/event.types").IQuestion>;
    remove(quizId: string, id: string, req: any): Promise<void>;
    importCsv(quizId: string, file: any, req: any): Promise<{
        imported: number;
        errors: string[];
    }>;
    exportCsv(quizId: string, req: any, res: Response): Promise<void>;
}
