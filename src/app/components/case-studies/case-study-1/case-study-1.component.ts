import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

type ListType = 'disc' | 'decimal';

interface BulletListItem {
  text: string;
  sublist?: string[];
}

interface Bullet {
  text: string;
  list?: BulletListItem[];
  listType?: ListType;
}

@Component({
  selector: 'app-case-study-1',
  imports: [ CommonModule],
  templateUrl: './case-study-1.component.html',
  styleUrls: ['./case-study-1.component.scss']
})
export class CaseStudy1Component implements OnInit {
  title = 'Data-Driven Lending: Transforming Early Childhood Education in Kenya';
  location = 'Nairobi, Kenya';

  introduction: string[] = [
    `Access to finance is a critical barrier for Early Childhood Development (ECD) providers in Kenya. Many struggle with financial instability due to irregular payment structures, limited enrollment, and lack of formal financial records making it difficult to secure loans from traditional lenders. Jackfruit Finance, a pioneering education finance company, has leveraged data and AI-powered credit scoring to refine lending criteria, ensuring that ECD centers can access the funding they need to improve learning environments for Kenya’s youngest learners.`,
    `Through participation in the GSF Impact at Scale Labs – Early Years Programme, Jackfruit Finance systematically assessed the viability of lending to ECD providers, making data-based decisions to mitigate risk while expanding financial inclusion.`
  ];

  challengeBullets: Bullet[] = [
    {
      text: 'Jackfruit identified three broad categories of ECD providers:',
      listType: 'decimal',
      list: [
        {
          text: `Informal home-based daycares (“Mamapreneurs”) – Operated by female entrepreneurs caring for children in their homes, these lacked the financial capacity to take on sustainable credit.`
        },
        {
          text: `ECD centers attached to primary schools – These benefited from stable revenue streams from older students and already qualified for Jackfruit loans.`,
        },
        {
          text: `Stand-alone ECD centers – These faced financial sustainability issues, including:`,
          sublist: [
            'Low enrollment numbers affecting revenue.',
            'Irregular payment structures (daily/weekly/monthly instead of termly).',
            'Heavy reliance on cash payments, making financial tracking difficult.'
          ]
        }
      ]
    }
  ];

  solutionIntro = `Jackfruit Finance, through recommendation from Jackfruit Foundation, adapted its lending model based on data-driven insights, making key refinements to support ECD providers effectively.`;

  solutionBullets: BulletListItem[] = [
    { text: `Payment Structure Adaptation – Transitioning ECD providers from cash transactions to mobile money and bank payments, improving financial tracking and risk assessment.` },
    { text: `Experience & Longevity Consideration – Adjusting eligibility from a minimum of three years of operation to one year, balancing stability with early-stage financial needs.` },
    { text: `Enrolment-Based Eligibility – Reducing the minimum required student count from 100 to 50, making loans more accessible to smaller ECD centers.` }
  ];

  leverageIntro = `Jackfruit Finance has integrated data-driven strategies to ensure lending remains sustainable:`;

  leverageBullets: BulletListItem[] = [
    { text: `Baseline and Endline Data Collection – Tracking school growth and learning outcomes to measure the impact of financing.` },
    { text: `School Management Software Integration – Exploring financial tracking applications to assist ECD centers in managing revenue and forecasting financial needs.` },
    { text: `Incentive-Based Rewards & Social Emotional Learning Support – Encouraging financial literacy and business training by offering additional benefits for schools with strong repayment histories.` }
  ];

  beyondIntro = `While financial support is key to ensuring the sustainability of ECD providers, Jackfruit Foundation complements this with holistic interventions, such as Social Emotional Learning (SEL) programs, to ensure children are developmentally on track.`;

  beyondBulletsLeft: BulletListItem[] = [
    { text: `SEL Curriculum Integration – Through Jackfruit Foundation, eligible ECD centers gain access to structured Social Emotional Learning programs that help children develop self-awareness, emotional regulation, and social skills—essential for their overall cognitive and behavioral development.` },
    { text: `Capacity Building for Educators – Teachers receive training in child-centered learning techniques, equipping them to support young learners in developing resilience, confidence, and problem-solving abilities.` }
  ];

  beyondBulletsRight: BulletListItem[] = [
    { text: `Community Engagement & Parenting Support – Parents and caregivers are involved in SEL initiatives, ensuring that learning extends beyond the classroom and is reinforced at home.` },
    { text: `Integrated Sustainability Model – By integrating financial sustainability with child development support, Jackfruit Finance ensures that ECD providers are not just financially stable, but also delivering high-quality, developmentally appropriate education to Kenya’s youngest learners.` }
  ];

  pathForward: string[] = [
    `Jackfruit Finance’s approach has successfully expanded lending to viable ECD providers, ensuring that more schools receive the financial support they need to improve infrastructure, teaching quality, and student outcomes.`,
    `To scale inclusively, Jackfruit Finance is exploring blended financing models, including grants, concessional loans, and impact investments to lower the cost of credit for under-resourced ECD centers.`,
    `With Jackfruit Foundation’s SEL programs ensuring children’s developmental needs are met, and Jackfruit Finance’s tailored lending models supporting schools’ financial sustainability, this holistic approach is reshaping early education finance in Kenya. By continuously analyzing market data and adapting lending models, Jackfruit Finance is enabling more children to learn in well-supported, high-quality environments.`
  ];

  constructor() {}

  ngOnInit(): void {}
}
