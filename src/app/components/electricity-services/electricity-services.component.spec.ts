import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricityServicesComponent } from './electricity-services.component';

describe('ElectricityServicesComponent', () => {
  let component: ElectricityServicesComponent;
  let fixture: ComponentFixture<ElectricityServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectricityServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElectricityServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
