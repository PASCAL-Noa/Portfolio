import React from 'react';

export const AdminProjectManager: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Gestion des Projets</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Personnalisez l'affichage de la grille CSS, ajoutez de nouveaux projets et gérez les pages de détails.
          </p>
        </div>
      </div>
    </div>
  );
};
