import { Component } from '@angular/core';
import { ServiceHeaderComponent } from '../service-header/service-header.component';

@Component({
  selector: 'app-water-services',
  standalone: true,
  imports: [ServiceHeaderComponent],
  templateUrl: './water-services.component.html',
  styleUrl: './water-services.component.scss',
})
export class WaterServicesComponent {}
