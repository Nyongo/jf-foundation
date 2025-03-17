import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudyDetailComponent } from './case-study-detail.component';

describe('CaseStudyDetailComponent', () => {
  let component: CaseStudyDetailComponent;
  let fixture: ComponentFixture<CaseStudyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseStudyDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseStudyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
