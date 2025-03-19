import { Component, OnInit, AfterViewInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

@Component({
  selector: 'app-case-study-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './case-study-detail.component.html',
  styleUrl: './case-study-detail.component.scss',
})
export class CaseStudyDetailComponent implements OnInit, AfterViewInit {
  caseStudyId: string = ''
  caseStudy: any

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.caseStudyId = params['id']
      // In a real app, you would fetch the case study data from a service
      this.caseStudy = this.getCaseStudyData(this.caseStudyId)
    })
  }

  ngAfterViewInit() {
    this.createStudentProgressChart()
    this.createTeacherTrainingChart()
    this.createResourceAllocationChart()
  }

  getCaseStudyData(id: string) {
    // Simulated data - in a real app, this would come from an API
    const caseStudies = {
      '1': {
        title: 'Digital Learning Initiative',
        location: 'Nairobi, Kenya',
        description: `Access to finance is a critical barrier for Early Childhood Development (ECD) providers in Kenya. Many struggle with financial instability due to irregular payment structures, limited enrollment, and lack of formal financial records—making it difficult to secure loans from traditional lenders. Jackfruit Finance, a pioneering education finance company, has leveraged data and AI-powered credit scoring to refine lending criteria, ensuring that ECD centers can access the funding they need to improve learning environments for Kenya’s youngest learners.
Through participation in the GSF Impact at Scale Labs - Early Years Programme,
 Jackfruit Finance systematically assessed the viability of lending to ECD providers,
  making data-based decisions to mitigate risk while expanding financial inclusion`,
        fullDescription: `
        Access to finance is a critical barrier for Early Childhood Development (ECD) providers in Kenya. Many struggle with financial instability due to irregular payment structures, limited enrollment, and lack of formal financial records—making it difficult to secure loans from traditional lenders. Jackfruit Finance, a pioneering education finance company, has leveraged data and AI-powered credit scoring to refine lending criteria, ensuring that ECD centers can access the funding they need to improve learning environments for Kenya’s youngest learners.
Through participation in the GSF Impact at Scale Labs - Early Years Programme, Jackfruit Finance systematically assessed the viability of lending to ECD providers, making data-based decisions to mitigate risk while expanding financial inclusion
`,
        image: 'assets/images/case-studies/1.jpg',
        impact: {
          students: '5,000+',
          schools: '10',
          teachers: '200+',
        },
        metrics: {
          studentProgress: {
            before: 65,
            after: 85,
          },
          teacherTraining: {
            completed: 180,
            inProgress: 20,
            planned: 50,
          },
          resourceAllocation: {
            infrastructure: 40,
            training: 25,
            content: 20,
            support: 15,
          },
        },
      },
      '2': {
        title: 'Teacher Training Program',
        location: 'Kampala, Uganda',
        description:
          'Conducted comprehensive teacher training workshops focusing on modern teaching methodologies.',
        fullDescription: `The Teacher Training Program in Kampala, Uganda, represents our commitment to empowering educators with modern teaching methodologies and digital skills. This comprehensive program has transformed how teachers approach education in their classrooms.

Key Program Components:
1. Modern Pedagogical Methods
2. Digital Tool Integration
3. Student-Centered Learning Approaches

The program's success lies in its practical approach and ongoing support system, ensuring teachers can effectively implement their new skills.`,
        image: 'assets/images/case-studies/2.jpg',
        impact: {
          teachers: '150+',
          schools: '8',
          students: '3,000+',
        },
        metrics: {
          studentProgress: {
            before: 60,
            after: 82,
          },
          teacherTraining: {
            completed: 150,
            inProgress: 30,
            planned: 40,
          },
          resourceAllocation: {
            infrastructure: 30,
            training: 40,
            content: 15,
            support: 15,
          },
        },
      },
      '3': {
        title: 'School Infrastructure Development',
        location: 'Dar es Salaam, Tanzania',
        description:
          'Built and renovated school facilities to create conducive learning environments.',
        fullDescription: `Our School Infrastructure Development project in Dar es Salaam, Tanzania, demonstrates our commitment to creating optimal learning environments. This initiative focused on both physical infrastructure improvements and technological integration.

Key Achievements:
1. Classroom Renovation and Construction
2. Modern Laboratory Facilities
3. Digital Learning Centers
4. Sustainable Design Implementation

The project has significantly improved the learning experience for students and created more effective teaching spaces for educators.`,
        image: 'assets/images/case-studies/3.jpg',
        impact: {
          schools: '5',
          students: '2,500+',
          classrooms: '25',
        },
        metrics: {
          studentProgress: {
            before: 55,
            after: 78,
          },
          teacherTraining: {
            completed: 120,
            inProgress: 25,
            planned: 35,
          },
          resourceAllocation: {
            infrastructure: 50,
            training: 20,
            content: 15,
            support: 15,
          },
        },
      },
    }

    return caseStudies[id as keyof typeof caseStudies]
  }

  createStudentProgressChart() {
    const ctx = document.getElementById(
      'studentProgressChart',
    ) as HTMLCanvasElement
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Before Program', 'After Program'],
        datasets: [
          {
            label: 'Student Performance Score',
            data: [
              this.caseStudy.metrics.studentProgress.before,
              this.caseStudy.metrics.studentProgress.after,
            ],
            backgroundColor: ['#6581fe', '#FEE200'],
            borderColor: ['#6581fe', '#FEE200'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
    })
  }

  createTeacherTrainingChart() {
    const ctx = document.getElementById(
      'teacherTrainingChart',
    ) as HTMLCanvasElement
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'In Progress', 'Planned'],
        datasets: [
          {
            data: [
              this.caseStudy.metrics.teacherTraining.completed,
              this.caseStudy.metrics.teacherTraining.inProgress,
              this.caseStudy.metrics.teacherTraining.planned,
            ],
            backgroundColor: ['#6581fe', '#FEE200', '#e0e0e0'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
      },
    })
  }

  createResourceAllocationChart() {
    const ctx = document.getElementById(
      'resourceAllocationChart',
    ) as HTMLCanvasElement
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Infrastructure', 'Training', 'Content', 'Support'],
        datasets: [
          {
            data: [
              this.caseStudy.metrics.resourceAllocation.infrastructure,
              this.caseStudy.metrics.resourceAllocation.training,
              this.caseStudy.metrics.resourceAllocation.content,
              this.caseStudy.metrics.resourceAllocation.support,
            ],
            backgroundColor: ['#6581fe', '#FEE200', '#e0e0e0', '#333333'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
      },
    })
  }
}
