import { Component } from '@angular/core';
import { ServiceHeaderComponent } from '../service-header/service-header.component';

@Component({
  selector: 'app-our-team',
  standalone: true,
  imports: [ServiceHeaderComponent],
  templateUrl: './our-team.component.html',
  styleUrl: './our-team.component.scss',
})
export class OurTeamComponent {}
