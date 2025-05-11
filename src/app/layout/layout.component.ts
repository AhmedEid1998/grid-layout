import { CommonModule, NgStyle } from '@angular/common';
import {
  Component,
  Type,
} from '@angular/core';
import {
  KtdGridBackgroundCfg,
  KtdGridCompactType,
  KtdGridLayoutItem,
  KtdGridModule,
} from '@katoid/angular-grid-layout';
import { GridLayoutService } from '../services/grid-layout.service';
import { catchError, Subject, takeUntil, tap } from 'rxjs';
import { GridOneComponent } from '../grid-comps/grid-one/grid-one.component';
import { GridTwoComponent } from '../grid-comps/grid-two/grid-two.component';
import { GridThreeComponent } from '../grid-comps/grid-three/grid-three.component';
import { GridFourComponent } from '../grid-comps/grid-four/grid-four.component';
import { GridFiveComponent } from '../grid-comps/grid-five/grid-five.component';
import { GridSettingsComponent } from '../grid-settings/grid-settings.component';
import { CustomLayoutComponent, KtdGrid } from '../../../projects/grid-layout-lib/src/public-api';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    KtdGridModule,
    NgStyle,
    CommonModule,
    GridSettingsComponent,
    CustomLayoutComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  private destroy$ = new Subject<void>(); // Subject used to signal unsubscription and clean up observables.
  cols = 12; // Number of columns in the grid layout
  gap = 10; // Number of gab in the grid layout
  rowHeight = 50; // Height of each row in pixels
  disableRemove = false; // Flag to disable item removal
  layout: KtdGrid[] = []; // Current grid layout array
  compactType: KtdGridCompactType = 'vertical'; // Type of compacting to be used in the grid layout
  componentMap: Record<string, Type<any>> = {
    // Map that links component names as strings to their corresponding component types.
    GridOneComponent: GridOneComponent,
    GridTwoComponent: GridTwoComponent,
    GridThreeComponent: GridThreeComponent,
    GridFourComponent: GridFourComponent,
    GridFiveComponent: GridFiveComponent,
  };

  backgroundConfig: KtdGridBackgroundCfg = {
    show: 'always',
    borderColor: '#ff800040',
    gapColor: '#000',
    rowColor: '#8080801a',
    columnColor: '#8080801a',
    borderWidth: 1,
  };
  disableDrag: boolean = false; // Flag to disable dragging of items
  disableResize: boolean = false; // Flag to disable resizing of items

  constructor(private _gridLayoutService: GridLayoutService) {}

  ngOnInit(): void {
    this.getGridLayoutData(); // Fetch initial layout data from the service
  }

  /**
   * Loads the layout from local storage.
   * If not found, sets the default layout.
   */
  private loadLayout(layoutData: KtdGrid[]): void {
    console.log('layoutData', layoutData);
    // this.layout = layoutData.length ? layoutData : this.getDefaultLayout();
    const stored = localStorage.getItem('layout');
    this.layout = stored ? JSON.parse(stored) : this.getDefaultLayout();
    console.log('this.layout', this.layout);
  }

  /**
   * Returns the default layout configuration for the grid.
   * @returns A KtdGrid array with default positions and sizes
   */
  private getDefaultLayout() {
    return [
      { id: '1', x: 0, y: 0, w: 2, h: 4, compName: 'GridOneComponent' },
      { id: '2', x: 2, y: 0, w: 3, h: 2, compName: 'GridTwoComponent' },
      { id: '3', x: 5, y: 0, w: 2, h: 3, compName: 'GridThreeComponent' },
      { id: '4', x: 7, y: 0, w: 1, h: 3, compName: 'GridFourComponent' },
      { id: '5', x: 9, y: 0, w: 2, h: 4, compName: 'GridFiveComponent' },
      { id: '6', x: 0, y: 4, w: 1, h: 3, compName: 'GridOneComponent' },
      { id: '7', x: 2, y: 2, w: 1, h: 2, compName: 'GridTwoComponent' },
      { id: '8', x: 3, y: 2, w: 2, h: 5, compName: 'GridThreeComponent' },
      { id: '9', x: 3, y: 7, w: 1, h: 2, compName: 'GridFourComponent' },
      { id: '10', x: 5, y: 3, w: 2, h: 3, compName: 'GridFiveComponent' },
      { id: '11', x: 9, y: 4, w: 2, h: 2, compName: 'GridOneComponent' },
    ];
  }

  /**
   * Fetches the saved layout configuration and loads it into the component.
   * If an error occurs, loads an empty layout instead.
   */
  getGridLayoutData() {
    this._gridLayoutService
      .getLayoutConfig()
      .pipe(
        takeUntil(this.destroy$),
        tap((res) => {
          console.log('Layout data fetched:', res);
          this.loadLayout(res);
        }),
        catchError((err) => {
          console.error('Error fetching layout data:', err);
          this.loadLayout([]);
          return []; // Return an empty array on error
        })
      )
      .subscribe();
  }

  onGridFormChange($event: any) {
    console.log('$event', $event);
    const {
      showGrid,
      borderWidth,
      borderColor,
      gapColor,
      rowColor,
      columnColor,
      columns,
      rowHeight,
      gap,
      disableRemove,
      compactType,
      disableDrag,
      disableResize,
    } = $event;

    console.log('this.backgroundConfig Before', this.backgroundConfig);
    this.backgroundConfig = {
      show: showGrid,
      borderColor: borderColor + '40',
      gapColor,
      rowColor: rowColor + '1a',
      columnColor: columnColor + '1a',
      borderWidth,
    };
    console.log('this.backgroundConfig After', this.backgroundConfig);

    this.cols = columns; // Update the number of columns based on the form input
    this.rowHeight = rowHeight; // Update the row height based on the form input
    this.gap = gap; // Update the gap size based on the form input
    this.disableRemove = disableRemove; // Update the remove item flag based on the form input
    this.compactType = compactType; // Update the compact type based on the form input
    this.disableDrag = disableDrag; // Update the drag disable flag based on the form input
    this.disableResize = disableResize; // Update the resize disable flag based on the form input
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
