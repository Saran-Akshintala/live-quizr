import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';

export interface MockQuiz { id: number; title: string; questions: number; description?: string; }
export interface MockParticipant { id: number; name: string; }
export interface MockScore { id: number; score: number; }

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private readonly initialQuizzes: MockQuiz[] = [
    { id: 1, title: 'Science Challenge', questions: 10 },
    { id: 2, title: 'Sports Trivia', questions: 12 },
    { id: 3, title: 'History Highlights', questions: 11 },
    { id: 4, title: 'Movie Buff', questions: 10 },
    { id: 5, title: 'Tech IQ', questions: 14 },
    { id: 6, title: 'World Geography', questions: 12 },
    { id: 7, title: 'General Knowledge', questions: 13 },
    { id: 8, title: 'Math Sprint', questions: 10 },
    { id: 9, title: 'Music Mix', questions: 10 },
    { id: 10, title: 'Literature Lore', questions: 12 },
  ];

  private readonly initialParticipants: MockParticipant[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'Diana' },
    { id: 5, name: 'Ethan' },
    { id: 6, name: 'Fiona' },
    { id: 7, name: 'George' },
    { id: 8, name: 'Hannah' },
    { id: 9, name: 'Ian' },
    { id: 10, name: 'Julia' },
    { id: 11, name: 'Kevin' },
    { id: 12, name: 'Lena' },
  ];

  private quizzesSubject = new BehaviorSubject<MockQuiz[]>(this.initialQuizzes);
  private participantsSubject = new BehaviorSubject<MockParticipant[]>(this.initialParticipants);
  private scoresSubject = new BehaviorSubject<MockScore[]>(
    this.initialParticipants.map(p => ({ id: p.id, score: 0 }))
  );

  readonly quizzes$: Observable<MockQuiz[]> = this.quizzesSubject.asObservable();
  readonly participants$: Observable<MockParticipant[]> = this.participantsSubject.asObservable();
  readonly scores$: Observable<MockScore[]> = this.scoresSubject.asObservable();

  constructor() {
    // Update scores every 5 seconds with random increments
    interval(5000).subscribe(() => {
      const updated = this.scoresSubject.value.map(s => ({
        id: s.id,
        score: s.score + Math.floor(Math.random() * 6), // +0..5
      }));
      this.scoresSubject.next(updated);
    });
  }

  addQuiz(quiz: MockQuiz) {
    const currentQuizzes = this.quizzesSubject.value;
    this.quizzesSubject.next([...currentQuizzes, quiz]);
  }

  updateQuiz(quizId: number, updatedQuiz: MockQuiz) {
    const currentQuizzes = this.quizzesSubject.value;
    const updatedQuizzes = currentQuizzes.map(quiz => 
      quiz.id === quizId ? updatedQuiz : quiz
    );
    this.quizzesSubject.next(updatedQuizzes);
  }
}