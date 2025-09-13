import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
export declare class QuizzesController {
    private readonly quizzesService;
    constructor(quizzesService: QuizzesService);
    create(eventId: string, createQuizDto: CreateQuizDto, req: any): Promise<import("@shared/types/event.types").IQuiz>;
    findAll(eventId: string, req: any): Promise<import("@shared/types/event.types").IQuiz[]>;
    findOne(eventId: string, id: string, req: any): Promise<import("@shared/types/event.types").IQuizWithQuestions>;
    update(eventId: string, id: string, updateQuizDto: Partial<CreateQuizDto>, req: any): Promise<import("@shared/types/event.types").IQuiz>;
    remove(eventId: string, id: string, req: any): Promise<void>;
}
