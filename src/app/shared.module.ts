import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ServiceHeaderComponent } from './components/service-header/service-header.component'

@NgModule({
  declarations: [ServiceHeaderComponent],
  imports: [CommonModule],
  exports: [ServiceHeaderComponent], // ✅ Export it for use in other modules
})
export class SharedModule {}
