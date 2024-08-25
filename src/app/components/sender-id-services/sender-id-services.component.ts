import { Component } from '@angular/core';
import { ServiceHeaderComponent } from '../service-header/service-header.component';

@Component({
  selector: 'app-sender-id-services',
  standalone: true,
  imports: [ServiceHeaderComponent],
  templateUrl: './sender-id-services.component.html',
  styleUrl: './sender-id-services.component.scss',
})
export class SenderIdServicesComponent {}
