import { Component } from '@angular/core'
import { ServiceHeaderComponent } from '../service-header/service-header.component';

@Component({
  selector: 'app-our-clients',
  standalone: true,
  templateUrl: './our-clients.component.html',
  styleUrl: './our-clients.component.scss',
  imports: [ServiceHeaderComponent]
})
export class OurClientsComponent {}
