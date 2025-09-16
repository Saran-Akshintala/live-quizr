import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'info' | 'success' | 'error';
export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _seq = 0;
  private _toasts$ = new BehaviorSubject<Toast[]>([]);
  readonly toasts$ = this._toasts$.asObservable();

  show(message: string, type: ToastType = 'info', timeoutMs = 3000) {
    const toast: Toast = { id: ++this._seq, message, type };
    this._toasts$.next([...this._toasts$.value, toast]);
    if (timeoutMs > 0) {
      setTimeout(() => this.dismiss(toast.id), timeoutMs);
    }
  }

  success(message: string, timeoutMs?: number) { this.show(message, 'success', timeoutMs); }
  error(message: string, timeoutMs?: number) { this.show(message, 'error', timeoutMs); }
  info(message: string, timeoutMs?: number) { this.show(message, 'info', timeoutMs); }

  dismiss(id: number) {
    this._toasts$.next(this._toasts$.value.filter(t => t.id !== id));
  }
}
