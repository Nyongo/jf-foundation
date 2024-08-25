import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraudGuardComponent } from './fraud-guard.component';

describe('FraudGuardComponent', () => {
  let component: FraudGuardComponent;
  let fixture: ComponentFixture<FraudGuardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FraudGuardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FraudGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
