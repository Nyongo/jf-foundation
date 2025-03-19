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
        students: '719',
        schools: '15',
        teachers: '41',
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
        teachers: '2,000+',
        schools: '200',
        students: '75,000+',
      },
    },
  ]

  viewCaseStudy(id: string) {
    //this.router.navigate(['/case-studies', id])
    if (id === '1') {
      this.router.navigate(['/case-studies/case-study-1'])
    } else if (id === '2') {
      this.router.navigate(['/case-studies/case-study-2'])
    }
  }
}
