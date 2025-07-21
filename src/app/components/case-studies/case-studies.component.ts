import { Component, OnInit, HostListener } from '@angular/core';
import { CaseStudiesPageService } from '../../services/case-studies-page.service';
import { Banner, CaseStudy, Cta } from '../../models/case-study.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-case-studies',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './case-studies.component.html',
  styleUrls: ['./case-studies.component.scss'],
})
export class CaseStudiesComponent implements OnInit {
  banner?: Banner;
  studies: CaseStudy[] = [];
  cta?: Cta;

  loadingBanner = true;
  loadingStudies = true;
  loadingNext = false;
  error = false;

  // pagination state
  pageSize = 5;
  currentPage = 1;
  total = 0;

  constructor(
    private pageSvc: CaseStudiesPageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Load banner & CTA
    this.pageSvc.getBanner().subscribe(b => {
      this.banner = b;
      this.loadingBanner = false;
    });
    this.pageSvc.getCta().subscribe(c => (this.cta = c));

    // load first page
    this.loadPage(1);
  }

  private loadPage(page: number) {
    this.loadingStudies = page === 1;
    this.loadingNext = page !== 1;
    this.pageSvc.getPage(page, this.pageSize).subscribe({
      next: ({ items, total }) => {
        this.total = total;
        if (page === 1) {
          this.studies = items;
        } else {
          this.studies = [...this.studies, ...items];
        }
        console.log(this.studies);
        this.currentPage = page;
        this.loadingStudies = false;
        this.loadingNext = false;
      },
      error: () => {
        this.error = true;
        this.loadingStudies = false;
        this.loadingNext = false;
      },
    });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (this.loadingNext || this.studies.length >= this.total) return;

    const threshold = 200; // px from bottom
    const pos = window.pageYOffset + window.innerHeight;
    const height = document.documentElement.scrollHeight;

    if (pos >= height - threshold) {
      this.loadPage(this.currentPage + 1);
    }
  }

  goTo(link: any) {
    this.router.navigate([link]);
  }
}
