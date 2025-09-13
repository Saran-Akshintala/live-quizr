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
exports.QuestionsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const questions_service_1 = require("./questions.service");
const create_question_dto_1 = require("./dto/create-question.dto");
const update_question_dto_1 = require("./dto/update-question.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_enum_1 = require("../../../../packages/shared/src/enums/roles.enum");
let QuestionsController = class QuestionsController {
    questionsService;
    constructor(questionsService) {
        this.questionsService = questionsService;
    }
    create(quizId, createQuestionDto, req) {
        return this.questionsService.create(quizId, createQuestionDto, req.user.organizationId, req.user.sub);
    }
    findAll(quizId, req) {
        return this.questionsService.findByQuiz(quizId, req.user.organizationId);
    }
    findOne(quizId, id, req) {
        return this.questionsService.findOne(id, quizId, req.user.organizationId);
    }
    update(quizId, id, updateQuestionDto, req) {
        return this.questionsService.update(id, quizId, updateQuestionDto, req.user.organizationId, req.user.sub);
    }
    remove(quizId, id, req) {
        return this.questionsService.remove(id, quizId, req.user.organizationId, req.user.sub);
    }
    async importCsv(quizId, file, req) {
        if (!file) {
            throw new common_1.BadRequestException('CSV file is required');
        }
        try {
            const csvContent = file.buffer.toString('utf-8');
            const lines = csvContent.split('\n').filter(line => line.trim());
            if (lines.length < 2) {
                throw new common_1.BadRequestException('CSV must contain header and at least one data row');
            }
            const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
            const expectedHeaders = ['question', 'type', 'option1', 'option2', 'option3', 'option4', 'correctoption'];
            const missingHeaders = expectedHeaders.filter(h => !headers.includes(h));
            if (missingHeaders.length > 0) {
                throw new common_1.BadRequestException(`Missing required headers: ${missingHeaders.join(', ')}`);
            }
            const csvData = lines.slice(1).map(line => {
                const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
                const row = {};
                headers.forEach((header, index) => {
                    row[header] = values[index] || '';
                });
                return {
                    question: row.question,
                    type: row.type,
                    option1: row.option1,
                    option2: row.option2,
                    option3: row.option3,
                    option4: row.option4,
                    correctOption: parseInt(row.correctoption) || 1,
                };
            });
            return this.questionsService.importFromCsv(quizId, csvData, req.user.organizationId, req.user.sub);
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to parse CSV: ${error.message}`);
        }
    }
    async exportCsv(quizId, req, res) {
        const csvData = await this.questionsService.exportToCsv(quizId, req.user.organizationId);
        const headers = ['question', 'type', 'option1', 'option2', 'option3', 'option4', 'correctOption'];
        const csvContent = [
            headers.join(','),
            ...csvData.map(row => [
                `"${row.question}"`,
                row.type,
                `"${row.option1}"`,
                `"${row.option2}"`,
                `"${row.option3 || ''}"`,
                `"${row.option4 || ''}"`,
                row.correctOption,
            ].join(',')),
        ].join('\n');
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="quiz-${quizId}-questions.csv"`);
        res.send(csvContent);
    }
};
exports.QuestionsController = QuestionsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.OWNER, roles_enum_1.Role.EDITOR),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new question for a quiz' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Question created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid question data' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Insufficient permissions or event is live' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Quiz not found' }),
    __param(0, (0, common_1.Param)('quizId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_question_dto_1.CreateQuestionDto, Object]),
    __metadata("design:returntype", void 0)
], QuestionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all questions for a quiz' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Questions retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Quiz not found' }),
    __param(0, (0, common_1.Param)('quizId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], QuestionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get question by ID with options' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Question retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Question or quiz not found' }),
    __param(0, (0, common_1.Param)('quizId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], QuestionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.OWNER, roles_enum_1.Role.EDITOR),
    (0, swagger_1.ApiOperation)({ summary: 'Update question details' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Question updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Insufficient permissions or event is live' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Question or quiz not found' }),
    __param(0, (0, common_1.Param)('quizId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_question_dto_1.UpdateQuestionDto, Object]),
    __metadata("design:returntype", void 0)
], QuestionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.OWNER, roles_enum_1.Role.EDITOR),
    (0, swagger_1.ApiOperation)({ summary: 'Delete question' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Question deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Insufficient permissions or event is live' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Question or quiz not found' }),
    __param(0, (0, common_1.Param)('quizId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], QuestionsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('import'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.OWNER, roles_enum_1.Role.EDITOR),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Import questions from CSV file' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Questions imported successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid CSV file' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Insufficient permissions or event is live' }),
    __param(0, (0, common_1.Param)('quizId')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "importCsv", null);
__decorate([
    (0, common_1.Get)('export/csv'),
    (0, swagger_1.ApiOperation)({ summary: 'Export questions to CSV file' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'CSV file generated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Quiz not found' }),
    __param(0, (0, common_1.Param)('quizId')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "exportCsv", null);
exports.QuestionsController = QuestionsController = __decorate([
    (0, swagger_1.ApiTags)('questions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('events/:eventId/quizzes/:quizId/questions'),
    __metadata("design:paramtypes", [questions_service_1.QuestionsService])
], QuestionsController);
//# sourceMappingURL=questions.controller.js.map