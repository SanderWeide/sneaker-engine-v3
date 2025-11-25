import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <a routerLink="/home" class="navbar-brand">Sneaker Engine</a>
        
        <div class="navbar-menu">
          @if (authService.isAuthenticated()) {
            <a 
              routerLink="/sneakers" 
              routerLinkActive="active"
              class="nav-link">
              Sneakers
            </a>
            <a 
              routerLink="/propositions" 
              routerLinkActive="active"
              class="nav-link">
              Propositions
            </a>
          }
        </div>

        <div class="navbar-actions">
          <button 
            class="theme-toggle" 
            (click)="themeService.toggleDarkMode()"
            [attr.aria-label]="themeService.isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode'">
            {{ themeService.isDarkMode() ? '☀️' : '🌙' }}
          </button>

          @if (authService.isAuthenticated()) {
            <span class="user-info">{{ authService.getCurrentUser()?.username }}</span>
            <button class="btn-logout" (click)="authService.logout()">
              Logout
            </button>
          } @else {
            <a routerLink="/login" class="btn-login">Login</a>
            <a routerLink="/register" class="btn-register">Register</a>
          }
        </div>
      </div>
    </nav>
  `,
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  protected authService = inject(AuthService);
  protected themeService = inject(ThemeService);
}
