import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../shared/toast/toast.service';

@Component({
  selector: 'app-login',
  template: `
    <section class="auth">
      <h1>Login</h1>
      <form (ngSubmit)="login()">
        <label>Email <input type="email" [(ngModel)]="email" name="email" required></label>
        <label>Password <input type="password" [(ngModel)]="password" name="password" required></label>
        <div class="actions">
          <button type="submit" [disabled]="!email || !password">Login</button>
          <a routerLink="/auth/register">Register</a>
        </div>
      </form>
      <p class="hint">TODO: Wire to backend /auth/login</p>
    </section>
  `,
  styles: [`.auth{padding:1rem} form{display:grid;gap:.5rem;max-width:360px} input{padding:.5rem}`],
  
})
export class LoginComponent {
  email = '';
  password = '';
  constructor(private api: ApiService, private toast: ToastService) {}
  login(){
    // TODO: integrate real API
    this.toast.info?.('Login is stubbed in demo mode');
  }
}
