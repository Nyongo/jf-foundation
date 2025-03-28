import { Component } from '@angular/core'
import { ServiceHeaderComponent } from '../service-header/service-header.component';

@Component({
  selector: 'app-sms-services',
  standalone: true,
  templateUrl: './sms-services.component.html',
  styleUrl: './sms-services.component.scss',
  imports: [ServiceHeaderComponent]
})
export class SmsServicesComponent {}
