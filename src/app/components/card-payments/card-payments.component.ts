import { Component } from '@angular/core';
import { ServiceHeaderComponent } from '../service-header/service-header.component';

@Component({
  selector: 'app-card-payments',
  standalone: true,
  imports: [ServiceHeaderComponent],
  templateUrl: './card-payments.component.html',
  styleUrl: './card-payments.component.scss',
})
export class CardPaymentsComponent {}
