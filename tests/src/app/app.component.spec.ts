import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import {  RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './advance/navbar/navbar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    // declarations: [AppComponent,NavbarComponent],
    declarations: [AppComponent],
    imports: [RouterTestingModule.withRoutes([])],
    schemas: [NO_ERRORS_SCHEMA]//this ignore any component o directive that angular doesnt know about
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Must have a router-outlet',()=>{
    const fixture = TestBed.createComponent(AppComponent);
    const debugElement = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(debugElement).not.toBeNull();
  });


});
