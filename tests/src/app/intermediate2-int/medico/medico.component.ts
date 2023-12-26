import { Component } from '@angular/core';
import { MedicoService } from './medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent {
  medicos:any[]=[];
  constructor(public medicoService:MedicoService){

  }
  greetMedico(name:string){
    return `Hello ${name}`;
  }
  getMedicos(){
  this.medicoService.getMedicos().subscribe((medicos:any)=>this.medicos=medicos)
  }
}
