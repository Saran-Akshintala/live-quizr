import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = environment.API_BASE_URL;

  get<T>(path: string, options?: object): Observable<T> {
    return this.http.get<T>(`${this.base}${path}`, options);
  }
  post<T>(path: string, body: any, options?: object): Observable<T> {
    return this.http.post<T>(`${this.base}${path}`, body, options);
  }
  put<T>(path: string, body: any, options?: object): Observable<T> {
    return this.http.put<T>(`${this.base}${path}`, body, options);
  }
  delete<T>(path: string, options?: object): Observable<T> {
    return this.http.delete<T>(`${this.base}${path}`, options);
  }

  // Health check convenience
  health(): Observable<any> {
    return this.get('/health');
  }
}
