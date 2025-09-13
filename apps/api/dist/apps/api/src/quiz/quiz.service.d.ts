import { PrismaService } from '../prisma/prisma.service';
import { StartQuizDto, QuizMode } from './dto/start-quiz.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
export declare class QuizService {
    private readonly prisma;
    private activeSessions;
    constructor(prisma: PrismaService);
    startQuizSession(quizId: string, startQuizDto: StartQuizDto, userId: string, organizationId: string): Promise<{
        sessionId: string;
        mode: QuizMode;
        totalQuestions: number;
        timePerQuestion: number;
        message: string;
    }>;
    getCurrentQuestion(sessionId: string, userId: string): Promise<{
        sessionId: string;
        score: number;
        totalQuestions: number;
        percentage: number;
        timeSpent: number;
        mode: QuizMode;
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
        mode: QuizMode;
    }>;
    submitAnswer(sessionId: string, submitAnswerDto: SubmitAnswerDto, userId: string): Promise<any>;
    completeQuiz(sessionId: string): Promise<{
        sessionId: string;
        score: number;
        totalQuestions: number;
        percentage: number;
        timeSpent: number;
        mode: QuizMode;
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
    getQuizResults(sessionId: string, userId: string): Promise<{
        sessionId: string;
        score: number;
        totalQuestions: number;
        percentage: number;
        timeSpent: number;
        mode: QuizMode;
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
    getQuizHistory(userId: string, options: {
        page: number;
        limit: number;
    }): Promise<{
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
    private shuffleArray;
}
