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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizzesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const quizzes_service_1 = require("./quizzes.service");
const create_quiz_dto_1 = require("./dto/create-quiz.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_enum_1 = require("../../../../packages/shared/src/enums/roles.enum");
let QuizzesController = class QuizzesController {
    quizzesService;
    constructor(quizzesService) {
        this.quizzesService = quizzesService;
    }
    create(eventId, createQuizDto, req) {
        return this.quizzesService.create(eventId, createQuizDto, req.user.organizationId, req.user.sub);
    }
    findAll(eventId, req) {
        return this.quizzesService.findByEvent(eventId, req.user.organizationId);
    }
    findOne(eventId, id, req) {
        return this.quizzesService.findOne(id, eventId, req.user.organizationId);
    }
    update(eventId, id, updateQuizDto, req) {
        return this.quizzesService.update(id, eventId, updateQuizDto, req.user.organizationId, req.user.sub);
    }
    remove(eventId, id, req) {
        return this.quizzesService.remove(id, eventId, req.user.organizationId, req.user.sub);
    }
};
exports.QuizzesController = QuizzesController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.OWNER, roles_enum_1.Role.EDITOR),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new quiz for an event' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Quiz created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Insufficient permissions or event is live' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Event not found' }),
    __param(0, (0, common_1.Param)('eventId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_quiz_dto_1.CreateQuizDto, Object]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all quizzes for an event' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Quizzes retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Event not found' }),
    __param(0, (0, common_1.Param)('eventId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get quiz by ID with questions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Quiz retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Quiz or event not found' }),
    __param(0, (0, common_1.Param)('eventId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.OWNER, roles_enum_1.Role.EDITOR),
    (0, swagger_1.ApiOperation)({ summary: 'Update quiz details' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Quiz updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Insufficient permissions or event is live' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Quiz or event not found' }),
    __param(0, (0, common_1.Param)('eventId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.OWNER, roles_enum_1.Role.EDITOR),
    (0, swagger_1.ApiOperation)({ summary: 'Delete quiz' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Quiz deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Insufficient permissions or event is live' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Quiz or event not found' }),
    __param(0, (0, common_1.Param)('eventId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "remove", null);
exports.QuizzesController = QuizzesController = __decorate([
    (0, swagger_1.ApiTags)('quizzes'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('events/:eventId/quizzes'),
    __metadata("design:paramtypes", [quizzes_service_1.QuizzesService])
], QuizzesController);
//# sourceMappingURL=quizzes.controller.js.map