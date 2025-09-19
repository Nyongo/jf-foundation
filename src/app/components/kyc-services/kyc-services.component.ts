import { Component } from '@angular/core'
import { ServiceHeaderComponent } from '../service-header/service-header.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-kyc-services',
  standalone: true,
  templateUrl: './kyc-services.component.html',
  styleUrl: './kyc-services.component.scss',
  imports: [ServiceHeaderComponent, HeaderComponent]
})
export class KycServicesComponent {}
