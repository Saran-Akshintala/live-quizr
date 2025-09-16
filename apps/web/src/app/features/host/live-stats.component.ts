import { Component, Input, OnInit } from '@angular/core';
import { DemoService } from '../../services/demo.service';

@Component({
  selector: 'app-live-stats',
  template: `
    <section class="live-stats" *ngIf="leaders.length">
      <h2>Live Leaderboard</h2>
      <ol>
        <li *ngFor="let p of leaders">{{p.name}} — <strong>{{p.score}}</strong></li>
      </ol>
    </section>
  `,
  styles: [`.live-stats{padding:1rem;background:#fafafa;border:1px solid #eee;border-radius:8px}`]
})
export class LiveStatsComponent implements OnInit {
  @Input() eventId = '';
  leaders: { name: string; score: number }[] = [];
  constructor(private demo: DemoService) {}
  ngOnInit(): void {
    this.leaders = this.demo.leaderboard(this.eventId).map(p => ({ name: p.name, score: p.score }));
  }
}
