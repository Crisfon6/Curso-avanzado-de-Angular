import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {
  data: number[]=[200,200,200];
  labels : string[] = ['Titanic', 'Dreams','Meat'];

}
