import React, { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Contact } from './components/sections/Contact';
import { ProjectDetail } from './components/sections/ProjectDetail';

import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout, AdminTab } from './components/admin/AdminLayout';
import { AdminProjectManager } from './components/admin/AdminProjectManager';
import { AdminTimelineManager } from './components/admin/AdminTimelineManager';

import { personalInfo } from './data/personalInfo';
import { timelineItems, skillCategories } from './data/skills';
import { projects } from './data/projects';
import { projectDetails } from './data/projectDetails';

export const AppContent: React.FC = () => {
  // Automatically syncs dark/light theme according to OS preference
  useTheme();

  const [currentHash, setCurrentHash] = useState<string>(() => {
    return typeof window !== 'undefined' ? window.location.hash : '';
  });

  const [adminTab, setAdminTab] = useState<AdminTab>('projects');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      if (!window.location.hash.startsWith('#/admin')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Check if hash matches project detail
  const projectMatch = currentHash.match(/^#\/project\/([a-zA-Z0-9_-]+)/);
  const currentProjectId = projectMatch ? projectMatch[1] : null;

  const handleSelectProject = (projectId: string) => {
    window.location.hash = `#/project/${projectId}`;
  };

  const handleBackToProjects = () => {
    window.location.hash = '#projects';
    setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleNavigate = (href: string) => {
    window.location.hash = href;
    setTimeout(() => {
      const id = href.replace('#', '');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // Route 1: Admin Login
  if (currentHash === '#/admin/login') {
    return <AdminLogin />;
  }

  // Route 2: Admin Dashboard
  if (currentHash.startsWith('#/admin')) {
    return (
      <ProtectedRoute>
        <AdminLayout activeTab={adminTab} onTabChange={setAdminTab}>
          {adminTab === 'projects' ? <AdminProjectManager /> : <AdminTimelineManager />}
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  // Route 3: Project Detail
  const activeProjectDetail = currentProjectId ? projectDetails[currentProjectId] : null;
  const activeProjectSummary = currentProjectId ? projects.find((p) => p.id === currentProjectId) : null;

  if (activeProjectDetail) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0d1117] text-black dark:text-[#f0f6fc] transition-colors duration-200">
        <Navbar onNavigate={handleNavigate} />
        <main>
          <ProjectDetail
            data={activeProjectDetail}
            githubUrl={activeProjectSummary?.githubUrl}
            onBack={handleBackToProjects}
          />
        </main>
      </div>
    );
  }

  // Route 4: Public Portfolio Home
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-black dark:text-[#f0f6fc] transition-colors duration-200">
      <Navbar onNavigate={handleNavigate} />
      <main>
        <Hero info={personalInfo} />
        <About items={timelineItems} />
        <Projects projects={projects} onSelectProject={handleSelectProject} />
        <Skills categories={skillCategories} />
        <Contact info={personalInfo} />
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
