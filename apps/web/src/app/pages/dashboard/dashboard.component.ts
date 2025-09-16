import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MockDataService, MockQuiz } from '../../services/mock-data.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule],
  template: `
    <div class="page dashboard container py-3">
      <mat-card>
        <div class="header-section">
          <div>
            <h1>Your Quizzes</h1>
            <p>Browse available quizzes:</p>
          </div>
          <div class="header-actions">
            <a mat-raised-button color="primary" routerLink="/create-quiz">Create New Quiz</a>
          </div>
        </div>
        <div class="grid">
          <mat-card class="quiz" *ngFor="let q of (quizzes$ | async) ?? []">
            <h3>{{q.title}}</h3>
            <p>Questions: {{q.questions}}</p>
            <div class="actions">
              <a mat-stroked-button color="primary" [routerLink]="['/quiz', q.id]">Start Quiz</a>
              <a mat-button [routerLink]="['/create-quiz', q.id]">Edit</a>
              <a mat-button routerLink="/results">Results</a>
            </div>
          </mat-card>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .page{padding:1rem}
    .header-section{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1rem}
    .header-actions{display:flex;gap:.5rem}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;margin:1rem 0}
    .quiz{padding:1rem}
    .actions{display:flex;gap:.5rem;flex-wrap:wrap}
  `]
})
export class DashboardComponent {
  quizzes$: Observable<MockQuiz[]> = this.data.quizzes$;
  isAdmin = false;
  constructor(private data: MockDataService, private auth: AuthService) {
    this.auth.user$.subscribe(u => this.isAdmin = u.role === 'admin');
  }
}
