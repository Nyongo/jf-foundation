import { Component } from '@angular/core'
import { ServiceHeaderComponent } from '../service-header/service-header.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-card-payments',
  standalone: true,
  templateUrl: './card-payments.component.html',
  styleUrl: './card-payments.component.scss',
  imports: [ServiceHeaderComponent, HeaderComponent]
})
export class CardPaymentsComponent {}
