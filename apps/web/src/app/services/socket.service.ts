import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

// TODO: Integrate real socket.io client
// import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class SocketService {
  // private socket?: Socket;
  private events$ = new Subject<{ event: string; data: any }>();

  connect(url: string) {
    // TODO: use socket.io-client
    // this.socket = io(url, { transports: ['websocket'] });
    // this.socket.onAny((event, ...args) => this.events$.next({ event, data: args }));
    // For now, no-op placeholder
    console.warn('[SocketService] connect placeholder. URL:', url);
  }

  on<T = any>(event: string): Observable<T> {
    // TODO: filter by event when real client is wired
    return this.events$.asObservable() as Observable<T>;
  }

  emit(event: string, data?: any) {
    // this.socket?.emit(event, data);
    console.warn('[SocketService] emit placeholder', event, data);
  }

  disconnect() {
    // this.socket?.disconnect();
    console.warn('[SocketService] disconnect placeholder');
  }
}
