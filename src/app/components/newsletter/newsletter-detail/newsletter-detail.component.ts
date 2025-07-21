import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AdminNewsletterSectionsService } from '../../../services/admin-newsletter-sections.service';
import {
  NewsletterSection,
  SectionType,
} from '../../../models/newsletter.model';
import { Cta } from '../../../models/newsletter.model';

@Component({
  selector: 'app-newsletter-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './newsletter-detail.component.html',
  styleUrls: ['./newsletter-detail.component.scss'],
})
export class NewsletterDetailComponent implements OnInit {
  /** Expose SectionType for structural checks */
  public SectionType: SectionType = 'banner';

  newsletterId!: string;
  sections: NewsletterSection[] = [];
  pageCta?: Cta;

  constructor(
    private route: ActivatedRoute,
    private svc: AdminNewsletterSectionsService
  ) {}

  ngOnInit() {
    // Grab the newsletter ID from the route
    this.newsletterId = this.route.snapshot.paramMap.get('id')!;

    // Load and order its sections
    this.svc.getAll(this.newsletterId).subscribe((all) => {
      this.sections = all;
    });

    // Load the per‑newsletter CTA
    this.svc.getCta(this.newsletterId).subscribe((c) => {
      // Only show if fully populated
      if (c.title && c.buttonText && c.buttonLink) {
        this.pageCta = c;
      }
    });
  }
}
