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
import { HeaderComponent } from '../../header/header.component'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

interface SchoolLocation {
  name: string
  location: string
}

interface Metrics {
  totalNoOfSchools: number
  totalEnrolment: number
  totalMaleStudents: number
  totalFemaleStudents: number
  totalTeachers: number
  totalMaleTeachers: number
  totalFemaleTeachers: number
  runningWaterStats: { schoolsWithRunningWater: number; schoolsWithoutRunningWater: number }
  powerConnectivityStats: {
    schoolsWithKPLC: number
    schoolsWithSolar: number
    schoolsWithBoth: number
    schoolsWithoutPowerSupply: number
  }
  directorsStat: { female: number; male: number; total: number }
  feeCategoryStats: Record<string, number>
  statsGradeServed: { Primary: number; Secondary: number; Tertiary: number }
  computerLabStats: { schoolsWithComputerLab: number; schoolsWithoutComputerLab: number }
  yearStats: Record<string, any>
  schoolLocations: SchoolLocation[]
  [key: string]: any
}

const defaultMetrics: Metrics = {
  totalNoOfSchools: 0,
  totalEnrolment: 0,
  totalMaleStudents: 0,
  totalFemaleStudents: 0,
  totalTeachers: 0,
  totalMaleTeachers: 0,
  totalFemaleTeachers: 0,
  runningWaterStats: { schoolsWithRunningWater: 0, schoolsWithoutRunningWater: 0 },
  powerConnectivityStats: {
    schoolsWithKPLC: 0,
    schoolsWithSolar: 0,
    schoolsWithBoth: 0,
    schoolsWithoutPowerSupply: 0,
  },
  directorsStat: { female: 0, male: 0, total: 0 },
  feeCategoryStats: {
    '0-5000': 0,
    '5001-10000': 0,
    '10001-20000': 0,
    '>20000': 0,
  },
  statsGradeServed: { Primary: 0, Secondary: 0, Tertiary: 0 },
  computerLabStats: { schoolsWithComputerLab: 0, schoolsWithoutComputerLab: 0 },
  yearStats: {},
  schoolLocations: [],
}

@Component({
  selector: 'app-home-our-impact',
  standalone: true,
  templateUrl: './home-our-impact.component.html',
  styleUrl: './home-our-impact.component.scss',
  imports: [NgxChartsModule, SchoolHeatmapComponent, CommonModule, HeaderComponent, TranslateModule],
})
export class HomeOurImpactComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(SchoolHeatmapComponent) heatmapComponent!: SchoolHeatmapComponent
  private apiSubscription?: Subscription
  public metrics: Metrics = { ...defaultMetrics } // initialize with defaults
  public isExporting = false
  private isBrowser: boolean
  private isDataLoaded = false

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private http: HttpClient,
    private translate: TranslateService
  ) {
    this.isBrowser = isPlatformBrowser(platformId)
  }

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

  // Key Areas Chart Data (initial defaults)
  solarPowerData: any[] = [
    { name: this.translate.instant('Solar Powered Schools'), value: 45 },
    { name: this.translate.instant('In Progress'), value: 25 },
    { name: this.translate.instant('Planned'), value: 30 },
  ]

  waterConservationData: any[] = [
    { name: this.translate.instant('Water Harvesting'), value: 38 },
    { name: this.translate.instant('Efficient Systems'), value: 42 },
    { name: this.translate.instant('Conservation Programs'), value: 28 },
  ]

  teacherTrainingData: any[] = [
    {
      name: this.translate.instant('Trained Teachers'),
      series: [
        { name: '2021', value: 200 },
        { name: '2022', value: 350 },
        { name: '2023', value: 580 },
      ],
    },
  ]

  studentPerformanceData: any[] = [
    { name: this.translate.instant('Mathematics'), value: 78 },
    { name: this.translate.instant('Science'), value: 82 },
    { name: this.translate.instant('Languages'), value: 85 },
    { name: this.translate.instant('Technology'), value: 76 },
  ]

  digitalAdoptionData: any[] = [
    {
      name: this.translate.instant('Digital Tools Usage'),
      series: [
        { name: 'Q1', value: 45 },
        { name: 'Q2', value: 52 },
        { name: 'Q3', value: 65 },
        { name: 'Q4', value: 85 },
      ],
    },
  ]

  techIntegrationData: any[] = [
    { name: this.translate.instant('Science Labs'), value: 85 },
    { name: this.translate.instant('Computer Labs'), value: 92 },
    { name: this.translate.instant('Smart Classrooms'), value: 78 },
    { name: this.translate.instant('Digital Library'), value: 65 },
  ]

  genderLeadershipData: any[] = [
    { name: this.translate.instant('Female Leaders'), value: 48 },
    { name: this.translate.instant('Male Leaders'), value: 52 },
  ]

  inclusionImpactData: any[] = [
    {
      name: this.translate.instant('Program Participation'),
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
    domain: ['#48A225', '#FEE200', '#CFC0BB', '#7AA3E5'],
  }
  colorSchemePieGrid: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#48A225', '#FEE200', '#CFC0BB', '#7AA3E5'],
  }

  lineChartCustomColors = [
    { name: this.translate.instant('Male Students'), value: '#48A225' },
    { name: this.translate.instant('Female Students'), value: '#FF4081' },
    { name: this.translate.instant('Total Students'), value: '#CFC0BB' },
  ]

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
    return `${value}`
  }

  formatYAxis(value: any): string {
    return `${value}`
  }

  loadMetrics(): void {
    this.apiSubscription = this.http
      .get(
        // 'http://localhost:3000/spreadsheet/read?spreadsheetId=1E5FXJjfQBEj41OzXaJJ1vzwolLnoSe-FiVjIju9UbZA',
        'https://evzen.duckdns.org/spreadsheet/read?spreadsheetId=1E5FXJjfQBEj41OzXaJJ1vzwolLnoSe-FiVjIju9UbZA',
      )
      .subscribe({
        next: (response: any) => {
          // Merge response into defaults to ensure all expected keys exist
          const merged: Metrics = {
            ...defaultMetrics,
            ...(response || {}),
            runningWaterStats: {
              ...defaultMetrics.runningWaterStats,
              ...(response?.runningWaterStats || {}),
            },
            powerConnectivityStats: {
              ...defaultMetrics.powerConnectivityStats,
              ...(response?.powerConnectivityStats || {}),
            },
            directorsStat: {
              ...defaultMetrics.directorsStat,
              ...(response?.directorsStat || {}),
            },
            feeCategoryStats: {
              ...defaultMetrics.feeCategoryStats,
              ...(response?.feeCategoryStats || {}),
            },
            statsGradeServed: {
              ...defaultMetrics.statsGradeServed,
              ...(response?.statsGradeServed || {}),
            },
            computerLabStats: {
              ...defaultMetrics.computerLabStats,
              ...(response?.computerLabStats || {}),
            },
            yearStats: response?.yearStats || {},
            schoolLocations: response?.schoolLocations || [],
          }

          this.metrics = merged
          console.log('Data loaded successfully', merged)

          // Build chart data using merged metrics (safe access)
          this.enrolmentChartData = [
            { name: this.translate.instant('Male Students'), value: merged.totalMaleStudents },
            { name: this.translate.instant('Female Students'), value: merged.totalFemaleStudents },
          ]

          this.powerConnectivityChartData = [
            { name: 'KPLC', value: merged.powerConnectivityStats.schoolsWithKPLC },
            { name: this.translate.instant('Solar'), value: merged.powerConnectivityStats.schoolsWithSolar },
            { name: this.translate.instant('Both'), value: merged.powerConnectivityStats.schoolsWithBoth },
            { name: this.translate.instant('No Power'), value: merged.powerConnectivityStats.schoolsWithoutPowerSupply },
          ]

          this.pieGridDataStudents = [
            { name: this.translate.instant('Male Students'), value: merged.totalMaleStudents },
            { name: this.translate.instant('Female Students'), value: merged.totalFemaleStudents },
          ]
          this.pieGridDataTeachers = [
            { name: this.translate.instant('Male Teachers'), value: merged.totalMaleTeachers },
            { name: this.translate.instant('Female Teachers'), value: merged.totalFemaleTeachers },
          ]

          this.pieGridDataSchoolCategories = [
            { name: this.translate.instant('Primary'), value: merged.statsGradeServed.Primary },
            { name: this.translate.instant('Secondary'), value: merged.statsGradeServed.Secondary },
            // keep Tertiary non-zero (original added +1) - preserve original behavior if desired
            { name: this.translate.instant('Tertiary'), value: (merged.statsGradeServed.Tertiary || 0) + 1 },
          ]

          this.runningWaterChartData = [
            { name: this.translate.instant('With Running Water'), value: merged.runningWaterStats.schoolsWithRunningWater },
            { name: this.translate.instant('Without Running Water'), value: merged.runningWaterStats.schoolsWithoutRunningWater },
          ]

          this.schoolLocations = merged.schoolLocations || []
          console.log('School locations from API:', this.schoolLocations)

          // Update heatmap if component is available
          this.isDataLoaded = true
          if (this.heatmapComponent) {
            console.log('Updating heatmap with school locations')
            this.heatmapComponent.updateSchoolLocations(this.schoolLocations)
          } else {
            console.log('Heatmap component not available yet')
          }

          // Cumulative series for year-based charts (safe guards)
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

          const years = Object.keys(merged.yearStats || {})

          this.yearStatsTeaschersChartData = [
            {
              name: this.translate.instant('Male Teachers'),
              series: years.map((year) => {
                cumulativeMaleTeachers += merged.yearStats[year].totalMaleTeachers || 0
                return { name: year, value: cumulativeMaleTeachers }
              }),
            },
            {
              name: this.translate.instant('Female Teachers'),
              series: years.map((year) => {
                cumulativeFemaleTeachers += merged.yearStats[year].totalFemaleTeachers || 0
                return { name: year, value: cumulativeFemaleTeachers }
              }),
            },
            {
              name: this.translate.instant('Total Teachers'),
              series: years.map((year) => {
                cumulativeTotalTeachers +=
                  (merged.yearStats[year].totalMaleTeachers || 0) +
                  (merged.yearStats[year].totalFemaleTeachers || 0)
                return { name: year, value: cumulativeTotalTeachers }
              }),
            },
          ]

          this.yearStatsStudentsChartData = [
            {
              name: this.translate.instant('Male Students'),
              series: years.map((year) => {
                cumulativeMaleStudents += merged.yearStats[year].totalMaleStudents || 0
                return { name: year, value: cumulativeMaleStudents }
              }),
            },
            {
              name: this.translate.instant('Female Students'),
              series: years.map((year) => {
                cumulativeFemaleStudents += merged.yearStats[year].totalFemaleStudents || 0
                return { name: year, value: cumulativeFemaleStudents }
              }),
            },
            {
              name: this.translate.instant('Total Students'),
              series: years.map((year) => {
                cumulativeTotalStudents +=
                  (merged.yearStats[year].totalMaleStudents || 0) +
                  (merged.yearStats[year].totalFemaleStudents || 0)
                return { name: year, value: cumulativeTotalStudents }
              }),
            },
          ]

          this.yearStatsDirectorsChartData = [
            {
              name: this.translate.instant('Male Directors'),
              series: years.map((year) => {
                cumulativeMaleDirectors += merged.yearStats[year].totalMaleDirectors || 0
                return { name: year, value: cumulativeMaleDirectors }
              }),
            },
            {
              name: this.translate.instant('Female Directors'),
              series: years.map((year) => {
                cumulativeFemaleDirectors += merged.yearStats[year].totalFemaleDirectors || 0
                return { name: year, value: cumulativeFemaleDirectors }
              }),
            },
            {
              name: this.translate.instant('Total Directors'),
              series: years.map((year) => {
                cumulativeTotalDirectors +=
                  (merged.yearStats[year].totalMaleDirectors || 0) +
                  (merged.yearStats[year].totalFemaleDirectors || 0)
                return { name: year, value: cumulativeTotalDirectors }
              }),
            },
          ]

          // Prepare fee category data in both currencies using merged metrics
          this.feeCategoryChartDataKES = [
            { name: '0-5k KES', value: merged.feeCategoryStats['0-5000'] || 0 },
            { name: '5k-10k KES', value: merged.feeCategoryStats['5001-10000'] || 0 },
            { name: '10k-20k KES', value: merged.feeCategoryStats['10001-20000'] || 0 },
            { name: '>20k KES', value: merged.feeCategoryStats['>20000'] || 0 },
          ]

          this.feeCategoryChartDataUSD = [
            { name: '0-38 USD', value: merged.feeCategoryStats['0-5000'] || 0 },
            { name: '38-77 USD', value: merged.feeCategoryStats['5001-10000'] || 0 },
            { name: '77-154 USD', value: merged.feeCategoryStats['10001-20000'] || 0 },
            { name: '>154 USD', value: merged.feeCategoryStats['>20000'] || 0 },
          ]

          // Set initial chart data based on selected currency
          this.updateFeeCategoryChartData()

          // Calculate percentages with divide-by-zero guards
          const totalDirectors = merged.directorsStat?.total || 0
          this.femaleDirectorPercentage =
            totalDirectors === 0 ? 0 : Math.round((merged.directorsStat?.female || 0) / totalDirectors * 100)

          const totalTeachers = merged.totalTeachers || 0
          this.femaleTeacherPercentage =
            totalTeachers === 0 ? 0 : Math.round((merged.totalFemaleTeachers || 0) / totalTeachers * 100)

          const totalEnrol = merged.totalEnrolment || 0
          this.femaleStudentPercentage =
            totalEnrol === 0 ? 0 : Math.round((merged.totalFemaleStudents || 0) / totalEnrol * 100)

          // Update Key Areas Chart Data using merged metrics
          this.solarPowerData = [
            { name: 'KPLC Only', value: merged.powerConnectivityStats.schoolsWithKPLC },
            { name: this.translate.instant('Solar Only'), value: merged.powerConnectivityStats.schoolsWithSolar },
            { name: this.translate.instant('Both Sources'), value: merged.powerConnectivityStats.schoolsWithBoth },
            { name: this.translate.instant('No Power'), value: merged.powerConnectivityStats.schoolsWithoutPowerSupply },
          ]

          this.waterConservationData = [
            { name: this.translate.instant('With Running Water'), value: merged.runningWaterStats.schoolsWithRunningWater },
            { name: this.translate.instant('Without Running Water'), value: merged.runningWaterStats.schoolsWithoutRunningWater },
          ]

          this.teacherTrainingData = [
            {
              name: this.translate.instant('Male Teachers'),
              series: years.map((year) => ({
                name: year,
                value: merged.yearStats[year].totalMaleTeachers || 0,
              })),
            },
            {
              name: this.translate.instant('Female Teachers'),
              series: years.map((year) => ({
                name: year,
                value: merged.yearStats[year].totalFemaleTeachers || 0,
              })),
            },
          ]

          this.studentPerformanceData = [
            {
              name: this.translate.instant('Students Growth'),
              series: years.map((year) => ({
                name: year,
                value:
                  (merged.yearStats[year].totalMaleStudents || 0) +
                  (merged.yearStats[year].totalFemaleStudents || 0),
              })),
            },
          ]

          this.digitalAdoptionData = [
            {
              name: this.translate.instant('Computer Lab Access'),
              series: [
                {
                  name: this.translate.instant('With Computer Lab'),
                  value: merged.computerLabStats.schoolsWithComputerLab,
                },
                {
                  name: this.translate.instant('Without Computer Lab'),
                  value: merged.computerLabStats.schoolsWithoutComputerLab,
                },
              ],
            },
          ]

          this.techIntegrationData = [
            { name: this.translate.instant('With Computer Lab'), value: merged.computerLabStats.schoolsWithComputerLab },
            { name: this.translate.instant('Without Computer Lab'), value: merged.computerLabStats.schoolsWithoutComputerLab },
          ]

          this.genderLeadershipData = [
            { name: this.translate.instant('Female Directors'), value: merged.directorsStat.female || 0 },
            { name: this.translate.instant('Male Directors'), value: merged.directorsStat.male || 0 },
          ]

          this.inclusionImpactData = [
            {
              name: this.translate.instant('Male Students'),
              series: years.map((year) => ({
                name: year,
                value: merged.yearStats[year].totalMaleStudents || 0,
              })),
            },
            {
              name: this.translate.instant('Female Students'),
              series: years.map((year) => ({
                name: year,
                value: merged.yearStats[year].totalFemaleStudents || 0,
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
      this.selectedCurrency === 'USD' ? this.feeCategoryChartDataUSD : this.feeCategoryChartDataKES
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
