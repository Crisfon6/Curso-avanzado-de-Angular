import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MedicosComponent } from './intermediate/spys/medicos.component';
import { HttpClientModule } from '@angular/common/http';
import { MedicoComponent } from './intermediate2-int/medico/medico.component';
import { HospitalComponent } from './intermediate2-int/hospital/hospital.component';
import { IncrementadorComponent } from './intermediate2-int/incrementador/incrementador.component';

@NgModule({
  declarations: [
    AppComponent,
    MedicosComponent,
    MedicoComponent,
    HospitalComponent,
    IncrementadorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
