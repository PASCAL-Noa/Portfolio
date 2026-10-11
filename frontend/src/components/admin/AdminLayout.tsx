import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { FolderGit2, Clock, LogOut, ExternalLink, ShieldCheck } from 'lucide-react';

export type AdminTab = 'projects' | 'timeline';

interface AdminLayoutProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ activeTab, onTabChange, children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-black dark:text-[#f0f6fc] flex flex-col transition-colors duration-200">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#161b22]/95 backdrop-blur-md border-b border-[#e2e8f0] dark:border-[#30363d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[rgb(53,53,53)] dark:bg-white text-white dark:text-black flex items-center justify-center font-bold shrink-0 shadow-xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="font-bold text-sm tracking-tight block truncate">Portfolio Admin</span>
              <span className="text-2xs text-gray-500 dark:text-[#8b949e] block truncate max-w-[150px] sm:max-w-none">
                {user?.email}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                window.location.hash = '#';
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white bg-[#fafafa] dark:bg-[#21262d] border border-gray-200 dark:border-gray-700 rounded-lg transition cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Voir le</span> Portfolio
            </button>

            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition cursor-pointer"
              title="Se déconnecter"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-2 border-t border-gray-100 dark:border-gray-800/80 pt-1 overflow-x-auto scrollbar-none">
          <button
            onClick={() => onTabChange('projects')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'projects'
                ? 'border-black text-black dark:border-white dark:text-white'
                : 'border-transparent text-gray-500 hover:text-black dark:text-[#8b949e] dark:hover:text-white'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Gestion des Projets</span>
          </button>

          <button
            onClick={() => onTabChange('timeline')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'timeline'
                ? 'border-black text-black dark:border-white dark:text-white'
                : 'border-transparent text-gray-500 hover:text-black dark:text-[#8b949e] dark:hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Gestion de la Timeline</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
};
