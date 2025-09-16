import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../shared/toast/toast.service';

@Component({
  selector: 'app-register',
  template: `
    <section class="auth">
      <h1>Register</h1>
      <form (ngSubmit)="register()">
        <label>Email <input type="email" [(ngModel)]="email" name="email" required></label>
        <label>Password <input type="password" [(ngModel)]="password" name="password" required></label>
        <label>First Name <input type="text" [(ngModel)]="firstName" name="firstName" required></label>
        <label>Last Name <input type="text" [(ngModel)]="lastName" name="lastName" required></label>
        <div class="actions">
          <button type="submit" [disabled]="!email || !password || !firstName || !lastName">Create Account</button>
          <a routerLink="/auth/login">Login</a>
        </div>
      </form>
      <p class="hint">TODO: Wire to backend /auth/register</p>
    </section>
  `,
  styles: [`.auth{padding:1rem} form{display:grid;gap:.5rem;max-width:360px} input{padding:.5rem}`],
  
})
export class RegisterComponent {
  email = '';
  password = '';
  firstName = '';
  lastName = '';
  constructor(private api: ApiService, private toast: ToastService) {}
  register(){
    // TODO: integrate real API
    this.toast.info('Register is stubbed in demo mode');
  }
}
