import { NgStyle, CommonModule } from '@angular/common';
import { Component, Input, Type } from '@angular/core';
import {
  KtdGridBackgroundCfg,
  KtdGridCompactType,
  KtdGridLayoutItem,
  KtdGridModule,
} from '@katoid/angular-grid-layout';
import { KtdGrid } from '../../Models/KtdGrid';

@Component({
  selector: 'app-custom-layout',
  standalone: true,
  imports: [KtdGridModule, NgStyle, CommonModule],
  templateUrl: './custom-layout.component.html',
  styleUrl: './custom-layout.component.scss',
})
export class CustomLayoutComponent {
  /**
   * Layout of the grid. Array of all the grid items with their ID, size, and position.
   */
  @Input({ required: true }) layout: KtdGrid[] = [];

  /**
   * Number of columns in the grid layout. Determines how wide the grid is.
   */
  @Input({ required: true }) cols!: number;

  /**
   * Gap (spacing) between grid items in pixels.
   */
  @Input({ required: true }) gap!: number;

  /**
   * Height of each row in pixels. Affects the vertical size of items.
   */
  @Input({ required: true }) rowHeight!: number;

  /**
   * Map that links string names to actual Angular component types.
   * Used to dynamically render components inside grid items.
   */
  @Input({ required: true }) componentMap!: Record<string, Type<any>>;

  /**
   * Type of compaction applied to the layout:
   * - 'horizontal': tries to move items upward
   * - 'vertical': tries to move items to the left
   * - 'none': disables automatic compaction
   */
  @Input() compactType!: KtdGridCompactType;

  /**
   * When true, removes the delete ("×") button from grid items to prevent removal.
   */
  @Input() disableRemove!: boolean;

  /**
   * When true, disables dragging behavior on all grid items.
   */
  @Input() disableDrag!: boolean;

  /**
   * When true, disables resizing behavior on all grid items.
   */
  @Input() disableResize!: boolean;

  /**
   * Optional configuration for the grid background:
   * controls whether to show background lines, the color of the grid,
   * and other visual aspects to guide placement.
   */
  @Input() backgroundConfig!: KtdGridBackgroundCfg;
  /**
   * CSS cursor style based on the dragging state:
   * - 'grab': when the user is not dragging
   * - 'grabbing': while an item is being dragged
   */
  cursorStyle: 'grab' | 'grabbing' = 'grab';

  /**
   * TrackBy function for *ngFor to optimize DOM rendering by item ID.
   * @param id - Unique ID of the item
   * @returns The same ID passed
   */
  trackById(id: string): string {
    return id;
  }

  /**
   * Updates the layout with new positions while keeping the original component names.
   * Saves the updated layout to local storage.
   *
   * @param newLayout - Array representing the updated positions and sizes of grid items
   */
  onLayoutUpdated(newLayout: KtdGridLayoutItem[]): void {
    this.layout = newLayout.map((item, index) => ({
      ...item,
      compName: this.layout[index].compName,
    }));

    this.saveLayout();
  }

  /**
   * Removes an item from the layout by its index and updates local storage
   * @param index - The index of the item to remove from the layout
   */
  removeItem(index: number): void {
    this.layout.splice(index, 1); // Remove item from array
    this.layout = [...this.layout]; // Trigger change detection
    this.saveLayout(); // Persist the updated layout
  }

  /**
   * Updates the cursor style depending on drag state.
   * @param isDragging - Boolean indicating if dragging is occurring
   */
  setDragging(isDragging: boolean): void {
    this.cursorStyle = isDragging ? 'grabbing' : 'grab';
  }

  /**
   * Saves the current layout to local storage.
   */
  private saveLayout(): void {
    localStorage.setItem('layout', JSON.stringify(this.layout));
  }
}
