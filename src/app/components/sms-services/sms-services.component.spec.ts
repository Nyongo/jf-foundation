import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsServicesComponent } from './sms-services.component';

describe('SmsServicesComponent', () => {
  let component: SmsServicesComponent;
  let fixture: ComponentFixture<SmsServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmsServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
