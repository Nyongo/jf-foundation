import { Component } from '@angular/core';
import { ServiceHeaderComponent } from '../service-header/service-header.component';

@Component({
  selector: 'app-payment-services',
  standalone: true,
  imports: [ServiceHeaderComponent],
  templateUrl: './payment-services.component.html',
  styleUrl: './payment-services.component.scss',
})
export class PaymentServicesComponent {}
