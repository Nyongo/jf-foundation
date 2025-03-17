import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {
  mission = {
    title: 'Our Mission',
    description:
      'To empower businesses and individuals through innovative technology solutions, making digital services accessible and efficient for all.',
    icon: 'assets/icons/mission.svg',
  }

  vision = {
    title: 'Our Vision',
    description:
      'To be the leading technology solutions provider in Africa, driving digital transformation and economic growth across the continent.',
    icon: 'assets/icons/vision.svg',
  }

  values = [
    {
      title: 'Innovation',
      description:
        'We constantly push boundaries to deliver cutting-edge solutions.',
      icon: 'assets/icons/innovation.svg',
    },
    {
      title: 'Integrity',
      description:
        'We maintain the highest standards of honesty and transparency.',
      icon: 'assets/icons/integrity.svg',
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in everything we do.',
      icon: 'assets/icons/excellence.svg',
    },
    {
      title: 'Customer Focus',
      description: 'Our customers are at the heart of everything we do.',
      icon: 'assets/icons/customer.svg',
    },
  ]

  stats = [
    { number: '10+', label: 'Years Experience' },
    { number: '500+', label: 'Clients Served' },
    { number: '50+', label: 'Team Members' },
    { number: '15+', label: 'Countries Reached' },
  ]
}
