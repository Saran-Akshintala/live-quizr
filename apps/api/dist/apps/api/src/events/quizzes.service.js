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
exports.QuizzesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const audit_service_1 = require("../audit/audit.service");
const event_types_1 = require("../../../../packages/shared/src/types/event.types");
let QuizzesService = class QuizzesService {
    prisma;
    auditService;
    constructor(prisma, auditService) {
        this.prisma = prisma;
        this.auditService = auditService;
    }
    async create(eventId, createQuizDto, organizationId, userId) {
        const event = await this.prisma.event.findFirst({
            where: { id: eventId, organizationId },
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        if (event.status === event_types_1.EventStatus.LIVE) {
            throw new common_1.ForbiddenException('Cannot add quizzes to live events');
        }
        const quiz = await this.prisma.quiz.create({
            data: {
                ...createQuizDto,
                eventId,
            },
        });
        await this.auditService.log({
            action: 'quiz.create',
            resource: 'quiz',
            resourceId: quiz.id,
            details: { title: quiz.title, mode: quiz.mode, eventId },
            organizationId,
            userId,
        });
        return quiz;
    }
    async findByEvent(eventId, organizationId) {
        const event = await this.prisma.event.findFirst({
            where: { id: eventId, organizationId },
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        const quizzes = await this.prisma.quiz.findMany({
            where: { eventId },
            orderBy: { createdAt: 'asc' },
        });
        return quizzes;
    }
    async findOne(id, eventId, organizationId) {
        const event = await this.prisma.event.findFirst({
            where: { id: eventId, organizationId },
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        const quiz = await this.prisma.quiz.findFirst({
            where: { id, eventId },
            include: {
                questions: {
                    include: {
                        options: true,
                    },
                    orderBy: { createdAt: 'asc' },
                },
            },
        });
        if (!quiz) {
            throw new common_1.NotFoundException('Quiz not found');
        }
        return quiz;
    }
    async update(id, eventId, updateData, organizationId, userId) {
        const event = await this.prisma.event.findFirst({
            where: { id: eventId, organizationId },
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        if (event.status === event_types_1.EventStatus.LIVE) {
            throw new common_1.ForbiddenException('Cannot edit quizzes in live events');
        }
        const existingQuiz = await this.prisma.quiz.findFirst({
            where: { id, eventId },
        });
        if (!existingQuiz) {
            throw new common_1.NotFoundException('Quiz not found');
        }
        const updatedQuiz = await this.prisma.quiz.update({
            where: { id },
            data: updateData,
        });
        await this.auditService.log({
            action: 'quiz.update',
            resource: 'quiz',
            resourceId: id,
            details: { changes: updateData, eventId },
            organizationId,
            userId,
        });
        return updatedQuiz;
    }
    async remove(id, eventId, organizationId, userId) {
        const event = await this.prisma.event.findFirst({
            where: { id: eventId, organizationId },
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        if (event.status === event_types_1.EventStatus.LIVE) {
            throw new common_1.ForbiddenException('Cannot delete quizzes from live events');
        }
        const quiz = await this.prisma.quiz.findFirst({
            where: { id, eventId },
        });
        if (!quiz) {
            throw new common_1.NotFoundException('Quiz not found');
        }
        await this.prisma.quiz.delete({
            where: { id },
        });
        await this.auditService.log({
            action: 'quiz.delete',
            resource: 'quiz',
            resourceId: id,
            details: { title: quiz.title, eventId },
            organizationId,
            userId,
        });
    }
};
exports.QuizzesService = QuizzesService;
exports.QuizzesService = QuizzesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], QuizzesService);
//# sourceMappingURL=quizzes.service.js.map