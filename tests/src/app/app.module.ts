import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MedicosComponent } from './intermediate/spys/medicos.component';
import { HttpClientModule } from '@angular/common/http';
import { MedicoComponent } from './intermediate2-int/medico/medico.component';
import { HospitalComponent } from './intermediate2-int/hospital/hospital.component';
import { IncrementadorComponent } from './intermediate2-int/incrementador/incrementador.component';
import { RouterModule } from '@angular/router';
import { routes } from './advance/routes/app.route';
import { NavbarComponent } from './advance/navbar/navbar.component';
import { RouterMedicoComponent } from './advance/router-medico/router-medico.component';

@NgModule({
  declarations: [
    AppComponent,
    MedicosComponent,
    MedicoComponent,
    HospitalComponent,
    IncrementadorComponent,
    NavbarComponent,
    RouterMedicoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
