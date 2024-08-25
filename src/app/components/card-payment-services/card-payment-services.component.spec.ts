import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPaymentServicesComponent } from './card-payment-services.component';

describe('CardPaymentServicesComponent', () => {
  let component: CardPaymentServicesComponent;
  let fixture: ComponentFixture<CardPaymentServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPaymentServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPaymentServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
