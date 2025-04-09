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
          ],
        },
      )

      // Initialize heatmap layer
      this.heatmap = new google.maps.visualization.HeatmapLayer({
        map: this.map,
        data: [], // Initialize with empty data array
        radius: 20, // Radius of influence for each point
        opacity: 0.8,
        gradient: [
          'rgba(0, 255, 255, 0)',
          'rgba(0, 255, 255, 1)',
          'rgba(0, 191, 255, 1)',
          'rgba(0, 127, 255, 1)',
          'rgba(0, 63, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(0, 0, 223, 1)',
          'rgba(0, 0, 191, 1)',
          'rgba(0, 0, 159, 1)',
          'rgba(0, 0, 127, 1)',
        ],
      })
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

      // Convert locations to heatmap data
      const heatmapData = locations.map((location) => {
        console.log('Processing location:', location)
        const [lat, lng] = location.location
          .split(',')
          .map((coord) => parseFloat(coord.trim()))

        console.log('Parsed coordinates:', { lat, lng })

        // Add marker for each school
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

        // Add click listener to show school name
        marker.addListener('click', () => {
          const infoWindow = new google.maps.InfoWindow({
            content: `<div class="p-2"><strong>${location.name}</strong></div>`,
          })
          infoWindow.open(this.map!, marker)
        })

        this.markers.push(marker)

        return {
          location: new google.maps.LatLng(lat, lng),
          weight: 1,
        }
      })

      console.log('Generated heatmap data:', heatmapData)
      // Update heatmap data
      this.heatmap.setData(heatmapData)
    } catch (error) {
      console.error('Error updating school locations:', error)
    }
  }
}
