import { Component } from '@angular/core'
import { ServiceHeaderComponent } from '../service-header/service-header.component';

@Component({
  selector: 'app-card-payments',
  standalone: true,
  templateUrl: './card-payments.component.html',
  styleUrl: './card-payments.component.scss',
  imports: [ServiceHeaderComponent]
})
export class CardPaymentsComponent {}
