import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-join-form',
  template: `
    <section class="join-form">
      <h1>Join Event</h1>
      <form (ngSubmit)="submit()">
        <label>
          Display Name
          <input type="text" [(ngModel)]="name" name="name" required aria-label="Display Name">
        </label>
        <div class="actions">
          <button type="submit" [disabled]="!name">Join Lobby</button>
        </div>
      </form>
    </section>
  `,
  styles: [`.join-form{padding:1rem} form{display:grid;gap:.5rem;max-width:360px} input{padding:.5rem}`]
})
export class JoinFormComponent {
  name = '';
  constructor(private router: Router, private route: ActivatedRoute) {}
  submit(){
    this.router.navigate(['lobby'], { relativeTo: this.route });
  }
}
