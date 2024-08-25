import { Component } from '@angular/core';
import { ServiceHeaderComponent } from '../service-header/service-header.component';

@Component({
  selector: 'app-government-services',
  standalone: true,
  imports: [ServiceHeaderComponent],
  templateUrl: './government-services.component.html',
  styleUrl: './government-services.component.scss',
})
export class GovernmentServicesComponent {}
