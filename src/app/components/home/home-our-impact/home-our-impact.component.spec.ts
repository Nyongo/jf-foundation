import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOurImpactComponent } from './home-our-impact.component';

describe('HomeOurImpactComponent', () => {
  let component: HomeOurImpactComponent;
  let fixture: ComponentFixture<HomeOurImpactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeOurImpactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeOurImpactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
