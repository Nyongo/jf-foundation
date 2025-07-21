// src/app/services/admin-case-study-sections.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CaseStudySection,
} from '../models/case-study-section.model';
import { Cta } from '../models/case-study.model';

@Injectable({ providedIn: 'root' })
export class AdminCaseStudySectionsService {
  private readonly BASE = '/jf/case-studies';

  constructor(private readonly http: HttpClient) {}

  /** Fetch all sections */
  getAll(caseStudyId: string): Observable<CaseStudySection[]> {
    return this.http.get<CaseStudySection[]>(
      `${this.BASE}/${caseStudyId}/sections`
    );
  }

  /** Create a new section (with optional media) */
  create(
    caseStudyId: string,
    dto: Omit<CaseStudySection, 'id' | 'createdAt' | 'updatedAt' | 'media'>,
    mediaFiles: File[] = []
  ): Observable<CaseStudySection> {
    const form = new FormData();
    form.append('order', dto.order.toString());
    form.append('type', dto.type);
    form.append('data', JSON.stringify(dto.data));
    mediaFiles.forEach(f => form.append('mediaFiles', f, f.name));
    return this.http.post<CaseStudySection>(
      `${this.BASE}/${caseStudyId}/sections`,
      form
    );
  }

  /** Update an existing section (with optional new media) */
  update(
    caseStudyId: string,
    id: string,
    dto: Partial<Omit<CaseStudySection, 'id' | 'caseStudyId' | 'createdAt' | 'media'>>,
    mediaFiles: File[] = []
  ): Observable<CaseStudySection> {
    const form = new FormData();
    if (dto.order !== undefined) form.append('order', dto.order.toString());
    if (dto.type)          form.append('type', dto.type);
    if (dto.data)          form.append('data', JSON.stringify(dto.data));
    mediaFiles.forEach(f => form.append('mediaFiles', f, f.name));
    return this.http.put<CaseStudySection>(
      `${this.BASE}/${caseStudyId}/sections/${id}`,
      form
    );
  }

  /** Reorder sections */
  reorder(
    caseStudyId: string,
    sections: { id: string; order: number }[]
  ): Observable<CaseStudySection[]> {
    return this.http.patch<CaseStudySection[]>(
      `${this.BASE}/${caseStudyId}/sections/reorder`,
      { caseStudyId, sections }
    );
  }

  /** Delete a section */
  delete(caseStudyId: string, id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.BASE}/${caseStudyId}/sections/${id}`
    );
  }

  /** — Per‐item CTA — */

  /** Fetch the CTA for a given case study */
  getCta(caseStudyId: string): Observable<Cta> {
    return this.http.get<Cta>(
      `${this.BASE}/${caseStudyId}/cta`
    );
  }

  /** Save (create or update) the CTA for a given case study */
  saveCta(caseStudyId: string, cta: Cta): Observable<void> {
    return this.http.put<void>(
      `${this.BASE}/${caseStudyId}/cta`,
      cta
    );
  }
}
