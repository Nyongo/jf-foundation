import { Component } from '@angular/core'
import { HeaderComponent } from './components/header/header.component'
import { RouterModule } from '@angular/router'
import { FooterComponent } from './components/footer/footer.component'
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [HeaderComponent, FooterComponent, RouterModule]
})
export class AppComponent {
  title = 'JackFruit Foundation'
}
