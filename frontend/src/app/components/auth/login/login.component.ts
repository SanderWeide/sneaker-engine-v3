import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Login to Sneaker Engine</h2>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              id="email"
              type="email" 
              formControlName="email"
              placeholder="your@email.com"
              [attr.aria-invalid]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
            @if (loginForm.get('email')?.invalid && loginForm.get('email')?.touched) {
              <span class="error-message" role="alert">Please enter a valid email</span>
            }
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input 
              id="password"
              type="password" 
              formControlName="password"
              placeholder="Your password"
              [attr.aria-invalid]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
            @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched) {
              <span class="error-message" role="alert">Password is required</span>
            }
          </div>

          <button 
            type="submit" 
            class="btn-submit"
            [disabled]="loginForm.invalid || isLoading()">
            @if (isLoading()) {
              Logging in...
            } @else {
              Login
            }
          </button>
        </form>

        <p class="auth-footer">
          Don't have an account? 
          <a routerLink="/register">Register here</a>
        </p>
      </div>
    </div>
  `,
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private authService = inject(AuthService);
  
  protected isLoading = signal(false);

  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  protected onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      const { email, password } = this.loginForm.value;
      
      this.authService.login({ 
        email: email!, 
        password: password! 
      }).subscribe({
        next: () => this.isLoading.set(false),
        error: () => this.isLoading.set(false),
      });
    }
  }
}
