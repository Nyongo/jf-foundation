import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudy2Component } from './case-study-2.component';

describe('CaseStudy2Component', () => {
  let component: CaseStudy2Component;
  let fixture: ComponentFixture<CaseStudy2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseStudy2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseStudy2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
