import { Component, OnInit } from '@angular/core'
import { Meta, Title } from '@angular/platform-browser'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { CanonicalService } from '../../../services/canonical.service'

@Component({
  selector: 'app-case-study-1',
  templateUrl: './case-study-1.component.html',
  styleUrls: ['./case-study-1.component.scss'],
})
export class CaseStudy1Component implements OnInit {
  structuredData: SafeHtml
  private readonly domain = 'https://www.jackfruit-foundation.org'

  constructor(
    private meta: Meta,
    private title: Title,
    private sanitizer: DomSanitizer,
    private canonicalService: CanonicalService,
  ) {
    this.structuredData = this.sanitizer.bypassSecurityTrustHtml(
      this.getStructuredData(),
    )
  }

  ngOnInit() {
    this.setMetaTags()
    this.addStructuredData()
    this.canonicalService.setCanonicalURL(
      `${this.domain}/case-studies/data-driven-lending`,
    )
  }

  private getStructuredData(): string {
    const articleData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline:
        'Data-Driven Lending: Transforming Early Childhood Education in Kenya',
      description:
        'Learn how Jackfruit Finance is revolutionizing early childhood education in Kenya through data-driven lending and innovative financial solutions.',
      image: `${this.domain}/assets/images/case-studies/1.jpg`,
      datePublished: '2024-03-20',
      dateModified: '2024-03-20',
      author: {
        '@type': 'Organization',
        name: 'Jackfruit Foundation',
        url: this.domain,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Jackfruit Foundation',
        logo: {
          '@type': 'ImageObject',
          url: `${this.domain}/assets/images/logos/jf-logo.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${this.domain}/case-studies/data-driven-lending`,
      },
      keywords:
        'ECD providers, Kenya education, education finance, early childhood development, financial inclusion',
      articleSection: 'Case Studies',
      wordCount: '1500',
      inLanguage: 'en-US',
    }

    const breadcrumbData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: this.domain,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Case Studies',
          item: `${this.domain}/case-studies`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Data-Driven Lending',
          item: `${this.domain}/case-studies/data-driven-lending`,
        },
      ],
    }

    const organizationData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Jackfruit Foundation',
      url: this.domain,
      logo: `${this.domain}/assets/images/logos/jf-logo.png`,
      sameAs: [
        'https://twitter.com/JackfruitFdn',
        'https://www.linkedin.com/company/jackfruit-foundation',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+254-XXX-XXX-XXX',
        contactType: 'customer service',
        areaServed: 'KE',
        availableLanguage: ['en', 'sw'],
      },
    }

    const faqData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does Jackfruit Finance support ECD providers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Jackfruit Finance provides data-driven lending solutions and financial support to Early Childhood Development (ECD) providers in Kenya, helping them improve infrastructure, teaching quality, and student outcomes.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the eligibility criteria for ECD centers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ECD centers need to have been operating for at least one year and have a minimum of 50 students. They should also demonstrate proper financial tracking through mobile money or bank payments.',
          },
        },
        {
          '@type': 'Question',
          name: 'What additional support does Jackfruit Foundation provide?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Beyond financing, Jackfruit Foundation provides Social Emotional Learning (SEL) programs, teacher training, and community engagement initiatives to ensure comprehensive development support.',
          },
        },
      ],
    }

    return `<script type="application/ld+json">${JSON.stringify([
      articleData,
      breadcrumbData,
      organizationData,
      faqData,
    ])}</script>`
  }

  private addStructuredData() {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(this.getStructuredData())
    document.head.appendChild(script)
  }

  private setMetaTags() {
    const title =
      'Data-Driven Lending: Transforming Early Childhood Education in Kenya | Jackfruit Foundation'
    const description =
      'Learn how Jackfruit Finance is revolutionizing early childhood education in Kenya through data-driven lending and innovative financial solutions.'

    this.title.setTitle(title)

    // Basic SEO
    this.meta.updateTag({ name: 'description', content: description })
    this.meta.updateTag({
      name: 'keywords',
      content:
        'ECD providers, Kenya education, education finance, early childhood development, financial inclusion, school funding, data-driven lending, social emotional learning, SEL programs',
    })
    this.meta.updateTag({ name: 'author', content: 'Jackfruit Foundation' })
    this.meta.updateTag({
      name: 'robots',
      content: 'index, follow, max-image-preview:large',
    })
    this.meta.updateTag({ name: 'language', content: 'en-US' })
    this.meta.updateTag({ name: 'geo.region', content: 'KE' })
    this.meta.updateTag({ name: 'geo.placename', content: 'Nairobi' })

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: title })
    this.meta.updateTag({ property: 'og:description', content: description })
    this.meta.updateTag({
      property: 'og:image',
      content: `${this.domain}/assets/images/case-studies/1.jpg`,
    })
    this.meta.updateTag({
      property: 'og:image:alt',
      content: 'Early Childhood Education in Kenya Case Study',
    })
    this.meta.updateTag({
      property: 'og:url',
      content: `${this.domain}/case-studies/data-driven-lending`,
    })
    this.meta.updateTag({ property: 'og:type', content: 'article' })
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'Jackfruit Foundation',
    })
    this.meta.updateTag({ property: 'og:locale', content: 'en_US' })
    this.meta.updateTag({
      property: 'article:published_time',
      content: '2024-03-20',
    })
    this.meta.updateTag({
      property: 'article:modified_time',
      content: '2024-03-20',
    })
    this.meta.updateTag({
      property: 'article:section',
      content: 'Case Studies',
    })

    // Twitter
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    })
    this.meta.updateTag({ name: 'twitter:site', content: '@JackfruitFdn' })
    this.meta.updateTag({ name: 'twitter:creator', content: '@JackfruitFdn' })
    this.meta.updateTag({ name: 'twitter:title', content: title })
    this.meta.updateTag({ name: 'twitter:description', content: description })
    this.meta.updateTag({
      name: 'twitter:image',
      content: `${this.domain}/assets/images/case-studies/1.jpg`,
    })
    this.meta.updateTag({
      name: 'twitter:image:alt',
      content: 'Early Childhood Education in Kenya Case Study',
    })
  }
}
