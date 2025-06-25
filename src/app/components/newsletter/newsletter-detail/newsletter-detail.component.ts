import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, ActivatedRoute, Router } from '@angular/router'

interface NewsletterDetail {
  id: string
  title: string
  date: string
  category: string
  image: string
  description: string
  fullContent: string
  impact: {
    students: number
    schools: number
    teachers: number
    communities: number
  }
}

@Component({
  selector: 'app-newsletter-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './newsletter-detail.component.html',
  styleUrls: ['./newsletter-detail.component.scss'],
})
export class NewsletterDetailComponent implements OnInit {
  newsletter!: NewsletterDetail

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id']
      // TODO: replace with real backend call
      this.newsletter = this.mockFetch(id || '1')
    })
  }

  goBack() {
    this.router.navigate(['/newsletter'])
  }

  private mockFetch(id: string): NewsletterDetail {
    return {
      id,
      title: 'Education Transformation in Rural Kenya',
      date: 'March 2024',
      category: 'Impact Stories',
      image: 'assets/images/newsletter/4.jpg',
      description: `How we're revolutionizing education in rural communities through innovative programs and partnerships. Our comprehensive approach includes:
        
        • Implementation of digital learning tools
        • Teacher training and development
        • Community engagement initiatives
        • Infrastructure improvements
        • Student mentorship programs
        
        Through these initiatives, we've seen remarkable improvements in student engagement, academic performance, and overall educational outcomes.`,
      fullContent: `Our education transformation project in rural Kenya represents a significant milestone in our mission to improve educational outcomes across Sub-Saharan Africa. Working closely with local communities, schools, and education authorities, we've implemented a comprehensive approach that addresses multiple aspects of the education system.

        Key Achievements:
        • Increased student enrollment by 45%
        • Improved academic performance with 60% better test scores
        • Reduced dropout rates by 35%
        • Enhanced teacher retention and satisfaction
        • Strengthened community involvement in education

        The project demonstrates the power of collaborative efforts and innovative solutions in transforming rural education. Through sustainable practices and community ownership, we're ensuring long-term positive impact on education quality and access.`,
      impact: {
        students: 1200,
        schools: 15,
        teachers: 85,
        communities: 12,
      },
    }
  }
}
