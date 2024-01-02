import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBarHorizontalComponent } from './chart-bar-horizontal.component';

describe('ChartBarHorizontalComponent', () => {
  let component: ChartBarHorizontalComponent;
  let fixture: ComponentFixture<ChartBarHorizontalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartBarHorizontalComponent]
    });
    fixture = TestBed.createComponent(ChartBarHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
