import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncreaseComponent } from './increase/increase.component';
import { FormsModule } from '@angular/forms';
import { DonutComponent } from './donut/donut.component';

import { NgChartsModule} from 'ng2-charts';
import { ModalImageComponent } from './modal-image/modal-image.component';


@NgModule({
  declarations: [
    IncreaseComponent,
    DonutComponent,
    ModalImageComponent
  ],
  exports: [
    IncreaseComponent,
    DonutComponent,
    ModalImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule,
  ]
})
export class ComponentsModule { }
