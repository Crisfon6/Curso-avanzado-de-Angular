import { IncrementadorComponent } from "./incrementador.component"

describe('Increment component unit',()=>{
  let component: IncrementadorComponent;
  beforeEach(()=>component= new IncrementadorComponent());

  it('Cannot pass of 100 the progress',()=>{
    component.progreso = 50;
    component.cambiarValor(60);

    expect(component.progreso).toBe(100);
  })
})
