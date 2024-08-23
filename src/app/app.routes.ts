import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MessagingServicesComponent } from './components/messaging-services/messaging-services.component';
import { UssdServicesComponent } from './components/ussd-services/ussd-services.component';
import { PaymentServicesComponent } from './components/payment-services/payment-services.component';
import { SecurityComponent } from './components/security/security.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'messaging-services', component: MessagingServicesComponent },
  { path: 'ussd-services', component: UssdServicesComponent },
  { path: 'payment-services', component: PaymentServicesComponent },
  { path: 'security', component: SecurityComponent },
];
