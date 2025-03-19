import { Injectable, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'

@Injectable({
  providedIn: 'root',
})
export class CanonicalService {
  constructor(@Inject(DOCUMENT) private dom: Document) {}

  setCanonicalURL(url?: string) {
    const canURL = url || this.dom.URL
    const link: HTMLLinkElement = this.dom.createElement('link')
    link.setAttribute('rel', 'canonical')
    this.dom.head.appendChild(link)
    link.setAttribute('href', canURL)
  }

  updateCanonicalURL(url: string) {
    const canonicalElement = this.dom.querySelector('link[rel="canonical"]')
    if (canonicalElement) {
      canonicalElement.setAttribute('href', url)
    } else {
      this.setCanonicalURL(url)
    }
  }
}
