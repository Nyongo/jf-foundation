import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms'

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
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
})
export class MenusComponent {
  constructor(
    private readonly router: Router,
    private fb: FormBuilder,
  ) {}
  isMenuOpen = false
  activeDropdown: string | null = null
  isUpskillModalOpen = false

  subscriptionForm: FormGroup = this.fb.group({
    teacherName: ['', Validators.required],
    schoolName: ['', Validators.required],
    teachingLevel: ['', Validators.required],
    numberOfLearners: ['', [Validators.required, Validators.min(1)]],
    yearsOfExperience: ['', [Validators.required, Validators.min(0)]],
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
  }

  closeUpskillModal(): void {
    this.isUpskillModalOpen = false
    this.subscriptionForm.reset()
  }

  onSubmit(): void {
    if (this.subscriptionForm.valid) {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', this.subscriptionForm.value)
      this.closeUpskillModal()
    }
  }
}
