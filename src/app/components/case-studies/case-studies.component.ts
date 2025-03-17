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
      title: 'Digital Learning Initiative',
      location: 'Nairobi, Kenya',
      description:
        'Implemented digital learning solutions in 10 public schools, reaching over 5,000 students.',
      image: 'assets/images/case-studies/1.jpg',
      impact: {
        students: '5,000+',
        schools: '10',
        teachers: '200+',
      },
    },
    {
      id: '2',
      title: 'Teacher Training Program',
      location: 'Kampala, Uganda',
      description:
        'Conducted comprehensive teacher training workshops focusing on modern teaching methodologies.',
      image: 'assets/images/case-studies/2.jpg',
      impact: {
        teachers: '150+',
        schools: '8',
        students: '3,000+',
      },
    },
    {
      id: '3',
      title: 'School Infrastructure Development',
      location: 'Dar es Salaam, Tanzania',
      description:
        'Built and renovated school facilities to create conducive learning environments.',
      image: 'assets/images/case-studies/3.jpg',
      impact: {
        schools: '5',
        students: '2,500+',
        classrooms: '25',
      },
    },
  ]

  viewCaseStudy(id: string) {
    this.router.navigate(['/case-studies', id])
  }
}
