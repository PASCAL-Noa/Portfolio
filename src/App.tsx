import React, { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Contact } from './components/sections/Contact';
import { ProjectDetail } from './components/sections/ProjectDetail';

import { personalInfo } from './data/personalInfo';
import { timelineItems, skillCategories } from './data/skills';
import { projects } from './data/projects';
import { projectDetails } from './data/projectDetails';

export const App: React.FC = () => {
  // Automatically syncs dark/light theme according to OS preference
  useTheme();

  const [currentProjectId, setCurrentProjectId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const match = window.location.hash.match(/^#\/project\/([a-zA-Z0-9_-]+)/);
      if (match && projectDetails[match[1]]) {
        return match[1];
      }
    }
    return null;
  });

  useEffect(() => {
    const handleHashChange = () => {
      const match = window.location.hash.match(/^#\/project\/([a-zA-Z0-9_-]+)/);
      if (match && projectDetails[match[1]]) {
        setCurrentProjectId(match[1]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentProjectId(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectProject = (projectId: string) => {
    if (projectDetails[projectId]) {
      window.location.hash = `#/project/${projectId}`;
      setCurrentProjectId(projectId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToProjects = () => {
    window.location.hash = '#projects';
    setCurrentProjectId(null);
    setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleNavigate = (href: string) => {
    if (currentProjectId !== null) {
      setCurrentProjectId(null);
      window.location.hash = href;
      setTimeout(() => {
        const id = href.replace('#', '');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      const id = href.replace('#', '');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeProjectDetail = currentProjectId ? projectDetails[currentProjectId] : null;
  const activeProjectSummary = currentProjectId ? projects.find(p => p.id === currentProjectId) : null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-black dark:text-[#f0f6fc] transition-colors duration-200">
      <Navbar onNavigate={handleNavigate} />
      <main>
        {activeProjectDetail ? (
          <ProjectDetail
            data={activeProjectDetail}
            githubUrl={activeProjectSummary?.githubUrl}
            onBack={handleBackToProjects}
          />
        ) : (
          <>
            <Hero info={personalInfo} />
            <About items={timelineItems} />
            <Projects projects={projects} onSelectProject={handleSelectProject} />
            <Skills categories={skillCategories} />
            <Contact info={personalInfo} />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
