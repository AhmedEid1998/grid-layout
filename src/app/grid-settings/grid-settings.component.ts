import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  FormControl,
  FormsModule,
  Validators,
} from '@angular/forms';
import { KtdGridCompactType } from '@katoid/angular-grid-layout';
import { debounceTime } from 'rxjs';
@Component({
  selector: 'app-grid-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './grid-settings.component.html',
  styleUrl: './grid-settings.component.scss',
})
export class GridSettingsComponent {
  gridForm: FormGroup;
  @Output() gridFormChange = new EventEmitter<any>();

  compactTypes = ['horizontal', 'vertical', 'Any Compact'];
  transitionTypes = [
    'ease',
    'ease-out',
    'linear',
    'overflowing',
    'fast',
    'slow-motion',
    'transform-only',
  ];
  showGridOptions = ['always', 'never', 'whenDragging'];

  behaviorCheckboxes = [
    // { label: 'Auto Scroll', controlName: 'autoScroll' },
    { label: 'Disable Drag', controlName: 'disableDrag' },
    { label: 'Disable Resize', controlName: 'disableResize' },
    { label: 'Disable Remove', controlName: 'disableRemove' },
    // { label: 'Auto Resize', controlName: 'autoResize' },
    // { label: 'Prevent Collision', controlName: 'preventCollision' },
  ];

  constructor(private fb: FormBuilder) {
    this.gridForm = this.fb.group({
      compactType: new FormControl<KtdGridCompactType>('vertical', {
        nonNullable: true,
      }),
      columns: new FormControl<number>(12, { nonNullable: true }),
      rowHeight: new FormControl<number>(50, { nonNullable: true }),
      gap: new FormControl<number>(10, { nonNullable: true }),
      transitionType: new FormControl<string>('ease', { nonNullable: true }),

      autoScroll: new FormControl<boolean>(true, { nonNullable: true }),
      disableDrag: new FormControl<boolean>(false, { nonNullable: true }),
      disableResize: new FormControl<boolean>(false, { nonNullable: true }),
      disableRemove: new FormControl<boolean>(false, { nonNullable: true }),
      autoResize: new FormControl<boolean>(true, { nonNullable: true }),
      preventCollision: new FormControl<boolean>(false, { nonNullable: true }),

      showGrid: new FormControl<'never' | 'always' | 'whenDragging'>('always', {
        nonNullable: true,
      }),
      borderWidth: new FormControl<number>(1, { nonNullable: true }),
      borderColor: new FormControl<string>('#ff8000', { nonNullable: true }),
      gapColor: new FormControl<string>('#000', { nonNullable: true }),
      rowColor: new FormControl<string>('#808080', { nonNullable: true }),
      columnColor: new FormControl<string>('#808080', { nonNullable: true }),
    });
  }

  ngOnInit(): void {
    this.gridForm.valueChanges.pipe(debounceTime(200)).subscribe(() => {
      this.onFormChange();
    });
  }

  onFormChange() {
    console.log('Form valid:', this.gridForm.valid);

    this.gridFormChange.emit(this.gridForm.value);
  }
}
