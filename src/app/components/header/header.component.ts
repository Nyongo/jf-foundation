import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private router: Router) {}
  dropdownOpen = false

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen
  }
  selectCountry(country: string) {
    console.log(`${country} selected`)
    this.dropdownOpen = false
    // Perform any additional actions, such as updating the displayed country
  }
  goToLogin() {
    // this.router.navigate(['/login']);
    window.location.href = 'https://developer.kentapay.com/auth/login'
  }
  goToRegister() {
    window.location.href = 'https://developer.kentapay.com/auth/register'
  }
}
