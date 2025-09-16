import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemoService } from '../../services/demo.service';

@Component({
  selector: 'app-host-shell',
  template: `
    <section class="host">
      <h1>Host Console — Event: {{eventId}}</h1>
      <p *ngIf="!event">No event found.</p>
      <div *ngIf="event">
        <app-host-controls (action)="onAction($event)"></app-host-controls>
        <app-live-stats [eventId]="eventId"></app-live-stats>
      </div>
    </section>
  `,
  styles: [`.host{padding:1rem}`]
})
export class HostShellComponent implements OnInit {
  eventId = '';
  event: any;
  constructor(private route: ActivatedRoute, private demo: DemoService) {}
  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId') || '';
    this.event = this.demo.getEvent(this.eventId);
  }
  onAction(evt: string) {
    console.log('[Host] action:', evt);
  }
}
