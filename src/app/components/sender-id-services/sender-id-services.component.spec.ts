import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderIdServicesComponent } from './sender-id-services.component';

describe('SenderIdServicesComponent', () => {
  let component: SenderIdServicesComponent;
  let fixture: ComponentFixture<SenderIdServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SenderIdServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SenderIdServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
