declare namespace google.maps {
  class Map {
    constructor(element: HTMLElement, options: MapOptions)
    setCenter(latLng: LatLng | LatLngLiteral): void
    setZoom(zoom: number): void
    controls: {
      [key: string]: any[]
    }
  }

  namespace ControlPosition {
    const TOP_RIGHT: string
  }

  class LatLng {
    constructor(lat: number, lng: number)
  }

  class Marker {
    constructor(options: MarkerOptions)
    setMap(map: Map | null): void
    addListener(eventName: string, handler: () => void): void
  }

  class InfoWindow {
    constructor(options: InfoWindowOptions)
    open(map: Map, marker: Marker): void
  }

  namespace visualization {
    class HeatmapLayer {
      constructor(options: HeatmapLayerOptions)
      setMap(map: Map | null): void
      getMap(): Map | null
      setData(data: WeightedLocation[]): void
    }
  }

  interface MapOptions {
    center: LatLng | LatLngLiteral
    zoom: number
    mapTypeId: string
    styles?: MapTypeStyle[]
  }

  interface MarkerOptions {
    position: LatLng | LatLngLiteral
    map: Map | null
    title?: string
    icon?: Symbol | string
  }

  interface InfoWindowOptions {
    content: string
  }

  interface HeatmapLayerOptions {
    map: Map | null
    data: WeightedLocation[]
    radius?: number
    opacity?: number
    gradient?: string[]
  }

  interface WeightedLocation {
    location: LatLng
    weight: number
  }

  interface LatLngLiteral {
    lat: number
    lng: number
  }

  interface MapTypeStyle {
    featureType?: string
    elementType?: string
    stylers: { [key: string]: any }[]
  }

  namespace SymbolPath {
    const CIRCLE: string
  }

  interface Symbol {
    path: string
    scale: number
    fillColor: string
    fillOpacity: number
    strokeColor: string
    strokeWeight: number
  }
}
