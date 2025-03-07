import { Component } from '@angular/core'
import { ServiceHeaderComponent } from '../service-header/service-header.component';

@Component({
  selector: 'app-crb-services',
  standalone: true,
  templateUrl: './crb-services.component.html',
  styleUrl: './crb-services.component.scss',
  imports: [ServiceHeaderComponent]
})
export class CrbServicesComponent {}
