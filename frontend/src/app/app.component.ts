import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from './services/theme.service';
import { ToastComponent } from './components/shared/toast/toast.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, ToastComponent, NavbarComponent],
  template: `
    <div class="app-container">
      <app-navbar></app-navbar>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <app-toast></app-toast>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background-color: var(--bg-primary);
      color: var(--text-primary);
      display: flex;
      flex-direction: column;
    }

    .main-content {
      flex: 1;
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      width: 100%;
    }

    @media (max-width: 768px) {
      .main-content {
        padding: 1rem;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private themeService = inject(ThemeService);

  ngOnInit(): void {
    this.themeService.loadTheme();
  }
}
