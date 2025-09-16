import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatCardModule, MatButtonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center py-12 px-4">
      <div class="max-w-md w-full">
        <mat-card class="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <mat-card-header class="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-8 text-center">
            <mat-card-title class="text-3xl font-bold text-white">Login</mat-card-title>
          </mat-card-header>

          <mat-card-content class="p-8">
            <form (ngSubmit)="login()" #f="ngForm" class="space-y-6">
              <div class="form-group">
                <label for="email" class="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                <input type="email" 
                       id="email"
                       name="email" 
                       [(ngModel)]="email" 
                       required 
                       placeholder="Enter your email"
                       class="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900" />
              </div>
              
              <div class="form-group">
                <label for="password" class="block text-sm font-medium text-slate-700 mb-2">Password *</label>
                <input type="password" 
                       id="password"
                       name="password" 
                       [(ngModel)]="password" 
                       required 
                       placeholder="Enter your password"
                       class="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900" />
              </div>
              
              <div class="flex gap-4">
                <button type="submit" 
                        [disabled]="!f.valid"
                        class="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-200 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed">
                  Login
                </button>
                <button type="button"
                        class="flex-1 px-6 py-3 border border-slate-300 text-slate-600 rounded-md hover:bg-slate-50 transition-colors duration-200"
                        routerLink="/">
                  Cancel
                </button>
              </div>
            </form>

            <div class="mt-8 pt-8 border-t border-slate-200">
              <p class="text-center text-slate-600 mb-6 font-medium">Quick Login Options</p>
              <div class="space-y-4">
                <button type="button"
                        (click)="loginDemo()"
                        class="w-full px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                  Login as Demo User
                  <span class="block text-emerald-100 text-sm mt-1">(Access Live Quiz)</span>
                </button>
                
                <button type="button"
                        (click)="loginAdmin()"
                        class="w-full px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-md shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                  Login as Admin User
                  <span class="block text-orange-100 text-sm mt-1">(Access Dashboard)</span>
                </button>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .page{display:flex;justify-content:center;padding:1rem}
    mat-card{width:100%;max-width:420px}
    .full{width:100%}
    .actions{display:flex;gap:.5rem;justify-content:flex-end;margin-top:1rem}
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  constructor(private router: Router, private auth: AuthService) {}
  login(){ /* placeholder */ }
  loginDemo(){ this.auth.loginAsDemo(); this.router.navigateByUrl('/live-quiz'); }
  loginAdmin(){ this.auth.loginAsAdmin(); this.router.navigateByUrl('/dashboard'); }
}
