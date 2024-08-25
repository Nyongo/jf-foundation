import { Component } from '@angular/core';
import { ServiceHeaderComponent } from '../service-header/service-header.component';

@Component({
  selector: 'app-electricity-services',
  standalone: true,
  imports: [ServiceHeaderComponent],
  templateUrl: './electricity-services.component.html',
  styleUrl: './electricity-services.component.scss',
})
export class ElectricityServicesComponent {}
