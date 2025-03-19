import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Router } from '@angular/router'

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './case-studies.component.html',
  styleUrl: './case-studies.component.scss',
})
export class CaseStudiesComponent {
  constructor(private router: Router) {}

  caseStudies = [
    {
      id: '1',
      title:
        'Data-Driven Lending: Transforming Early Childhood Education in Kenya',
      location: 'Nairobi, Kenya',
      description:
        'Through participation in the GSF Impact at Scale Labs - Early Years Programme, Jackfruit Finance systematically assessed the viability of lending to ECD providers, making data-based decisions to mitigate risk while expanding financial inclusion.',
      image: 'assets/images/case-studies/1.jpg',
      impact: {
        students: '5,000+',
        schools: '10',
        teachers: '200+',
      },
    },
    {
      id: '2',
      title: 'Driving Education Outcomes Through Results-Linked Loans',
      location: 'Nakuru, Kenya',
      description:
        'Across Kenya, low-cost private schools face significant challenges in accessing financing to improve infrastructure, teaching quality, and overall learning outcomes. Jackfruit Finance developed a data-driven, results-linked loan model, which offers financial support to schools that meet specific education improvement milestones',
      image: 'assets/images/case-studies/2.jpg',
      impact: {
        teachers: '150+',
        schools: '8',
        students: '3,000+',
      },
    },
    // {
    //   id: '3',
    //   title: 'School Infrastructure Development',
    //   location: 'Dar es Salaam, Tanzania',
    //   description:
    //     'Built and renovated school facilities to create conducive learning environments.',
    //   image: 'assets/images/case-studies/3.jpg',
    //   impact: {
    //     schools: '5',
    //     students: '2,500+',
    //     classrooms: '25',
    //   },
    // },
  ]

  viewCaseStudy(id: string) {
    this.router.navigate(['/case-studies', id])
  }
}
