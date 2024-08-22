import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaytvServicesComponent } from './paytv-services.component';

describe('PaytvServicesComponent', () => {
  let component: PaytvServicesComponent;
  let fixture: ComponentFixture<PaytvServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaytvServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaytvServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
