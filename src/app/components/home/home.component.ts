import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor() {}
  title = 'KentaPay';
  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectCountry(country: string) {
    console.log(`${country} selected`);
    this.dropdownOpen = false;
    // Perform any additional actions, such as updating the displayed country
  }
  slides = [
    { 
      image: 'assets/images/carousel/slide4.png',
      title: 'Embed payment on your platform', 
      subTitle: 'We Are a payment gateway solution', 
      description: '"KentaPay is the trusted choice for hundreds of companies in Africa, ranging from innovative startups to industry-leading companies. Our cutting-edge software and APIs empower businesses to seamlessly handle a spectrum of financial transactions, from accepting payments to facilitating secure payouts. With KentaPay, companies efficiently manage and grow their operations in the dynamic landscape of online business"' 
    },
    { 
      image: 'assets/images/carousel/slide4.png',
      title: 'Embed payment on your platform', 
      subTitle: 'We Are a payment gateway solution', 
      description: '"KentaPay is the trusted choice for hundreds of companies in Africa, ranging from innovative startups to industry-leading companies. Our cutting-edge software and APIs empower businesses to seamlessly handle a spectrum of financial transactions, from accepting payments to facilitating secure payouts. With KentaPay, companies efficiently manage and grow their operations in the dynamic landscape of online business"' 
    },
    { 
      image: 'assets/images/carousel/slide4.png',
      title: 'Embed payment on your platform', 
      subTitle: 'We Are a payment gateway solution', 
      description: '"KentaPay is the trusted choice for hundreds of companies in Africa, ranging from innovative startups to industry-leading companies. Our cutting-edge software and APIs empower businesses to seamlessly handle a spectrum of financial transactions, from accepting payments to facilitating secure payouts. With KentaPay, companies efficiently manage and grow their operations in the dynamic landscape of online business"' 
    },
  ];
  currentSlide = 0;

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  setSlide(index: number) {
    this.currentSlide = index;
  }
  OnInit(): void {
 
  }
}
