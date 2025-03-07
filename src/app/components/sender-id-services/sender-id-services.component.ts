import { Component } from '@angular/core'
import { ServiceHeaderComponent } from '../service-header/service-header.component';

@Component({
  selector: 'app-sender-id-services',
  standalone: true,
  templateUrl: './sender-id-services.component.html',
  styleUrl: './sender-id-services.component.scss',
  imports: [ServiceHeaderComponent]
})
export class SenderIdServicesComponent {}
