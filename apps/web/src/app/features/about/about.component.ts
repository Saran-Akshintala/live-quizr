import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  apiStatus: 'unknown' | 'ok' | 'down' = 'unknown';
  details: any = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.health().subscribe({
      next: (res) => {
        this.apiStatus = 'ok';
        this.details = res;
      },
      error: () => {
        this.apiStatus = 'down';
      }
    });
  }
}
