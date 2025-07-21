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
  description: string;            // column 1
  column2Description?: string;    // column 2 when divider=true
  imagePosition?: 'left' | 'right' | 'none';
  divider?: boolean;
  intro?: string;
  outro?: string;
}

export type SectionData = SectionDataBanner | SectionDataContent;

export interface SectionMedia {
  id: string;
  mimeType: string;
  blob: Uint8Array;
}

export interface CaseStudySection {
  id: string;
  caseStudyId: string;
  order: number;
  type: SectionType;
  data: SectionData;
  media: SectionMedia[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
