import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AdminCaseStudySectionsService } from '../../../../services/admin-case-study-sections.service';
import {
  CaseStudySection,
  SectionType,
  SectionDataBanner,
  SectionDataContent,
} from '../../../../models/case-study-section.model';
import { Cta } from '../../../../models/case-study.model';
import { AdminCaseStudiesPageService } from '../../../../services/admin-case-studies-page.service';
import { ActivatedRoute } from '@angular/router';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-case-study-sections-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DragDropModule],
  templateUrl: './case-study-sections-admin.component.html',
  styleUrls: ['./case-study-sections-admin.component.scss'],
})
export class CaseStudySectionsAdminComponent implements OnInit {
  public SectionType: SectionType = 'banner';

  caseStudyId!: string;
  caseStudyTitle = '';
  sections: CaseStudySection[] = [];

  // CTA form
  ctaForm!: FormGroup;
  ctaSubmitting = false;

  // Section modal
  modalForm!: FormGroup;
  modalMode: 'create' | 'edit' = 'create';
  activeSection?: CaseStudySection;
  showModal = false;
  submitting = false;

  // Live preview & oversize warning
  mediaPreviewUrl: string | null = null;
  showOversizeModal = false;
  private readonly MAX_FILE_SIZE = 5 * 1024 * 1024;

  // Delete confirmation
  showDeleteModal = false;
  deleteTarget?: CaseStudySection;
  deleting = false;

  // Operation result
  showResult = false;
  resultMsg = '';

  constructor(
    private svc: AdminCaseStudySectionsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private studiesSvc: AdminCaseStudiesPageService
  ) {}

  ngOnInit() {
    // load caseStudyId and title
    this.caseStudyId = this.route.snapshot.paramMap.get('caseStudyId')!;
    this.studiesSvc.getOne(this.caseStudyId)
      .subscribe(cs => this.caseStudyTitle = cs?.title || '');

    // CTA
    this.ctaForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      buttonText: ['', Validators.required],
      buttonRoute: ['', Validators.required],
    });
    this.svc.getCta(this.caseStudyId).subscribe(c => this.ctaForm.patchValue(c));

    // sections list
    this.loadAll();

    // modal form
    this.modalForm = this.fb.group({
      type: ['banner', Validators.required],
      order: [0, Validators.required],
      isActive: [true],
      eyebrow: [''],
      headline: [''],
      subtitle: [''],
      title: [''],
      description: [''],
      column2Description: [''],
      imagePosition: ['left'],
      divider: [false],
      intro: [''],
      outro: [''],
      imageUrl: [''],
    });

    this.modalForm.get('type')!.valueChanges.subscribe(t => this.adjustValidators(t));
    this.modalForm.get('divider')!.valueChanges.subscribe(() => this.onDividerToggle());
    this.adjustValidators('banner');
  }

  private loadAll() {
    this.svc.getAll(this.caseStudyId).subscribe(arr => this.sections = arr);
  }

  private adjustValidators(type: SectionType) {
    const M = this.modalForm;
    ['eyebrow','headline','title','description','column2Description']
      .forEach(k => M.get(k)!.clearValidators());

    if (type === 'banner') {
      M.get('eyebrow')!.setValidators(Validators.required);
      M.get('headline')!.setValidators(Validators.required);
    } else {
      M.get('title')!.setValidators(Validators.required);
      M.get('description')!.setValidators(Validators.required);
      if (M.value.divider) {
        M.get('column2Description')!.setValidators(Validators.required);
      }
    }

    // Only update validity—do not clear media here
    Object.keys(M.controls).forEach(k => M.get(k)!.updateValueAndValidity());
  }

  private onDividerToggle() {
    const ctrl = this.modalForm.get('column2Description')!;
    if (this.modalForm.value.divider) {
      ctrl.setValidators(Validators.required);
    } else {
      ctrl.clearValidators();
    }
    ctrl.updateValueAndValidity();
  }

  onMediaSelected(e: Event) {
    const inp = e.target as HTMLInputElement;
    if (!inp.files?.length) {
      this.removeMedia();
      return;
    }
    const file = inp.files[0];
    if (file.size > this.MAX_FILE_SIZE) {
      this.showOversizeModal = true;
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      this.mediaPreviewUrl = dataUrl;
      this.modalForm.patchValue({ imageUrl: dataUrl });
    };
    reader.readAsDataURL(file);
  }

  removeMedia() {
    this.mediaPreviewUrl = null;
    this.modalForm.patchValue({ imageUrl: '' });
  }

  openModal(mode: 'create' | 'edit', sec?: CaseStudySection) {
    this.modalMode = mode;
    this.activeSection = sec;
    this.submitting = false;

    if (mode === 'create') {
      this.mediaPreviewUrl = null;
      this.modalForm.reset({
        type: 'banner',
        order: this.sections.length,
        isActive: true,
        imageUrl: ''
      });
    } else {
      const d = sec!.data as any;
      this.modalForm.reset({
        type: sec!.type,
        order: sec!.order,
        isActive: sec!.isActive,
        eyebrow: d.eyebrow,
        headline: d.headline,
        subtitle: d.subtitle,
        title: d.title,
        description: d.description,
        column2Description: d.column2Description,
        imagePosition: d.imagePosition,
        divider: d.divider,
        intro: d.intro,
        outro: d.outro,
        imageUrl: d.imageUrl || ''
      });
      this.mediaPreviewUrl = d.imageUrl || null;
    }

    this.adjustValidators(this.modalForm.value.type);
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.showOversizeModal = false;
  }

  saveSection() {
    if (this.modalForm.invalid) return;
    this.submitting = true;
    const v = this.modalForm.value;
    let data: SectionDataBanner|SectionDataContent;

    if (v.type === 'banner') {
      data = {
        eyebrow: v.eyebrow,
        headline: v.headline,
        subtitle: v.subtitle,
        imageUrl: v.imageUrl,
      };
    } else {
      data = {
        title: v.title,
        description: v.description,
        column2Description: v.divider ? v.column2Description : undefined,
        imagePosition: v.imagePosition,
        divider: v.divider,
        intro: v.intro,
        outro: v.outro,
        imageUrl: v.imageUrl,
      } as SectionDataContent;
    }

    const dto = {
      caseStudyId: this.caseStudyId,
      type: v.type,
      order: v.order,
      isActive: v.isActive,
      data,
    };

    const op = this.modalMode === 'create'
      ? this.svc.create(this.caseStudyId, dto)
      : this.svc.update(this.caseStudyId, this.activeSection!.id, dto);

    op.subscribe({
      next: () => {
        this.resultMsg = this.modalMode==='create' ? 'Section created' : 'Section updated';
        this.showResult = true;
        this.loadAll();
      },
      complete: () => {
        this.submitting = false;
        this.closeModal();
      },
      error: () => {
        this.submitting = false;
        this.closeModal();
        this.resultMsg = 'Operation failed';
        this.showResult = true;
      }
    });
  }

  saveCta() {
    if (this.ctaForm.invalid) return;
    this.ctaSubmitting = true;
    this.svc.saveCta(this.caseStudyId, this.ctaForm.value as Cta).subscribe({
      next: () => { this.resultMsg = 'CTA saved successfully'; this.showResult = true; },
      complete: () => this.ctaSubmitting = false,
      error:   () => { this.ctaSubmitting = false; this.resultMsg = 'Failed to save CTA'; this.showResult = true; }
    });
  }

  confirmDelete(sec: CaseStudySection) {
    this.deleteTarget = sec;
    this.deleting = false;
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.deleteTarget = undefined;
  }

  deleteSection() {
    if (!this.deleteTarget) return;
    this.deleting = true;
    this.svc.delete(this.caseStudyId, this.deleteTarget.id).subscribe({
      next: () => { this.resultMsg = 'Section deleted'; this.showResult = true; this.loadAll(); },
      complete: () => { this.deleting = false; this.showDeleteModal = false; },
      error:   () => { this.deleting = false; this.showDeleteModal = false; this.resultMsg = 'Delete failed'; this.showResult = true; }
    });
  }

  drop(evt: CdkDragDrop<CaseStudySection[]>) {
    moveItemInArray(this.sections, evt.previousIndex, evt.currentIndex);
    this.sections.forEach((s,i) => s.order = i);
    this.svc.reorder(this.caseStudyId, this.sections).subscribe();
  }

  closeResult() {
    this.showResult = false;
  }
}
