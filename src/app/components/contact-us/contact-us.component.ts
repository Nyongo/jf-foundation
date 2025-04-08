import { Component } from '@angular/core'
import { ServiceHeaderComponent } from '../service-header/service-header.component'
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { EmailService } from '../../services/email.service'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

@Component({
  selector: 'app-contact-us',
  standalone: true,
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
  imports: [
    ServiceHeaderComponent,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [HttpClient],
})
export class ContactUsComponent {
  contactForm: FormGroup
  isSubmitting = false
  submitSuccess = false
  submitError = false

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private emailService: EmailService,
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
    })
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true
      const formData: ContactFormData = {
        name: this.contactForm.get('name')?.value || '',
        email: this.contactForm.get('email')?.value || '',
        subject: this.contactForm.get('subject')?.value || '',
        message: this.contactForm.get('message')?.value || '',
      }

      const payload = { ...formData, type: 'contact-us' }
      this.emailService.sendEmail(payload).subscribe({
        next: (response) => {
          console.log('Email sent successfully:', response)
          this.submitSuccess = true
          this.contactForm.reset()
          this.isSubmitting = false
        },
        error: (error) => {
          console.error('Error sending email:', error)
          this.isSubmitting = false
        },
      })
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.contactForm.get(fieldName)
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false
  }

  getErrorMessage(fieldName: string): string {
    const control = this.contactForm.get(fieldName)
    if (!control) return ''

    if (control.hasError('required')) {
      return 'This field is required'
    }
    if (control.hasError('email')) {
      return 'Please enter a valid email address'
    }
    return ''
  }
}
