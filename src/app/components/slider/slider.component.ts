import {
  Component,
  OnDestroy,
  OnInit,
  NgZone,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { phoneNumberValidator } from '../../validators/phone-number.validator'
import { CommonModule } from '@angular/common'
import { SafeResourceUrl } from '@angular/platform-browser'
import { Router } from '@angular/router'
@Component({
  selector: 'app-slider',
  standalone: true,
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  imports: [CommonModule],
})
export class SliderComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('videoFrame') videoFrame!: ElementRef
  @ViewChild('sliderContainer') sliderContainer!: ElementRef
  form: FormGroup
  window = window
  private observer: IntersectionObserver | null = null
  private isVideoVisible = true
  datePickerOptions = {
    enableTime: false,
    dateFormat: 'Y-m-d',
  }
  countries = [
    { name: 'Zambia', code: 'ZM' },
    { name: 'Zimbabwe', code: 'ZW' },
  ]
  today = new Date().toISOString().split('T')[0]
  slides = [
    {
      type: 'image',
      image: 'assets/images/carousel/slider1.jpg',
      title: 'Case Study: Education Access Initiative',
      subTitle: 'Improving Access to Quality Education',
      id: 'education-access',
      description: 'How we helped increase student enrollment by 45%',
    },
    {
      type: 'video',
      videoId: 'I0iGNUXRLS4',
      title: 'Case Study: School Infrastructure',
      subTitle: 'Building Better Learning Environments',
      id: 'infrastructure',
      description: 'Modernizing facilities across 50+ schools',
    },
    {
      type: 'image',
      image: 'assets/images/carousel/classroom.jpg',
      title: 'Case Study: Teacher Development',
      subTitle: 'Empowering Educators',
      id: 'teacher-development',
      description: 'Professional development program reaching 500+ teachers',
    },
  ]

  currentSlide = 0
  slideInterval: any

  constructor(
    private ngZone: NgZone,
    private fb: FormBuilder,
    private router: Router,
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
    this.startSlideShow()
  }

  getVideoUrl(videoId: string | undefined): SafeResourceUrl {
    if (!videoId) return ''
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&rel=0&showinfo=0&playsinline=1&enablejsapi=1&origin=${window.location.origin}`
  }

  onSubmit(): void {
    // if (this.form.valid) {
    //   // Handle form submission
    //   console.log(this.form.value)
    //   const formData = this.form.value
    //   this.http.post('http://localhost:3000/submit-form', formData).subscribe(
    //     (response) => {
    //       console.log('Form submitted successfully', response)
    //     },
    //     (error) => {
    //       console.error('Error submitting form', error)
    //     },
    //   )
    // } else {
    //   this.form.markAllAsTouched() // Highlight all fields if the form is invalid
    // }
  }

  get f() {
    return this.form.controls
  }

  startSlideShow(): void {
    this.ngZone.runOutsideAngular(() => {
      this.slideInterval = setInterval(() => {
        if (this.slides[this.currentSlide].type === 'video') {
          return
        }
        this.ngZone.run(() => this.nextSlide())
      }, 8000)
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

    // Clean up intersection observer
    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }
  }

  goTo(url: string): void {}

  nextSlide(): void {
    this.currentSlide =
      this.currentSlide < this.slides.length - 1 ? this.currentSlide + 1 : 0
  }

  prevSlide(): void {
    this.currentSlide =
      this.currentSlide > 0 ? this.currentSlide - 1 : this.slides.length - 1
  }

  ngAfterViewInit() {
    // Set up intersection observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.isVideoVisible = entry.isIntersecting
          if (this.videoFrame && this.videoFrame.nativeElement) {
            const iframe = this.videoFrame.nativeElement
            if (this.isVideoVisible) {
              // Resume video when in view
              iframe.contentWindow.postMessage(
                '{"event":"command","func":"playVideo","args":""}',
                '*',
              )
            } else {
              // Pause video when out of view
              iframe.contentWindow.postMessage(
                '{"event":"command","func":"pauseVideo","args":""}',
                '*',
              )
            }
          }
        })
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
        rootMargin: '0px', // No margin
      },
    )

    // Start observing the slider container
    if (this.sliderContainer) {
      this.observer.observe(this.sliderContainer.nativeElement)
    }

    // YouTube message listener for video end
    window.addEventListener('message', (event) => {
      if (event.origin === 'https://www.youtube.com') {
        try {
          const data = JSON.parse(event.data)
          if (data.event === 'onStateChange' && data.info === 0) {
            this.nextSlide()
          }
        } catch (error) {
          console.error('Error parsing YouTube message:', error)
        }
      }
    })
  }

  goToCaseStudy(caseStudyId: string): void {
    this.router.navigate(['/case-study', caseStudyId])
  }
}
