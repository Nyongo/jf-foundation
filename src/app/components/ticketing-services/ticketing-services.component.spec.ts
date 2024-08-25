import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketingServicesComponent } from './ticketing-services.component';

describe('TicketingServicesComponent', () => {
  let component: TicketingServicesComponent;
  let fixture: ComponentFixture<TicketingServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketingServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketingServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
