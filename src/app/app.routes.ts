import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DynamicComponent } from './dynamic/dynamic.component';

export const routes: Routes = [
    { path: '', redirectTo: 'layout', pathMatch: 'full' },
    { path: 'layout', component: LayoutComponent },
    { path: 'dynamic', component: DynamicComponent },
];
