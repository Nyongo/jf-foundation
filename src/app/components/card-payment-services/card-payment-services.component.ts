import { Component } from '@angular/core';
import { ServiceHeaderComponent } from '../service-header/service-header.component';

@Component({
  selector: 'app-card-payment-services',
  standalone: true,
  imports: [ServiceHeaderComponent],
  templateUrl: './card-payment-services.component.html',
  styleUrl: './card-payment-services.component.scss',
})
export class CardPaymentServicesComponent {}
