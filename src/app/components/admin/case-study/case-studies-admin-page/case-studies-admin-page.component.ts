import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { AdminCaseStudiesPageService } from '../../../../services/admin-case-studies-page.service';
import { Banner, CaseStudy, Cta, Stat } from '../../../../models/case-study.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-case-studies-admin-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './case-studies-admin-page.component.html',
  styleUrls: ['./case-studies-admin-page.component.scss'],
})
export class CaseStudiesAdminPageComponent implements OnInit {
  // Banner (page‑level)
  bannerForm!: FormGroup;
  bannerSubmitting = false;
  showImageError = false;
  imageErrorMessage = '';

  // Studies + pagination
  studies: CaseStudy[] = [];
  pageSize = 5;
  currentPage = 1;
  total = 0;

  // Modal (create/edit/view)
  modalForm!: FormGroup;
  modalMode: 'view' | 'edit' | 'create' = 'view';
  activeStudy?: CaseStudy;
  showModal = false;
  modalSubmitting = false;

  // Delete confirmation
  showDeleteModal = false;
  deleteTarget?: CaseStudy;
  deleteSubmitting = false;

  // Page‑level CTA
  ctaForm!: FormGroup;
  ctaSubmitting = false;

  // Operation result modal
  showResultModal = false;
  resultMessage = '';

  @ViewChild('modalTpl', { static: true }) modalTpl!: TemplateRef<any>;

  constructor(
    private svc: AdminCaseStudiesPageService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    // --- Banner form ---
    this.bannerForm = this.fb.group({
      eyebrow: ['', Validators.required],
      headline: ['', Validators.required],
      subtitle: [''],
      imageUrl: [''],     // preview only
      bannerFile: [null], // raw File
    });
    this.svc.getBanner().subscribe(b => this.bannerForm.patchValue(b));

    // --- Page CTA form ---
    this.ctaForm = this.fb.group({
      title:       ['', Validators.required],
      description: ['', Validators.required],
      buttonText:  ['', Validators.required],
      buttonRoute: ['', Validators.required],
    });
    this.svc.getCta().subscribe(c => this.ctaForm.patchValue(c));

    // --- Modal form ---
    this.modalForm = this.fb.group({
      order:       [0, Validators.required],
      title:       ['', Validators.required],
      description: ['', Validators.required],
      isActive:    [true],
      stats:       this.fb.array([], Validators.required),
      // no link/id here—backend generates those
    });

    // Load first page
    this.loadPage(1);
  }

  // Banner file chooser
  onBannerFileSelected(evt: Event) {
    const inp = evt.target as HTMLInputElement;
    if (!inp.files?.length) return;
    const file = inp.files[0];
    if (file.size > 5 * 1024 * 1024) {
      this.imageErrorMessage =
        'Images above 5 MB are not allowed. Please compress your image and try again.';
      this.showImageError = true;
      inp.value = '';
      return;
    }
    this.bannerForm.patchValue({ bannerFile: file });
    const reader = new FileReader();
    reader.onload = () =>
      this.bannerForm.patchValue({ imageUrl: reader.result as string });
    reader.readAsDataURL(file);
  }
  removeBannerImage() { this.bannerForm.patchValue({ imageUrl: '', bannerFile: null }); }
  closeImageError() { this.showImageError = false; }

  saveBanner() {
    if (this.bannerForm.invalid) return;
    this.bannerSubmitting = true;
    const { eyebrow, headline, subtitle, imageUrl } = this.bannerForm.value;
    this.svc.saveBanner({ eyebrow, headline, subtitle, imageUrl }).subscribe({
      next: () => (this.resultMessage = 'Banner saved successfully.'),
      error: () => (this.resultMessage = 'Failed to save banner.'),
      complete: () => {
        this.bannerSubmitting = false;
        this.showResultModal = true;
      },
    });
  }

  // Pagination loader
  loadPage(page: number) {
    this.currentPage = page;
    this.svc.getPage(page, this.pageSize).subscribe(({ items, total }) => {
      this.studies = items;
      this.total = total;
    });
  }

  get totalPages(): number { return Math.ceil(this.total / this.pageSize); }
  get pages(): number[]   { return Array.from({ length: this.totalPages }, (_, i) => i + 1); }

  // Open / close modal
  openModal(mode: 'create' | 'edit' | 'view', study?: CaseStudy) {
    this.modalMode = mode;
    this.modalForm.reset();
    this.clearStats();
    this.modalSubmitting = false;

    if (study) {
      this.activeStudy = study;
      // patch only the writeable fields
      this.modalForm.patchValue({
        order:    study.order,
        title:    study.title,
        description: study.description,
        isActive: study.isActive,
      });
      study.stats.forEach(s => this.addStat(s));
    } else {
      this.activeStudy = undefined;
      // start with three blank stats
      this.addStat({ value: '', label: '' });
      this.addStat({ value: '', label: '' });
      this.addStat({ value: '', label: '' });
    }

    this.showModal = true;
  }
  closeModal() { this.showModal = false; }

  // Stats array helpers
  get stats(): FormArray { return this.modalForm.get('stats') as FormArray; }
  addStat(s: Stat) {
    this.stats.push(this.fb.group({
      value: [s.value, Validators.required],
      label: [s.label, Validators.required],
    }));
  }
  clearStats() {
    while (this.stats.length) { this.stats.removeAt(0); }
  }

  // Create / update
  saveStudy() {
    if (this.modalForm.invalid) return;
    this.modalSubmitting = true;

    const payload = {
      ...this.modalForm.value,
      stats: this.modalForm.value.stats as Stat[],
    };

    let op$;
    if (this.modalMode === 'create') {
      op$ = this.svc.create(payload);
    } else {  // edit
      op$ = this.svc.update(this.activeStudy!.id, payload);
    }

    op$.subscribe({
      next: () => {
        this.resultMessage =
          this.modalMode === 'create'
            ? 'Case study created successfully.'
            : 'Case study updated successfully.';
      },
      error: () => {
        this.resultMessage =
          this.modalMode === 'create'
            ? 'Failed to create case study.'
            : 'Failed to update case study.';
      },
      complete: () => {
        this.modalSubmitting = false;
        this.showResultModal = true;
        this.closeModal();
        this.loadPage(this.currentPage);
      },
    });
  }

  // Delete
  confirmDelete(s: CaseStudy) {
    this.deleteTarget = s;
    this.deleteSubmitting = false;
    this.showDeleteModal = true;
  }
  cancelDelete() { this.showDeleteModal = false; }
  deleteStudy() {
    if (!this.deleteTarget) return;
    this.deleteSubmitting = true;
    this.svc.delete(this.deleteTarget.id).subscribe({
      next: () => (this.resultMessage = 'Case study deleted successfully.'),
      error: () => (this.resultMessage = 'Failed to delete case study.'),
      complete: () => {
        this.deleteSubmitting = false;
        this.showDeleteModal = false;
        this.showResultModal = true;
        this.loadPage(this.currentPage);
      },
    });
  }

  // Page‑level CTA
  saveCta() {
    if (this.ctaForm.invalid) return;
    this.ctaSubmitting = true;
    this.svc.saveCta(this.ctaForm.value).subscribe({
      next: () => (this.resultMessage = 'CTA saved successfully.'),
      error: () => (this.resultMessage = 'Failed to save CTA.'),
      complete: () => {
        this.ctaSubmitting = false;
        this.showResultModal = true;
      },
    });
  }

  closeResultModal() { this.showResultModal = false; }

  // Navigate to sections admin
  onSections(study: CaseStudy) {
    this.router.navigate(['/admin/case-studies', study.id, 'sections']);
  }
}
