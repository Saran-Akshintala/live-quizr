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
exports.QuizController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const quiz_service_1 = require("./quiz.service");
const start_quiz_dto_1 = require("./dto/start-quiz.dto");
const submit_answer_dto_1 = require("./dto/submit-answer.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let QuizController = class QuizController {
    quizService;
    constructor(quizService) {
        this.quizService = quizService;
    }
    async startQuiz(quizId, startQuizDto, req) {
        return this.quizService.startQuizSession(quizId, startQuizDto, req.user.id, req.user.organizationId);
    }
    async getCurrentQuestion(sessionId, req) {
        return this.quizService.getCurrentQuestion(sessionId, req.user.id);
    }
    async submitAnswer(sessionId, submitAnswerDto, req) {
        return this.quizService.submitAnswer(sessionId, submitAnswerDto, req.user.id);
    }
    async getQuizResults(sessionId, req) {
        return this.quizService.getQuizResults(sessionId, req.user.id);
    }
    async getQuizHistory(page = 1, limit = 10, req) {
        return this.quizService.getQuizHistory(req.user.id, { page, limit });
    }
};
exports.QuizController = QuizController;
__decorate([
    (0, common_1.Post)(':quizId/start'),
    (0, swagger_1.ApiOperation)({ summary: 'Start a quiz session' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Quiz session started successfully' }),
    __param(0, (0, common_1.Param)('quizId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, start_quiz_dto_1.StartQuizDto, Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "startQuiz", null);
__decorate([
    (0, common_1.Get)(':sessionId/question'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current question for quiz session' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Current question retrieved successfully' }),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "getCurrentQuestion", null);
__decorate([
    (0, common_1.Post)(':sessionId/answer'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit answer for current question' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Answer submitted successfully' }),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, submit_answer_dto_1.SubmitAnswerDto, Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "submitAnswer", null);
__decorate([
    (0, common_1.Get)(':sessionId/results'),
    (0, swagger_1.ApiOperation)({ summary: 'Get quiz session results' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Quiz results retrieved successfully' }),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "getQuizResults", null);
__decorate([
    (0, common_1.Get)('results/history'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user quiz history' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Quiz history retrieved successfully' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "getQuizHistory", null);
exports.QuizController = QuizController = __decorate([
    (0, swagger_1.ApiTags)('quiz'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('quiz'),
    __metadata("design:paramtypes", [quiz_service_1.QuizService])
], QuizController);
//# sourceMappingURL=quiz.controller.js.map