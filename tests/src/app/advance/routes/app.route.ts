import { Routes } from "@angular/router";
import { HospitalComponent } from "src/app/intermediate2-int/hospital/hospital.component";
import { IncrementadorComponent } from "src/app/intermediate2-int/incrementador/incrementador.component";
import { MedicoComponent } from "src/app/intermediate2-int/medico/medico.component";

export const routes:Routes = [
  {path:'hospital',component:HospitalComponent},
  {path:'medico/:id',component:MedicoComponent},
  {path:'**',component: IncrementadorComponent},
]
