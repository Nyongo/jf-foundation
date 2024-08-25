import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterServicesComponent } from './water-services.component';

describe('WaterServicesComponent', () => {
  let component: WaterServicesComponent;
  let fixture: ComponentFixture<WaterServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaterServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaterServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
