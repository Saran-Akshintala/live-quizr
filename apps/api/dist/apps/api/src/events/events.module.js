"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsModule = void 0;
const common_1 = require("@nestjs/common");
const events_controller_1 = require("./events.controller");
const events_service_1 = require("./events.service");
const quizzes_controller_1 = require("./quizzes.controller");
const quizzes_service_1 = require("./quizzes.service");
const questions_controller_1 = require("./questions.controller");
const questions_service_1 = require("./questions.service");
const audit_module_1 = require("../audit/audit.module");
let EventsModule = class EventsModule {
};
exports.EventsModule = EventsModule;
exports.EventsModule = EventsModule = __decorate([
    (0, common_1.Module)({
        imports: [audit_module_1.AuditModule],
        controllers: [events_controller_1.EventsController, quizzes_controller_1.QuizzesController, questions_controller_1.QuestionsController],
        providers: [events_service_1.EventsService, quizzes_service_1.QuizzesService, questions_service_1.QuestionsService],
        exports: [events_service_1.EventsService, quizzes_service_1.QuizzesService, questions_service_1.QuestionsService],
    })
], EventsModule);
//# sourceMappingURL=events.module.js.map