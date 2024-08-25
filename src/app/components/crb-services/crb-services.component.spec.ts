import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrbServicesComponent } from './crb-services.component';

describe('CrbServicesComponent', () => {
  let component: CrbServicesComponent;
  let fixture: ComponentFixture<CrbServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrbServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrbServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
