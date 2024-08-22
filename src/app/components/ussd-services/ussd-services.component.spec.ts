import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UssdServicesComponent } from './ussd-services.component';

describe('UssdServicesComponent', () => {
  let component: UssdServicesComponent;
  let fixture: ComponentFixture<UssdServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UssdServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UssdServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
