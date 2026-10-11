export interface AdminUser {
  id: string;
  email: string;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: AdminUser;
}

export interface ProjectDetailPayload {
  description: string;
  duration?: string;
  team?: string;
  tags?: { label: string; variant?: string }[];
  downloadUrl?: string;
  downloadLabel?: string;
  docUrl?: string;
  docLabel?: string;
  videoUrl?: string;
  media?: { type: 'video' | 'image'; src: string; alt?: string }[];
  thumbnails?: string[];
}

export interface ProjectPayload {
  id: string;
  title: string;
  category: 'game' | 'software' | 'web' | 'other';
  image: string;
  description?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  detailUrl?: string;
  detailLabel?: string;
  featured?: boolean;
  orderIndex?: number;
  detail?: ProjectDetailPayload;
}

export interface TimelinePayload {
  id?: string;
  period: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  type: 'edu' | 'pro' | 'online' | 'tech';
  link?: string;
  linkText?: string;
  orderIndex?: number;
}
