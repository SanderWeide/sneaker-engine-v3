import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'sneaker_engine_theme';
  public readonly isDarkMode = signal<boolean>(false);

  constructor() {
    effect(() => {
      const darkMode = this.isDarkMode();
      if (darkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      localStorage.setItem(this.THEME_KEY, darkMode ? 'dark' : 'light');
    });
  }

  loadTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      this.isDarkMode.set(true);
    }
  }

  toggleDarkMode(): void {
    this.isDarkMode.update(current => !current);
  }

  setDarkMode(enabled: boolean): void {
    this.isDarkMode.set(enabled);
  }
}
