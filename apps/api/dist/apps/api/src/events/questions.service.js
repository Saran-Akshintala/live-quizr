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
exports.QuestionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const audit_service_1 = require("../audit/audit.service");
const event_types_1 = require("../../../../packages/shared/src/types/event.types");
let QuestionsService = class QuestionsService {
    prisma;
    auditService;
    constructor(prisma, auditService) {
        this.prisma = prisma;
        this.auditService = auditService;
    }
    async create(quizId, createQuestionDto, organizationId, userId) {
        const quiz = await this.prisma.quiz.findFirst({
            where: {
                id: quizId,
                event: { organizationId }
            },
            include: { event: true },
        });
        if (!quiz) {
            throw new common_1.NotFoundException('Quiz not found');
        }
        if (quiz.event.status === event_types_1.EventStatus.LIVE) {
            throw new common_1.ForbiddenException('Cannot add questions to live events');
        }
        if (createQuestionDto.type === event_types_1.QuestionType.TRUE_FALSE) {
            if (createQuestionDto.options.length !== 2) {
                throw new common_1.BadRequestException('TRUE_FALSE questions must have exactly 2 options');
            }
        }
        else if (createQuestionDto.type === event_types_1.QuestionType.MCQ) {
            if (createQuestionDto.options.length < 2 || createQuestionDto.options.length > 4) {
                throw new common_1.BadRequestException('MCQ questions must have 2-4 options');
            }
        }
        const correctOptions = createQuestionDto.options.filter(opt => opt.isCorrect);
        if (correctOptions.length !== 1) {
            throw new common_1.BadRequestException('Each question must have exactly one correct answer');
        }
        const question = await this.prisma.question.create({
            data: {
                text: createQuestionDto.text,
                type: createQuestionDto.type,
                quizId,
                options: {
                    create: createQuestionDto.options,
                },
            },
            include: {
                options: true,
            },
        });
        await this.auditService.log({
            action: 'question.create',
            resource: 'question',
            resourceId: question.id,
            details: {
                text: question.text,
                type: question.type,
                quizId,
                optionsCount: question.options.length
            },
            organizationId,
            userId,
        });
        return question;
    }
    async findByQuiz(quizId, organizationId) {
        const quiz = await this.prisma.quiz.findFirst({
            where: {
                id: quizId,
                event: { organizationId }
            },
        });
        if (!quiz) {
            throw new common_1.NotFoundException('Quiz not found');
        }
        const questions = await this.prisma.question.findMany({
            where: { quizId },
            orderBy: { createdAt: 'asc' },
        });
        return questions;
    }
    async findOne(id, quizId, organizationId) {
        const quiz = await this.prisma.quiz.findFirst({
            where: {
                id: quizId,
                event: { organizationId }
            },
        });
        if (!quiz) {
            throw new common_1.NotFoundException('Quiz not found');
        }
        const question = await this.prisma.question.findFirst({
            where: { id, quizId },
            include: {
                options: true,
            },
        });
        if (!question) {
            throw new common_1.NotFoundException('Question not found');
        }
        return question;
    }
    async update(id, quizId, updateQuestionDto, organizationId, userId) {
        const quiz = await this.prisma.quiz.findFirst({
            where: {
                id: quizId,
                event: { organizationId }
            },
            include: { event: true },
        });
        if (!quiz) {
            throw new common_1.NotFoundException('Quiz not found');
        }
        if (quiz.event.status === event_types_1.EventStatus.LIVE) {
            throw new common_1.ForbiddenException('Cannot edit questions in live events');
        }
        const existingQuestion = await this.prisma.question.findFirst({
            where: { id, quizId },
        });
        if (!existingQuestion) {
            throw new common_1.NotFoundException('Question not found');
        }
        const updatedQuestion = await this.prisma.question.update({
            where: { id },
            data: updateQuestionDto,
        });
        await this.auditService.log({
            action: 'question.update',
            resource: 'question',
            resourceId: id,
            details: { changes: updateQuestionDto, quizId },
            organizationId,
            userId,
        });
        return updatedQuestion;
    }
    async remove(id, quizId, organizationId, userId) {
        const quiz = await this.prisma.quiz.findFirst({
            where: {
                id: quizId,
                event: { organizationId }
            },
            include: { event: true },
        });
        if (!quiz) {
            throw new common_1.NotFoundException('Quiz not found');
        }
        if (quiz.event.status === event_types_1.EventStatus.LIVE) {
            throw new common_1.ForbiddenException('Cannot delete questions from live events');
        }
        const question = await this.prisma.question.findFirst({
            where: { id, quizId },
        });
        if (!question) {
            throw new common_1.NotFoundException('Question not found');
        }
        await this.prisma.question.delete({
            where: { id },
        });
        await this.auditService.log({
            action: 'question.delete',
            resource: 'question',
            resourceId: id,
            details: { text: question.text, quizId },
            organizationId,
            userId,
        });
    }
    async importFromCsv(quizId, csvData, organizationId, userId) {
        const quiz = await this.prisma.quiz.findFirst({
            where: {
                id: quizId,
                event: { organizationId }
            },
            include: { event: true },
        });
        if (!quiz) {
            throw new common_1.NotFoundException('Quiz not found');
        }
        if (quiz.event.status === event_types_1.EventStatus.LIVE) {
            throw new common_1.ForbiddenException('Cannot import questions to live events');
        }
        const errors = [];
        let imported = 0;
        for (let i = 0; i < csvData.length; i++) {
            const row = csvData[i];
            const rowNum = i + 1;
            try {
                if (!row.question?.trim()) {
                    errors.push(`Row ${rowNum}: Question text is required`);
                    continue;
                }
                if (!row.type || !['MCQ', 'TRUE_FALSE'].includes(row.type)) {
                    errors.push(`Row ${rowNum}: Invalid question type. Must be MCQ or TRUE_FALSE`);
                    continue;
                }
                if (!row.option1?.trim() || !row.option2?.trim()) {
                    errors.push(`Row ${rowNum}: At least 2 options are required`);
                    continue;
                }
                const options = [
                    { text: row.option1.trim(), isCorrect: row.correctOption === 1 },
                    { text: row.option2.trim(), isCorrect: row.correctOption === 2 },
                ];
                if (row.option3?.trim()) {
                    options.push({ text: row.option3.trim(), isCorrect: row.correctOption === 3 });
                }
                if (row.option4?.trim()) {
                    options.push({ text: row.option4.trim(), isCorrect: row.correctOption === 4 });
                }
                if (row.correctOption < 1 || row.correctOption > options.length) {
                    errors.push(`Row ${rowNum}: Correct option must be between 1 and ${options.length}`);
                    continue;
                }
                if (row.type === 'TRUE_FALSE' && options.length !== 2) {
                    errors.push(`Row ${rowNum}: TRUE_FALSE questions must have exactly 2 options`);
                    continue;
                }
                await this.prisma.question.create({
                    data: {
                        text: row.question.trim(),
                        type: row.type,
                        quizId,
                        options: {
                            create: options,
                        },
                    },
                });
                imported++;
            }
            catch (error) {
                errors.push(`Row ${rowNum}: ${error.message}`);
            }
        }
        await this.auditService.log({
            action: 'question.import',
            resource: 'quiz',
            resourceId: quizId,
            details: {
                imported,
                errors: errors.length,
                totalRows: csvData.length
            },
            organizationId,
            userId,
        });
        return { imported, errors };
    }
    async exportToCsv(quizId, organizationId) {
        const quiz = await this.prisma.quiz.findFirst({
            where: {
                id: quizId,
                event: { organizationId }
            },
        });
        if (!quiz) {
            throw new common_1.NotFoundException('Quiz not found');
        }
        const questions = await this.prisma.question.findMany({
            where: { quizId },
            include: {
                options: {
                    orderBy: { id: 'asc' },
                },
            },
            orderBy: { createdAt: 'asc' },
        });
        return questions.map(question => {
            const correctOptionIndex = question.options.findIndex(opt => opt.isCorrect);
            return {
                question: question.text,
                type: question.type,
                option1: question.options[0]?.text || '',
                option2: question.options[1]?.text || '',
                option3: question.options[2]?.text || '',
                option4: question.options[3]?.text || '',
                correctOption: correctOptionIndex + 1,
            };
        });
    }
};
exports.QuestionsService = QuestionsService;
exports.QuestionsService = QuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], QuestionsService);
//# sourceMappingURL=questions.service.js.map