import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemoService } from '../../services/demo.service';

@Component({
  selector: 'app-display-screen',
  templateUrl: './display-screen.component.html',
  styleUrls: ['./display-screen.component.scss']
})
export class DisplayScreenComponent implements OnInit, OnDestroy {
  eventId = '';
  sponsors: string[] = [];
  currentSponsorIndex = 0;
  sponsorTimer?: any;
  leaderboard: { name: string; score: number }[] = [];

  constructor(private route: ActivatedRoute, private demo: DemoService) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId') || '';
    const ev = this.demo.getEvent(this.eventId);
    this.sponsors = ev?.sponsors ?? [];
    this.leaderboard = this.demo.leaderboard(this.eventId).map(p => ({ name: p.name, score: p.score }));
    this.startSponsorRotation();
  }

  ngOnDestroy(): void {
    if (this.sponsorTimer) clearInterval(this.sponsorTimer);
  }

  startSponsorRotation() {
    if (this.sponsorTimer) clearInterval(this.sponsorTimer);
    this.sponsorTimer = setInterval(() => {
      this.currentSponsorIndex = (this.currentSponsorIndex + 1) % Math.max(1, this.sponsors.length);
    }, 3000);
  }

  toggleFullscreen() {
    const el = document.documentElement;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }
}
