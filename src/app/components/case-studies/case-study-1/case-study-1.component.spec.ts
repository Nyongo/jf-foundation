import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudy1Component } from './case-study-1.component';

describe('CaseStudy1Component', () => {
  let component: CaseStudy1Component;
  let fixture: ComponentFixture<CaseStudy1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseStudy1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseStudy1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
