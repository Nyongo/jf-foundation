import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycServicesComponent } from './kyc-services.component';

describe('KycServicesComponent', () => {
  let component: KycServicesComponent;
  let fixture: ComponentFixture<KycServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KycServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KycServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
