import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  NewsletterSection,
  SectionDataBanner,
  SectionDataContent,
  Cta,
} from '../models/newsletter.model';

@Injectable({ providedIn: 'root' })
export class AdminNewsletterSectionsService {
  private readonly API = '/jf/newsletters';

  constructor(private readonly http: HttpClient) {}

  getAll(newsletterId: string): Observable<NewsletterSection[]> {
    return this.http.get<NewsletterSection[]>(`${this.API}/${newsletterId}/sections`);
  }

  create(
    newsletterId: string,
    dto: Omit<NewsletterSection, 'id'|'createdAt'|'updatedAt'|'media'>,
    mediaFiles: File[] = []
  ): Observable<NewsletterSection> {
    const form = new FormData();
    form.append('order', dto.order.toString());
    form.append('type', dto.type);
    form.append('data', JSON.stringify(dto.data));
    dto.isActive != null && form.append('isActive', dto.isActive.toString());
    mediaFiles.forEach(f => form.append('mediaFiles', f, f.name));
    return this.http.post<NewsletterSection>(`${this.API}/${newsletterId}/sections`, form);
  }

  update(
    newsletterId: string,
    id: string,
    dto: Partial<Omit<NewsletterSection,'id'|'newsletterId'|'createdAt'|'media'>>,
    mediaFiles: File[] = []
  ): Observable<NewsletterSection> {
    const form = new FormData();
    dto.order      != null && form.append('order', dto.order.toString());
    dto.type       && form.append('type', dto.type);
    dto.data       && form.append('data', JSON.stringify(dto.data));
    dto.isActive   != null && form.append('isActive', dto.isActive.toString());
    mediaFiles.forEach(f => form.append('mediaFiles', f, f.name));
    return this.http.put<NewsletterSection>(
      `${this.API}/${newsletterId}/sections/${id}`, form
    );
  }

  delete(newsletterId: string, id: string): Observable<void> {
    return this.http.delete<void>(`${this.API}/${newsletterId}/sections/${id}`);
  }

  reorder(
    newsletterId: string,
    sections: { id: string; order: number }[]
  ): Observable<NewsletterSection[]> {
    return this.http.patch<NewsletterSection[]>(
      `${this.API}/${newsletterId}/sections/reorder`,
      { newsletterId, sections }
    );
  }
}
