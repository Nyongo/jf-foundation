import { Component, inject, OnDestroy, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Subscription } from 'rxjs'
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts'

@Component({
  selector: 'app-home-our-impact',
  standalone: true,
  templateUrl: './home-our-impact.component.html',
  styleUrl: './home-our-impact.component.scss',
  imports: [ NgxChartsModule]
})
export class HomeOurImpactComponent implements OnInit, OnDestroy {
  private apiSubscription?: Subscription
  public metrics: any

  // Chart data
  enrolmentChartData: any[] = []
  powerConnectivityChartData: any[] = []
  pieGridDataStudents: { name: string; value: number }[] = []
  pieGridDataTeachers: { name: string; value: number }[] = []
  runningWaterChartData: { name: string; value: number }[] = []
  yearStatsTeaschersChartData: any[] = []
  yearStatsStudentsChartData: any[] = []
  yearStatsDirectorsChartData: any[] = []
  feeCategoryChartData: any[] = []
  pieGridDataSchoolCategories: any[] = []

  // Chart options
  view: [number, number] = [600, 750]
  showLegend = true
  showLabels = true
  gradient = false
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5EB0BE', '#FEE200', '#CFC0BB', '#7AA3E5'],
  }
  colorSchemePieGrid: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5EB0BE', '#FEE200', '#CFC0BB', '#7AA3E5'],
  }

  lineChartCustomColors = [
    { name: 'Male Students', value: '#5EB0BE' }, // Lighter Blue
    { name: 'Female Students', value: '#FF4081' }, // Bright Pink (Highlighted)
    { name: 'Total Students', value: '#CFC0BB' }, // Muted Gray
  ]

  private readonly http = inject(HttpClient)

  ngOnInit(): void {
    this.loadMetrics()
  }

  formatXAxis(value: any): string {
    return `${value}` // Ensures the year values appear correctly
  }

  formatYAxis(value: any): string {
    return `${value}` // Formats Y-axis values (optional customization)
  }

  loadMetrics(): void {
    this.apiSubscription = this.http
      .get(
        //  'http://localhost:3000/spreadsheet/read?spreadsheetId=1E5FXJjfQBEj41OzXaJJ1vzwolLnoSe-FiVjIju9UbZA',
        'http://161.35.105.65:3000/spreadsheet/read?spreadsheetId=1E5FXJjfQBEj41OzXaJJ1vzwolLnoSe-FiVjIju9UbZA',
      )
      .subscribe({
        next: (response: any) => {
          this.metrics = response
          console.log('Data loaded successfully', response)

          this.enrolmentChartData = [
            { name: 'Male Students', value: response.totalMaleStudents },
            { name: 'Female Students', value: response.totalFemaleStudents },
          ]

          this.powerConnectivityChartData = [
            {
              name: 'KPLC',
              value: response.powerConnectivityStats.schoolsWithKPLC,
            },
            {
              name: 'Solar',
              value: response.powerConnectivityStats.schoolsWithSolar,
            },
            {
              name: 'Both',
              value: response.powerConnectivityStats.schoolsWithBoth,
            },
            {
              name: 'No Power',
              value: response.powerConnectivityStats.schoolsWithoutPowerSupply,
            },
          ]

          // Prepare Pie Grid Data
          this.pieGridDataStudents = [
            { name: 'Male Students', value: response.totalMaleStudents },
            { name: 'Female Students', value: response.totalFemaleStudents },
          ]
          this.pieGridDataTeachers = [
            { name: 'Male Teachers', value: response.totalMaleTeachers },
            { name: 'Female Teachers', value: response.totalFemaleTeachers },
          ]

          this.pieGridDataSchoolCategories = [
            { name: 'Primary', value: response.statsGradeServed.Primary },
            { name: 'Secondary', value: response.statsGradeServed.Secondary },
            { name: 'Tertiary', value: response.statsGradeServed.Tertiary + 1 },
          ]
          this.runningWaterChartData = [
            {
              name: 'With Running Water',
              value: response.runningWaterStats.schoolsWithRunningWater,
            },
            {
              name: 'Without Running Water',
              value: response.runningWaterStats.schoolsWithoutRunningWater,
            },
          ]

          let cumulativeSchools = 0
          let cumulativeMaleStudents = 0
          let cumulativeFemaleStudents = 0
          let cumulativeMaleTeachers = 0
          let cumulativeFemaleTeachers = 0
          let cumulativeTotalStudents = 0
          let cumulativeTotalTeachers = 0
          let cumulativeMaleDirectors = 0
          let cumulativeFemaleDirectors = 0
          let cumulativeTotalDirectors = 0

          this.yearStatsTeaschersChartData = [
            {
              name: 'Male Teachers',
              series: Object.keys(response.yearStats).map((year) => {
                cumulativeMaleTeachers +=
                  response.yearStats[year].totalMaleTeachers
                return { name: year, value: cumulativeMaleTeachers }
              }),
            },
            {
              name: 'Female Teachers',
              series: Object.keys(response.yearStats).map((year) => {
                cumulativeFemaleTeachers +=
                  response.yearStats[year].totalFemaleTeachers
                return { name: year, value: cumulativeFemaleTeachers }
              }),
            },
            {
              name: 'Total Teachers',
              series: Object.keys(response.yearStats).map((year) => {
                cumulativeTotalTeachers +=
                  response.yearStats[year].totalMaleTeachers +
                  response.yearStats[year].totalFemaleTeachers
                return { name: year, value: cumulativeTotalTeachers }
              }),
            },
          ]

          // 📌 Cumulative calculation for Students (Male, Female & Total)

          this.yearStatsStudentsChartData = [
            {
              name: 'Male Students',
              series: Object.keys(response.yearStats).map((year) => {
                cumulativeMaleStudents +=
                  response.yearStats[year].totalMaleStudents
                return { name: year, value: cumulativeMaleStudents }
              }),
            },
            {
              name: 'Female Students',
              series: Object.keys(response.yearStats).map((year) => {
                cumulativeFemaleStudents +=
                  response.yearStats[year].totalFemaleStudents
                return { name: year, value: cumulativeFemaleStudents }
              }),
            },
            {
              name: 'Total Students',
              series: Object.keys(response.yearStats).map((year) => {
                cumulativeTotalStudents +=
                  response.yearStats[year].totalMaleStudents +
                  response.yearStats[year].totalFemaleStudents
                return { name: year, value: cumulativeTotalStudents }
              }),
            },
          ]

          this.yearStatsDirectorsChartData = [
            {
              name: 'Male Directors',
              series: Object.keys(response.yearStats).map((year) => {
                cumulativeMaleDirectors +=
                  response.yearStats[year].totalMaleDirectors
                return { name: year, value: cumulativeMaleDirectors }
              }),
            },
            {
              name: 'Female Directors',
              series: Object.keys(response.yearStats).map((year) => {
                cumulativeFemaleDirectors +=
                  response.yearStats[year].totalFemaleDirectors
                return { name: year, value: cumulativeFemaleDirectors }
              }),
            },
            {
              name: 'Total Directors',
              series: Object.keys(response.yearStats).map((year) => {
                cumulativeTotalDirectors +=
                  response.yearStats[year].totalMaleDirectors +
                  response.yearStats[year].totalFemaleDirectors
                return { name: year, value: cumulativeTotalDirectors }
              }),
            },
          ]

          this.feeCategoryChartData = [
            { name: '0-5k KES', value: response.feeCategoryStats['0-5000'] },
            {
              name: '5k-10k KES',
              value: response.feeCategoryStats['5001-10000'],
            },
            {
              name: '10k-20k KES',
              value: response.feeCategoryStats['10001-20000'],
            },
            { name: '>20k KES', value: response.feeCategoryStats['>20000'] },
          ]
        },
        error: (error) => {
          console.error('Error loading data', error)
        },
      })
  }

  ngOnDestroy(): void {
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe()
    }
  }
}
