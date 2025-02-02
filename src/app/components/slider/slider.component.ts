import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit, NgZone } from '@angular/core'
import { Router } from '@angular/router'
import { DatepickerComponent } from '../datepicker/datepicker.component'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { phoneNumberValidator } from '../../validators/phone-number.validator'
import { HttpClient, HttpClientModule } from '@angular/common/http'

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DatepickerComponent,
    HttpClientModule,
  ],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit, OnDestroy {
  form: FormGroup
  datePickerOptions = {
    enableTime: false,
    dateFormat: 'Y-m-d',
  }
  today = new Date().toISOString().split('T')[0]
  slides = [
    {
      key: 1,
      image: 'assets/images/carousel/travelinsurance.jpg',
      title: 'Travel Smart, Travel Easy',
      subTitle: 'Planning for a trip?',
      description:
        'At Travel Assist, we believe that traveling should be an enriching experience, not a stressful one. That’s why we’re here to streamline your journey from start to finish. With expert planning, personalized recommendations, and real-time support, we take the hassle out of travel so you can focus on enjoying the adventure. Whether it’s navigating new destinations or managing last-minute changes, we’ve got you covered. Travel smarter, stress less, and make the most of every moment with Travel Assist — where exploring the world is made easy.',
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
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.form = this.fb.group({
      familyName: ['', [Validators.required, Validators.minLength(2)]],
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, phoneNumberValidator()]],
      dob: ['', Validators.required],
      country: ['', Validators.required],
      destination: ['', Validators.required],
      departureDate: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    //   this.startSlideShow()
  }

  onSubmit(): void {
    if (this.form.valid) {
      // Handle form submission
      console.log(this.form.value)
      const formData = this.form.value

      this.http.post('http://localhost:3000/submit-form', formData).subscribe(
        (response) => {
          console.log('Form submitted successfully', response)
        },
        (error) => {
          console.error('Error submitting form', error)
        },
      )
    } else {
      this.form.markAllAsTouched() // Highlight all fields if the form is invalid
    }
  }

  get f() {
    return this.form.controls
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
