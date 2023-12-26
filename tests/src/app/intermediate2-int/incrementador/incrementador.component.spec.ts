import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { IncrementadorComponent } from './incrementador.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

// Integration test
describe('Incremendator Component', () => {

    let component: IncrementadorComponent;
    let fixture: ComponentFixture<IncrementadorComponent>;

    beforeEach( () => {
        TestBed.configureTestingModule({
            declarations: [ IncrementadorComponent ],
            imports: [ FormsModule ]
        });

        fixture = TestBed.createComponent(IncrementadorComponent);
        component = fixture.componentInstance;

    });

    it('Must show the leyenda', () => {
      const message = 'Progress';
      component.leyenda = message;
      fixture.detectChanges();
      const elem : HTMLElement =fixture.debugElement.query(By.css('h3')).nativeElement;

      expect(elem.innerHTML).toContain(message)

    });
    it('Must show in the input progress value',waitForAsync(()=>{
        component.cambiarValor(5);
        fixture.detectChanges();
        fixture.whenStable().then(()=>{

          const input = fixture.debugElement.query(By.css('input'));
          const element : HTMLInputElement = input.nativeElement;

          expect(element.value).toBe('55');
        });
    }));

    it('Must decrease or increase in 5, when do click in the button',()=>{
      const buttons = fixture.debugElement.queryAll(By.css('button[type="button"]'));
      buttons[0].triggerEventHandler('click',null);
      expect(component.progreso).toBe(45);
      buttons[1].triggerEventHandler('click',null);
      expect(component.progreso).toBe(50);
    });

    it('Must show the update of the progress when do click in the button',()=>{
      const buttons = fixture.debugElement.queryAll(By.css('button[type="button"]'));
      buttons[0].triggerEventHandler('click',null);
      const elem : HTMLElement =fixture.debugElement.query(By.css('h3')).nativeElement;
      fixture.detectChanges();
      expect(elem.innerHTML).toContain('45');
      buttons[1].triggerEventHandler('click',null);
      fixture.detectChanges();
      expect(elem.innerHTML).toContain('50');
    });
});
