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
exports.StartQuizDto = exports.QuizMode = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var QuizMode;
(function (QuizMode) {
    QuizMode["TIMED"] = "TIMED";
    QuizMode["PRACTICE"] = "PRACTICE";
    QuizMode["CHALLENGE"] = "CHALLENGE";
})(QuizMode || (exports.QuizMode = QuizMode = {}));
class StartQuizDto {
    mode;
    participantName;
    participantEmail;
    timePerQuestion;
    totalQuestions;
}
exports.StartQuizDto = StartQuizDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Quiz mode',
        enum: QuizMode,
        example: QuizMode.PRACTICE,
    }),
    (0, class_validator_1.IsEnum)(QuizMode),
    __metadata("design:type", String)
], StartQuizDto.prototype, "mode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Participant name',
        example: 'John Doe',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StartQuizDto.prototype, "participantName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Participant email',
        example: 'john@example.com',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StartQuizDto.prototype, "participantEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Time limit per question in seconds (for TIMED mode)',
        example: 30,
        minimum: 5,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(5),
    __metadata("design:type", Number)
], StartQuizDto.prototype, "timePerQuestion", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Number of questions for CHALLENGE mode',
        example: 10,
        minimum: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], StartQuizDto.prototype, "totalQuestions", void 0);
//# sourceMappingURL=start-quiz.dto.js.map