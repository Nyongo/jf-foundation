import { Component } from '@angular/core';
import { ServiceHeaderComponent } from '../service-header/service-header.component';

@Component({
  selector: 'app-ussd-services',
  standalone: true,
  imports: [ServiceHeaderComponent],
  templateUrl: './ussd-services.component.html',
  styleUrl: './ussd-services.component.scss',
})
export class UssdServicesComponent {}
