import { QuizService } from './quiz.service';
import { StartQuizDto } from './dto/start-quiz.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
export declare class QuizController {
    private readonly quizService;
    constructor(quizService: QuizService);
    startQuiz(quizId: string, startQuizDto: StartQuizDto, req: any): Promise<{
        sessionId: string;
        mode: import("./dto/start-quiz.dto").QuizMode;
        totalQuestions: number;
        timePerQuestion: number;
        message: string;
    }>;
    getCurrentQuestion(sessionId: string, req: any): Promise<{
        sessionId: string;
        score: number;
        totalQuestions: number;
        percentage: number;
        timeSpent: number;
        mode: import("./dto/start-quiz.dto").QuizMode;
        completedAt: Date;
        resultId: string;
        answers: {
            questionNumber: number;
            question: any;
            selectedAnswer: any;
            correctAnswer: any;
            isCorrect: any;
            responseTime: any;
        }[];
    } | {
        questionNumber: number;
        totalQuestions: number;
        question: {
            id: any;
            text: any;
            type: any;
            options: any;
        };
        timePerQuestion: number;
        mode: import("./dto/start-quiz.dto").QuizMode;
    }>;
    submitAnswer(sessionId: string, submitAnswerDto: SubmitAnswerDto, req: any): Promise<any>;
    getQuizResults(sessionId: string, req: any): Promise<{
        sessionId: string;
        score: number;
        totalQuestions: number;
        percentage: number;
        timeSpent: number;
        mode: import("./dto/start-quiz.dto").QuizMode;
        completedAt: Date;
        resultId: string;
        answers: {
            questionNumber: number;
            question: any;
            selectedAnswer: any;
            correctAnswer: any;
            isCorrect: any;
            responseTime: any;
        }[];
    }>;
    getQuizHistory(page: number, limit: number, req: any): Promise<{
        data: {
            id: string;
            quizTitle: string;
            eventTitle: string;
            participantName: string;
            score: number;
            totalQuestions: number;
            percentage: number;
            mode: string;
            timeSpent: number;
            completedAt: Date;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
}
