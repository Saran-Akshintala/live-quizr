import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DemoService } from '../../services/demo.service';

@Component({
  selector: 'app-demo',
  template: `
    <section class="demo">
      <h1>Demo Mode</h1>
      <p>A client-only demo event is available for fast browsing.</p>
      <div class="card" *ngIf="event">
        <h2>{{event.name}}</h2>
        <p>{{event.description}}</p>
        <div class="actions">
          <a routerLink="/host/demo" class="btn">Open Host Console</a>
          <a routerLink="/display/demo" class="btn">Open Display</a>
          <a routerLink="/join/demo" class="btn">Open Join</a>
        </div>
      </div>
    </section>
  `,
  styles: [`.demo{padding:1rem}.card{padding:1rem;border:1px solid #eee;border-radius:8px;max-width:560px}`]
})
export class DemoComponent {
  event = this.demo.getEvent('demo');
  constructor(private demo: DemoService) {}
}
