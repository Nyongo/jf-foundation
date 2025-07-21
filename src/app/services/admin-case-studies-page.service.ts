import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Banner, CaseStudy, Cta } from '../models/case-study.model';

interface Paginated<T> {
  items: T[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class AdminCaseStudiesPageService {
  private readonly BASE = '/jf/case-studies';
  private readonly PAGE = '/jf/page/case-studies';

  constructor(private readonly http: HttpClient) {}

  // — Listing page banner & CTA —
  getBanner(): Observable<Banner> {
    return this.http.get<Banner>(`${this.PAGE}/banner`);
  }
  saveBanner(b: Banner): Observable<Banner> {
    return this.http.put<Banner>(`${this.PAGE}/banner`, b);
  }
  getCta(): Observable<Cta> {
    return this.http.get<Cta>(`${this.PAGE}/cta`);
  }
  saveCta(c: Cta): Observable<Cta> {
    return this.http.put<Cta>(`${this.PAGE}/cta`, c);
  }

  // — Case studies CRUD + pagination —
  getPage(page: number, size: number): Observable<Paginated<CaseStudy>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Paginated<CaseStudy>>(this.BASE, { params });
  }

  getOne(id: string): Observable<CaseStudy> {
    return this.http.get<CaseStudy>(`${this.BASE}/${id}`);
  }

  create(payload: {
    order: number;
    title: string;
    description: string;
    stats: any[];
    isActive: boolean;
    bannerFile?: File;
  }): Observable<CaseStudy & { bannerDataUrl?: string }> {
    const form = new FormData();
    form.append('order', payload.order.toString());
    form.append('title', payload.title);
    form.append('description', payload.description);
    form.append('stats', JSON.stringify(payload.stats));
    form.append('isActive', payload.isActive.toString());
    if (payload.bannerFile) {
      form.append('bannerFile', payload.bannerFile, payload.bannerFile.name);
    }
    return this.http.post<CaseStudy & { bannerDataUrl?: string }>(
      this.BASE,
      form
    );
  }

  update(
    id: string,
    payload: Partial<{
      order: number;
      title: string;
      description: string;
      stats: any[];
      isActive: boolean;
      bannerFile?: File;
    }>
  ): Observable<CaseStudy & { bannerDataUrl?: string }> {
    const form = new FormData();
    if (payload.order !== undefined) {
      form.append('order', payload.order.toString());
    }
    if (payload.title) {
      form.append('title', payload.title);
    }
    if (payload.description) {
      form.append('description', payload.description);
    }
    if (payload.stats) {
      form.append('stats', JSON.stringify(payload.stats));
    }
    if (payload.isActive !== undefined) {
      form.append('isActive', payload.isActive.toString());
    }
    if (payload.bannerFile) {
      form.append('bannerFile', payload.bannerFile, payload.bannerFile.name);
    }
    return this.http.put<CaseStudy & { bannerDataUrl?: string }>(
      `${this.BASE}/${id}`,
      form
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.BASE}/${id}`);
  }

  // — Per‑item CTA —
  saveItemCta(id: string, cta: Cta): Observable<void> {
    return this.http.put<void>(`${this.BASE}/${id}/cta`, cta);
  }
}
