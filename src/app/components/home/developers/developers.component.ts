import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Router, RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-developers',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './developers.component.html',
  styleUrl: './developers.component.scss',
})
export class DevelopersComponent {
  constructor(private router: Router) {}

  goTo(url: string) {
    this.router.navigate([url])
  }
}
