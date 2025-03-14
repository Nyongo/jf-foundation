import { Routes } from '@angular/router'
import { HomeComponent } from './components/home/home.component'
import { UssdServicesComponent } from './components/ussd-services/ussd-services.component'
import { PaymentServicesComponent } from './components/payment-services/payment-services.component'
import { SecurityComponent } from './components/security/security.component'
import { CardPaymentsComponent } from './components/card-payments/card-payments.component'
import { OurCompanyComponent } from './components/our-company/our-company.component'
import { OurTeamComponent } from './components/our-team/our-team.component'
import { OurClientsComponent } from './components/our-clients/our-clients.component'
import { OurCertificationsComponent } from './components/our-certifications/our-certifications.component'
import { ContactUsComponent } from './components/contact-us/contact-us.component'
import { PaytvServicesComponent } from './components/paytv-services/paytv-services.component'
import { InternetServicesComponent } from './components/internet-services/internet-services.component'
import { KycServicesComponent } from './components/kyc-services/kyc-services.component'
import { TicketingServicesComponent } from './components/ticketing-services/ticketing-services.component'
import { CrbServicesComponent } from './components/crb-services/crb-services.component'
import { SmsServicesComponent } from './components/sms-services/sms-services.component'
import { SenderIdServicesComponent } from './components/sender-id-services/sender-id-services.component'
import { CaseStudiesComponent } from './components/case-studies/case-studies.component'
import { NewsletterComponent } from './components/newsletter/newsletter.component'

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    children: [
      { path: '', component: HomeComponent },
      { path: 'ussd-services', component: UssdServicesComponent },
      { path: 'paytv-services', component: PaytvServicesComponent },
      { path: 'internet-services', component: InternetServicesComponent },
      { path: 'kyc-services', component: KycServicesComponent },
      { path: 'ticketing-services', component: TicketingServicesComponent },
      { path: 'crb-services', component: CrbServicesComponent },
      { path: 'sms-services', component: SmsServicesComponent },
      { path: 'sender-id-services', component: SenderIdServicesComponent },
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
  { path: 'case-studies', component: CaseStudiesComponent },
  { path: 'newsletter', component: NewsletterComponent },
]
