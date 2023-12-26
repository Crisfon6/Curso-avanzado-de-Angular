import { HttpClient } from '@angular/common/http';
import { MedicosComponent } from './medicos.component';
import { MedicosService } from './medicos.service';
import { from,empty,throwError } from 'rxjs';


describe('MedicosComponent', () => {
    const doctors = ['medico1','medico2','medico3'];
    let component: MedicosComponent;
    const service = new MedicosService(null!);
    beforeEach( () => {
      component = new MedicosComponent(service);
    });


    it('Init: Must load the medicos', () => {
      spyOn(service,'getMedicos').and.callFake(()=>{
        return from(doctors);
      });
      component.ngOnInit();

      expect(component.medicos.length).toBeGreaterThan(0);

    });
    it('Must call server to add a medico', () => {
     const spy=  spyOn(service,'agregarMedico').and.callFake((doctor)=>{
        return empty();
      });
      component.agregarMedico();

       expect(spy).toHaveBeenCalled();
    });
    it('Must add to a new medico to the array of medicos',()=>{
      const medico = {id: 1, name:'Cris'};
      spyOn(service,'agregarMedico').and.returnValue(from([medico]));
      component.agregarMedico();
      expect(component.medicos.indexOf(medico)).toBe(0);
    });
    it('If failed the add, the property mensajeError,Must be equals to error',()=>{
        const myError = 'Cannot add the medico';

        spyOn(service,'agregarMedico').and
        .returnValue(
          throwError(myError)
        )
        component.agregarMedico();
        expect(component.mensajeError).toBe(myError);
    });
    it('Must call the server for delete the medico',()=>{
      spyOn(window,'confirm').and.returnValue(true);
      const spy = spyOn(service,'borrarMedico')
      .and.returnValue(
        empty()
      );
      component.borrarMedico('');
      expect(spy).toHaveBeenCalledWith('');
    });
    it('Not call the server for delete the medico',()=>{
      spyOn(window,'confirm').and.returnValue(false);
      const spy = spyOn(service,'borrarMedico')
      .and.returnValue(
        empty()
      );
      component.borrarMedico('1');
      expect(spy).not.toHaveBeenCalledWith('1');
    });
});
