import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterMedicoComponent } from './router-medico.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, empty } from 'rxjs';

class FakeRouter {
  navigate(params:any){

  }
}
class FakeActivatedRoute {
  // params: Observable<any>= empty();
  private subject = new Subject();

  push(value:any){
    this.subject.next(value);
  }

  get params(){
    return this.subject.asObservable();
  }
}


describe('RouterMedicoComponent', () => {
  let component: RouterMedicoComponent;
  let fixture: ComponentFixture<RouterMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RouterMedicoComponent],
      providers: [{provide: Router,
                  useClass:FakeRouter},
                  {provide: ActivatedRoute,
                  useClass: FakeActivatedRoute}
                ]
    });
    fixture = TestBed.createComponent(RouterMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Must redirect a Medico when is saved',()=>{
    const router = TestBed.get(Router);
    const spy = spyOn(router,'navigate');
    component.saveMedico();
    expect(spy).toHaveBeenCalledWith(['medico','123']);
  });

  it('Must put the id=nuevo',()=>{
    const activatedRoute :FakeActivatedRoute = TestBed.get( ActivatedRoute);
    activatedRoute.push({id:'nuevo'})
    expect(component.id).toBe('nuevo')
  });
});
