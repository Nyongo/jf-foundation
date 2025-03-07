import { Component } from '@angular/core'
import { ServiceHeaderComponent } from '../service-header/service-header.component';

@Component({
  selector: 'app-payment-services',
  standalone: true,
  templateUrl: './payment-services.component.html',
  styleUrl: './payment-services.component.scss',
  imports: [ServiceHeaderComponent]
})
export class PaymentServicesComponent {}
