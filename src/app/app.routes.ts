import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MessagingServicesComponent } from './components/messaging-services/messaging-services.component';
import { UssdServicesComponent } from './components/ussd-services/ussd-services.component';
import { PaymentServicesComponent } from './components/payment-services/payment-services.component';
import { SecurityComponent } from './components/security/security.component';
import { CardPaymentsComponent } from './components/card-payments/card-payments.component';
import { OurCompanyComponent } from './components/our-company/our-company.component';
import { OurTeamComponent } from './components/our-team/our-team.component';
import { OurClientsComponent } from './components/our-clients/our-clients.component';
import { OurCertificationsComponent } from './components/our-certifications/our-certifications.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    children: [
      { path: '', component: HomeComponent },
      { path: 'messaging-services', component: MessagingServicesComponent },
      { path: 'ussd-services', component: UssdServicesComponent },
    ],
  },
  {
    path: 'payments',
    children: [
      { path: '', component: PaymentServicesComponent },
      { path: 'cards', component: CardPaymentsComponent },
    ],
  },
  {
    path: 'company',
    children: [
      { path: '', component: OurCompanyComponent },
      { path: 'team', component: OurTeamComponent },
      { path: 'clients', component: OurClientsComponent },
      { path: 'certifications', component: OurCertificationsComponent },
    ],
  },

  { path: 'security', component: SecurityComponent },
  { path: 'contact-us', component: ContactUsComponent },
];
