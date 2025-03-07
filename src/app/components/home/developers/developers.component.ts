import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrl: './developers.component.scss',
})
export class DevelopersComponent {
  constructor(private router: Router) {}

  goTo(url: string) {
    this.router.navigate([url])
  }
}
