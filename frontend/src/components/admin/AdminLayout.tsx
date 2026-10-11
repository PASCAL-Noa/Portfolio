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
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117] text-gray-900 dark:text-[#f0f6fc] flex flex-col transition-colors">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#161b22]/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight block">Portfolio Back-Office</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 block truncate max-w-[200px] sm:max-w-none">
                {user?.email}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                window.location.hash = '#';
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Voir le</span> Portfolio
            </button>

            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition cursor-pointer"
              title="Se déconnecter"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 border-t border-gray-100 dark:border-gray-800/60 pt-1">
          <button
            onClick={() => onTabChange('projects')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition cursor-pointer ${
              activeTab === 'projects'
                ? 'border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400'
                : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Gestion des Projets</span>
          </button>

          <button
            onClick={() => onTabChange('timeline')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition cursor-pointer ${
              activeTab === 'timeline'
                ? 'border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400'
                : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Gestion de la Timeline</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};
