import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Banner, Cta, Newsletter } from '../models/newsletter.model';

interface Paginated<T> { items: T[]; total: number; }

@Injectable({ providedIn: 'root' })
export class AdminNewsletterPageService {
  private readonly BASE = '/jf/newsletters';
  private readonly PAGE = '/jf/page/newsletters';

  constructor(private readonly http: HttpClient) {}

  // listing-page banner & CTA
  getBanner(): Observable<Banner> { return this.http.get<Banner>(`${this.PAGE}/banner`); }
  saveBanner(b: Banner, file?: File): Observable<Banner> {
    const form = new FormData();
    form.append('eyebrow', b.eyebrow);
    form.append('headline', b.headline);
    if (b.subtitle) form.append('subtitle', b.subtitle);
    if (file) form.append('imageFile', file, file.name);
    return this.http.put<Banner>(`${this.PAGE}/banner`, form);
  }
  getCta(): Observable<Cta> { return this.http.get<Cta>(`${this.PAGE}/cta`); }
  saveCta(c: Cta): Observable<Cta> {
    return this.http.put<Cta>(`${this.PAGE}/cta`, c);
  }

  // newsletters CRUD + pagination
  getPage(page: number, size: number): Observable<Paginated<Newsletter>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<Paginated<Newsletter>>(this.BASE, { params });
  }
  getOne(id: string): Observable<Newsletter> {
    return this.http.get<Newsletter>(`${this.BASE}/${id}`);
  }
  create(payload: Partial<Newsletter> & { bannerFile?: File }): Observable<Newsletter> {
    const form = new FormData();
    form.append('order', payload.order!.toString());
    form.append('title', payload.title!);
    form.append('date', payload.date!);
    form.append('description', payload.description!);
    form.append('category', payload.category!);
    form.append('isActive', payload.isActive!.toString());
    if (payload.bannerFile) {
      form.append('bannerFile', payload.bannerFile, payload.bannerFile.name);
    }
    return this.http.post<Newsletter>(this.BASE, form);
  }
  update(id: string, payload: Partial<Newsletter> & { bannerFile?: File }): Observable<Newsletter> {
    const form = new FormData();
    if (payload.order   !== undefined) form.append('order', payload.order!.toString());
    if (payload.title   !== undefined) form.append('title', payload.title!);
    if (payload.date    !== undefined) form.append('date', payload.date!);
    if (payload.description!== undefined) form.append('description', payload.description!);
    if (payload.category!== undefined) form.append('category', payload.category!);
    if (payload.isActive!== undefined) form.append('isActive', payload.isActive!.toString());
    if (payload.bannerFile) form.append('bannerFile', payload.bannerFile, payload.bannerFile.name);
    return this.http.put<Newsletter>(`${this.BASE}/${id}`, form);
  }
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.BASE}/${id}`);
  }

  // per‑item CTA
  saveItemCta(id: string, cta: Cta): Observable<void> {
    return this.http.put<void>(`${this.BASE}/${id}/cta`, cta);
  }
}
