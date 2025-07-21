import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AdminCaseStudySectionsService } from '../../../services/admin-case-study-sections.service';
import {
  CaseStudySection,
  SectionType,
  SectionDataBanner,
  SectionDataContent,
} from '../../../models/case-study-section.model';
import { Cta } from '../../../models/case-study.model';

@Component({
  selector: 'app-case-study-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './case-study-detail.component.html',
  styleUrls: ['./case-study-detail.component.scss'],
})
export class CaseStudyDetailComponent implements OnInit {
  /** Expose SectionType for template checks */
  public SectionType: SectionType = 'banner';

  caseStudyId!: string;
  sections: CaseStudySection[] = [];
  pageCta?: Cta;

  constructor(
    private route: ActivatedRoute,
    private svc: AdminCaseStudySectionsService
  ) {}

  ngOnInit() {
    this.caseStudyId = this.route.snapshot.paramMap.get('id')!;

    this.svc.getAll(this.caseStudyId).subscribe((all) => {
      this.sections = all; // already ordered
    });

    this.svc.getCta(this.caseStudyId).subscribe((c) => {
      this.pageCta = c;
    });
  }
}
