import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface FormData {
  teacherName: string
  schoolName: string
  teachingLevel: string
  numberOfLearners: number
  yearsOfExperience: number
  email: string
  phoneNumber: string
  timestamp: string
}


@Injectable({ providedIn: 'root' })
export class ContactUsService {
  constructor(private http: HttpClient) {}

  sendMessage(payload: any) {
    return this.http.post('https://evzen.duckdns.org/jf/network-contact-page', payload);
  }

  sendJoinUpskillApplication(payload: any) {
    return this.http.post('https://evzen.duckdns.org/jf/join-upskill-application', payload);
  }

  sendNewsletterSubscription(payload: any) {
    return this.http.post('https://evzen.duckdns.org/jf/newsletter-subscription', payload);
  }
}