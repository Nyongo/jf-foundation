import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms'
import { EmailService, FormData } from '../../services/email.service'
import { HttpClient, HttpClientModule } from '@angular/common/http'

interface MenuItem {
  label: string
  route: string
  children?: MenuItem[]
}

@Component({
  selector: 'app-menus',
  standalone: true,
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.scss',
  imports: [RouterModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [HttpClient, EmailService],
})
export class MenusComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private fb: FormBuilder,
    private emailService: EmailService,
    private http: HttpClient,
  ) {}
  isMenuOpen = false
  activeDropdown: string | null = null
  isUpskillModalOpen = false
  modalStep: 'info' | 'form' = 'info'
  isSubmitting = false

  subscriptionForm = this.fb.group({
    teacherName: ['', [Validators.required]],
    schoolName: ['', [Validators.required]],
    teachingLevel: ['', [Validators.required]],
    numberOfLearners: ['', [Validators.required, Validators.min(1)]],
    yearsOfExperience: ['', [Validators.required, Validators.min(0)]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
  })

  menuItems: MenuItem[] = [
    { label: 'Home', route: '/home' },
    { label: 'Our Impact', route: '/our-impact' },
    { label: 'Our Partners', route: '/our-partners' },
    { label: 'Case Studies', route: '/case-studies' },
    { label: 'News Letter', route: '/newsletter' },
    { label: 'About Us', route: '/about-us' },
    {
      label: 'Programs',
      route: '/programs',
      children: [
        { label: 'JF Upskill', route: '/programs/education' },
        { label: 'Healthcare', route: '/programs/healthcare' },
        { label: 'Environment', route: '/programs/environment' },
        { label: 'Community Development', route: '/programs/community' },
      ],
    },
  ]

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }

  toggleDropdown(label: string) {
    this.activeDropdown = this.activeDropdown === label ? null : label
  }

  goTo(url: string) {
    this.router.navigate([url])
    if (this.isMenuOpen) {
      this.toggleMenu()
    }
    this.activeDropdown = null
  }

  goToLogin() {
    window.location.href = 'https://developer.kentapay.com/auth/login'
  }

  goToRegister() {
    window.location.href = 'https://developer.kentapay.com/auth/register'
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route)
  }

  openUpskillModal(): void {
    this.isUpskillModalOpen = true
    this.modalStep = 'info'
  }

  closeUpskillModal(): void {
    this.isUpskillModalOpen = false
    this.modalStep = 'info'
    this.subscriptionForm.reset()
  }

  showRegistrationForm(): void {
    this.modalStep = 'form'
  }

  onSubmit(): void {
    if (this.subscriptionForm.valid) {
      this.isSubmitting = true
      const formData: FormData = {
        teacherName: this.subscriptionForm.get('teacherName')?.value || '',
        schoolName: this.subscriptionForm.get('schoolName')?.value || '',
        teachingLevel: this.subscriptionForm.get('teachingLevel')?.value || '',
        numberOfLearners:
          Number(this.subscriptionForm.get('numberOfLearners')?.value) || 0,
        yearsOfExperience:
          Number(this.subscriptionForm.get('yearsOfExperience')?.value) || 0,
        email: this.subscriptionForm.get('email')?.value || '',
        phoneNumber: this.subscriptionForm.get('phoneNumber')?.value || '',
        timestamp: new Date().toISOString(),
      }
      const payload = { ...formData, type: 'upskill-registration' }
      this.emailService.sendEmail(payload).subscribe({
        next: (response) => {
          console.log('Email sent successfully:', response)
          this.closeUpskillModal()
          this.subscriptionForm.reset()
          this.isSubmitting = false
        },
        error: (error) => {
          console.error('Error sending email:', error)
          this.isSubmitting = false
        },
      })
    }
  }

  isFieldInvalid(controlName: string): boolean {
    const control = this.subscriptionForm.get(controlName)
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false
  }

  getErrorMessage(controlName: string): string {
    const control = this.subscriptionForm.get(controlName)
    if (!control) return ''

    if (control.hasError('required')) {
      return 'This field is required'
    }
    if (control.hasError('email')) {
      return 'Please enter a valid email address'
    }
    if (control.hasError('pattern')) {
      if (controlName === 'phoneNumber') {
        return 'Please enter a valid 10-digit phone number'
      }
    }
    if (control.hasError('min')) {
      if (controlName === 'numberOfLearners') {
        return 'Number of learners must be at least 1'
      }
      if (controlName === 'yearsOfExperience') {
        return 'Years of experience must be 0 or greater'
      }
    }
    return ''
  }

  ngOnInit(): void {
    // Additional initialization logic if needed
  }
}
