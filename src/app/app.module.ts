import { DecimalPipe } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { NgxChartsModule } from '@swimlane/ngx-charts'
import { RouterModule } from '@angular/router'
import { routes } from './app.routes'
import { SharedModule } from './shared.module';
import { HomeNewModule } from './components/home-new/home-new.module'

@NgModule({
  declarations: [
  ], // Declare components here
  imports: [
    SharedModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    //  CommonModule,
    NgxChartsModule,
    ReactiveFormsModule,
    FormsModule,
    HomeNewModule,
  ],
  providers: [DecimalPipe],
  bootstrap: [], // Only for root modules
})
export class AppModule {}
