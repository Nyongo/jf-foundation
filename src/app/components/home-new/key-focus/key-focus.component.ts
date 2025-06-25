import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef,
  NgZone,
  inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface FocusArea {
  title: string;
  description: string;
  points: string[];
  imageUrl: string;
  buttonUrl: string;
  buttonLabel: string;
}

@Component({
  selector: 'app-key-focus',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './key-focus.component.html',
  styleUrls: ['./key-focus.component.scss']
})
export class KeyFocusComponent implements OnInit, AfterViewInit {
  @ViewChildren('areaSection') sections!: QueryList<ElementRef<HTMLElement>>;

  // Determine at runtime whether we're in the browser
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  areas: FocusArea[] = [
    {
      title: `Gender Equality and Inclusion`,
      description:
        `We promote equal opportunities in education through targeted programs that support girls' education, female leadership in schools, and inclusive learning environments that cater to diverse needs and backgrounds.`,
      points: [
        'Promoting inclusive education for children with disabilities.',
        'Enhancing digital literacy in schools.',
        "Supporting girls' education initiatives."
      ],
      imageUrl: 'assets/images/focus/gender-inclusion.svg',
      buttonUrl: 'contact-us',
      buttonLabel: 'Talk To Us'
    },
    {
      title: 'Climate Resilience & Green Energy',
      description:
        'We promote sustainable practices and green energy solutions in our partner schools, helping them reduce their environmental impact while cutting operational costs. This includes solar power installations, water conservation systems, and environmental education programs.',
      points: [
        'Developing climate-resilient school infrastructure.',
        'Promoting renewable energy solutions (solar power, energy-efficient lighting).',
        'Supporting environmental education and green school initiatives.'
      ],
      imageUrl: 'assets/images/focus/climate-resilience.svg',
      buttonUrl: 'contact-us',
      buttonLabel: 'Talk To Us'
    },
    {
      title: 'Tech & Innovation for Social Good',
      description:
        'We leverage technology to create innovative solutions for educational challenges. This includes digital learning platforms, data-driven decision making tools, and technology integration in classrooms to enhance learning outcomes.',
      points: [
        'Implementing AI-driven impact measurement and customized interventions.',
        'Enhancing digital literacy in schools.',
        'Supporting EdTech innovations to improve school operations.'
      ],
      imageUrl: 'assets/images/focus/tech-innovation.svg',
      buttonUrl: 'contact-us',
      buttonLabel: 'Talk To Us'
    },
    {
      title: 'Education and Capacity Building',
      description:
        'We focus on strengthening educational outcomes through teacher training, curriculum development, and leadership development programs. Our capacity building initiatives ensure sustainable improvement in education quality.',
      points: [
        'Upskilling teachers through training programs.',
        'Supporting innovative learning methodologies.',
        'Providing school supplies and resources to improve literacy and numeracy.'
      ],
      imageUrl: 'assets/images/focus/education-and-capacity.svg',
      buttonUrl: 'contact-us',
      buttonLabel: 'Talk To Us'
    }
  ];

  constructor(
    private ngZone: NgZone,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Only create the observer in a browser context
    if (!this.isBrowser) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      this.sections.forEach(sec => {
        observer.observe(sec.nativeElement);
      });
    });
  }

  goTo(url: string) {
    this.router.navigate([url]);
  }
}
