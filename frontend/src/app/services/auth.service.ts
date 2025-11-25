import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../models/auth.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private toastService = inject(ToastService);

  private readonly TOKEN_KEY = 'sneaker_engine_token';
  private readonly USER_KEY = 'sneaker_engine_user';

  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public readonly currentUser$ = this.currentUserSubject.asObservable();

  public readonly isAuthenticated = signal<boolean>(!!this.getToken());

  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, credentials).pipe(
      tap({
        next: (response) => {
          this.setAuthData(response);
          this.toastService.success('Login successful!');
          this.router.navigate(['/sneakers']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.toastService.error('Login failed. Please check your credentials.');
        }
      })
    );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, userData).pipe(
      tap({
        next: (response) => {
          this.setAuthData(response);
          this.toastService.success('Registration successful!');
          this.router.navigate(['/sneakers']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.toastService.error('Registration failed. Please try again.');
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.isAuthenticated.set(false);
    this.toastService.info('Logged out successfully');
    this.router.navigate(['/login']);
  }

  private setAuthData(response: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.access_token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
    this.isAuthenticated.set(true);
  }
}
