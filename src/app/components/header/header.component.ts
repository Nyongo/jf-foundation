import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppTranslateService } from '../../services/translate.service';
import { HttpClient } from '@angular/common/http';
import { ContactUsService, FormData } from '../../services/jf-network-contact-page.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [CommonModule, NgIf, RouterModule, TranslateModule, ReactiveFormsModule],
  providers: [HttpClient, ContactUsService],
  standalone: true,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() pageName?: string;
  isScrolled = false;
  hasSolidBg = false;
  menuOpen = false;
  signInActive = false;
  selectedNav = 0;

  success = false;
  errorOccurred = false;

  private scrollThreshold = 80;

  constructor(
    private router: Router,
    public appTranslate: AppTranslateService,
    private contactUsService: ContactUsService,
    private http: HttpClient,
    private fb: FormBuilder,
  ) {}

  joinUpskillProgramActive = false;
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

  ngOnInit(): void {
    this.choosePageNav();
    this.backgroundColorCheck();

    this.success = false;
    this.errorOccurred = false;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const y = window.pageYOffset || document.documentElement.scrollTop || 0;
    this.isScrolled = y > this.scrollThreshold;
  }

  nav = [
    { label: 'Home', href: '/home' },
    { label: 'Our Impact', href: '/our-impact' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Newsletters', href: '/newsletter' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Contact Us', href: '/contact-us' },
  ];

  goTo(link: string) {
    this.router.navigate([link]);
  }

  backgroundColorCheck() {
    if (this.pageName != 'Home') {
      this.hasSolidBg = true;
    } else {
      this.hasSolidBg = false;
    }
  }

  choosePageNav() {
    if (this.pageName == 'Our Impact') {
      this.selectedNav = 1;
    } else if (this.pageName == 'Case Studies') {
      this.selectedNav = 2;
    } else if (this.pageName == 'Newsletters') {
      this.selectedNav = 3;
    } else if (this.pageName == 'About Us') {
      this.selectedNav = 4;
    } else if (this.pageName == 'Contact Us') {
      this.selectedNav = 5;
    } else {
      this.selectedNav = 0;
    }
  }

  openMenu() {
    this.menuOpen = true;
  }
  closeMenu() {
    this.menuOpen = false;
  }
  selectNav(idx: number) {
    this.selectedNav = idx;
  }

  isMobileDevice(): boolean {
    if (typeof navigator === 'undefined') {
      return false; // Default to desktop during SSR/prerendering
    }
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  getWhatsAppUrl(): string {
    const phoneNumber = '254110701174';
    const message =
      'Hello! I would like to get in touch with Jackfruit Network.';

    if (this.isMobileDevice()) {
      // For mobile devices, use WhatsApp app
      return `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}`;
    } else {
      // For desktop, use web WhatsApp
      return `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}`;
    }
  }

  //Upskill Modal Methods
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
        const payload = { ...formData, type: 'upskill-registration', platform: 'JF_FOUNDATION' }
        this.contactUsService.sendJoinUpskillApplication(payload).subscribe({
          next: (response) => {
            console.log('Email sent successfully:', response)
            this.closeUpskillModal()
            this.subscriptionForm.reset()
            this.isSubmitting = false;
            this.success = true;
            this.errorOccurred = false;
          },
          error: (error) => {
            this.success = false;
            this.errorOccurred = true;
            this.isSubmitting = false;
            console.error('Error sending email:', error)
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
}
