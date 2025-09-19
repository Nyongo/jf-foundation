import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-case-study-2',
  imports: [CommonModule, HeaderComponent, TranslateModule],
  templateUrl: './case-study-2.component.html',
  styleUrls: ['./case-study-2.component.scss']
})
export class CaseStudy2Component implements OnInit {
  // Banner
  title = 'Driving Education Outcomes Through Results-Linked Loans';
  location = 'Nairobi, Kenya';

  // Introduction
  introduction = [
    `Across Kenya, low-cost private schools face significant challenges in accessing financing to improve infrastructure, teaching quality, and overall learning outcomes. Many financial institutions perceive these schools as high-risk due to inconsistent cash flows and limited financial tracking, making it difficult for them to access capital for development.`,
    `Without adequate investment, schools struggle to provide quality education, leading to poor student outcomes. Jackfruit has pioneered an innovative results-linked loan model, which ties financing to measurable improvements in school performance. This approach ensures that schools not only access affordable loans but also commit to improving education quality, teacher training, and student learning outcomes. In parallel, Jackfruit Foundation's JF Upskill program provides essential capacity-building for teachers, equipping them with skills to enhance student achievement.`
  ];

  // --- Challenge Section ---
  challengeIntro = `Many private schools in Kenya, particularly in low-income urban and rural areas, operate with minimal resources and lack access to traditional financing. The main challenges these schools face include:`;
  challengeList = [
    `Inadequate Infrastructure: Many schools need funding for classroom expansion, sanitation, and learning facilities but cannot secure affordable loans.`,
    `Untrained Teachers: A significant number of teachers lack access to continuous professional development, impacting their ability to deliver quality instruction.`,
    `Low Learning Outcomes: Without proper investment in learning materials and structured teacher training, students struggle with foundational literacy and numeracy.`
  ];
  challengeOutro = `To bridge this gap, Jackfruit Finance and Jackfruit Foundation introduced a financing solution that directly links loan conditions to improved learning outcomes, ensuring that education quality remains at the center of school investments.`;

  // Intervention
  solutionIntro = 'Jackfruit Finance developed a data-driven, results-linked loan model, which offers financial support to schools that meet specific education improvement milestones. Key features of this approach include:';
  solutionBullets = [
    `Education-Based Loan Incentives: Schools that show measurable improvements in student performance, teacher training completion, and school management benefit from reduced interest rates over time.`,
    `Data-Driven Credit Assessment: Instead of relying solely on financial metrics, Jackfruit Finance assesses schools based on enrollment stability, academic performance, and teacher training participation.`,
    `Infrastructure and Learning Material Investments: Schools use the loans to upgrade classrooms, provide digital learning tools, and enhance school facilities, leading to better student engagement and retention.`
  ];
  solutionOutro = `This holistic approach ensures that financial support translates into real, measurable improvements in education outcomes rather than being used solely for operational expenses.`;

  // Impact
  impactIntro = `Since implementing the results-linked loan model, schools across Kenya have demonstrated significant progress in multiple areas:`
  impactList = [
    `Enhanced School Infrastructure: Schools have built modern classrooms, sanitation facilities, and digital learning spaces, improving the learning environment.`,
    `Teacher Training & Development: Over 70% of teachers in funded schools have completed JF Upskill training, leading to more effective lesson delivery and improved student comprehension.`,
    `Higher Student Performance: Schools that accessed these loans saw a 10-15% improvement in literacy and numeracy scores, as tracked through baseline and endline assessments.`,
    `Increased Student Enrollment & Retention: Schools offering a better learning experience reported an average 20% increase in student enrollment, as parents recognized the value of quality education.`
  ];
  // No outro here

  // Looking Ahead
  lookingAheadIntro = `Jackfruit Finance is committed to expanding this model, ensuring that more schools can access affordable financing tied to learning outcomes. Future steps include:`;
  lookingAheadList = [
    `Expanding JF Upskill access to all loan-recipient schools, ensuring teachers receive continuous development support.`,
    `Strengthening monitoring systems to track improvements in school quality and tailor financial incentives accordingly.`,
    `Partnering with investors and development organizations to scale this impact-driven financing model across more low-income schools.`
  ];

  lookingAheadOutro = `By ensuring that finance and education improvement go hand in hand, Jackfruit Finance and Jackfruit Foundation are reshaping the future of school lending—proving that smart, results-driven investment can transform learning for thousands of students in Kenya.`;

  constructor(private router: Router) {}
  ngOnInit(): void {}

  goTo(link: string) {
    this.router.navigate([link])
  }
}
