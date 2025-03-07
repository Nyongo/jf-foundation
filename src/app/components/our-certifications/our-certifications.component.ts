import { Component } from '@angular/core'
import { ServiceHeaderComponent } from '../service-header/service-header.component';

@Component({
  selector: 'app-our-certifications',
  standalone: true,
  templateUrl: './our-certifications.component.html',
  styleUrl: './our-certifications.component.scss',
  imports: [ServiceHeaderComponent]
})
export class OurCertificationsComponent {}
