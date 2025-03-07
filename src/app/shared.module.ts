import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ServiceHeaderComponent } from './components/service-header/service-header.component'

@NgModule({
  imports: [CommonModule,ServiceHeaderComponent],
  exports: [ServiceHeaderComponent], // ✅ Export it for use in other modules
})
export class SharedModule {}
