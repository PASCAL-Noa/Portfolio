import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { Project, TimelineItem } from '../types';
import { ProjectDetailData, projectDetails as staticProjectDetails } from '../data/projectDetails';
import { projects as staticProjects } from '../data/projects';
import { timelineItems as staticTimelineItems } from '../data/skills';

export interface PortfolioData {
  projects: Project[];
  projectDetails: Record<string, ProjectDetailData>;
  timelineItems: TimelineItem[];
  isLoading: boolean;
  refresh: () => Promise<void>;
}

export function usePortfolioData(): PortfolioData {
  const [projects, setProjects] = useState<Project[]>(staticProjects);
  const [projectDetails, setProjectDetails] = useState<Record<string, ProjectDetailData>>(staticProjectDetails);
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>(staticTimelineItems);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Fetch projects and timeline in parallel
      const [backendProjects, backendTimeline] = await Promise.allSettled([
        api.getProjects(),
        api.getTimeline(),
      ]);

      if (backendProjects.status === 'fulfilled' && Array.isArray(backendProjects.value) && backendProjects.value.length > 0) {
        const sorted = [...backendProjects.value].sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));
        
        // Build dynamic details dictionary
        const dynamicDetails: Record<string, ProjectDetailData> = { ...staticProjectDetails };
        
        const cleanProjects: Project[] = sorted.map((p) => {
          if (p.detail) {
            dynamicDetails[p.id] = {
              projectId: p.id,
              title: p.title,
              banner: p.detail.banner || p.image,
              description: p.detail.description || p.description || '',
              duration: p.detail.duration || '',
              team: p.detail.team || '',
              tags: p.detail.tags || [],
              downloadUrl: p.detail.downloadUrl,
              downloadLabel: p.detail.downloadLabel,
              docUrl: p.detail.docUrl,
              docLabel: p.detail.docLabel,
              videoUrl: p.detail.videoUrl,
              media: p.detail.media || (p.image ? [{ type: 'image', src: p.image }] : []),
              thumbnails: p.detail.thumbnails || (p.image ? [p.image] : []),
            };
          }
          return {
            id: p.id,
            title: p.title,
            category: p.category,
            image: p.image,
            description: p.description,
            technologies: p.technologies,
            githubUrl: p.githubUrl,
            liveUrl: p.liveUrl,
            detailUrl: p.detailUrl || `#/project/${p.id}`,
            featured: p.featured,
          };
        });

        setProjects(cleanProjects);
        setProjectDetails(dynamicDetails);
      } else {
        // Fallback to static
        setProjects(staticProjects);
        setProjectDetails(staticProjectDetails);
      }

      if (backendTimeline.status === 'fulfilled' && Array.isArray(backendTimeline.value) && backendTimeline.value.length > 0) {
        const sortedTimeline = [...backendTimeline.value].sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));
        setTimelineItems(sortedTimeline);
      } else {
        setTimelineItems(staticTimelineItems);
      }
    } catch (err) {
      console.warn('Backend API unavailable, using static portfolio fallback:', err);
      setProjects(staticProjects);
      setProjectDetails(staticProjectDetails);
      setTimelineItems(staticTimelineItems);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    projects,
    projectDetails,
    timelineItems,
    isLoading,
    refresh: fetchData,
  };
}
