import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AdminNewsletterPageService } from '../../services/admin-newsletter-page.service';
import { Banner, Newsletter, Cta } from '../../models/newsletter.model';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
})
export class NewsletterComponent implements OnInit {
  // Subscribe form
  newsletterForm: FormGroup;
  submitted = false;
  success = false;

  // Dynamic content
  banner: Banner = { eyebrow: '', headline: '', subtitle: '', imageUrl: '' };
  newsletters: Newsletter[] = [];
  pageSize = 9;
  currentPage = 1;
  total = 0;

  // CTA
  cta?: Cta;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private svc: AdminNewsletterPageService
  ) {
    this.newsletterForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      organization: [''],
      interests: ['', Validators.required],
    });
  }

  get f() {
    return this.newsletterForm.controls;
  }

  ngOnInit() {
    // Load banner
    this.svc.getBanner().subscribe((b) => (this.banner = b));

    // Load first page
    this.loadPage(1);

    // Load CTA (only if fully populated)
    this.svc.getCta().subscribe((c) => {
      if (c.title && c.buttonText && c.buttonLink) {
        this.cta = c;
      }
    });
  }

  private loadPage(page: number) {
    // Allow first fetch always; afterwards guard against page > totalPages
    if (this.total > 0 && page > this.totalPages) {
      return;
    }

    this.svc.getPage(page, this.pageSize).subscribe(({ items, total }) => {
      if (page === 1) {
        // Reset on first page
        this.newsletters = [...items];
      } else {
        // Append on subsequent pages
        this.newsletters.push(...items);
      }
      this.total = total;
      this.currentPage = page;
    });
  }

  get totalPages(): number {
    return Math.ceil(this.total / this.pageSize);
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollPos = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 200;
    if (scrollPos >= threshold && this.currentPage < this.totalPages) {
      this.loadPage(this.currentPage + 1);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.newsletterForm.valid) {
      console.log(this.newsletterForm.value);
      this.success = true;
    }
  }

  viewNewsletter(id: string) {
    this.router.navigate(['/newsletters', id]);
  }
}
