import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactStatsComponent } from './impact-stats.component';

describe('ImpactStatsComponent', () => {
  let component: ImpactStatsComponent;
  let fixture: ComponentFixture<ImpactStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImpactStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpactStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
