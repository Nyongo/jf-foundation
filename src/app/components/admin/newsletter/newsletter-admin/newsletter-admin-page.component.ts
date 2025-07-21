import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AdminNewsletterPageService } from '../../../../services/admin-newsletter-page.service';
import { Newsletter, Banner, Cta } from '../../../../models/newsletter.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newsletter-admin-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './newsletter-admin-page.component.html',
  styleUrls: ['./newsletter-admin-page.component.scss'],
})
export class NewsletterAdminPageComponent implements OnInit {
  // Banner / CTA forms
  bannerForm!: FormGroup;
  ctaForm!: FormGroup;
  bannerSubmitting = false;
  ctaSubmitting = false;

  // Banner preview
  bannerPreviewUrl: string | null = null;
  readonly MAX_BANNER_SIZE = 5 * 1024 * 1024;
  showOversizeBannerModal = false;

  // Result modal
  showResultModal = false;
  resultMessage = '';

  // Newsletter table
  items: Newsletter[] = [];
  pageSize = 5;
  currentPage = 1;
  total = 0;

  // Delete confirmation
  showDeleteModal = false;
  deleteTarget?: Newsletter;
  deleting = false;

  // Modal (create/edit/view)
  modalForm!: FormGroup;
  modalMode: 'create' | 'edit' | 'view' = 'view';
  active?: Newsletter;
  showModal = false;
  submitting = false;

  // Item image preview
  previewUrl: string | null = null;
  readonly MAX_IMAGE_SIZE = 5 * 1024 * 1024;

  constructor(
    private svc: AdminNewsletterPageService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    // Banner form
    this.bannerForm = this.fb.group({
      eyebrow: ['', Validators.required],
      headline: ['', Validators.required],
      subtitle: [''],
      imageUrl: [''],
    });
    this.svc.getBanner().subscribe(b => {
      this.bannerForm.patchValue(b);
      this.bannerPreviewUrl = b.imageUrl || null;
    });

    // CTA form
    this.ctaForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      buttonText: ['', Validators.required],
      buttonLink: ['', Validators.required],
    });
    this.svc.getCta().subscribe(c => this.ctaForm.patchValue(c));

    // Table
    this.loadPage(1);

    // Modal form (no buttonLink!)
    this.modalForm = this.fb.group({
      order:    [0, Validators.required],
      title:    ['', Validators.required],
      date:     ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      buttonText:  ['', Validators.required],
      imageUrl:    [''],
      isActive:    [true],
    });
  }

  // Banner handlers
  onBannerFile(evt: Event) {
    const inp = evt.target as HTMLInputElement;
    if (!inp.files?.length) return;
    const file = inp.files[0];
    if (file.size > this.MAX_BANNER_SIZE) {
      this.showOversizeBannerModal = true;
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.bannerPreviewUrl = reader.result as string;
      this.bannerForm.patchValue({ imageUrl: this.bannerPreviewUrl });
    };
    reader.readAsDataURL(file);
  }
  removeBannerFile() {
    this.bannerPreviewUrl = null;
    this.bannerForm.patchValue({ imageUrl: '' });
  }
  saveBanner() {
    if (this.bannerForm.invalid) return;
    this.bannerSubmitting = true;
    this.svc.saveBanner(this.bannerForm.value).subscribe({
      next:    () => this.resultMessage = 'Banner saved successfully.',
      error:   () => this.resultMessage = 'Failed to save banner.',
      complete: () => {
        this.bannerSubmitting = false;
        this.showResultModal = true;
      }
    });
  }

  // CTA
  saveCta() {
    if (this.ctaForm.invalid) return;
    this.ctaSubmitting = true;
    this.svc.saveCta(this.ctaForm.value).subscribe({
      next:    () => this.resultMessage = 'CTA saved successfully.',
      error:   () => this.resultMessage = 'Failed to save CTA.',
      complete: () => {
        this.ctaSubmitting = false;
        this.showResultModal = true;
      }
    });
  }

  // Pagination
  loadPage(p: number) {
    this.currentPage = p;
    this.svc.getPage(p, this.pageSize).subscribe(({ items, total }) => {
      this.items = items;
      this.total = total;
    });
  }
  get totalPages(): number {
    return Math.ceil(this.total / this.pageSize);
  }
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // Delete
  confirmDelete(it: Newsletter) {
    this.deleteTarget = it;
    this.deleting = false;
    this.showDeleteModal = true;
  }
  cancelDelete() {
    this.showDeleteModal = false;
    this.deleteTarget = undefined;
  }
  deleteNewsletter() {
    if (!this.deleteTarget) return;
    this.deleting = true;
    this.svc.delete(this.deleteTarget.id).subscribe({
      next:    () => this.resultMessage = 'Newsletter deleted successfully.',
      error:   () => this.resultMessage = 'Failed to delete newsletter.',
      complete: () => {
        this.deleting = false;
        this.showDeleteModal = false;
        this.showResultModal = true;
        this.loadPage(this.currentPage);
      }
    });
  }

  // Modal open/close
  openModal(mode: 'create' | 'edit' | 'view', it?: Newsletter) {
    this.modalMode = mode;
    this.active = it;
    this.previewUrl = null;
    this.modalForm.reset({ isActive: true, order: this.items.length });
    if (it) {
      const { id, createdAt, updatedAt, buttonLink, ...rest } = it;
      this.modalForm.patchValue(rest);
      this.previewUrl = rest.imageUrl || null;
    }
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }

  // Item image handlers
  onFile(evt: Event) {
    const inp = evt.target as HTMLInputElement;
    if (!inp.files?.length) return;
    const f = inp.files[0];
    if (f.size > this.MAX_IMAGE_SIZE) {
      alert('Images over 5 MB are not allowed.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
      this.modalForm.patchValue({ imageUrl: this.previewUrl });
    };
    reader.readAsDataURL(f);
  }
  removeFile() {
    this.previewUrl = null;
    this.modalForm.patchValue({ imageUrl: '' });
  }

  // Create / update (no longer passes buttonLink)
  save() {
    if (this.modalForm.invalid) return;
    this.submitting = true;
    const dto = this.modalForm.value as Omit<Newsletter, 'id' | 'createdAt' | 'updatedAt'>;
    const op = this.modalMode === 'create'
      ? this.svc.create(dto)
      : this.svc.update(this.active!.id, dto);
    op.subscribe({
      next:    () => {
        this.resultMessage = this.modalMode === 'create'
          ? 'Newsletter created successfully.'
          : 'Newsletter updated successfully.';
      },
      error:   () => {
        this.resultMessage = this.modalMode === 'create'
          ? 'Failed to create newsletter.'
          : 'Failed to update newsletter.';
      },
      complete: () => {
        this.submitting = false;
        this.showModal = false;
        this.showResultModal = true;
        this.loadPage(this.currentPage);
      }
    });
  }

  // Sections nav
  toSections(it: Newsletter) {
    this.router.navigate(['/admin/newsletters', it.id, 'sections']);
  }

  // Close result
  closeResultModal() {
    this.showResultModal = false;
  }
}
