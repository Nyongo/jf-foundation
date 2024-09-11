import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsMarqueueComponent } from './clients-marqueue.component';

describe('ClientsMarqueueComponent', () => {
  let component: ClientsMarqueueComponent;
  let fixture: ComponentFixture<ClientsMarqueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsMarqueueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientsMarqueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
