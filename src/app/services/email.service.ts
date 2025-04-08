import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

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

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  // Update this URL to match your Nest.js backend endpoint
  private apiUrl = 'https://evzen.duckdns.org/jf/notification/send-email'

  constructor(private http: HttpClient) {}

  sendEmail(formData: any): Observable<any> {
    return this.http.post(this.apiUrl, formData)
  }
}
