import { AdminUser, AuthResponse, ProjectPayload, TimelinePayload } from '../types/admin';
import { Project, TimelineItem } from '../types';
import { ProjectDetailData } from '../data/projectDetails';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001/api').replace(/\/+$/, '');

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

function getStoredToken(): string | null {
  return localStorage.getItem('admin_token');
}

export function setStoredToken(token: string | null): void {
  if (token) {
    localStorage.setItem('admin_token', token);
  } else {
    localStorage.removeItem('admin_token');
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // If token is invalid or expired
    if (token) {
      setStoredToken(null);
      if (window.location.hash.startsWith('#/admin') && !window.location.hash.startsWith('#/admin/login')) {
        window.location.hash = '#/admin/login';
      }
    }
  }

  if (!response.ok) {
    let errorMsg = `HTTP Error ${response.status}`;
    try {
      const errorJson = await response.json();
      if (errorJson && errorJson.message) {
        errorMsg = Array.isArray(errorJson.message) ? errorJson.message.join(', ') : errorJson.message;
      }
    } catch {
      // ignore json parse error
    }
    throw new ApiError(response.status, errorMsg);
  }

  return response.json();
}

export const api = {
  // Auth
  async login(email: string, password: string): Promise<AuthResponse> {
    const data = await request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setStoredToken(data.accessToken);
    return data;
  },

  async getMe(): Promise<AdminUser> {
    return request<AdminUser>('/auth/me', { method: 'GET' });
  },

  logout(): void {
    setStoredToken(null);
  },

  // Media
  async uploadMedia(file: File): Promise<{ url: string; originalName: string; size: number }> {
    const formData = new FormData();
    formData.append('file', file);
    return request<{ url: string; originalName: string; size: number }>('/media/upload', {
      method: 'POST',
      body: formData,
    });
  },

  // Projects (Public & Admin)
  async getProjects(): Promise<(Project & { detail?: ProjectDetailData; orderIndex: number })[]> {
    return request('/projects', { method: 'GET' });
  },

  async getProject(id: string): Promise<Project & { detail?: ProjectDetailData }> {
    return request(`/projects/${id}`, { method: 'GET' });
  },

  async createProject(payload: ProjectPayload): Promise<Project> {
    return request('/projects', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateProject(id: string, payload: Partial<ProjectPayload>): Promise<Project> {
    return request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deleteProject(id: string): Promise<{ success: boolean }> {
    return request(`/projects/${id}`, { method: 'DELETE' });
  },

  async reorderProjects(orders: { id: string; orderIndex: number }[]): Promise<{ success: boolean }> {
    return request('/projects/reorder', {
      method: 'PATCH',
      body: JSON.stringify({ orders }),
    });
  },

  // Timeline (Public & Admin)
  async getTimeline(): Promise<(TimelineItem & { orderIndex: number })[]> {
    return request('/timeline', { method: 'GET' });
  },

  async createTimelineItem(payload: TimelinePayload): Promise<TimelineItem> {
    return request('/timeline', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateTimelineItem(id: string, payload: Partial<TimelinePayload>): Promise<TimelineItem> {
    return request(`/timeline/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deleteTimelineItem(id: string): Promise<{ success: boolean }> {
    return request(`/timeline/${id}`, { method: 'DELETE' });
  },

  async reorderTimeline(orders: { id: string; orderIndex: number }[]): Promise<{ success: boolean }> {
    return request('/timeline/reorder', {
      method: 'PATCH',
      body: JSON.stringify({ orders }),
    });
  },
};
