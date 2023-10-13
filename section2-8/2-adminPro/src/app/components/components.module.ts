import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncreaseComponent } from './increase/increase.component';
import { FormsModule } from '@angular/forms';
import { DonutComponent } from './donut/donut.component';

import { NgChartsModule} from 'ng2-charts';


@NgModule({
  declarations: [
    IncreaseComponent,
    DonutComponent
  ],
  exports: [
    IncreaseComponent,
    DonutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ]
})
export class ComponentsModule { }
