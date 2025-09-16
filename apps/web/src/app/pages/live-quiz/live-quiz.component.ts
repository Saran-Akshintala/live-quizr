import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MockDataService } from '../../services/mock-data.service';
import { combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'app-live-quiz-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatTableModule],
  template: `
    <div class="page live-quiz container py-3">
      <mat-card>
        <h1>Live Scores</h1>
        <p class="text-muted">Scores update every 5 seconds.</p>
        <ng-container *ngIf="rows$ | async as rows">
          <table mat-table [dataSource]="rows" class="mat-elevation-z1">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Participant</th>
              <td mat-cell *matCellDef="let r">{{r.name}}</td>
            </ng-container>
            <ng-container matColumnDef="score">
              <th mat-header-cell *matHeaderCellDef>Score</th>
              <td mat-cell *matCellDef="let r">{{r.score}}</td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="cols"></tr>
            <tr mat-row *matRowDef="let row; columns: cols;"></tr>
          </table>
        </ng-container>
      </mat-card>
    </div>
  `,
  styles: [`
    .page{padding:1rem}
    mat-card{max-width:720px;margin:0 auto}
  `]
})
export class LiveQuizComponent {
  cols = ['name','score'];
  rows$: Observable<{ name: string; score: number }[]> = combineLatest([
    this.mock.participants$,
    this.mock.scores$,
  ]).pipe(
    map(([ps, ss]) => ps.map(p => ({ name: p.name, score: ss.find(s => s.id === p.id)?.score ?? 0 })))
  );

  constructor(private mock: MockDataService) {}
}
