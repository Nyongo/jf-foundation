import { Component } from '@angular/core'
import { ServiceHeaderComponent } from '../service-header/service-header.component';

@Component({
  selector: 'app-our-team',
  standalone: true,
  templateUrl: './our-team.component.html',
  styleUrl: './our-team.component.scss',
  imports: [ServiceHeaderComponent]
})
export class OurTeamComponent {}
