import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  locale?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
  structuredData?: any;
}

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  private readonly defaultImage = 'https://www.jackfruitnetwork.com/assets/images/logos/JF-network-logo-white.svg';
  private readonly siteName = 'JF Network';
  private readonly siteUrl = 'https://www.jackfruitnetwork.com';

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private document: Document
  ) {}

  updateSEO(data: SEOData): void {
    // Update title
    this.title.setTitle(data.title);

    // Basic meta tags
    this.meta.updateTag({ name: 'description', content: data.description });
    
    if (data.keywords) {
      this.meta.updateTag({ name: 'keywords', content: data.keywords });
    }

    // Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:image', content: data.image || this.defaultImage });
    this.meta.updateTag({ property: 'og:url', content: data.url || this.siteUrl });
    this.meta.updateTag({ property: 'og:type', content: data.type || 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: data.siteName || this.siteName });
    this.meta.updateTag({ property: 'og:locale', content: data.locale || 'en_US' });

    // Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: data.twitterCard || 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: data.title });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    this.meta.updateTag({ name: 'twitter:image', content: data.image || this.defaultImage });
    
    if (data.twitterSite) {
      this.meta.updateTag({ name: 'twitter:site', content: data.twitterSite });
    }
    
    if (data.twitterCreator) {
      this.meta.updateTag({ name: 'twitter:creator', content: data.twitterCreator });
    }

    // Canonical URL
    this.updateCanonicalUrl(data.url);

    // Structured data
    if (data.structuredData) {
      this.addStructuredData(data.structuredData);
    }
  }

  private updateCanonicalUrl(url?: string): void {
    const canonicalUrl = url || this.siteUrl;
    
    // Remove existing canonical link
    const existingCanonical = this.document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    // Add new canonical link
    const link: HTMLLinkElement = this.document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', canonicalUrl);
    this.document.head.appendChild(link);
  }

  private addStructuredData(data: any): void {
    // Remove existing structured data
    const existingScript = this.document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  // Predefined SEO data for different pages
  getHomePageSEO(): SEOData {
    return {
      title: 'JF Network - Empowering Education Through Finance, Foundation & Hub',
      description: 'Jackfruit Network provides comprehensive education solutions through JF Finance (school financing), JF Foundation (teacher training), and JF Hub (procurement). Empowering schools across Kenya with accessible, flexible solutions.',
      keywords: 'education finance, school loans, teacher training, school procurement, Kenya education, private schools, education funding, school supplies, JF Network, Jackfruit Finance, Jackfruit Foundation, Jackfruit Hub',
      url: this.siteUrl,
      type: 'website',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'JF Network',
        url: this.siteUrl,
        logo: this.defaultImage,
        description: 'Comprehensive education solutions provider in Kenya',
        sameAs: [
          'https://www.youtube.com/channel/UCA002cRnUk2jFyz4TMGQxvg',
          'https://www.tiktok.com/@jackfruitnetwork',
          'https://web.whatsapp.com/send?phone=254110701174'
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+254110701174',
          contactType: 'customer service',
          availableLanguage: ['English', 'Kiswahili']
        },
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'KE',
          addressLocality: 'Nairobi'
        }
      }
    };
  }

  getFinancePageSEO(): SEOData {
    return {
      title: 'JF Finance - School Financing Solutions in Kenya | Jackfruit Finance',
      description: 'Get fast, accessible, and flexible financing for private schools in Kenya. JF Finance provides termly payment options, competitive rates, and comprehensive support for school growth and development.',
      keywords: 'school financing, private school loans, education funding Kenya, school development loans, termly payments, school infrastructure, JF Finance, Jackfruit Finance',
      url: `${this.siteUrl}/jackfruit-finance`,
      type: 'website',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'JF Finance - School Financing',
        description: 'Fast, accessible, flexible financing for private schools in Kenya',
        provider: {
          '@type': 'Organization',
          name: 'JF Network',
          url: this.siteUrl
        },
        areaServed: {
          '@type': 'Country',
          name: 'Kenya'
        },
        serviceType: 'Education Financing'
      }
    };
  }

  getFoundationPageSEO(): SEOData {
    return {
      title: 'JF Foundation - Teacher Training & Education Empowerment | Jackfruit Foundation',
      description: 'Empowering teachers and improving education quality through JF Foundation. Professional development, training programs, and educational resources for teachers across Kenya.',
      keywords: 'teacher training, education empowerment, teacher development, professional development, education quality, JF Foundation, Jackfruit Foundation, Kenya education',
      url: `${this.siteUrl}/jackfruit-foundation`,
      type: 'website',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'JF Foundation - Teacher Training',
        description: 'Teacher training and education empowerment programs',
        provider: {
          '@type': 'Organization',
          name: 'JF Network',
          url: this.siteUrl
        },
        areaServed: {
          '@type': 'Country',
          name: 'Kenya'
        },
        serviceType: 'Education Training'
      }
    };
  }

  getHubPageSEO(): SEOData {
    return {
      title: 'JF Hub - School Procurement & Supply Solutions | Jackfruit Hub',
      description: 'Your one-stop solution for all school procurement needs. JF Hub provides quality school supplies, equipment, and resources at competitive prices for private schools in Kenya.',
      keywords: 'school procurement, school supplies, education equipment, school resources, JF Hub, Jackfruit Hub, Kenya schools, educational materials',
      url: `${this.siteUrl}/jackfruit-hub`,
      type: 'website',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'JF Hub - School Procurement',
        description: 'Comprehensive school procurement and supply solutions',
        provider: {
          '@type': 'Organization',
          name: 'JF Network',
          url: this.siteUrl
        },
        areaServed: {
          '@type': 'Country',
          name: 'Kenya'
        },
        serviceType: 'Education Procurement'
      }
    };
  }

  getFAQPageSEO(): SEOData {
    return {
      title: 'Frequently Asked Questions - JF Network | School Finance & Education Solutions',
      description: 'Find answers to common questions about JF Network services including school financing, teacher training, and procurement solutions. Get help with your education needs.',
      keywords: 'FAQ, frequently asked questions, JF Network help, school finance questions, education solutions, support',
      url: `${this.siteUrl}/faq`,
      type: 'website'
    };
  }

  getTermsPageSEO(): SEOData {
    return {
      title: 'Terms & Conditions - JF Network | Legal Information',
      description: 'Read the terms and conditions for JF Network services. Understand our policies for school financing, teacher training, and procurement solutions.',
      keywords: 'terms and conditions, legal information, JF Network policies, service terms',
      url: `${this.siteUrl}/terms`,
      type: 'website'
    };
  }

  getContactPageSEO(): SEOData {
    return {
      title: 'Contact Us - JF Network | Get in Touch for Education Solutions',
      description: 'Contact JF Network for school financing, teacher training, and procurement solutions. Get personalized support for your education needs in Kenya.',
      keywords: 'contact JF Network, education support, school financing contact, teacher training contact, procurement support',
      url: `${this.siteUrl}/contact-us`,
      type: 'website',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact JF Network',
        description: 'Get in touch with JF Network for education solutions',
        mainEntity: {
          '@type': 'Organization',
          name: 'JF Network',
          url: this.siteUrl,
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+254110701174',
            contactType: 'customer service',
            availableLanguage: ['English', 'Kiswahili']
          }
        }
      }
    };
  }
}
