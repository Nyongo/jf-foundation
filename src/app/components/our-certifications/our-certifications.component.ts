import { Component } from '@angular/core';
import { ServiceHeaderComponent } from '../service-header/service-header.component';

@Component({
  selector: 'app-our-certifications',
  standalone: true,
  imports: [ServiceHeaderComponent],
  templateUrl: './our-certifications.component.html',
  styleUrl: './our-certifications.component.scss',
})
export class OurCertificationsComponent {}
