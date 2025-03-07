import { Component } from '@angular/core'
import { ServiceHeaderComponent } from '../service-header/service-header.component';

@Component({
  selector: 'app-kyc-services',
  standalone: true,
  templateUrl: './kyc-services.component.html',
  styleUrl: './kyc-services.component.scss',
  imports: [ServiceHeaderComponent]
})
export class KycServicesComponent {}
