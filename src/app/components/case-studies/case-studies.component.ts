import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface CaseStudy {
  imageUrl: string;
  title: string;
  description: string;
  stats: { value: string; label: string }[];
  link: string;
}

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './case-studies.component.html',
  styleUrls: ['./case-studies.component.scss']
})
export class CaseStudiesComponent implements OnInit {
  banner = {
    imageUrl: 'assets/images/case-studies/data-driven.svg',
    eyebrow: 'Case Study',
    headline:
      "Explore how we're making a difference in education across Sub‑Saharan Africa through our various initiatives and programs."
  };

  studies: CaseStudy[] = [
    {
      imageUrl: 'assets/images/case-studies/1.jpg',
      title: 'Data‑Driven Lending: Transforming Early Childhood Education in Kenya',
      description:
        'Through participation in the GSF Impact at Scale Labs – Early Years Programme, Jackfruit Finance systematically assessed the viability of lending to ECD providers, making data‑based decisions to mitigate risk while expanding financial inclusion.',
      stats: [
        { value: '573+', label: 'Students' },
        { value: '15',   label: 'Schools'  },
        { value: '719',  label: 'Teachers' }
      ],
      link: '/case-studies/case-study-1'
    },
    {
      imageUrl: 'assets/images/case-studies/2.jpg',
      title: 'Driving Education Outcomes Through Results‑Linked Loans',
      description:
        'Across Kenya, low‑cost private schools face significant challenges in accessing financing to improve infrastructure, teaching quality, and overall learning outcomes.',
      stats: [
        { value: '75k+', label: 'Students' },
        { value: '200',  label: 'Schools'  },
        { value: '2k+',  label: 'Teachers' }
      ],
      link: '/case-studies/case-study-2'
    }
    // Case studies can be added here
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goTo(link: string) {
    this.router.navigate([link])
  }
}
