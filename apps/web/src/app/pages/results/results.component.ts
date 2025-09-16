import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MockDataService } from '../../services/mock-data.service';
import { combineLatest } from 'rxjs';

export interface Result { rank: number; name: string; score: number; }

@Component({
  selector: 'app-results-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatTableModule, MatButtonModule, MatPaginatorModule, MatSortModule],
  template: `
    <div class="page results container py-3">
      <mat-card>
        <h1>Results — {{quizId}}</h1>
        <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z1">
          <ng-container matColumnDef="rank">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>#</th>
            <td mat-cell *matCellDef="let r">{{r.rank}}</td>
          </ng-container>
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
            <td mat-cell *matCellDef="let r">{{r.name}}</td>
          </ng-container>
          <ng-container matColumnDef="score">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Score</th>
            <td mat-cell *matCellDef="let r">{{r.score}}</td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="cols"></tr>
          <tr mat-row *matRowDef="let row; columns: cols;"></tr>
        </table>
        <mat-paginator [pageSize]="5" [pageSizeOptions]="[5, 10, 20]"></mat-paginator>
        <div class="actions">
          <a mat-stroked-button routerLink="/dashboard">Back to Dashboard</a>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .page{padding:1rem}
    mat-card{max-width:720px;margin:0 auto}
    table{width:100%;margin-top:1rem}
    .actions{display:flex;justify-content:flex-end;margin-top:1rem}
  `]
})
export class ResultsComponent {
  quizId = this.route.snapshot.paramMap.get('id') || 'demo';
  cols: string[] = ['rank','name','score'];
  dataSource = new MatTableDataSource<Result>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute, private mock: MockDataService) {
    combineLatest([this.mock.participants$, this.mock.scores$]).subscribe(([ps, ss]) => {
      const merged = ps.map(p => ({ name: p.name, score: ss.find(s => s.id === p.id)?.score ?? 0 }));
      const sorted = merged.sort((a, b) => b.score - a.score).map((r, i) => ({ rank: i + 1, name: r.name, score: r.score }));
      this.dataSource.data = sorted;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item: Result, property: string): string | number => {
      switch (property) {
        case 'name': return item.name.toLowerCase();
        case 'score': return item.score;
        case 'rank': return item.rank;
        default: return (item as any)[property];
      }
    };
  }
}
