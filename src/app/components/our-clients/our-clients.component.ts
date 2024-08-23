import { Component } from '@angular/core';
import { ServiceHeaderComponent } from '../service-header/service-header.component';

@Component({
  selector: 'app-our-clients',
  standalone: true,
  imports: [ServiceHeaderComponent],
  templateUrl: './our-clients.component.html',
  styleUrl: './our-clients.component.scss',
})
export class OurClientsComponent {}
