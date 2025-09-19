import { Component } from '@angular/core'
import { ServiceHeaderComponent } from '../service-header/service-header.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-internet-services',
  standalone: true,
  templateUrl: './internet-services.component.html',
  styleUrl: './internet-services.component.scss',
  imports: [ServiceHeaderComponent, HeaderComponent]
})
export class InternetServicesComponent {}
