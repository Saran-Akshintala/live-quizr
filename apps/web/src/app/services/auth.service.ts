import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Role = 'guest' | 'demo' | 'admin';
export interface User { role: Role; name?: string }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User>({ role: 'guest' });
  readonly user$ = this.userSubject.asObservable();

  get currentUser(): User { return this.userSubject.value; }

  loginAsDemo() {
    this.userSubject.next({ role: 'demo', name: 'Demo User' });
  }

  loginAsAdmin() {
    this.userSubject.next({ role: 'admin', name: 'Admin User' });
  }

  logout() {
    this.userSubject.next({ role: 'guest' });
  }
}
