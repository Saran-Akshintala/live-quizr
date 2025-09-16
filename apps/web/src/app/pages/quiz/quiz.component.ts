import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MockDataService } from '../../services/mock-data.service';

interface QuizQuestion {
  text: string;
  options: { text: string; correct: boolean }[];
}

interface Quiz {
  id: number;
  title: string;
  description?: string;
  questions: QuizQuestion[];
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatRadioModule, FormsModule, MatSnackBarModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          
          <!-- Quiz Header -->
          <mat-card class="bg-white shadow-xl rounded-2xl overflow-hidden mb-6" *ngIf="quiz && !quizCompleted">
            <mat-card-header class="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-6">
              <div class="flex justify-between items-center w-full">
                <div>
                  <h1 class="text-2xl font-bold text-white">{{ quiz.title }}</h1>
                  <p class="text-indigo-100 mt-1" *ngIf="quiz.description">{{ quiz.description }}</p>
                </div>
                <div class="text-right">
                  <div class="text-sm text-indigo-200">Question</div>
                  <div class="text-xl font-bold">{{ currentQuestionIndex + 1 }} / {{ quiz.questions.length }}</div>
                </div>
              </div>
            </mat-card-header>
          </mat-card>

          <!-- Quiz Question -->
          <mat-card class="bg-white shadow-xl rounded-2xl overflow-hidden mb-6" *ngIf="quiz && !quizCompleted && currentQuestion">
            <mat-card-content class="p-8">
              <h2 class="text-xl font-semibold text-gray-800 mb-6">{{ currentQuestion.text }}</h2>
              
              <div class="space-y-4">
                <div 
                  *ngFor="let option of currentQuestion.options; let i = index"
                  class="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-slate-50"
                  [class.border-indigo-500]="selectedAnswer === i"
                  [class.bg-indigo-50]="selectedAnswer === i"
                  [class.border-gray-200]="selectedAnswer !== i"
                  (click)="selectAnswer(i)"
                >
                  <mat-radio-button 
                    [value]="i" 
                    [(ngModel)]="selectedAnswer"
                    class="mr-4"
                    color="primary">
                  </mat-radio-button>
                  <span class="text-gray-700 font-medium">{{ option.text }}</span>
                </div>
              </div>

              <div class="flex justify-between items-center mt-8">
                <button 
                  mat-button 
                  color="primary"
                  (click)="previousQuestion()"
                  [disabled]="currentQuestionIndex === 0"
                  class="px-6 py-2">
                  Previous
                </button>
                
                <div class="flex space-x-4">
                  <button 
                    mat-raised-button 
                    color="primary"
                    (click)="nextQuestion()"
                    [disabled]="selectedAnswer === null"
                    *ngIf="currentQuestionIndex < quiz.questions.length - 1"
                    class="px-8 py-2">
                    Next Question
                  </button>
                  
                  <button 
                    mat-raised-button 
                    color="accent"
                    (click)="submitQuiz()"
                    [disabled]="selectedAnswer === null"
                    *ngIf="currentQuestionIndex === quiz.questions.length - 1"
                    class="px-8 py-2 bg-emerald-600 hover:bg-emerald-700">
                    Submit Quiz
                  </button>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Quiz Results -->
          <mat-card class="bg-white shadow-xl rounded-2xl overflow-hidden" *ngIf="quizCompleted">
            <mat-card-header class="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6">
              <h1 class="text-2xl font-bold text-white">Quiz Completed!</h1>
            </mat-card-header>
            <mat-card-content class="p-8 text-center">
              <div class="mb-6">
                <div class="text-4xl font-bold text-emerald-600 mb-2">{{ score }}%</div>
                <div class="text-lg text-gray-600">
                  You got {{ correctAnswers }} out of {{ totalQuestions }} questions correct
                </div>
              </div>
              
              <div class="flex justify-center space-x-4">
                <button 
                  mat-raised-button 
                  color="primary"
                  (click)="goToDashboard()"
                  class="px-8 py-2">
                  Back to Dashboard
                </button>
                <button 
                  mat-button 
                  color="primary"
                  (click)="retakeQuiz()"
                  class="px-8 py-2">
                  Retake Quiz
                </button>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Loading State -->
          <mat-card class="bg-white shadow-xl rounded-2xl overflow-hidden p-8 text-center" *ngIf="!quiz">
            <div class="text-lg text-gray-600">Loading quiz...</div>
          </mat-card>

        </div>
      </div>
    </div>
  `,
  styles: [`
    mat-radio-button {
      margin-right: 16px;
    }
    
    .question-option {
      transition: all 0.2s ease-in-out;
    }
    
    .question-option:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class QuizComponent implements OnInit {
  quiz: Quiz | null = null;
  currentQuestionIndex = 0;
  selectedAnswer: number | null = null;
  answers: (number | null)[] = [];
  quizCompleted = false;
  score = 0;
  correctAnswers = 0;
  totalQuestions = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mockData: MockDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const quizId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadQuiz(quizId);
  }

  get currentQuestion() {
    return this.quiz?.questions[this.currentQuestionIndex] || null;
  }

  loadQuiz(quizId: number) {
    // For now, we'll create a mock quiz with questions based on the quiz data
    // In a real app, this would fetch the full quiz data from the service
    this.mockData.quizzes$.subscribe(quizzes => {
      const foundQuiz = quizzes.find(q => q.id === quizId);
      if (foundQuiz) {
        // Create a full quiz with sample questions
        this.quiz = {
          id: foundQuiz.id,
          title: foundQuiz.title,
          description: `Test your knowledge with ${foundQuiz.questions} questions`,
          questions: this.generateSampleQuestions(foundQuiz.questions)
        };
        this.answers = new Array(this.quiz.questions.length).fill(null);
        this.totalQuestions = this.quiz.questions.length;
      } else {
        this.snackBar.open('Quiz not found', 'Close', { duration: 3000 });
        this.router.navigate(['/dashboard']);
      }
    });
  }

  generateSampleQuestions(count: number): QuizQuestion[] {
    const sampleQuestions = [
      {
        text: "What is the capital of France?",
        options: [
          { text: "London", correct: false },
          { text: "Berlin", correct: false },
          { text: "Paris", correct: true },
          { text: "Madrid", correct: false }
        ]
      },
      {
        text: "Which planet is known as the Red Planet?",
        options: [
          { text: "Venus", correct: false },
          { text: "Mars", correct: true },
          { text: "Jupiter", correct: false },
          { text: "Saturn", correct: false }
        ]
      },
      {
        text: "What is 2 + 2?",
        options: [
          { text: "3", correct: false },
          { text: "4", correct: true },
          { text: "5", correct: false },
          { text: "6", correct: false }
        ]
      },
      {
        text: "Who painted the Mona Lisa?",
        options: [
          { text: "Vincent van Gogh", correct: false },
          { text: "Pablo Picasso", correct: false },
          { text: "Leonardo da Vinci", correct: true },
          { text: "Michelangelo", correct: false }
        ]
      },
      {
        text: "What is the largest ocean on Earth?",
        options: [
          { text: "Atlantic Ocean", correct: false },
          { text: "Indian Ocean", correct: false },
          { text: "Arctic Ocean", correct: false },
          { text: "Pacific Ocean", correct: true }
        ]
      },
      {
        text: "Which programming language is known for web development?",
        options: [
          { text: "JavaScript", correct: true },
          { text: "Assembly", correct: false },
          { text: "COBOL", correct: false },
          { text: "Fortran", correct: false }
        ]
      },
      {
        text: "What year did World War II end?",
        options: [
          { text: "1944", correct: false },
          { text: "1945", correct: true },
          { text: "1946", correct: false },
          { text: "1947", correct: false }
        ]
      },
      {
        text: "Which element has the chemical symbol 'O'?",
        options: [
          { text: "Gold", correct: false },
          { text: "Silver", correct: false },
          { text: "Oxygen", correct: true },
          { text: "Iron", correct: false }
        ]
      }
    ];

    // Return the requested number of questions, cycling through if needed
    const questions = [];
    for (let i = 0; i < count; i++) {
      questions.push({...sampleQuestions[i % sampleQuestions.length]});
    }
    return questions;
  }

  selectAnswer(optionIndex: number) {
    this.selectedAnswer = optionIndex;
    this.answers[this.currentQuestionIndex] = optionIndex;
  }

  nextQuestion() {
    if (this.selectedAnswer !== null && this.currentQuestionIndex < (this.quiz?.questions.length || 0) - 1) {
      this.currentQuestionIndex++;
      this.selectedAnswer = this.answers[this.currentQuestionIndex];
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.selectedAnswer = this.answers[this.currentQuestionIndex];
    }
  }

  submitQuiz() {
    if (!this.quiz) return;

    // Calculate score
    this.correctAnswers = 0;
    for (let i = 0; i < this.quiz.questions.length; i++) {
      const userAnswer = this.answers[i];
      if (userAnswer !== null) {
        const question = this.quiz.questions[i];
        if (question.options[userAnswer]?.correct) {
          this.correctAnswers++;
        }
      }
    }

    this.score = Math.round((this.correctAnswers / this.totalQuestions) * 100);
    this.quizCompleted = true;

    // Show completion message
    this.snackBar.open(`Quiz completed! You scored ${this.score}%`, 'Close', {
      duration: 5000,
      panelClass: ['success-snackbar']
    });
  }

  retakeQuiz() {
    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
    this.answers = new Array(this.quiz?.questions.length || 0).fill(null);
    this.quizCompleted = false;
    this.score = 0;
    this.correctAnswers = 0;
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}