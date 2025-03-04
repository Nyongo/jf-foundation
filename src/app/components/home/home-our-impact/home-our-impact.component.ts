import { Component, OnDestroy, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Subscription } from 'rxjs'
import { DecimalPipe } from '@angular/common'

@Component({
  selector: 'app-home-our-impact',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './home-our-impact.component.html',
  styleUrl: './home-our-impact.component.scss',
})
export class HomeOurImpactComponent implements OnInit, OnDestroy {
  private apiSubscription?: Subscription
  public metrics: any

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.loadMetrics()
  }

  loadMetrics(): void {
    this.apiSubscription = this.http
      .get(
        'http://localhost:3000/spreadsheet/read?spreadsheetId=1E5FXJjfQBEj41OzXaJJ1vzwolLnoSe-FiVjIju9UbZA',
      )
      .subscribe({
        next: (response) => {
          this.metrics = response
          console.log('Data loaded successfully', response)
        },
        error: (error) => {
          console.error('Error loading data', error)
        },
      })
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed')

    // Unsubscribe to avoid memory leaks
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe()
    }
  }
}
