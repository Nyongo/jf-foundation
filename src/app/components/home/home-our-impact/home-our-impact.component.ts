import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
} from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Subscription } from 'rxjs'
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts'
import { SchoolHeatmapComponent } from '../school-heatmap/school-heatmap.component'
import { CommonModule, isPlatformBrowser } from '@angular/common'
import html2canvas from 'html2canvas'

interface SchoolLocation {
  name: string
  location: string
}

@Component({
  selector: 'app-home-our-impact',
  standalone: true,
  templateUrl: './home-our-impact.component.html',
  styleUrl: './home-our-impact.component.scss',
  imports: [NgxChartsModule, SchoolHeatmapComponent, CommonModule],
})
export class HomeOurImpactComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild(SchoolHeatmapComponent) heatmapComponent!: SchoolHeatmapComponent
  private apiSubscription?: Subscription
  public metrics: any
  public isExporting = false
  private isBrowser: boolean
  private isDataLoaded = false

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

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private http: HttpClient,
  ) {
    this.isBrowser = isPlatformBrowser(platformId)
  }

  ngOnInit(): void {
    this.loadMetrics()
  }

  ngAfterViewInit() {
    // If data is already loaded, update the heatmap
    if (this.isDataLoaded && this.heatmapComponent) {
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
        // 'http://localhost:3000/spreadsheet/read?spreadsheetId=1E5FXJjfQBEj41OzXaJJ1vzwolLnoSe-FiVjIju9UbZA',
        'https://evzen.duckdns.org/spreadsheet/read?spreadsheetId=1E5FXJjfQBEj41OzXaJJ1vzwolLnoSe-FiVjIju9UbZA',
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
          console.log('School locations from API:', this.schoolLocations)

          // Mark data as loaded
          this.isDataLoaded = true

          // Update heatmap if component is available
          if (this.heatmapComponent) {
            console.log('Updating heatmap with school locations')
            this.heatmapComponent.updateSchoolLocations(this.schoolLocations)
          } else {
            console.log('Heatmap component not available yet')
          }

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

  async exportToPDF() {
    if (!this.isBrowser) {
      console.warn('Screenshot export is only available in browser environment')
      return
    }

    const element = document.getElementById('impact-content')
    if (!element) {
      console.error('Content element not found')
      return
    }

    this.isExporting = true

    try {
      // Force a re-render of charts by triggering change detection
      this.updateFeeCategoryChartData()

      // Wait for charts to be fully rendered with multiple checks
      const waitForCharts = async () => {
        for (let attempt = 0; attempt < 5; attempt++) {
          await new Promise((resolve) => setTimeout(resolve, 1000))
          const svgs = element.querySelectorAll('svg')
          console.log(
            `Attempt ${attempt + 1}: Found ${svgs.length} SVG elements`,
          )

          // Check if SVGs are properly rendered
          const allSvgsReady = Array.from(svgs).every((svg) => {
            const box = svg.getBoundingClientRect()
            return box.width > 0 && box.height > 0
          })

          if (allSvgsReady && svgs.length > 0) {
            console.log('All SVGs are ready')
            return true
          }
        }
        return false
      }

      const chartsReady = await waitForCharts()
      if (!chartsReady) {
        throw new Error('Charts failed to render properly')
      }

      // Process each SVG
      const svgElements = element.querySelectorAll('svg')
      console.log('Processing SVGs:', svgElements.length)

      // Add unique identifiers to SVGs
      svgElements.forEach((svg, index) => {
        svg.setAttribute('data-id', `chart-${index}`)
      })

      const svgCanvasPromises = Array.from(svgElements).map(
        async (svg, index) => {
          // Get computed styles and ensure valid dimensions
          const box = svg.getBoundingClientRect()
          const width = Math.max(box.width, 1)
          const height = Math.max(box.height, 1)

          console.log(`Processing SVG ${index + 1}:`, { width, height })

          // Create a new canvas with the same dimensions
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          if (!ctx) return Promise.resolve(false)

          // Set canvas dimensions
          canvas.width = width * 2
          canvas.height = height * 2
          canvas.style.width = width + 'px'
          canvas.style.height = height + 'px'
          ctx.scale(2, 2)

          // Convert SVG to data URL with foreignObject handling
          const svgData = new XMLSerializer().serializeToString(svg)
          const svgBlob = new Blob([svgData], {
            type: 'image/svg+xml;charset=utf-8',
          })
          const url = URL.createObjectURL(svgBlob)

          return new Promise((resolve) => {
            const img = new Image()
            img.crossOrigin = 'anonymous'

            img.onload = () => {
              ctx.drawImage(img, 0, 0, width, height)
              const tempParent = svg.parentNode
              if (tempParent) {
                const tempCanvas = document.createElement('canvas')
                tempCanvas.width = width * 2
                tempCanvas.height = height * 2
                tempCanvas.style.width = width + 'px'
                tempCanvas.style.height = height + 'px'
                const tempCtx = tempCanvas.getContext('2d')
                if (tempCtx) {
                  tempCtx.scale(2, 2)
                  tempCtx.drawImage(img, 0, 0, width, height)
                  svg.style.display = 'none' // Hide SVG instead of replacing
                  tempParent.insertBefore(tempCanvas, svg)
                }
              }
              URL.revokeObjectURL(url)
              resolve(true)
            }

            img.onerror = () => {
              console.error(`Failed to load SVG ${index + 1}`)
              URL.revokeObjectURL(url)
              resolve(false)
            }

            img.src = url
          })
        },
      )

      // Wait for all SVGs to be converted
      const results = await Promise.all(svgCanvasPromises)
      console.log('SVG processing complete:', results)

      // Take screenshot with high quality settings
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        foreignObjectRendering: true,
        removeContainer: false,
        ignoreElements: (element) => {
          // Ignore any temporary canvases we created
          return (
            element.tagName === 'CANVAS' &&
            element.hasAttribute('data-temp-canvas')
          )
        },
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById('impact-content')
          if (clonedElement) {
            // Set explicit dimensions
            clonedElement.style.width = element.scrollWidth + 'px'
            clonedElement.style.height = element.scrollHeight + 'px'

            // Ensure SVGs are visible and properly sized in clone
            clonedElement.querySelectorAll('svg').forEach((svg) => {
              const original = element.querySelector(
                `svg[data-id="${svg.getAttribute('data-id')}"]`,
              )
              if (original) {
                const box = original.getBoundingClientRect()
                svg.style.width = box.width + 'px'
                svg.style.height = box.height + 'px'
                svg.style.display = 'block'
              }
            })
          }
        },
      })

      // Convert to image and download
      const image = canvas.toDataURL('image/png', 1.0)
      const link = document.createElement('a')
      link.href = image
      link.download = 'jackfruit-foundation-impact.png'
      link.click()

      // Restore the page without full reload
      element.querySelectorAll('svg').forEach((svg) => {
        svg.style.display = '' // Restore SVG visibility
      })
      element.querySelectorAll('canvas').forEach((canvas) => {
        if (
          canvas.parentNode &&
          (canvas.nextSibling as Element)?.tagName === 'SVG'
        ) {
          canvas.parentNode.removeChild(canvas)
        }
      })
    } catch (error) {
      console.error('Error generating screenshot:', error)
      window.location.reload() // Only reload on error
    } finally {
      this.isExporting = false
    }
  }

  ngOnDestroy(): void {
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe()
    }
  }
}
