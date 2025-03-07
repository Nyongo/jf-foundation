import { Component } from '@angular/core'
import { ServiceHeaderComponent } from '../service-header/service-header.component';

@Component({
  selector: 'app-security',
  standalone: true,
  templateUrl: './security.component.html',
  styleUrl: './security.component.scss',
  imports: [ServiceHeaderComponent]
})
export class SecurityComponent {}
