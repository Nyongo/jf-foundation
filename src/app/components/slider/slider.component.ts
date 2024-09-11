import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit, NgZone } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit, OnDestroy {
  slides = [
    {
      key: 1,
      image: 'assets/images/carousel/slide1.png',
      title: 'Embed payment on your platform',
      subTitle: 'We Are a payment gateway solution',
      description:
        '"KentaPay is the trusted choice for hundreds of companies in Africa, ranging from innovative startups to industry-leading companies. Our cutting-edge software and APIs empower businesses to seamlessly handle a spectrum of financial transactions, from accepting payments to facilitating secure payouts. With KentaPay, companies efficiently manage and grow their operations in the dynamic landscape of online business"',
    },
    {
      key: 2,
      image: 'assets/images/carousel/slide1.png',
      title: 'Embed payment on your platform',
      subTitle: 'We Are a payment gateway solution',
      description:
        '"KentaPay is the trusted choice for hundreds of companies in Africa, ranging from innovative startups to industry-leading companies. Our cutting-edge software and APIs empower businesses to seamlessly handle a spectrum of financial transactions, from accepting payments to facilitating secure payouts. With KentaPay, companies efficiently manage and grow their operations in the dynamic landscape of online business"',
    },
    {
      key: 3,
      image: 'assets/images/carousel/slide1.png',
      title: 'Embed payment on your platform',
      subTitle: 'We Are a payment gateway solution',
      description:
        '"KentaPay is the trusted choice for hundreds of companies in Africa, ranging from innovative startups to industry-leading companies. Our cutting-edge software and APIs empower businesses to seamlessly handle a spectrum of financial transactions, from accepting payments to facilitating secure payouts. With KentaPay, companies efficiently manage and grow their operations in the dynamic landscape of online business"',
    },
  ]

  currentSlide = 0
  slideInterval: any

  constructor(
    private router: Router,
    private ngZone: NgZone,
  ) {}

  ngOnInit(): void {
    console.log('SliderComponent initialized')
    this.startSlideShow()
  }

  startSlideShow(): void {
    // Run the interval inside Angular's zone to ensure change detection works properly
    this.ngZone.runOutsideAngular(() => {
      this.slideInterval = setInterval(() => {
        this.ngZone.run(() => this.nextSlide())
      }, 3000) // Slide changes every 3 seconds
    })
  }

  stopSlideShow(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval)
    }
  }

  ngOnDestroy(): void {
    console.log('SliderComponent destroyed')
    this.stopSlideShow() // Clear interval to avoid memory leaks
  }

  goTo(url: string): void {
    this.router
      .navigate([url])
      .catch((err) => console.error('Navigation error:', err))
  }

  prevSlide(): void {
    this.currentSlide =
      this.currentSlide > 0 ? this.currentSlide - 1 : this.slides.length - 1
  }

  nextSlide(): void {
    this.currentSlide =
      this.currentSlide < this.slides.length - 1 ? this.currentSlide + 1 : 0
  }
}
