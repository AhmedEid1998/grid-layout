import { Component } from '@angular/core';
import { GridOneComponent } from '../grid-comps/grid-one/grid-one.component';
import { GridTwoComponent } from '../grid-comps/grid-two/grid-two.component';
import { GridThreeComponent } from '../grid-comps/grid-three/grid-three.component';
import { GridFourComponent } from '../grid-comps/grid-four/grid-four.component';
import { GridFiveComponent } from '../grid-comps/grid-five/grid-five.component';
import { NgComponentOutlet, NgFor } from '@angular/common';

@Component({
  selector: 'app-dynamic',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './dynamic.component.html',
  styleUrl: './dynamic.component.scss',
})
export class DynamicComponent {
  // Map between button and component
  components = [
    { name: 'Component 1', component: GridOneComponent },
    { name: 'Component 2', component: GridTwoComponent },
    { name: 'Component 3', component: GridThreeComponent },
    { name: 'Component 4', component: GridFourComponent },
    { name: 'Component 5', component: GridFiveComponent },
  ];

  // Current selected component
  selectedComponent = this.components[0].component;

  // Change displayed component
  selectComponent(component: any) {
    this.selectedComponent = component;
  }
}
