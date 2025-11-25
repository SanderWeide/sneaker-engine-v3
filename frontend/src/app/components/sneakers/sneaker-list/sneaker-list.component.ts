import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sneaker-list',
  imports: [CommonModule],
  template: `
    <div class="sneaker-list-container">
      <h2>My Sneakers</h2>
      <p>Sneaker list component - to be implemented</p>
    </div>
  `,
  styles: [`
    .sneaker-list-container {
      padding: 2rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SneakerListComponent {}
