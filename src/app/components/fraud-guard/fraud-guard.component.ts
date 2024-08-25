import { Component } from '@angular/core';
import { ServiceHeaderComponent } from '../service-header/service-header.component';

@Component({
  selector: 'app-fraud-guard',
  standalone: true,
  imports: [ServiceHeaderComponent],
  templateUrl: './fraud-guard.component.html',
  styleUrl: './fraud-guard.component.scss',
})
export class FraudGuardComponent {}
