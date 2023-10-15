import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationServiceComponent } from './translation-service.component';

describe('TranslationServiceComponent', () => {
  let component: TranslationServiceComponent;
  let fixture: ComponentFixture<TranslationServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TranslationServiceComponent]
    });
    fixture = TestBed.createComponent(TranslationServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
