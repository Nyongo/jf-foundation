import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-service-header',
  standalone: true,
  templateUrl: './service-header.component.html',
  styleUrls: ['./service-header.component.scss'],
  imports: [CommonModule]
})
export class ServiceHeaderComponent {
  @Input() bannerText?: string = ''
  @Input() headingText?: string = ''
  @Input() descriptionText?: string = ''
  @Input() serviceTitle?: string = ''
  @Input() showBlueYellowDiv?: boolean = true

  constructor() {}
}
