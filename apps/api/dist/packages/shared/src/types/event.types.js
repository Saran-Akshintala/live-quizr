"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlacementType = exports.QuestionType = exports.QuizMode = exports.EventStatus = void 0;
var EventStatus;
(function (EventStatus) {
    EventStatus["DRAFT"] = "DRAFT";
    EventStatus["LIVE"] = "LIVE";
    EventStatus["ENDED"] = "ENDED";
})(EventStatus || (exports.EventStatus = EventStatus = {}));
var QuizMode;
(function (QuizMode) {
    QuizMode["KNOCKOUT"] = "KNOCKOUT";
    QuizMode["LEADERBOARD"] = "LEADERBOARD";
    QuizMode["RAPIDFIRE"] = "RAPIDFIRE";
})(QuizMode || (exports.QuizMode = QuizMode = {}));
var QuestionType;
(function (QuestionType) {
    QuestionType["MCQ"] = "MCQ";
    QuestionType["TRUE_FALSE"] = "TRUE_FALSE";
})(QuestionType || (exports.QuestionType = QuestionType = {}));
var PlacementType;
(function (PlacementType) {
    PlacementType["BANNER"] = "BANNER";
    PlacementType["SIDEBAR"] = "SIDEBAR";
    PlacementType["POPUP"] = "POPUP";
    PlacementType["FOOTER"] = "FOOTER";
})(PlacementType || (exports.PlacementType = PlacementType = {}));
//# sourceMappingURL=event.types.js.map