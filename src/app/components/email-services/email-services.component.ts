import { Component } from '@angular/core';
import { ServiceHeaderComponent } from '../service-header/service-header.component';

@Component({
  selector: 'app-email-services',
  standalone: true,
  imports: [ServiceHeaderComponent],
  templateUrl: './email-services.component.html',
  styleUrl: './email-services.component.scss',
})
export class EmailServicesComponent {}
