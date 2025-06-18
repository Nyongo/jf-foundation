import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  
})
export class FooterComponent {
  currentYear: number;
  
  constructor(
      private readonly router: Router,
    ){
      this.currentYear = new Date().getFullYear();
    }

  goTo(url: string) {
    this.router.navigate([url])
  }
}
