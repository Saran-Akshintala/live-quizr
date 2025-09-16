import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DemoService } from '../../services/demo.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  events: { id: string; name: string; description: string }[] = [];

  constructor(private demo: DemoService, private api: ApiService) {}

  ngOnInit(): void {
    // Try backend first; fall back to demo
    this.api.get<any[]>('/events').subscribe({
      next: (data) => {
        this.events = (data || []).map((e: any) => ({
          id: String(e.id ?? e.slug ?? e.uid ?? 'unknown'),
          name: e.name ?? 'Event',
          description: e.description ?? '',
        }));
        if (!this.events.length) this.events = this.demo.listEvents();
      },
      error: () => {
        this.events = this.demo.listEvents();
      },
    });
  }
}
