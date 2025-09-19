import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { TranslateModule } from '@ngx-translate/core';

interface AboutStats {
  label: string;
  value: string;
}

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TranslateModule],
  templateUrl: './about-us.component.html',
})
export class AboutUsComponent implements OnInit {
  introParagraphs: string[] = [
    `Jackfruit Foundation, founded in 2024, was established to advance equity, innovation, and quality education across Sub-Saharan Africa, addressing critical gaps in learning access, teacher capacity, and school sustainability.`,
    `As a non-profit arm of Jackfruit Finance, the Foundation enhances school performance through social impact programs that provide schools with the tools, training, and support needed to improve education quality. Through its Partner Reward Program, it incentivizes schools to adopt best practices, while its open-source AI system helps schools worldwide identify areas for improvement to achieve better learning outcomes.`,
    `By leveraging technology, data-driven insights, and global partnerships, Jackfruit Foundation empowers schools, educators, and students to create sustainable, high-impact educational solutions that drive long-term success.`,
  ];

  stats: AboutStats[] = [
    { label: 'Students',              value: '168k+'  },
    { label: 'School Projects',       value: '570+'   },
    { label: 'Partners',              value: '20+'    },
    { label: 'Philanthropic Funding', value: '$1.5M+' },
  ];

  ngOnInit(): void {}
}
