import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagingServicesComponent } from './messaging-services.component';

describe('MessagingServicesComponent', () => {
  let component: MessagingServicesComponent;
  let fixture: ComponentFixture<MessagingServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagingServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessagingServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
