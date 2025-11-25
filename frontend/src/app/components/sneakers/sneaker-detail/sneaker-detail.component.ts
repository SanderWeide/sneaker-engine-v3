import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sneaker-detail',
  imports: [CommonModule],
  template: `
    <div class="sneaker-detail-container">
      <h2>Sneaker Details</h2>
      <p>Sneaker detail component - to be implemented</p>
    </div>
  `,
  styles: [`
    .sneaker-detail-container {
      padding: 2rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SneakerDetailComponent {}
