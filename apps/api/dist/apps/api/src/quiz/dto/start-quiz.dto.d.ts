export declare enum QuizMode {
    TIMED = "TIMED",
    PRACTICE = "PRACTICE",
    CHALLENGE = "CHALLENGE"
}
export declare class StartQuizDto {
    mode: QuizMode;
    participantName: string;
    participantEmail?: string;
    timePerQuestion?: number;
    totalQuestions?: number;
}
