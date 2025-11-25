import { Injectable, signal } from '@angular/core';
import { Toast, ToastType } from '../models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public readonly toasts = signal<Toast[]>([]);

  private addToast(type: ToastType, message: string, duration: number = 5000): void {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const toast: Toast = { id, type, message, duration };
    
    this.toasts.update(current => [...current, toast]);

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }

  success(message: string, duration?: number): void {
    this.addToast('success', message, duration);
  }

  error(message: string, duration?: number): void {
    this.addToast('error', message, duration);
  }

  warning(message: string, duration?: number): void {
    this.addToast('warning', message, duration);
  }

  info(message: string, duration?: number): void {
    this.addToast('info', message, duration);
  }

  remove(id: string): void {
    this.toasts.update(current => current.filter(toast => toast.id !== id));
  }

  clear(): void {
    this.toasts.set([]);
  }
}
