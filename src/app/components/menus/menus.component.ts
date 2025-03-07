import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.scss',
})
export class MenusComponent {
  constructor(private readonly router: Router) {}
  isMenuOpen = false

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }
  goTo(url: string) {
    this.router.navigate([url])
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
