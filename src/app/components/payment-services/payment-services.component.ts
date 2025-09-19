import { Component } from '@angular/core'
import { ServiceHeaderComponent } from '../service-header/service-header.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-payment-services',
  standalone: true,
  templateUrl: './payment-services.component.html',
  styleUrl: './payment-services.component.scss',
  imports: [ServiceHeaderComponent, HeaderComponent]
})
export class PaymentServicesComponent {}
