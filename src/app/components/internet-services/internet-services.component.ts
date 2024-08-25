import { Component } from '@angular/core';
import { ServiceHeaderComponent } from '../service-header/service-header.component';

@Component({
  selector: 'app-internet-services',
  standalone: true,
  imports: [ServiceHeaderComponent],
  templateUrl: './internet-services.component.html',
  styleUrl: './internet-services.component.scss',
})
export class InternetServicesComponent {}
