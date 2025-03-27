import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Subscription } from 'rxjs'
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts'
import { SchoolHeatmapComponent } from '../school-heatmap/school-heatmap.component'

interface SchoolLocation {
  name: string
  location: string
}

@Component({
  selector: 'app-home-our-impact',
  standalone: true,
  templateUrl: './home-our-impact.component.html',
  styleUrl: './home-our-impact.component.scss',
  imports: [NgxChartsModule, SchoolHeatmapComponent],
})
export class HomeOurImpactComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild(SchoolHeatmapComponent) heatmapComponent!: SchoolHeatmapComponent
  private apiSubscription?: Subscription
  public metrics: any

  // Currency conversion
  public selectedCurrency: 'USD' | 'KES' = 'USD'
  private readonly USD_TO_KES_RATE = 130 // Example rate, you should update this with actual rate

  // Percentage calculations
  public femaleDirectorPercentage: number = 0
  public femaleTeacherPercentage: number = 0
  public femaleStudentPercentage: number = 0
  public schoolLocations: SchoolLocation[] = []

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
  feeCategoryChartDataUSD: any[] = []
  feeCategoryChartDataKES: any[] = []
  pieGridDataSchoolCategories: any[] = []

  // Key Areas Chart Data
  solarPowerData: any[] = [
    { name: 'Solar Powered Schools', value: 45 },
    { name: 'In Progress', value: 25 },
    { name: 'Planned', value: 30 },
  ]

  waterConservationData: any[] = [
    { name: 'Water Harvesting', value: 38 },
    { name: 'Efficient Systems', value: 42 },
    { name: 'Conservation Programs', value: 28 },
  ]

  teacherTrainingData: any[] = [
    {
      name: 'Trained Teachers',
      series: [
        { name: '2021', value: 200 },
        { name: '2022', value: 350 },
        { name: '2023', value: 580 },
      ],
    },
  ]

  studentPerformanceData: any[] = [
    { name: 'Mathematics', value: 78 },
    { name: 'Science', value: 82 },
    { name: 'Languages', value: 85 },
    { name: 'Technology', value: 76 },
  ]

  digitalAdoptionData: any[] = [
    {
      name: 'Digital Tools Usage',
      series: [
        { name: 'Q1', value: 45 },
        { name: 'Q2', value: 52 },
        { name: 'Q3', value: 65 },
        { name: 'Q4', value: 85 },
      ],
    },
  ]

  techIntegrationData: any[] = [
    { name: 'Science Labs', value: 85 },
    { name: 'Computer Labs', value: 92 },
    { name: 'Smart Classrooms', value: 78 },
    { name: 'Digital Library', value: 65 },
  ]

  genderLeadershipData: any[] = [
    { name: 'Female Leaders', value: 48 },
    { name: 'Male Leaders', value: 52 },
  ]

  inclusionImpactData: any[] = [
    {
      name: 'Program Participation',
      series: [
        { name: '2021', value: 320 },
        { name: '2022', value: 480 },
        { name: '2023', value: 720 },
      ],
    },
  ]

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

  ngAfterViewInit() {
    if (this.heatmapComponent) {
      this.heatmapComponent.updateSchoolLocations(this.schoolLocations)
    }
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
        'http://localhost:3000/spreadsheet/read?spreadsheetId=1E5FXJjfQBEj41OzXaJJ1vzwolLnoSe-FiVjIju9UbZA',
        // 'https://evzen.duckdns.org/spreadsheet/read?spreadsheetId=1E5FXJjfQBEj41OzXaJJ1vzwolLnoSe-FiVjIju9UbZA',
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

          this.schoolLocations = response.schoolLocations

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

          // Prepare fee category data in both currencies
          this.feeCategoryChartDataKES = [
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

          this.feeCategoryChartDataUSD = [
            { name: '0-38 USD', value: response.feeCategoryStats['0-5000'] },
            {
              name: '38-77 USD',
              value: response.feeCategoryStats['5001-10000'],
            },
            {
              name: '77-154 USD',
              value: response.feeCategoryStats['10001-20000'],
            },
            { name: '>154 USD', value: response.feeCategoryStats['>20000'] },
          ]

          // Set initial chart data based on selected currency
          this.updateFeeCategoryChartData()

          // Calculate percentages
          this.femaleDirectorPercentage = Math.round(
            (response.directorsStat.female / response.directorsStat.total) *
              100,
          )
          this.femaleTeacherPercentage = Math.round(
            (response.totalFemaleTeachers / response.totalTeachers) * 100,
          )
          this.femaleStudentPercentage = Math.round(
            (response.totalFemaleStudents / response.totalEnrolment) * 100,
          )

          // Update Key Areas Chart Data
          this.solarPowerData = [
            {
              name: 'KPLC Only',
              value: response.powerConnectivityStats.schoolsWithKPLC,
            },
            {
              name: 'Solar Only',
              value: response.powerConnectivityStats.schoolsWithSolar,
            },
            {
              name: 'Both Sources',
              value: response.powerConnectivityStats.schoolsWithBoth,
            },
            {
              name: 'No Power',
              value: response.powerConnectivityStats.schoolsWithoutPowerSupply,
            },
          ]

          this.waterConservationData = [
            {
              name: 'With Running Water',
              value: response.runningWaterStats.schoolsWithRunningWater,
            },
            {
              name: 'Without Running Water',
              value: response.runningWaterStats.schoolsWithoutRunningWater,
            },
          ]

          this.teacherTrainingData = [
            {
              name: 'Male Teachers',
              series: Object.keys(response.yearStats).map((year) => ({
                name: year,
                value: response.yearStats[year].totalMaleTeachers,
              })),
            },
            {
              name: 'Female Teachers',
              series: Object.keys(response.yearStats).map((year) => ({
                name: year,
                value: response.yearStats[year].totalFemaleTeachers,
              })),
            },
          ]

          this.studentPerformanceData = [
            {
              name: 'Students Growth',
              series: Object.keys(response.yearStats).map((year) => ({
                name: year,
                value:
                  response.yearStats[year].totalMaleStudents +
                  response.yearStats[year].totalFemaleStudents,
              })),
            },
          ]

          this.digitalAdoptionData = [
            {
              name: 'Computer Lab Access',
              series: [
                {
                  name: 'With Computer Lab',
                  value: response.computerLabStats.schoolsWithComputerLab,
                },
                {
                  name: 'Without Computer Lab',
                  value: response.computerLabStats.schoolsWithoutComputerLab,
                },
              ],
            },
          ]

          this.techIntegrationData = [
            {
              name: 'With Computer Lab',
              value: response.computerLabStats.schoolsWithComputerLab,
            },
            {
              name: 'Without Computer Lab',
              value: response.computerLabStats.schoolsWithoutComputerLab,
            },
          ]

          this.genderLeadershipData = [
            { name: 'Female Directors', value: response.directorsStat.female },
            { name: 'Male Directors', value: response.directorsStat.male },
          ]

          this.inclusionImpactData = [
            {
              name: 'Male Students',
              series: Object.keys(response.yearStats).map((year) => ({
                name: year,
                value: response.yearStats[year].totalMaleStudents,
              })),
            },
            {
              name: 'Female Students',
              series: Object.keys(response.yearStats).map((year) => ({
                name: year,
                value: response.yearStats[year].totalFemaleStudents,
              })),
            },
          ]

          // Update the heatmap with school locations
          if (this.heatmapComponent) {
            this.heatmapComponent.updateSchoolLocations(this.schoolLocations)
          }
        },
        error: (error) => {
          console.error('Error loading data', error)
        },
      })
  }

  updateFeeCategoryChartData(): void {
    this.feeCategoryChartData =
      this.selectedCurrency === 'USD'
        ? this.feeCategoryChartDataUSD
        : this.feeCategoryChartDataKES
  }

  onCurrencyChange(event: Event): void {
    const select = event.target as HTMLSelectElement
    this.selectedCurrency = select.value as 'USD' | 'KES'
    this.updateFeeCategoryChartData()
  }

  ngOnDestroy(): void {
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe()
    }
  }
}
