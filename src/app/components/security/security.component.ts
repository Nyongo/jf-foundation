import { Component } from '@angular/core'
import { ServiceHeaderComponent } from '../service-header/service-header.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-security',
  standalone: true,
  templateUrl: './security.component.html',
  styleUrl: './security.component.scss',
  imports: [ServiceHeaderComponent, HeaderComponent]
})
export class SecurityComponent {}
