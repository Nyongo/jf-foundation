import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetServicesComponent } from './internet-services.component';

describe('InternetServicesComponent', () => {
  let component: InternetServicesComponent;
  let fixture: ComponentFixture<InternetServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternetServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InternetServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
