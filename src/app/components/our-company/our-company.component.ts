import { Component } from '@angular/core'
import { ServiceHeaderComponent } from '../service-header/service-header.component'

@Component({
  selector: 'app-our-company',
  standalone: true,
  templateUrl: './our-company.component.html',
  styleUrl: './our-company.component.scss',
  imports: [ServiceHeaderComponent],
})
export class OurCompanyComponent {}
