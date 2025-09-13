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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const audit_service_1 = require("../audit/audit.service");
let EventsService = class EventsService {
    prisma;
    auditService;
    constructor(prisma, auditService) {
        this.prisma = prisma;
        this.auditService = auditService;
    }
    async create(createEventDto, organizationId, userId) {
        const event = await this.prisma.event.create({
            data: {
                ...createEventDto,
                organizationId,
                status: 'DRAFT',
            },
        });
        await this.auditService.log({
            action: 'event.create',
            resource: 'event',
            resourceId: event.id,
            details: { title: event.title, status: event.status },
            organizationId,
            userId,
        });
        return event;
    }
    async findAll(organizationId) {
        const events = await this.prisma.event.findMany({
            where: { organizationId },
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: {
                        participants: true,
                        quizzes: true,
                    },
                },
            },
        });
        return events;
    }
    async findOne(id, organizationId) {
        const event = await this.prisma.event.findFirst({
            where: { id, organizationId },
            include: {
                quizzes: {
                    include: {
                        questions: {
                            include: {
                                options: true,
                            },
                        },
                    },
                },
                participants: true,
                sponsorPlacements: true,
                _count: {
                    select: {
                        participants: true,
                        quizzes: true,
                    },
                },
            },
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        return event;
    }
    async update(id, updateEventDto, organizationId, userId) {
        const existingEvent = await this.prisma.event.findFirst({
            where: { id, organizationId },
        });
        if (!existingEvent) {
            throw new common_1.NotFoundException('Event not found');
        }
        if (existingEvent.status === 'LIVE') {
            throw new common_1.ForbiddenException('Cannot edit event while it is live');
        }
        const updatedEvent = await this.prisma.event.update({
            where: { id },
            data: updateEventDto,
        });
        await this.auditService.log({
            action: 'event.update',
            resource: 'event',
            resourceId: id,
            details: { changes: updateEventDto },
            organizationId,
            userId,
        });
        return updatedEvent;
    }
    async transitionStatus(id, newStatus, organizationId, userId) {
        const event = await this.prisma.event.findFirst({
            where: { id, organizationId },
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        const validTransitions = {
            ['DRAFT']: ['LIVE'],
            ['LIVE']: ['ENDED'],
            ['ENDED']: [],
        };
        if (!validTransitions[event.status].includes(newStatus)) {
            throw new common_1.BadRequestException(`Invalid status transition from ${event.status} to ${newStatus}`);
        }
        const updatedEvent = await this.prisma.event.update({
            where: { id },
            data: { status: newStatus },
        });
        await this.auditService.log({
            action: 'event.transition',
            resource: 'event',
            resourceId: id,
            details: {
                fromStatus: event.status,
                toStatus: newStatus,
                title: event.title,
            },
            organizationId,
            userId,
        });
        return updatedEvent;
    }
    async getOverview(id, organizationId) {
        const event = await this.prisma.event.findFirst({
            where: { id, organizationId },
            include: {
                participants: {
                    include: {
                        submissions: {
                            include: {
                                option: true,
                                question: true,
                            },
                        },
                    },
                },
                quizzes: {
                    include: {
                        questions: {
                            include: {
                                options: true,
                            },
                        },
                    },
                },
            },
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        const totalParticipants = event.participants.length;
        const totalQuestions = event.quizzes.reduce((sum, quiz) => sum + quiz.questions.length, 0);
        const allSubmissions = event.participants.flatMap(p => p.submissions);
        const averageResponseTime = allSubmissions.length > 0
            ? allSubmissions.reduce((sum, s) => sum + (s.responseTimeMs || 0), 0) / allSubmissions.length
            : 0;
        const expectedSubmissions = totalParticipants * totalQuestions;
        const completionRate = expectedSubmissions > 0
            ? (allSubmissions.length / expectedSubmissions) * 100
            : 0;
        const topParticipants = event.participants
            .map(participant => {
            const submissions = participant.submissions;
            const correctAnswers = submissions.filter(s => s.option?.isCorrect).length;
            const totalAnswers = submissions.length;
            const score = totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;
            const avgResponseTime = submissions.length > 0
                ? submissions.reduce((sum, s) => sum + (s.responseTimeMs || 0), 0) / submissions.length
                : 0;
            return {
                participant: {
                    id: participant.id,
                    name: participant.name,
                    email: participant.email,
                    phone: participant.phone,
                    joinedAt: participant.joinedAt,
                    eventId: participant.eventId,
                },
                score,
                correctAnswers,
                averageResponseTime: avgResponseTime,
            };
        })
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);
        return {
            event: event,
            stats: {
                totalParticipants,
                totalQuestions,
                averageResponseTime,
                completionRate,
            },
            topParticipants,
        };
    }
    async remove(id, organizationId, userId) {
        const event = await this.prisma.event.findFirst({
            where: { id, organizationId },
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        if (event.status === 'LIVE') {
            throw new common_1.ForbiddenException('Cannot delete event while it is live');
        }
        await this.prisma.event.delete({
            where: { id },
        });
        await this.auditService.log({
            action: 'event.delete',
            resource: 'event',
            resourceId: id,
            details: { title: event.title, status: event.status },
            organizationId,
            userId,
        });
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], EventsService);
//# sourceMappingURL=events.service.js.map