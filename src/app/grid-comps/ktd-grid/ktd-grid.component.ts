import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KtdGridModule } from '@katoid/angular-grid-layout';

@Component({
  selector: 'app-ktd-grid',
  standalone: true,
  imports: [KtdGridModule],
  templateUrl: './ktd-grid.component.html',
  styleUrl: './ktd-grid.component.scss',
})
export class KtdGridComponent {
  @Input() item: any;
  @Input() cursorStyle!: string;
  @Input() index!: number;
  @Output() removed = new EventEmitter<number>();

  onRemoveItem(index: number): void {
    this.removed.emit(index);
  }
}
