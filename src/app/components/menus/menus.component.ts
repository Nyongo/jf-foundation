import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Router, RouterModule } from '@angular/router'

interface MenuItem {
  label: string
  route: string
}

@Component({
  selector: 'app-menus',
  standalone: true,
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.scss',
  imports: [RouterModule, CommonModule],
})
export class MenusComponent {
  constructor(private readonly router: Router) {}
  isMenuOpen = false

  menuItems: MenuItem[] = [
    { label: 'Home', route: '/home' },
    { label: 'Our Impact', route: '/our-impact' },
    { label: 'Our Partners', route: '/our-partners' },
    { label: 'Case Studies', route: '/case-studies' },
    { label: 'News Letter', route: '/newsletter' },
    { label: 'About Us', route: '/about-us' },
  ]

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }

  goTo(url: string) {
    this.router.navigate([url])
    if (this.isMenuOpen) {
      this.toggleMenu()
    }
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
}
