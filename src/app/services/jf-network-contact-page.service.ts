import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import emailjs from '@emailjs/browser';
import { lastValueFrom } from 'rxjs';

export interface FormData {
  teacherName: string;
  schoolName: string;
  teachingLevel: string;
  numberOfLearners: number;
  yearsOfExperience: number;
  email: string;
  phoneNumber: string;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class ContactUsService {
  private serviceId = 'service_xc4p7wd'; // Replace with your EmailJS service ID
  private templateId = 'template_24sriyf'; // Replace with your EmailJS template ID
  private publicKey = '9ZwVKEiRU3eDUwLLZ'; // Replace with your EmailJS public key

  private dbEndpoint = 'https://evzen.duckdns.org/jf/network-contact-page';

  constructor(private http: HttpClient) {
    // Initialize EmailJS with your public key
    emailjs.init(this.publicKey);
  }

  /**
   * Persist contact data to your backend DB.
   * Returns an Observable (HTTP), caller can use lastValueFrom or subscribe.
   */
  sendMessage(payload: any) {
    return this.http.post(this.dbEndpoint, payload);
  }

  /**
   * Send admin email via EmailJS.
   * Returns a Promise from EmailJS.
   */
  sendContactEmailMessage(payload: any): Promise<any> {
    const templateParams = {
      from_name: payload.name,
      from_email: payload.email,
      subject: payload.subject,
      message: this.formatContactEmailMessage(payload),
      message_type: payload.messageType,
      platform: payload.platform,
      timestamp: new Date().toISOString(),
      sender_email: 'developer@jackfruitfinance.com',
      sender_name: 'JF Finance Team',
    };

    return emailjs
      .send(this.serviceId, this.templateId, templateParams)
      .then((response: any) => {
        console.log('EmailJS success response:', response);
        return response;
      })
      .catch((error: any) => {
        console.error('EmailJS error details:', error);
        throw error;
      });
  }

  private formatContactEmailMessage(formData: any): string {
    return `
Contact Us Page from ${formData.platform} web platform, with a ${formData.messageType} message request.

Contact Details:
- Name: ${formData.name}
- Email: ${formData.email}
- Timestamp: ${new Date().toLocaleString()}

SUBJECT: ${formData.subject}
MESSAGE:
${formData.message}

The message was generated from ${formData.platform} web platform.
    `.trim();
  }

  /**
   * Send admin email via EmailJS for upskill/join applications.
   * Returns a Promise from EmailJS.
   */
  sendUpskillEmailMessage(payload: any): Promise<any> {
    const templateParams = {
      from_name: payload.teacherName,
      from_email: payload.email,
      message: this.formatUpskillEmailMessage(payload),
      message_type: payload.type,
      platform: payload.platform,
      timestamp: new Date().toISOString(),
      sender_email: 'developer@jackfruitfinance.com',
      sender_name: 'JF Finance Team',
    };

    return emailjs
      .send(this.serviceId, this.templateId, templateParams)
      .then((response: any) => {
        console.log('EmailJS success response:', response);
        return response;
      })
      .catch((error: any) => {
        console.error('EmailJS error details:', error);
        throw error;
      });
  }

  private formatUpskillEmailMessage(formData: any): string {
    return `
SUBJECT: Upskill Form from ${formData.platform} web platform, with a ${formData.type} upskill request.

Contact Details:
- Teacher Name: ${formData.teacherName}
- School Name: ${formData.schoolName}
- Phone Number: ${formData.phoneNumber}
- Email: ${formData.email}
- Teaching Level: ${formData.teachingLevel}
- Number of Learners: ${formData.numberOfLearners}
- Years of Experience: ${formData.yearsOfExperience}
- Timestamp: ${new Date().toLocaleString()}


The message was generated from ${formData.platform} web platform.
    `.trim();
  }

  /**
   * New combined method for Contact Us (already present in your service)
   * - Attempts to save to DB first (sendMessage)
   * - Then attempts to send the admin email (sendContactEmailMessage)
   * Returns a structured result describing each attempt.
   */
  async sendMessageAndEmail(payload: any): Promise<{
    dbSuccess: boolean;
    emailSuccess: boolean;
    dbResponse?: any;
    emailResponse?: any;
    dbError?: any;
    emailError?: any;
  }> {
    const result: {
      dbSuccess: boolean;
      emailSuccess: boolean;
      dbResponse?: any;
      emailResponse?: any;
      dbError?: any;
      emailError?: any;
    } = { dbSuccess: false, emailSuccess: false };

    // 1) Try DB save
    try {
      const dbResp = await lastValueFrom(this.sendMessage(payload));
      result.dbSuccess = true;
      result.dbResponse = dbResp;
    } catch (dbErr) {
      console.error('Contact DB save failed', dbErr);
      result.dbError = dbErr;
      // continue to email attempt (we still want admins notified)
    }

    // 2) Try sending email (do it even if DB save failed so admins can inspect)
    try {
      const emailResp = await this.sendContactEmailMessage(payload);
      result.emailSuccess = true;
      result.emailResponse = emailResp;
    } catch (emailErr) {
      console.error('Sending contact email failed', emailErr);
      result.emailError = emailErr;
    }

    return result;
  }

  // --- UPSKILL: DB save + email combined method (NEW) ---
  /**
   * Attempts to persist an upskill/join application to the DB first,
   * then attempts to send an admin notification email. Returns a structured
   * result similar to sendMessageAndEmail.
   */
  async sendJoinUpskillAndEmail(payload: any): Promise<{
    dbSuccess: boolean;
    emailSuccess: boolean;
    dbResponse?: any;
    emailResponse?: any;
    dbError?: any;
    emailError?: any;
  }> {
    const result: {
      dbSuccess: boolean;
      emailSuccess: boolean;
      dbResponse?: any;
      emailResponse?: any;
      dbError?: any;
      emailError?: any;
    } = { dbSuccess: false, emailSuccess: false };

    // 1) Try DB save for upskill application
    try {
      const dbResp = await lastValueFrom(this.sendJoinUpskillApplication(payload));
      result.dbSuccess = true;
      result.dbResponse = dbResp;
    } catch (dbErr) {
      console.error('Upskill DB save failed', dbErr);
      result.dbError = dbErr;
      // continue to email attempt (notify admins even if persistence failed)
    }

    // 2) Try sending upskill email notification
    try {
      const emailResp = await this.sendUpskillEmailMessage(payload);
      result.emailSuccess = true;
      result.emailResponse = emailResp;
    } catch (emailErr) {
      console.error('Sending upskill email failed', emailErr);
      result.emailError = emailErr;
    }

    return result;
  }

  // existing methods left intact
  sendJoinUpskillApplication(payload: any) {
    return this.http.post('https://evzen.duckdns.org/jf/join-upskill-application', payload);
  }

  sendNewsletterSubscription(payload: any) {
    return this.http.post('https://evzen.duckdns.org/jf/newsletter-subscription', payload);
  }
}
