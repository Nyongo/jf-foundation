import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

export interface ImpactStat {
  value: string;
  label: string;
}

@Component({
  selector: 'app-impact-stats',
  standalone: true,
  templateUrl: './impact-stats.component.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./impact-stats.component.scss']
})
export class ImpactStatsComponent {
  @Input() stats: ImpactStat[] = [];

  constructor(
    private readonly router: Router,
  ){}

  goTo(url: string) {
    this.router.navigate([url])
  }
}
