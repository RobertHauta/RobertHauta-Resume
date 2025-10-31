export interface Project {
  id: string;
  title: string;
  brief_description: string;
  full_description: string;
  technologies: string[];
  technology_icons: string[];
  images: string[];
  learned?: string;
  github_url?: string;
  live_url?: string;
  date_range?: string;
}