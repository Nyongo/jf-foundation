import { Component } from '@angular/core'
import { ServiceHeaderComponent } from '../service-header/service-header.component';

@Component({
  selector: 'app-paytv-services',
  standalone: true,
  templateUrl: './paytv-services.component.html',
  styleUrl: './paytv-services.component.scss',
  imports: [ServiceHeaderComponent]
})
export class PaytvServicesComponent {}
