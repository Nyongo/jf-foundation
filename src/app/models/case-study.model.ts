export interface Stat {
  value: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  order: number;
  title: string;
  description: string;
  imageUrl?: string;    // holds the data-URL of the uploaded file
  stats: Stat[];        // exactly 3 entries
  link?: string;        
  isActive: boolean;
  createdAt: string;    // ISO
  updatedAt: string;    // ISO
}
export interface Banner {
  eyebrow: string;
  headline: string;
  subtitle?: string;
  imageUrl?: string;
}
export interface Cta {
  title: string;
  description: string;
  buttonText: string;
  buttonRoute: string;
}
