export interface Newsletter {
  id: string;
  order: number;
  title: string;
  date: string;
  description: string;
  imageUrl?: string;    // Data‑URL
  category: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Banner {
  eyebrow: string;
  headline: string;
  subtitle?: string;
  imageUrl?: string;    // Data‑URL
}

export interface Cta {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

// Newsletter sections 
export type SectionType = 'banner' | 'content';
export interface SectionDataBanner {
  eyebrow: string;
  headline: string;
  subtitle?: string;
  imageUrl?: string;
  videoUrl?: string;
}
export interface SectionDataContent {
  title: string;
  description: string;
  column2Description?: string;
  imagePosition?: 'none'|'left'|'right';
  divider?: boolean;
  intro?: string;
  outro?: string;
  imageUrl?: string;
}
export type SectionData = SectionDataBanner | SectionDataContent;
export interface SectionMedia { id: string; mimeType: string; blob: Uint8Array; }
export interface NewsletterSection {
  id: string;
  newsletterId: string;
  order: number;
  type: SectionType;
  data: SectionData;
  media: SectionMedia[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
