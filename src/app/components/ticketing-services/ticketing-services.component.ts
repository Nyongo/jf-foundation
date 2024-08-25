import { Component } from '@angular/core';
import { ServiceHeaderComponent } from '../service-header/service-header.component';

@Component({
  selector: 'app-ticketing-services',
  standalone: true,
  imports: [ServiceHeaderComponent],
  templateUrl: './ticketing-services.component.html',
  styleUrl: './ticketing-services.component.scss',
})
export class TicketingServicesComponent {}
