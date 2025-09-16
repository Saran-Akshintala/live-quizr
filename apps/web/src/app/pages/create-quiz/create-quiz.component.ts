import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-create-quiz-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-2xl mx-auto">
          <mat-card class="bg-white shadow-xl rounded-2xl overflow-hidden">
            <mat-card-header class="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-6">
              <div class="flex items-center justify-between w-full">
                <button mat-stroked-button 
                        class="text-white border-white hover:bg-white hover:text-indigo-600 transition-all duration-200"
                        routerLink="/dashboard">
                  ← Back to Dashboard
                </button>
                <mat-card-title class="text-2xl font-bold text-white">{{ isEditMode ? 'Edit Quiz' : 'Create New Quiz' }}</mat-card-title>
                <div></div>
              </div>
            </mat-card-header>

            <mat-card-content class="p-8">
              <form (ngSubmit)="create()" #f="ngForm" class="space-y-6">
                <div class="form-group">
                  <label for="title" class="block text-sm font-medium text-slate-700 mb-2">Quiz Title *</label>
                  <input type="text" 
                         id="title"
                         name="title" 
                         [(ngModel)]="title" 
                         required 
                         placeholder="Enter an engaging quiz title"
                         class="w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 text-base" />
                </div>
                
                <div class="form-group">
                  <label for="description" class="block text-sm font-medium text-slate-700 mb-2">Description</label>
                  <textarea id="description"
                            name="description" 
                            [(ngModel)]="description" 
                            rows="4"
                            placeholder="Describe what this quiz is about..."
                            class="w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 resize-vertical"></textarea>
                </div>

                <div class="form-group">
                  <label class="block text-sm font-medium text-slate-700 mb-4">Questions</label>
                  <div *ngFor="let question of questions; let i = index" class="mb-6 p-4 border border-slate-200 rounded-lg">
                    <div class="form-group">
                      <label [for]="'question-' + i" class="block text-sm font-medium text-slate-700 mb-2">Question {{i + 1}} *</label>
                      <input type="text" 
                             [id]="'question-' + i"
                             [name]="'question-' + i"
                             [(ngModel)]="question.text" 
                             required 
                             placeholder="Enter your question"
                             class="w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900" />
                    </div>
                    
                    <div class="mt-4">
                      <label class="block text-sm font-medium text-slate-700 mb-3">Answer Options</label>
                      <div *ngFor="let option of question.options; let j = index" class="mb-3">
                        <div class="grid grid-cols-12 gap-3 items-center">
                          <div class="col-span-1 flex justify-center">
                            <input type="radio" 
                                   [name]="'correct-' + i" 
                                   [value]="j"
                                   [checked]="option.correct"
                                   (change)="setCorrectAnswer(i, j)"
                                   class="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                          </div>
                          <div class="col-span-10">
                            <input type="text" 
                                   [(ngModel)]="option.text"
                                   [name]="'option-' + i + '-' + j"
                                   placeholder="Enter option {{j + 1}} text here..."
                                   class="w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 text-base" />
                          </div>
                          <div class="col-span-1 flex justify-center">
                            <button type="button" 
                                    (click)="removeOption(i, j)"
                                    *ngIf="question.options.length > 2"
                                    class="w-8 h-8 flex items-center justify-center text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors">
                              ×
                            </button>
                          </div>
                        </div>
                      </div>
                      <button type="button" 
                              (click)="addOption(i)"
                              class="mt-2 px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md">
                        + Add Option
                      </button>
                    </div>
                    
                    <button type="button" 
                            (click)="removeQuestion(i)"
                            *ngIf="questions.length > 1"
                            class="mt-4 px-4 py-2 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-md">
                      Remove Question
                    </button>
                  </div>
                  
                  <button type="button" 
                          (click)="addQuestion()"
                          class="mt-4 px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-md">
                    + Add Question
                  </button>
                </div>
                
                <div class="flex justify-end space-x-4 pt-4">
                  <button mat-stroked-button 
                          type="button"
                          class="border-slate-300 text-slate-600 hover:bg-slate-50 px-6 py-2"
                          routerLink="/dashboard">
                    Cancel
                  </button>
                  <button mat-raised-button 
                          type="submit" 
                          [disabled]="!f.valid"
                          class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 disabled:bg-slate-300 disabled:text-slate-500">
                    Create Quiz
                  </button>
                </div>
              </form>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page{padding:1rem}
    mat-card{max-width:720px;margin:0 auto}
    .full{width:100%}
    .actions{margin-top:1rem;display:flex;justify-content:flex-end}
  `]
})
export class CreateQuizComponent implements OnInit {
  title = '';
  description = '';
  questions: any[] = [
    {
      text: '',
      options: [
        { text: '', correct: true },
        { text: '', correct: false }
      ]
    }
  ];
  editingQuizId: number | null = null;
  isEditMode = false;
  
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private snackBar: MatSnackBar, 
    private mockData: MockDataService
  ) {}

  ngOnInit() {
    const quizId = this.route.snapshot.paramMap.get('id');
    if (quizId) {
      this.editingQuizId = Number(quizId);
      this.isEditMode = true;
      this.loadQuizForEditing(this.editingQuizId);
    }
  }

  loadQuizForEditing(quizId: number) {
    this.mockData.quizzes$.subscribe(quizzes => {
      const quiz = quizzes.find(q => q.id === quizId);
      if (quiz) {
        this.title = quiz.title;
        this.description = quiz.description || '';
        // For now, we'll create sample questions since the mock data doesn't store full question details
        // In a real app, this would load the actual questions from the database
        this.questions = [
          {
            text: 'Sample Question 1',
            options: [
              { text: 'Option A', correct: true },
              { text: 'Option B', correct: false },
              { text: 'Option C', correct: false },
              { text: 'Option D', correct: false }
            ]
          }
        ];
      }
    });
  }
  
  addQuestion() {
    this.questions.push({
      text: '',
      options: [
        { text: '', correct: true },
        { text: '', correct: false }
      ]
    });
  }
  
  removeQuestion(index: number) {
    if (this.questions.length > 1) {
      this.questions.splice(index, 1);
    }
  }
  
  addOption(questionIndex: number) {
    this.questions[questionIndex].options.push({ text: '', correct: false });
  }
  
  removeOption(questionIndex: number, optionIndex: number) {
    if (this.questions[questionIndex].options.length > 2) {
      this.questions[questionIndex].options.splice(optionIndex, 1);
    }
  }
  
  setCorrectAnswer(questionIndex: number, optionIndex: number) {
    this.questions[questionIndex].options.forEach((option: any, index: any) => {
      option.correct = index === optionIndex;
    });
  }
  
  create() {
    if (this.title.trim() && this.questions.length > 0) {
      if (this.isEditMode && this.editingQuizId) {
        // Update existing quiz
        this.mockData.updateQuiz(this.editingQuizId, {
          id: this.editingQuizId,
          title: this.title,
          description: this.description,
          questions: this.questions.length
        });
        
        this.snackBar.open('Quiz updated successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      } else {
        // Add new quiz to mock data service
        this.mockData.addQuiz({
          id: Date.now(),
          title: this.title,
          description: this.description,
          questions: this.questions.length
        });
        
        this.snackBar.open('Quiz created successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      }
      
      // Navigate back to dashboard after creation/update
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1000);
    }
  }
}
