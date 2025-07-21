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
import { CaseStudyDetailComponent } from './components/case-studies/case-study-detail/case-study-detail.component'
import { NewsletterComponent } from './components/newsletter/newsletter.component'
import { NewsletterDetailComponent } from './components/newsletter/newsletter-detail/newsletter-detail.component'
import { AboutUsComponent } from './components/about-us/about-us.component'
import { VideoPlayerComponent } from './components/video-player/video-player.component'
import { CaseStudy1Component } from './components/case-studies/case-study-1/case-study-1.component'
import { CaseStudy2Component } from './components/case-studies/case-study-2/case-study-2.component'
import { HomeOurImpactComponent } from './components/home/home-our-impact/home-our-impact.component'
import { LoanCalculatorComponent } from './components/loan-calculator/loan-calculator.component'
import { HomeNewComponent } from './components/home-new/home-new/home-new.component'
import { CaseStudiesAdminPageComponent } from './components/admin/case-study/case-studies-admin-page/case-studies-admin-page.component'
import { CaseStudySectionsAdminComponent } from './components/admin/case-study/case-study-sections-admin/case-study-sections-admin.component'
import { NewsletterAdminPageComponent } from './components/admin/newsletter/newsletter-admin/newsletter-admin-page.component'
import { NewsletterSectionsAdminComponent } from './components/admin/newsletter/newsletter-sections-admin/newsletter-sections-admin.component'
import { AuthGuard } from './services/auth.guard'
import { LoginComponent } from './components/login/login.component'

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    children: [
      { path: '', component: HomeNewComponent },
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
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      { path: 'case-studies', component: CaseStudiesAdminPageComponent },
      { path: 'case-studies/:caseStudyId/sections', component: CaseStudySectionsAdminComponent },
      { path: 'newsletters', component: NewsletterAdminPageComponent },
      { path: 'newsletters/:newsletterId/sections', component: NewsletterSectionsAdminComponent },
    ],
  },
  {
    path: 'case-studies',
    children: [
      { path: '', component: CaseStudiesComponent },
      { path: ':id', component: CaseStudyDetailComponent },  
    ],
  },
  {
    path: 'newsletters',
    children: [
      { path: '', component: NewsletterComponent },
      { path: ':id', component: NewsletterDetailComponent },  
    ],
  },
  { path: 'our-impact', component: HomeOurImpactComponent },
  { path: 'about-us', component: OurCompanyComponent },
  { path: 'security', component: SecurityComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'video', component: VideoPlayerComponent },
  {
    path: 'calculator',
    component: LoanCalculatorComponent,
  },
  // { path: 'home-new', component: HomeNewComponent },
]
