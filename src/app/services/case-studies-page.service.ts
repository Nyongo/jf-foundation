import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Banner, CaseStudy, Cta } from '../models/case-study.model';
import { AdminCaseStudiesPageService as AdminSvc } from './admin-case-studies-page.service';

interface Paginated<T> { items: T[]; total: number; }

@Injectable({ providedIn: 'root' })
export class CaseStudiesPageService {
  constructor(private admin: AdminSvc) {}

  getBanner(): Observable<Banner> {
    return this.admin.getBanner();
  }

  getPage(page: number, size: number): Observable<{ items: CaseStudy[]; total: number }> {
    return this.admin.getPage(page, size);
  }

  getCta(): Observable<Cta> {
    return this.admin.getCta();
  }

  loadAll(): Observable<{
    banner: Banner;
    studies: CaseStudy[];
    cta: Cta;
  }> {
    return forkJoin({
      banner: this.getBanner(),
      studies: this.admin.getPage(1, 9999).pipe(map(p => p.items)),
      cta: this.getCta(),
    });
  }
}
