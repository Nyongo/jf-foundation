import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef,
  NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';
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

  areas: FocusArea[] = [
    {
      title: 'Gender Equality and Inclusion',
      description:
        'We promote equal opportunities in education through targeted programs that support girls’ education, female leadership in schools, and inclusive learning environments that cater to diverse needs and backgrounds.',
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
        'Empowering communities to adapt to climate change by investing in sustainable energy projects and training local leaders in environmental stewardship.',
      points: [
        'Solar power installations in off-grid areas.',
        'Training on sustainable farming practices.',
        'Community-driven clean water solutions.'
      ],
      imageUrl: 'assets/images/focus/climate-resilience.svg',
      buttonUrl: 'contact-us',
      buttonLabel: 'Talk To Us'
    },
    {
      title: 'Tech & Innovation for Social Good',
      description:
        'Leveraging technology and innovation to bridge educational gaps and create scalable solutions for remote learning and digital inclusion.',
      points: [
        'E-learning platforms for rural schools.',
        'Coding bootcamps for underserved youth.',
        'Open-source toolkits for educators.'
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
    // Reveal sections one by one as they enter
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
      this.sections.forEach(sec => observer.observe(sec.nativeElement));
    });
  }

  goTo(url: string) {
    this.router.navigate([url])
  }
}
