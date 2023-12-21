import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchsComponent } from './searchs.component';

describe('SearchsComponent', () => {
  let component: SearchsComponent;
  let fixture: ComponentFixture<SearchsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchsComponent]
    });
    fixture = TestBed.createComponent(SearchsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
