import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  AfterViewInit,
  NgZone,
  ViewChild,
  ElementRef,
  inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

export interface Slide {
  type: 'image' | 'video';
  image?: string;
  videoId?: string;
  title: string;
  subTitle: string;
  id: string;
  description: string;
}

@Component({
  selector: 'app-hero-slider',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './hero-slider.component.html',
  styleUrls: ['./hero-slider.component.scss']
})
export class HeroSliderComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() directorsPercent!: number;
  @Input() teachersPercent!: number;
  @Input() studentsPercent!: number;

  @ViewChild('videoFrame') videoFrame?: ElementRef<HTMLIFrameElement>;
  @ViewChild('sliderContainer') sliderContainer!: ElementRef<HTMLDivElement>;

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  slides: Slide[] = [
    // {
    //   type: 'image',
    //   image: 'assets/images/carousel/slider1.jpg',
    //   title: 'Case Study: Education Access Initiative',
    //   subTitle: 'Improving Access to Quality Education',
    //   id: 'education-access',
    //   description: 'How we helped increase student enrollment by 45%',
    // },
    // {
    //   type: 'video',
    //   videoId: 'I0iGNUXRLS4',
    //   title: 'Case Study: School Infrastructure',
    //   subTitle: 'Building Better Learning Environments',
    //   id: 'infrastructure',
    //   description: 'Modernizing facilities across 50+ schools',
    // },
    // {
    //   type: 'image',
    //   image: 'assets/images/carousel/classroom.jpg',
    //   title: 'Case Study: Teacher Development',
    //   subTitle: 'Empowering Educators',
    //   id: 'teacher-development',
    //   description: 'Professional development program reaching 500+ teachers',
    // },
    {
      type: 'image',
      image: 'assets/images/hero/first-hero-banner.svg',
      title: 'Empowering Futures:<br/>Finance Education For All',
      subTitle: '',
      id: 'empowering-futures',
      description: "We've built a supportive learning environment, enriching the lives of students — especially young women — and strengthening the leadership of women educators.",
    },
  ];

  currentSlide = 0;
  private slideInterval!: number;
  private observer: IntersectionObserver | null = null;

  constructor(
    private ngZone: NgZone,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    if (this.isBrowser && this.slides.length > 1) {
      this.startAutoPlay();
    }
  }

  ngAfterViewInit(): void {
    // Only observe if there's at least one video slide
    if (!this.isBrowser || !this.slides.some(s => s.type === 'video')) {
      return;
    }

    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          // Only attempt to pause/play if we have a videoFrame
          if (this.videoFrame?.nativeElement) {
            const cmd = entry.isIntersecting ? 'playVideo' : 'pauseVideo';
            this.videoFrame.nativeElement.contentWindow?.postMessage(
              JSON.stringify({ event: 'command', func: cmd, args: [] }),
              '*'
            );
          }
        });
      },
      { threshold: 0.5 }
    );

    this.observer.observe(this.sliderContainer.nativeElement);
    window.addEventListener('message', this.onYouTubeMessage);
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) return;
    clearInterval(this.slideInterval);
    this.observer?.disconnect();
    window.removeEventListener('message', this.onYouTubeMessage);
  }

  private startAutoPlay(): void {
    this.ngZone.runOutsideAngular(() => {
      this.slideInterval = window.setInterval(() => {
        if (this.slides[this.currentSlide].type !== 'video') {
          this.ngZone.run(() => this.nextSlide());
        }
      }, 7000);
    });
  }

  prevSlide(): void {
    this.currentSlide =
      this.currentSlide > 0 ? this.currentSlide - 1 : this.slides.length - 1;
  }

  nextSlide(): void {
    this.currentSlide =
      this.currentSlide < this.slides.length - 1 ? this.currentSlide + 1 : 0;
  }

  getVideoUrl(id?: string): SafeResourceUrl {
    if (!this.isBrowser || !id) return '';
    const url = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&controls=1&rel=0&enablejsapi=1&origin=${window.location.origin}&playlist=${id}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private onYouTubeMessage = (evt: MessageEvent) => {
    if (evt.origin === 'https://www.youtube.com') {
      try {
        const msg = JSON.parse(evt.data);
        if (msg.event === 'onStateChange' && msg.info === 0) {
          this.nextSlide();
        }
      } catch {}
    }
  };
}
