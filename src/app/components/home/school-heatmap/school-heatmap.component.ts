import { Component, OnInit, OnDestroy } from '@angular/core'
import { environment } from '../../../../environments/environment'

interface SchoolLocation {
  name: string
  location: string
}

@Component({
  selector: 'app-school-heatmap',
  template: `
    <div class="w-full h-[500px] relative">
      <div id="map" class="w-full h-full"></div>
      <div
        *ngIf="!isMapLoaded"
        class="absolute inset-0 flex items-center justify-center bg-gray-100"
      >
        <div class="text-gray-600">Loading map...</div>
      </div>
      <div
        id="legend"
        class="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg border border-gray-200"
      >
        <div class="text-sm font-semibold mb-2">School Density</div>
        <div class="space-y-1">
          <div class="flex items-center">
            <div class="w-4 h-4 rounded-full bg-[#4B0000] mr-2"></div>
            <span class="text-xs">Extremely High (10+ schools)</span>
          </div>
          <div class="flex items-center">
            <div class="w-4 h-4 rounded-full bg-[#8B0000] mr-2"></div>
            <span class="text-xs">Very High (7-9 schools)</span>
          </div>
          <div class="flex items-center">
            <div class="w-4 h-4 rounded-full bg-[#FF0000] mr-2"></div>
            <span class="text-xs">High (5-6 schools)</span>
          </div>
          <div class="flex items-center">
            <div class="w-4 h-4 rounded-full bg-[#FF4500] mr-2"></div>
            <span class="text-xs">Medium-High (3-4 schools)</span>
          </div>
          <div class="flex items-center">
            <div class="w-4 h-4 rounded-full bg-[#FFA500] mr-2"></div>
            <span class="text-xs">Medium (2 schools)</span>
          </div>
          <div class="flex items-center">
            <div class="w-4 h-4 rounded-full bg-[#FFFF00] mr-2"></div>
            <span class="text-xs">Low (1 school)</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class SchoolHeatmapComponent implements OnInit, OnDestroy {
  private map: google.maps.Map | null = null
  private heatmap: google.maps.visualization.HeatmapLayer | null = null
  private markers: google.maps.Marker[] = []
  isMapLoaded: boolean = false
  private pendingLocations: SchoolLocation[] | null = null

  constructor() {}

  ngOnInit() {
    if (typeof google === 'undefined') {
      // Load Google Maps script
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=visualization`
      script.async = true
      script.defer = true
      script.onload = () => {
        this.initializeMap()
        this.isMapLoaded = true
        // If there are pending locations, update them now
        if (this.pendingLocations) {
          this.updateSchoolLocations(this.pendingLocations)
          this.pendingLocations = null
        }
      }
      script.onerror = () => {
        console.error('Failed to load Google Maps script')
        this.isMapLoaded = true
      }
      document.head.appendChild(script)
    } else {
      this.initializeMap()
      this.isMapLoaded = true
    }
  }

  ngOnDestroy() {
    // Clean up markers and heatmap
    this.markers.forEach((marker) => marker.setMap(null))
    if (this.heatmap) {
      this.heatmap.setMap(null)
    }
    this.markers = []
  }

  private initializeMap() {
    try {
      // Center the map on Kenya
      const kenyaCenter = { lat: -1.2921, lng: 36.8219 }

      this.map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: kenyaCenter,
          zoom: 7,
          mapTypeId: 'roadmap',
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#e9e9e9' }],
            },
            {
              featureType: 'landscape',
              elementType: 'geometry',
              stylers: [{ color: '#f5f5f5' }],
            },
            {
              featureType: 'administrative',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#666666' }],
            },
          ],
        },
      )

      // Initialize heatmap layer with density-focused configuration
      this.heatmap = new google.maps.visualization.HeatmapLayer({
        map: this.map,
        data: [], // Initialize with empty data array
        radius: 50, // Increased radius to show broader density patterns
        opacity: 1, // Maximum opacity for better visibility
        gradient: [
          'rgba(0, 255, 0, 0)', // Transparent
          'rgba(0, 255, 0, 0.3)', // Light green (low density)
          'rgba(255, 255, 0, 0.5)', // Yellow (medium-low density)
          'rgba(255, 165, 0, 0.7)', // Orange (medium density)
          'rgba(255, 69, 0, 0.8)', // Red-orange (medium-high density)
          'rgba(255, 0, 0, 0.9)', // Red (high density)
          'rgba(139, 0, 0, 1)', // Dark red (very high density)
          'rgba(75, 0, 0, 1)', // Very dark red (extremely high density)
        ],
      })

      // Add a control to toggle the heatmap
      const heatmapControl = document.createElement('div')
      heatmapControl.style.padding = '5px'
      heatmapControl.style.backgroundColor = 'white'
      heatmapControl.style.border = '1px solid #ccc'
      heatmapControl.style.borderRadius = '3px'
      heatmapControl.style.cursor = 'pointer'
      heatmapControl.innerHTML = 'Toggle Heatmap'
      heatmapControl.addEventListener('click', () => {
        if (this.heatmap) {
          this.heatmap.setMap(this.heatmap.getMap() ? null : this.map)
        }
      })

      this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(
        heatmapControl,
      )
    } catch (error) {
      console.error('Error initializing map:', error)
    }
  }

  updateSchoolLocations(locations: SchoolLocation[]) {
    if (!this.isMapLoaded) {
      console.log('Map not loaded yet, storing locations for later')
      this.pendingLocations = locations
      return
    }

    if (!this.map || !this.heatmap) {
      console.warn('Map or heatmap not initialized')
      return
    }

    try {
      console.log('Received locations in heatmap component:', locations)

      // Clear existing markers
      this.markers.forEach((marker) => marker.setMap(null))
      this.markers = []

      // Group locations by area (using a grid-based approach)
      const gridSize = 0.05 // Reduced grid size for more precise density mapping
      const locationGroups = new Map<
        string,
        { count: number; locations: SchoolLocation[] }
      >()

      locations.forEach((location) => {
        const [lat, lng] = location.location
          .split(',')
          .map((coord) => parseFloat(coord.trim()))
        // Create a grid key by rounding coordinates
        const gridKey = `${Math.round(lat / gridSize) * gridSize},${Math.round(lng / gridSize) * gridSize}`

        if (!locationGroups.has(gridKey)) {
          locationGroups.set(gridKey, { count: 0, locations: [] })
        }
        const group = locationGroups.get(gridKey)!
        group.count++
        group.locations.push(location)
      })

      // Convert grouped locations to heatmap data
      const heatmapData = Array.from(locationGroups.entries()).map(
        ([gridKey, group]) => {
          const [lat, lng] = gridKey
            .split(',')
            .map((coord) => parseFloat(coord))

          // Add markers for each location in the group
          group.locations.forEach((location) => {
            const [markerLat, markerLng] = location.location
              .split(',')
              .map((coord) => parseFloat(coord.trim()))
            const marker = new google.maps.Marker({
              position: { lat: markerLat, lng: markerLng },
              map: this.map,
              title: location.name,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 4,
                fillColor: '#4285F4',
                fillOpacity: 0.8,
                strokeColor: '#ffffff',
                strokeWeight: 1,
              },
            })

            marker.addListener('click', () => {
              const infoWindow = new google.maps.InfoWindow({
                content: `<div class="p-2">
                <strong>${location.name}</strong>
                <div>Schools in area: ${group.count}</div>
                <div>Density Level: ${this.getDensityLevel(group.count)}</div>
              </div>`,
              })
              infoWindow.open(this.map!, marker)
            })

            this.markers.push(marker)
          })

          // Calculate weight based on density level
          let weight = 1
          if (group.count >= 10)
            weight = 10 // Extremely High
          else if (group.count >= 7)
            weight = 8 // Very High
          else if (group.count >= 5)
            weight = 6 // High
          else if (group.count >= 3)
            weight = 4 // Medium-High
          else if (group.count >= 2) weight = 2 // Medium
          // Low density remains weight = 1

          return {
            location: new google.maps.LatLng(lat, lng),
            weight: weight,
          }
        },
      )

      console.log('Generated heatmap data:', heatmapData)
      // Update heatmap data
      this.heatmap.setData(heatmapData)
    } catch (error) {
      console.error('Error updating school locations:', error)
    }
  }

  private getDensityLevel(count: number): string {
    if (count >= 10) return 'Extremely High (Dark Red)'
    if (count >= 7) return 'Very High (Red)'
    if (count >= 5) return 'High (Red-Orange)'
    if (count >= 3) return 'Medium-High (Orange)'
    if (count >= 2) return 'Medium (Yellow)'
    return 'Low (Green)'
  }
}
