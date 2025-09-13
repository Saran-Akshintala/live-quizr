export interface IEvent {
    id: string;
    title: string;
    description?: string;
    status: EventStatus;
    startTime?: Date;
    endTime?: Date;
    createdAt: Date;
    updatedAt: Date;
    organizationId: string;
}
export interface IEventWithDetails extends IEvent {
    quizzes: IQuiz[];
    participants: IParticipant[];
    sponsorPlacements: ISponsorPlacement[];
    _count?: {
        participants: number;
        quizzes: number;
    };
}
export interface IQuiz {
    id: string;
    title: string;
    mode: QuizMode;
    createdAt: Date;
    updatedAt: Date;
    eventId: string;
}
export interface IQuizWithQuestions extends IQuiz {
    questions: IQuestion[];
}
export interface IQuestion {
    id: string;
    text: string;
    type: QuestionType;
    createdAt: Date;
    updatedAt: Date;
    quizId: string;
}
export interface IQuestionWithOptions extends IQuestion {
    options: IOption[];
}
export interface IOption {
    id: string;
    text: string;
    isCorrect: boolean;
    questionId: string;
}
export interface ISubmission {
    id: string;
    responseTimeMs?: number;
    createdAt: Date;
    participantId: string;
    questionId: string;
    optionId?: string;
}
export interface IParticipant {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    joinedAt: Date;
    eventId: string;
}
export interface IParticipantWithSubmissions extends IParticipant {
    submissions: ISubmission[];
}
export interface ISponsorPlacement {
    id: string;
    sponsorName: string;
    imageUrl?: string;
    placementType: PlacementType;
    createdAt: Date;
    updatedAt: Date;
    eventId: string;
}
export interface ICreateEventDto {
    title: string;
    description?: string;
    startTime?: Date;
    endTime?: Date;
}
export interface IUpdateEventDto {
    title?: string;
    description?: string;
    startTime?: Date;
    endTime?: Date;
}
export interface ICreateQuizDto {
    title: string;
    mode: QuizMode;
}
export interface ICreateQuestionDto {
    text: string;
    type: QuestionType;
    options: ICreateOptionDto[];
}
export interface ICreateOptionDto {
    text: string;
    isCorrect: boolean;
}
export interface IUpdateQuestionDto {
    text?: string;
    type?: QuestionType;
}
export interface ICreateParticipantDto {
    name: string;
    email?: string;
    phone?: string;
}
export interface IEventOverview {
    event: IEvent;
    stats: {
        totalParticipants: number;
        totalQuestions: number;
        averageResponseTime: number;
        completionRate: number;
    };
    topParticipants: Array<{
        participant: IParticipant;
        score: number;
        correctAnswers: number;
        averageResponseTime: number;
    }>;
}
export interface IQuizImportRow {
    question: string;
    type: 'MCQ' | 'TRUE_FALSE';
    option1: string;
    option2: string;
    option3?: string;
    option4?: string;
    correctOption: number;
}
export declare enum EventStatus {
    DRAFT = "DRAFT",
    LIVE = "LIVE",
    ENDED = "ENDED"
}
export declare enum QuizMode {
    KNOCKOUT = "KNOCKOUT",
    LEADERBOARD = "LEADERBOARD",
    RAPIDFIRE = "RAPIDFIRE"
}
export declare enum QuestionType {
    MCQ = "MCQ",
    TRUE_FALSE = "TRUE_FALSE"
}
export declare enum PlacementType {
    BANNER = "BANNER",
    SIDEBAR = "SIDEBAR",
    POPUP = "POPUP",
    FOOTER = "FOOTER"
}
