import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Create Your Account</h2>
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="username">Username</label>
            <input 
              id="username"
              type="text" 
              formControlName="username"
              placeholder="Choose a username"
              [attr.aria-invalid]="registerForm.get('username')?.invalid && registerForm.get('username')?.touched">
            @if (registerForm.get('username')?.invalid && registerForm.get('username')?.touched) {
              <span class="error-message" role="alert">Username must be at least 3 characters</span>
            }
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input 
              id="email"
              type="email" 
              formControlName="email"
              placeholder="your@email.com"
              [attr.aria-invalid]="registerForm.get('email')?.invalid && registerForm.get('email')?.touched">
            @if (registerForm.get('email')?.invalid && registerForm.get('email')?.touched) {
              <span class="error-message" role="alert">Please enter a valid email</span>
            }
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input 
              id="password"
              type="password" 
              formControlName="password"
              placeholder="Minimum 6 characters"
              [attr.aria-invalid]="registerForm.get('password')?.invalid && registerForm.get('password')?.touched">
            @if (registerForm.get('password')?.invalid && registerForm.get('password')?.touched) {
              <span class="error-message" role="alert">Password must be at least 6 characters</span>
            }
          </div>

          <button 
            type="submit" 
            class="btn-submit"
            [disabled]="registerForm.invalid || isLoading()">
            @if (isLoading()) {
              Creating Account...
            } @else {
              Register
            }
          </button>
        </form>

        <p class="auth-footer">
          Already have an account? 
          <a routerLink="/login">Login here</a>
        </p>
      </div>
    </div>
  `,
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private authService = inject(AuthService);
  
  protected isLoading = signal(false);

  protected registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  protected onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      const { username, email, password } = this.registerForm.value;
      
      this.authService.register({ 
        username: username!, 
        email: email!, 
        password: password! 
      }).subscribe({
        next: () => this.isLoading.set(false),
        error: () => this.isLoading.set(false),
      });
    }
  }
}
