import { Component } from '@angular/core'
import { ServiceHeaderComponent } from '../service-header/service-header.component';

@Component({
  selector: 'app-internet-services',
  standalone: true,
  templateUrl: './internet-services.component.html',
  styleUrl: './internet-services.component.scss',
  imports: [ServiceHeaderComponent]
})
export class InternetServicesComponent {}
