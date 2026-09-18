export type TimelineCategory = 'edu' | 'pro' | 'online' | 'tech';

export interface Project {
  id: string;
  title: string;
  category: 'engine' | 'game' | 'web' | 'other';
  image: string;
  description?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  detailUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    icon?: string;
  }[];
}

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  type: TimelineCategory; // Flag discriminant pour l'icône et le style (badge/pastille)
  link?: string;
  linkText?: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  availability: string;
  email: string;
  linkedin: string;
  github: string;
  resumeUrl: string;
}
