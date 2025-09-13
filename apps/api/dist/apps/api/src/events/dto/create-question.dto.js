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
exports.CreateQuestionDto = exports.CreateOptionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const event_types_1 = require("../../../../../packages/shared/src/types/event.types");
class CreateOptionDto {
    text;
    isCorrect;
}
exports.CreateOptionDto = CreateOptionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Option text', example: 'JavaScript' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOptionDto.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether this option is correct', example: true }),
    __metadata("design:type", Boolean)
], CreateOptionDto.prototype, "isCorrect", void 0);
class CreateQuestionDto {
    text;
    type;
    options;
}
exports.CreateQuestionDto = CreateQuestionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Question text',
        example: 'Which programming language is primarily used for web development?'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Question type',
        enum: event_types_1.QuestionType,
        example: event_types_1.QuestionType.MCQ
    }),
    (0, class_validator_1.IsEnum)(event_types_1.QuestionType),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Question options (2-4 for MCQ, exactly 2 for TRUE_FALSE)',
        type: [CreateOptionDto]
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateOptionDto),
    (0, class_validator_1.ArrayMinSize)(2),
    (0, class_validator_1.ArrayMaxSize)(4),
    __metadata("design:type", Array)
], CreateQuestionDto.prototype, "options", void 0);
//# sourceMappingURL=create-question.dto.js.map