import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proposition-list',
  imports: [CommonModule],
  template: `
    <div class="proposition-list-container">
      <h2>My Propositions</h2>
      <p>Proposition list component - to be implemented</p>
    </div>
  `,
  styles: [`
    .proposition-list-container {
      padding: 2rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropositionListComponent {}
