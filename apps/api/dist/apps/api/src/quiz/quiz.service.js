"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const start_quiz_dto_1 = require("./dto/start-quiz.dto");
let QuizService = class QuizService {
    prisma;
    activeSessions = new Map();
    constructor(prisma) {
        this.prisma = prisma;
    }
    async startQuizSession(quizId, startQuizDto, userId, organizationId) {
        const quiz = await this.prisma.quiz.findFirst({
            where: {
                id: quizId,
                event: { organizationId },
            },
            include: {
                questions: {
                    include: {
                        options: true,
                    },
                },
            },
        });
        if (!quiz) {
            throw new common_1.NotFoundException('Quiz not found');
        }
        if (quiz.questions.length === 0) {
            throw new common_1.BadRequestException('Quiz has no questions');
        }
        let participant = await this.prisma.participant.findFirst({
            where: {
                eventId: quiz.eventId,
                email: startQuizDto.participantEmail || `user-${userId}@temp.com`,
            },
        });
        if (!participant) {
            participant = await this.prisma.participant.create({
                data: {
                    name: startQuizDto.participantName,
                    email: startQuizDto.participantEmail || `user-${userId}@temp.com`,
                    eventId: quiz.eventId,
                },
            });
        }
        let questions = [...quiz.questions];
        if (startQuizDto.mode === start_quiz_dto_1.QuizMode.CHALLENGE && startQuizDto.totalQuestions) {
            questions = this.shuffleArray(questions).slice(0, startQuizDto.totalQuestions);
        }
        else if (startQuizDto.mode === start_quiz_dto_1.QuizMode.PRACTICE) {
            questions = this.shuffleArray(questions);
        }
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const session = {
            id: sessionId,
            quizId,
            participantId: participant.id,
            mode: startQuizDto.mode,
            currentQuestionIndex: 0,
            questions: questions.map(q => ({
                ...q,
                options: this.shuffleArray(q.options),
            })),
            answers: [],
            startTime: new Date(),
            timePerQuestion: startQuizDto.timePerQuestion,
            totalQuestions: questions.length,
            score: 0,
            isCompleted: false,
        };
        this.activeSessions.set(sessionId, session);
        return {
            sessionId,
            mode: startQuizDto.mode,
            totalQuestions: questions.length,
            timePerQuestion: startQuizDto.timePerQuestion,
            message: 'Quiz session started successfully',
        };
    }
    async getCurrentQuestion(sessionId, userId) {
        const session = this.activeSessions.get(sessionId);
        if (!session) {
            throw new common_1.NotFoundException('Quiz session not found');
        }
        if (session.isCompleted) {
            throw new common_1.BadRequestException('Quiz session is already completed');
        }
        if (session.currentQuestionIndex >= session.questions.length) {
            return this.completeQuiz(sessionId);
        }
        const currentQuestion = session.questions[session.currentQuestionIndex];
        const questionNumber = session.currentQuestionIndex + 1;
        return {
            questionNumber,
            totalQuestions: session.questions.length,
            question: {
                id: currentQuestion.id,
                text: currentQuestion.text,
                type: currentQuestion.type,
                options: currentQuestion.options.map(opt => ({
                    id: opt.id,
                    text: opt.text,
                })),
            },
            timePerQuestion: session.timePerQuestion,
            mode: session.mode,
        };
    }
    async submitAnswer(sessionId, submitAnswerDto, userId) {
        const session = this.activeSessions.get(sessionId);
        if (!session) {
            throw new common_1.NotFoundException('Quiz session not found');
        }
        if (session.isCompleted) {
            throw new common_1.BadRequestException('Quiz session is already completed');
        }
        const currentQuestion = session.questions[session.currentQuestionIndex];
        const selectedOption = currentQuestion.options.find(opt => opt.id === submitAnswerDto.optionId);
        if (!selectedOption) {
            throw new common_1.BadRequestException('Invalid option selected');
        }
        const isCorrect = selectedOption.isCorrect;
        if (isCorrect) {
            session.score++;
        }
        const answer = {
            questionId: currentQuestion.id,
            optionId: submitAnswerDto.optionId,
            isCorrect,
            responseTimeMs: submitAnswerDto.responseTimeMs,
            timestamp: new Date(),
        };
        session.answers.push(answer);
        await this.prisma.submission.upsert({
            where: {
                participantId_questionId: {
                    participantId: session.participantId,
                    questionId: currentQuestion.id,
                },
            },
            update: {
                optionId: submitAnswerDto.optionId,
                responseTimeMs: submitAnswerDto.responseTimeMs,
            },
            create: {
                participantId: session.participantId,
                questionId: currentQuestion.id,
                optionId: submitAnswerDto.optionId,
                responseTimeMs: submitAnswerDto.responseTimeMs,
            },
        });
        session.currentQuestionIndex++;
        const response = {
            isCorrect,
            correctAnswer: currentQuestion.options.find(opt => opt.isCorrect)?.text,
            explanation: isCorrect ? 'Correct!' : 'Incorrect. The correct answer is highlighted.',
            currentScore: session.score,
            questionsAnswered: session.currentQuestionIndex,
            totalQuestions: session.questions.length,
        };
        if (session.currentQuestionIndex >= session.questions.length) {
            const results = await this.completeQuiz(sessionId);
            response.quizCompleted = true;
            response.finalResults = results;
        }
        else {
            response.nextQuestionAvailable = true;
        }
        return response;
    }
    async completeQuiz(sessionId) {
        const session = this.activeSessions.get(sessionId);
        if (!session) {
            throw new common_1.NotFoundException('Quiz session not found');
        }
        session.isCompleted = true;
        const endTime = new Date();
        const timeSpent = Math.floor((endTime.getTime() - session.startTime.getTime()) / 1000);
        const quizResult = await this.prisma.quizResult.create({
            data: {
                participantId: session.participantId,
                quizId: session.quizId,
                score: session.score,
                totalQuestions: session.questions.length,
                mode: session.mode,
                timeSpent,
            },
        });
        setTimeout(() => {
            this.activeSessions.delete(sessionId);
        }, 300000);
        return {
            sessionId,
            score: session.score,
            totalQuestions: session.questions.length,
            percentage: Math.round((session.score / session.questions.length) * 100),
            timeSpent,
            mode: session.mode,
            completedAt: endTime,
            resultId: quizResult.id,
            answers: session.answers.map((answer, index) => ({
                questionNumber: index + 1,
                question: session.questions[index].text,
                selectedAnswer: session.questions[index].options.find(opt => opt.id === answer.optionId)?.text,
                correctAnswer: session.questions[index].options.find(opt => opt.isCorrect)?.text,
                isCorrect: answer.isCorrect,
                responseTime: answer.responseTimeMs,
            })),
        };
    }
    async getQuizResults(sessionId, userId) {
        const session = this.activeSessions.get(sessionId);
        if (!session) {
            throw new common_1.NotFoundException('Quiz session not found');
        }
        if (!session.isCompleted) {
            throw new common_1.BadRequestException('Quiz session is not completed yet');
        }
        return this.completeQuiz(sessionId);
    }
    async getQuizHistory(userId, options) {
        const { page, limit } = options;
        const skip = (page - 1) * limit;
        const [results, total] = await Promise.all([
            this.prisma.quizResult.findMany({
                skip,
                take: limit,
                orderBy: { completedAt: 'desc' },
                include: {
                    quiz: {
                        select: {
                            title: true,
                            event: {
                                select: {
                                    title: true,
                                },
                            },
                        },
                    },
                    participant: {
                        select: {
                            name: true,
                            email: true,
                        },
                    },
                },
            }),
            this.prisma.quizResult.count(),
        ]);
        return {
            data: results.map(result => ({
                id: result.id,
                quizTitle: result.quiz.title,
                eventTitle: result.quiz.event.title,
                participantName: result.participant.name,
                score: result.score,
                totalQuestions: result.totalQuestions,
                percentage: Math.round((result.score / result.totalQuestions) * 100),
                mode: result.mode,
                timeSpent: result.timeSpent,
                completedAt: result.completedAt,
            })),
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
};
exports.QuizService = QuizService;
exports.QuizService = QuizService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuizService);
//# sourceMappingURL=quiz.service.js.map