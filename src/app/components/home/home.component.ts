import { Component } from '@angular/core'
import { RouterOutlet, Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ClientsMarqueueComponent } from '../clients-marqueue/clients-marqueue.component'
import { SliderComponent } from '../slider/slider.component'
export interface TabItem {
  id: number
  title: string
  subtitle: string
  iconImage: string
  image: string
  content?: string
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ClientsMarqueueComponent,
    SliderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private router: Router) {}
  title = 'KentaPay'
  dropdownOpen = false
  tabs: TabItem[] = [
    {
      id: 1,
      title: 'Payment Gateway',
      subtitle: 'Subtitle 1',
      iconImage: 'assets/images/svg/database.png',
      image: 'assets/images/carousel/slide4.png',
      content: 'Content 1',
    },
    {
      id: 2,
      title: 'Payment Gateway',
      subtitle: 'Payment gateway Payment Experiance',
      iconImage: 'assets/images/svg/statistics.png',
      image: 'assets/images/case-studies/esb.png',
      content:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more or less normal page distribution of letters, as opposed to using Content here,content here normal distribution looking at its.',
    },
    {
      id: 3,
      title: 'Payment Gateway',
      subtitle: 'Subtitle 1',
      iconImage: 'assets/images/svg/search-engine.png',
      image: 'assets/images/carousel/slide4.png',
      content: 'Content 1',
    },
    {
      id: 4,
      title: 'Payment Gateway',
      subtitle: 'Subtitle 1',
      iconImage: 'assets/images/stats/clients.png',
      image: 'assets/images/carousel/slide4.png',
      content: 'Content 1',
    },
  ]
  activeTab = this.tabs[1]
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen
  }

  selectCountry(country: string) {
    console.log(`${country} selected`)
    this.dropdownOpen = false
    // Perform any additional actions, such as updating the displayed country
  }

  setActiveTab(tab: TabItem) {
    this.activeTab = tab
  }

  goTo(url: string) {
    this.router.navigate([url])
  }
}
