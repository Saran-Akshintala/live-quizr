import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-host-controls',
  template: `
    <div class="controls" role="toolbar" aria-label="Host Controls">
      <button (click)="action.emit('start')">Start</button>
      <button (click)="action.emit('next')">Next Question</button>
      <button (click)="action.emit('end')">End</button>
    </div>
  `,
  styles: [`.controls{display:flex;gap:.5rem;margin:.5rem 0} button{padding:.5rem 1rem}`]
})
export class HostControlsComponent {
  @Output() action = new EventEmitter<string>();
}
