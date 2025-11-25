import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-container">
      <div class="hero">
        <h1>Welcome to Sneaker Engine</h1>
        <p class="hero-subtitle">
          Buy, sell, and trade sneakers with ease. Join our community of sneaker enthusiasts.
        </p>
        <div class="hero-actions">
          <a routerLink="/register" class="btn btn-primary">Get Started</a>
          <a routerLink="/sneakers" class="btn btn-secondary">Browse Sneakers</a>
        </div>
      </div>

      <div class="features">
        <div class="feature-card">
          <div class="feature-icon">👟</div>
          <h3>Vast Collection</h3>
          <p>Browse thousands of sneakers from top brands</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🤝</div>
          <h3>Trade System</h3>
          <p>Propose trades and swaps with other collectors</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔒</div>
          <h3>Secure Transactions</h3>
          <p>Safe and reliable buying and selling experience</p>
        </div>
      </div>
    </div>
  `,
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
