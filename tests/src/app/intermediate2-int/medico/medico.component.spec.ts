import { TestBed,ComponentFixture } from "@angular/core/testing";
import { MedicoComponent } from "./medico.component"
import { MedicoService } from "./medico.service";
import { HttpClientModule } from "@angular/common/http";

describe('medico component',()=>{
  let component :MedicoComponent;
  let fixture: ComponentFixture<MedicoComponent>;
  beforeEach(()=>{
  TestBed.configureTestingModule({
    declarations:[MedicoComponent],
    providers:[MedicoService],
    imports:[HttpClientModule]
  });
  fixture = TestBed.createComponent(MedicoComponent);
  component = fixture.componentInstance;
  });

  it('Must create the component',()=>{
    expect(component).toBeTruthy();
  });
  it('Must return the medico name',()=>{
    const name = 'Juan';
    expect(component.greetMedico(name)).toContain(name);
  });
})
