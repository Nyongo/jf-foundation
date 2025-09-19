import { Component } from '@angular/core'
import { ServiceHeaderComponent } from '../service-header/service-header.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-ticketing-services',
  standalone: true,
  templateUrl: './ticketing-services.component.html',
  styleUrl: './ticketing-services.component.scss',
  imports: [ServiceHeaderComponent, HeaderComponent]
})
export class TicketingServicesComponent {}
