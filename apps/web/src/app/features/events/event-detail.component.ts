import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemoService, DemoEvent } from '../../services/demo.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  event: DemoEvent | null = null;
  eventId = '';

  constructor(private route: ActivatedRoute, private demo: DemoService) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id') || '';
    // TODO: integrate real API service when backend is ready
    this.event = this.demo.getEvent(this.eventId);
  }
}
