import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenusComponent } from "../menus/menus.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenusComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  selectCountry(country: string) {
    console.log(`${country} selected`);
    this.dropdownOpen = false;
    // Perform any additional actions, such as updating the displayed country
  }
}
