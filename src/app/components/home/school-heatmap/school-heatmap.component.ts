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

      // Initialize heatmap layer with new configuration
      this.heatmap = new google.maps.visualization.HeatmapLayer({
        map: this.map,
        data: [],
        radius: 50,
        opacity: 1.0,
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
      // Clear existing markers
      this.markers.forEach((marker) => marker.setMap(null))
      this.markers = []

      // Create weighted data points for the heatmap
      const heatmapData: { location: google.maps.LatLng; weight: number }[] = []

      // Process each location
      locations.forEach((location) => {
        try {
          const coords = location.location
            .split(',')
            .map((coord) => parseFloat(coord.trim()))

          // Skip invalid coordinates
          if (coords.length !== 2 || isNaN(coords[0]) || isNaN(coords[1])) {
            console.warn('Invalid coordinates for location:', location)
            return
          }

          const lat = coords[0]
          const lng = coords[1]

          // Add marker
          const marker = new google.maps.Marker({
            position: { lat, lng },
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

          // Count nearby schools
          const nearbyCount = locations.filter((other) => {
            try {
              const otherCoords = other.location
                .split(',')
                .map((coord) => parseFloat(coord.trim()))
              if (
                otherCoords.length !== 2 ||
                isNaN(otherCoords[0]) ||
                isNaN(otherCoords[1])
              ) {
                return false
              }
              const distance = Math.sqrt(
                Math.pow(lat - otherCoords[0], 2) +
                  Math.pow(lng - otherCoords[1], 2),
              )
              return distance <= 0.02
            } catch (e) {
              return false
            }
          }).length

          // Add click listener
          marker.addListener('click', () => {
            const infoWindow = new google.maps.InfoWindow({
              content: `<div class="p-2">
                <strong>${location.name}</strong>
                <div>Schools in area: ${nearbyCount}</div>
                <div>Density Level: ${this.getDensityLevel(nearbyCount)}</div>
              </div>`,
            })
            infoWindow.open(this.map!, marker)
          })

          this.markers.push(marker)

          // Add heatmap point
          const weight = Math.min(nearbyCount, 10)
          heatmapData.push({
            location: new google.maps.LatLng(lat, lng),
            weight: weight,
          })
        } catch (e) {
          console.warn('Error processing location:', location, e)
        }
      })

      // Update heatmap data and options
      if (this.heatmap) {
        this.heatmap.setData(heatmapData)

        // Update heatmap options
        const newHeatmap = new google.maps.visualization.HeatmapLayer({
          data: heatmapData,
          map: this.map,
          radius: 50,
          opacity: 1,
          gradient: [
            'rgba(0, 255, 0, 0)',
            'rgba(0, 255, 0, 1)',
            'rgba(255, 255, 0, 1)',
            'rgba(255, 128, 0, 1)',
            'rgba(255, 0, 0, 1)',
            'rgba(139, 0, 0, 1)',
          ],
        })

        // Remove old heatmap and update reference
        this.heatmap.setMap(null)
        this.heatmap = newHeatmap
      }
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
