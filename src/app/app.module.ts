import { DecimalPipe } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { NgxChartsModule } from '@swimlane/ngx-charts'
import { CardPaymentsComponent } from './components/card-payments/card-payments.component'
import { HomeComponent } from './components/home/home.component'
import { HomeOurImpactComponent } from './components/home/home-our-impact/home-our-impact.component'
import { OurClientsComponent } from './components/our-clients/our-clients.component'
import { OurCompanyComponent } from './components/our-company/our-company.component'
import { TicketingServicesComponent } from './components/ticketing-services/ticketing-services.component'
import { UssdServicesComponent } from './components/ussd-services/ussd-services.component'
import { SmsServicesComponent } from './components/sms-services/sms-services.component'
import { SenderIdServicesComponent } from './components/sender-id-services/sender-id-services.component'
import { SecurityComponent } from './components/security/security.component'
import { PaytvServicesComponent } from './components/paytv-services/paytv-services.component'
import { PaymentServicesComponent } from './components/payment-services/payment-services.component'
import { OurCertificationsComponent } from './components/our-certifications/our-certifications.component'
import { MenusComponent } from './components/menus/menus.component'
import { KycServicesComponent } from './components/kyc-services/kyc-services.component'
import { CrbServicesComponent } from './components/crb-services/crb-services.component'
import { FooterComponent } from './components/footer/footer.component'
import { InternetServicesComponent } from './components/internet-services/internet-services.component'
import { HeaderComponent } from './components/header/header.component'
import { ContactUsComponent } from './components/contact-us/contact-us.component'
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component'
import { SliderComponent } from './components/slider/slider.component'
import { OurTeamComponent } from './components/our-team/our-team.component'
import { routes } from './app.routes'
import { SharedModule } from './shared.module'

@NgModule({
  declarations: [
    AppComponent,
    MenusComponent,
    FooterComponent,
    HeaderComponent,
    SliderComponent,
    CardPaymentsComponent,
    HomeComponent,
    HomeOurImpactComponent,
    OurClientsComponent,
    OurCompanyComponent,
    TicketingServicesComponent,
    UssdServicesComponent,
    SmsServicesComponent,
    SenderIdServicesComponent,
    SecurityComponent,
    PaytvServicesComponent,
    PaymentServicesComponent,
    OurCertificationsComponent,
    KycServicesComponent,
    CrbServicesComponent,
    InternetServicesComponent,
    ContactUsComponent,
    OurTeamComponent,
  ], // Declare components here
  imports: [
    SharedModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    //  CommonModule,
    NgxChartsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent], // Only for root modules
})
export class AppModule {}
