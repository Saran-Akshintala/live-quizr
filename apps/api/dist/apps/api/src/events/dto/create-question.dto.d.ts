import { QuestionType } from '@shared/types/event.types';
export declare class CreateOptionDto {
    text: string;
    isCorrect: boolean;
}
export declare class CreateQuestionDto {
    text: string;
    type: QuestionType;
    options: CreateOptionDto[];
}
