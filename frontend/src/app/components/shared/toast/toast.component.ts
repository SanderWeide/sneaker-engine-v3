import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      @for (toast of toastService.toasts(); track toast.id) {
        <div 
          class="toast"
          [class.toast-success]="toast.type === 'success'"
          [class.toast-error]="toast.type === 'error'"
          [class.toast-warning]="toast.type === 'warning'"
          [class.toast-info]="toast.type === 'info'"
          role="alert"
          [attr.aria-live]="toast.type === 'error' ? 'assertive' : 'polite'">
          <div class="toast-content">
            <span class="toast-icon">{{ getIcon(toast.type) }}</span>
            <span class="toast-message">{{ toast.message }}</span>
          </div>
          <button 
            class="toast-close" 
            (click)="toastService.remove(toast.id)"
            aria-label="Close notification">
            ×
          </button>
        </div>
      }
    </div>
  `,
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  protected toastService = inject(ToastService);

  protected getIcon(type: string): string {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'warning': return '⚠';
      case 'info': return 'ℹ';
      default: return '';
    }
  }
}
