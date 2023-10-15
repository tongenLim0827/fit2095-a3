import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsG1Component } from './statistics-g1.component';

describe('StatisticsG1Component', () => {
  let component: StatisticsG1Component;
  let fixture: ComponentFixture<StatisticsG1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticsG1Component]
    });
    fixture = TestBed.createComponent(StatisticsG1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
