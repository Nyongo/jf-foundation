import { DOCUMENT } from '@angular/common'
import { Inject, Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class SeoTestService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  testSeoElements(): { [key: string]: boolean | string } {
    const results: { [key: string]: boolean | string } = {}

    // Test Meta Tags
    results['title'] = !!this.document.title
    results['description'] = !!this.getMeta('description')
    results['keywords'] = !!this.getMeta('keywords')
    results['viewport'] = !!this.getMeta('viewport')
    results['robots'] = !!this.getMeta('robots')
    results['language'] = !!this.getMeta('language')

    // Test Open Graph Tags
    results['og:title'] = !!this.getMeta('og:title', 'property')
    results['og:description'] = !!this.getMeta('og:description', 'property')
    results['og:image'] = !!this.getMeta('og:image', 'property')
    results['og:url'] = !!this.getMeta('og:url', 'property')

    // Test Twitter Cards
    results['twitter:card'] = !!this.getMeta('twitter:card')
    results['twitter:title'] = !!this.getMeta('twitter:title')
    results['twitter:description'] = !!this.getMeta('twitter:description')
    results['twitter:image'] = !!this.getMeta('twitter:image')

    // Test Canonical URL
    results['canonical'] = !!this.document.querySelector(
      'link[rel="canonical"]',
    )

    // Test Structured Data
    results['structured-data'] = this.testStructuredData()

    // Test hreflang
    results['hreflang'] = !!this.document.querySelector(
      'link[rel="alternate"][hreflang]',
    )

    // Test Image Alt Tags
    const images = this.document.getElementsByTagName('img')
    let missingAlt = 0
    for (let i = 0; i < images.length; i++) {
      if (!images[i].alt) missingAlt++
    }
    results['images-missing-alt'] = `${missingAlt} images missing alt text`

    // Test Heading Hierarchy
    results['heading-hierarchy'] = this.testHeadingHierarchy()

    return results
  }

  private getMeta(
    name: string,
    attribute: 'name' | 'property' = 'name',
  ): string | null {
    const element = this.document.querySelector(`meta[${attribute}="${name}"]`)
    return element ? element.getAttribute('content') : null
  }

  private testStructuredData(): string {
    const scripts = this.document.querySelectorAll(
      'script[type="application/ld+json"]',
    )
    if (scripts.length === 0) return 'No structured data found'

    try {
      const types: string[] = []
      scripts.forEach((script) => {
        const data = JSON.parse(script.textContent || '{}')
        if (Array.isArray(data)) {
          data.forEach((item) => types.push(item['@type']))
        } else {
          types.push(data['@type'])
        }
      })
      return `Found types: ${types.join(', ')}`
    } catch (e) {
      return 'Invalid structured data'
    }
  }

  private testHeadingHierarchy(): string {
    const headings = this.document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    let lastLevel = 0
    let issues: string[] = []

    headings.forEach((heading) => {
      const level = parseInt(heading.tagName[1])
      if (level - lastLevel > 1) {
        issues.push(`Skip from h${lastLevel} to h${level}`)
      }
      lastLevel = level
    })

    return issues.length ? issues.join(', ') : 'Valid hierarchy'
  }
}
