import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Project, ProjectCategory } from '../../types';
import { ProjectPayload } from '../../types/admin';
import { projects as fallbackProjects } from '../../data/projects';
import { projectDetails as fallbackProjectDetails } from '../../data/projectDetails';
import { getAssetUrl } from '../../utils/imageUrl';
import {
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Upload,
  Eye,
  Check,
  AlertCircle,
  Loader2,
  X,
  GripVertical,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface ProjectWithDetail extends Project {
  orderIndex: number;
  detail?: {
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
  };
}

export const AdminProjectManager: React.FC = () => {
  const [projectsList, setProjectsList] = useState<ProjectWithDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [modalTab, setModalTab] = useState<'card' | 'detail' | 'preview'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState<ProjectPayload>({
    id: '',
    title: '',
    category: 'game',
    image: '',
    description: '',
    technologies: [],
    githubUrl: '',
    liveUrl: '',
    featured: false,
    orderIndex: 0,
    detail: {
      description: '',
      duration: '',
      team: '',
      tags: [],
      downloadUrl: '',
      downloadLabel: 'Télécharger le projet',
      docUrl: '',
      docLabel: 'Télécharger le Cahier des Charges',
      videoUrl: '',
      media: [],
      thumbnails: [],
    },
  });

  const [techInput, setTechInput] = useState('');
  const [tagLabelInput, setTagLabelInput] = useState('');
  const [tagVariantInput, setTagVariantInput] = useState('default');
  const [mediaSrcInput, setMediaSrcInput] = useState('');
  const [mediaTypeInput, setMediaTypeInput] = useState<'image' | 'video'>('image');

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const data = await api.getProjects();
      const mapped = data.map((p, idx) => ({
        ...p,
        orderIndex: p.orderIndex ?? idx,
      }));
      setProjectsList(mapped);
    } catch {
      // Offline fallback: load static items
      const fallbackList: ProjectWithDetail[] = fallbackProjects.map((p, idx) => ({
        ...p,
        orderIndex: idx,
        detail: fallbackProjectDetails[p.id],
      }));
      setProjectsList(fallbackList);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const showNotification = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // Transparent ghost image style
    e.dataTransfer.setData('text/plain', `${index}`);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updated = [...projectsList];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, moved);

    const reordered = updated.map((item, idx) => ({ ...item, orderIndex: idx }));
    setProjectsList(reordered);
    setDraggedIndex(null);
    setDragOverIndex(null);

    try {
      await api.reorderProjects(reordered.map((p) => ({ id: p.id, orderIndex: p.orderIndex })));
      showNotification('success', `Projet déplacé à la position #${targetIndex + 1} ! Grille mise à jour.`);
    } catch (err: unknown) {
      showNotification('error', err instanceof Error ? err.message : 'Erreur lors de la réorganisation.');
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleQuickMove = async (index: number, direction: 'prev' | 'next') => {
    const targetIndex = direction === 'prev' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projectsList.length) return;

    const updated = [...projectsList];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);

    const reordered = updated.map((item, idx) => ({ ...item, orderIndex: idx }));
    setProjectsList(reordered);

    try {
      await api.reorderProjects(reordered.map((p) => ({ id: p.id, orderIndex: p.orderIndex })));
      showNotification('success', `Position #${targetIndex + 1} mise à jour !`);
    } catch (err: unknown) {
      showNotification('error', err instanceof Error ? err.message : 'Erreur lors du déplacement.');
    }
  };

  const openAddModal = () => {
    setEditingProjectId(null);
    setFormData({
      id: '',
      title: '',
      category: 'game',
      image: '',
      description: '',
      technologies: [],
      githubUrl: '',
      liveUrl: '',
      featured: false,
      orderIndex: projectsList.length,
      detail: {
        description: '',
        duration: '',
        team: '',
        tags: [],
        downloadUrl: '',
        downloadLabel: 'Télécharger le projet',
        docUrl: '',
        docLabel: 'Télécharger le Cahier des Charges',
        videoUrl: '',
        media: [],
        thumbnails: [],
      },
    });
    setTechInput('');
    setModalTab('card');
    setIsModalOpen(true);
  };

  const openEditModal = (p: ProjectWithDetail) => {
    setEditingProjectId(p.id);
    setFormData({
      id: p.id,
      title: p.title,
      category: p.category,
      image: p.image,
      description: p.description || '',
      technologies: p.technologies || [],
      githubUrl: p.githubUrl || '',
      liveUrl: p.liveUrl || '',
      featured: p.featured || false,
      orderIndex: p.orderIndex,
      detail: p.detail
        ? {
            description: p.detail.description || '',
            duration: p.detail.duration || '',
            team: p.detail.team || '',
            tags: p.detail.tags || [],
            downloadUrl: p.detail.downloadUrl || '',
            downloadLabel: p.detail.downloadLabel || 'Télécharger le projet',
            docUrl: p.detail.docUrl || '',
            docLabel: p.detail.docLabel || 'Télécharger le Cahier des Charges',
            videoUrl: p.detail.videoUrl || '',
            media: p.detail.media || [],
            thumbnails: p.detail.thumbnails || [],
          }
        : {
            description: '',
            duration: '',
            team: '',
            tags: [],
            downloadUrl: '',
            downloadLabel: 'Télécharger le projet',
            docUrl: '',
            docLabel: 'Télécharger le Cahier des Charges',
            videoUrl: '',
            media: [],
            thumbnails: [],
          },
    });
    setTechInput((p.technologies || []).join(', '));
    setModalTab('card');
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => {
      const autoSlug = !editingProjectId
        ? val
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '')
        : prev.id;
      return {
        ...prev,
        title: val,
        id: editingProjectId ? prev.id : autoSlug,
      };
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: 'image' | 'docUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploaded = await api.uploadMedia(file);
      if (targetField === 'image') {
        setFormData((prev) => ({
          ...prev,
          image: uploaded.url,
          detail: {
            ...prev.detail!,
            banner: uploaded.url,
            thumbnails: prev.detail?.thumbnails?.length ? prev.detail.thumbnails : [uploaded.url],
          },
        }));
      } else if (targetField === 'docUrl') {
        setFormData((prev) => ({
          ...prev,
          detail: {
            ...prev.detail!,
            docUrl: uploaded.url,
          },
        }));
      }
      showNotification('success', `Fichier ${file.name} téléversé avec succès !`);
    } catch (err: unknown) {
      showNotification('error', err instanceof Error ? err.message : 'Erreur lors du téléversement.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddMedia = () => {
    if (!mediaSrcInput.trim()) return;
    const newMedia = {
      type: mediaTypeInput,
      src: mediaSrcInput.trim(),
    };
    setFormData((prev) => ({
      ...prev,
      detail: {
        ...prev.detail!,
        media: [...(prev.detail?.media || []), newMedia],
        thumbnails:
          mediaTypeInput === 'image'
            ? [...(prev.detail?.thumbnails || []), mediaSrcInput.trim()]
            : prev.detail?.thumbnails || [],
      },
    }));
    setMediaSrcInput('');
  };

  const handleRemoveMedia = (index: number) => {
    setFormData((prev) => {
      const nextMedia = [...(prev.detail?.media || [])];
      nextMedia.splice(index, 1);
      return {
        ...prev,
        detail: {
          ...prev.detail!,
          media: nextMedia,
        },
      };
    });
  };

  const handleAddTag = () => {
    if (!tagLabelInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      detail: {
        ...prev.detail!,
        tags: [...(prev.detail?.tags || []), { label: tagLabelInput.trim(), variant: tagVariantInput }],
      },
    }));
    setTagLabelInput('');
  };

  const handleRemoveTag = (index: number) => {
    setFormData((prev) => {
      const nextTags = [...(prev.detail?.tags || [])];
      nextTags.splice(index, 1);
      return {
        ...prev,
        detail: {
          ...prev.detail!,
          tags: nextTags,
        },
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.id) {
      showNotification('error', 'Le titre et l’identifiant sont obligatoires.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: ProjectPayload = {
        ...formData,
        technologies: techInput
          ? techInput
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
        detail: {
          ...formData.detail!,
          description: formData.detail?.description || formData.description || '',
          media:
            formData.detail?.media && formData.detail.media.length > 0
              ? formData.detail.media
              : formData.image
              ? [{ type: 'image', src: formData.image }]
              : [],
          thumbnails:
            formData.detail?.thumbnails && formData.detail.thumbnails.length > 0
              ? formData.detail.thumbnails
              : formData.image
              ? [formData.image]
              : [],
        },
      };

      if (editingProjectId) {
        await api.updateProject(editingProjectId, payload);
        showNotification('success', 'Projet mis à jour avec succès.');
      } else {
        await api.createProject(payload);
        showNotification('success', 'Projet et page de détail créés avec succès !');
      }

      setIsModalOpen(false);
      await fetchProjects();
    } catch (err: unknown) {
      showNotification('error', err instanceof Error ? err.message : 'Erreur lors de l’enregistrement.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Voulez-vous vraiment supprimer le projet "${title}" ? Cette action est irréversible.`)) {
      return;
    }

    try {
      await api.deleteProject(id);
      showNotification('success', 'Projet supprimé avec succès.');
      await fetchProjects();
    } catch (err: unknown) {
      showNotification('error', err instanceof Error ? err.message : 'Erreur lors de la suppression.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-[#161b22] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-bold tracking-tight">Grille des Projets</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
              {projectsList.length} projets
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            <strong>Glissez-déposez (Drag & Drop)</strong> les cartes directement pour réorganiser l'affichage de votre grille CSS, ou utilisez les boutons d'action.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold shadow-md shadow-purple-600/20 transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter un Projet</span>
        </button>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl text-sm flex items-center gap-3 border ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
              : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'
          }`}
        >
          {statusMessage.type === 'success' ? <Check className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          <span className="font-medium">{statusMessage.text}</span>
        </div>
      )}

      {/* Grid Drag & Drop View */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center text-gray-500">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600 mb-2" />
          <p className="text-sm">Chargement des projets...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsList.map((project, index) => {
            const isDraggingThis = draggedIndex === index;
            const isTargetOfDrag = dragOverIndex === index;

            return (
              <div
                key={project.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={`group relative flex flex-col bg-[#fafafa] dark:bg-[#161b22] rounded-2xl overflow-hidden border transition-all duration-200 p-5 shadow-xs select-none cursor-grab active:cursor-grabbing ${
                  isDraggingThis
                    ? 'opacity-40 scale-95 border-dashed border-purple-500 ring-2 ring-purple-500/30'
                    : isTargetOfDrag
                    ? 'scale-105 border-purple-500 ring-4 ring-purple-500/40 z-20 shadow-xl'
                    : 'border-gray-200 dark:border-[#30363d] hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-md'
                }`}
              >
                {/* Image Banner 16:9 with Badges */}
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-xl mb-4 border border-gray-200 dark:border-gray-700">
                  <img
                    src={getAssetUrl(project.image)}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Order Index & Drag Indicator */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-mono font-bold shadow-md">
                    <GripVertical className="w-3.5 h-3.5 text-purple-400" />
                    <span>#{index + 1}</span>
                  </div>

                  {/* Category & Featured Badge */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                    {project.featured && (
                      <span className="text-2xs px-2 py-0.5 rounded-full font-bold uppercase bg-amber-500/90 text-white shadow-xs">
                        Featured
                      </span>
                    )}
                    <span className="text-2xs px-2.5 py-0.5 rounded-full font-bold uppercase bg-black/60 backdrop-blur-md text-white border border-white/20">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-black dark:text-[#f0f6fc] group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-2xs font-mono text-gray-400 mt-0.5">id: {project.id}</p>
                    {project.description && (
                      <p className="text-xs text-gray-600 dark:text-[#8b949e] line-clamp-2 leading-relaxed mt-2">
                        {project.description}
                      </p>
                    )}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies?.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200/50 dark:border-purple-800/40 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {(project.technologies?.length || 0) > 4 && (
                      <span className="text-2xs text-gray-400 font-mono self-center">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Card Admin Actions */}
                  <div className="pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between gap-2">
                    {/* Quick Move Left / Right buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickMove(index, 'prev');
                        }}
                        disabled={index === 0}
                        className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 disabled:opacity-20 cursor-pointer"
                        title="Déplacer vers la gauche / avant"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickMove(index, 'next');
                        }}
                        disabled={index === projectsList.length - 1}
                        className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 disabled:opacity-20 cursor-pointer"
                        title="Déplacer vers la droite / après"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <a
                        href={`#/project/${project.id}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                        title="Ouvrir la page de détail"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(project);
                        }}
                        className="p-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition flex items-center gap-1 cursor-pointer"
                        title="Modifier ce projet"
                      >
                        <Edit className="w-4 h-4" />
                        <span className="text-xs">Modifier</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(project.id, project.title);
                        }}
                        className="p-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition flex items-center gap-1 cursor-pointer"
                        title="Supprimer ce projet"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* "+ Ajouter un projet" dashed Card in Grid */}
          <button
            type="button"
            onClick={openAddModal}
            className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 bg-white/50 dark:bg-[#161b22]/50 hover:bg-purple-50/40 dark:hover:bg-purple-950/20 text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 cursor-pointer min-h-[320px] group"
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus className="w-7 h-7" />
            </div>
            <span className="font-bold text-base text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400">
              Ajouter un nouveau projet
            </span>
            <span className="text-xs text-gray-400 text-center mt-1 max-w-xs">
              Créez une carte et générez automatiquement sa page de détail complète.
            </span>
          </button>
        </div>
      )}

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col my-8">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                  {editingProjectId ? `Modifier : ${formData.title}` : 'Nouveau Projet'}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Configurez la carte du portfolio et la page de présentation complète.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-gray-100 dark:border-gray-800 px-6 gap-4 bg-gray-50/50 dark:bg-[#0d1117]/50">
              <button
                type="button"
                onClick={() => setModalTab('card')}
                className={`py-3 text-sm font-semibold border-b-2 cursor-pointer transition ${
                  modalTab === 'card'
                    ? 'border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400'
                    : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                1. Carte Portfolio (CSS Grid)
              </button>
              <button
                type="button"
                onClick={() => setModalTab('detail')}
                className={`py-3 text-sm font-semibold border-b-2 cursor-pointer transition ${
                  modalTab === 'detail'
                    ? 'border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400'
                    : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                2. Page de Détail Automatique
              </button>
              <button
                type="button"
                onClick={() => setModalTab('preview')}
                className={`py-3 text-sm font-semibold border-b-2 cursor-pointer transition flex items-center gap-1.5 ${
                  modalTab === 'preview'
                    ? 'border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400'
                    : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>Prévisualisation</span>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              {modalTab === 'card' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
                        Titre du Projet *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Ex: Mon Super Projet"
                        className="w-full px-3.5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0d1117] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
                        Identifiant / Slug URL (Unique) *
                      </label>
                      <input
                        type="text"
                        required
                        disabled={!!editingProjectId}
                        value={formData.id}
                        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                        placeholder="ex: mon-super-projet"
                        className="w-full px-3.5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0d1117] text-sm font-mono disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
                        Catégorie *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as ProjectCategory })}
                        className="w-full px-3.5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0d1117] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="game">Jeux Vidéo (Game)</option>
                        <option value="software">Logiciel / Moteur (Software)</option>
                        <option value="web">Web & API (Web)</option>
                        <option value="other">Autre (Other)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
                        Technologies (séparées par une virgule)
                      </label>
                      <input
                        type="text"
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        placeholder="C++, SFML, CMake, OpenGL"
                        className="w-full px-3.5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0d1117] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  {/* Banner / Card Image Upload & URL */}
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
                      Image Principale (Format 16:9 recommandé) *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://... ou /assets/MonProjet/image.webp"
                        className="flex-1 px-3.5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0d1117] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-sm font-medium cursor-pointer transition">
                        <Upload className="w-4 h-4" />
                        <span>{isUploading ? 'Upload...' : 'Téléverser'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'image')}
                          disabled={isUploading}
                        />
                      </label>
                    </div>
                    {formData.image && (
                      <div className="mt-2 w-48 aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-black">
                        <img src={getAssetUrl(formData.image)} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  {/* Short Description */}
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
                      Description Courte (Affichée sur la carte)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Court résumé du projet en une ou deux phrases..."
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0d1117] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  {/* Links & Featured Checkbox */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
                        Lien GitHub
                      </label>
                      <input
                        type="url"
                        value={formData.githubUrl}
                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full px-3.5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0d1117] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
                        Lien Démo / Live
                      </label>
                      <input
                        type="url"
                        value={formData.liveUrl}
                        onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-3.5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0d1117] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
                    />
                    <label htmlFor="featured" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Mettre ce projet en avant (Badge "Featured")
                    </label>
                  </div>
                </div>
              )}

              {modalTab === 'detail' && (
                <div className="space-y-5">
                  {/* Rich Description */}
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
                      Description Détaillée (Supporte balises HTML &lt;strong&gt;, &lt;br&gt;, etc.)
                    </label>
                    <textarea
                      rows={5}
                      value={formData.detail?.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          detail: { ...formData.detail!, description: e.target.value },
                        })
                      }
                      placeholder="<strong>Description complète du projet...</strong><br>Explication des choix d'architecture, technologies SFML, ECS, shaders..."
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0d1117] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  {/* Duration and Team */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
                        Durée de réalisation
                      </label>
                      <input
                        type="text"
                        value={formData.detail?.duration}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            detail: { ...formData.detail!, duration: e.target.value },
                          })
                        }
                        placeholder="Ex: 2 semaines / 3 mois"
                        className="w-full px-3.5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0d1117] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
                        Équipe / Membres
                      </label>
                      <input
                        type="text"
                        value={formData.detail?.team}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            detail: { ...formData.detail!, team: e.target.value },
                          })
                        }
                        placeholder="Ex: PASCAL Noa (Solo) ou PASCAL Noa, Nom1, Nom2..."
                        className="w-full px-3.5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0d1117] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  {/* Detail Tags Manager */}
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0d1117] border border-gray-200 dark:border-gray-800 space-y-3">
                    <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                      Badges & Spécifications de la fiche
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tagLabelInput}
                        onChange={(e) => setTagLabelInput(e.target.value)}
                        placeholder="Ex: C++ ou Équipe de 3"
                        className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#161b22] text-sm"
                      />
                      <select
                        value={tagVariantInput}
                        onChange={(e) => setTagVariantInput(e.target.value)}
                        className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#161b22] text-sm"
                      >
                        <option value="default">Default (Gris)</option>
                        <option value="purple">Purple (Violet)</option>
                        <option value="blue">Blue (Bleu)</option>
                        <option value="emerald">Emerald (Vert)</option>
                        <option value="amber">Amber (Orange)</option>
                      </select>
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-xs font-semibold cursor-pointer"
                      >
                        Ajouter
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {formData.detail?.tags?.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700"
                        >
                          <span>{tag.label}</span>
                          <span className="text-2xs text-gray-400 font-mono">({tag.variant || 'default'})</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(idx)}
                            className="text-gray-400 hover:text-red-500 cursor-pointer ml-1"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Documents & Download Links */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Build download */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                        Téléchargement Build / Releases
                      </label>
                      <input
                        type="url"
                        value={formData.detail?.downloadUrl}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            detail: { ...formData.detail!, downloadUrl: e.target.value },
                          })
                        }
                        placeholder="https://github.com/.../releases"
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0d1117] text-sm"
                      />
                      <input
                        type="text"
                        value={formData.detail?.downloadLabel}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            detail: { ...formData.detail!, downloadLabel: e.target.value },
                          })
                        }
                        placeholder="Libellé bouton (ex: Télécharger Rebreaker)"
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0d1117] text-xs text-gray-500"
                      />
                    </div>

                    {/* PDF Spec doc */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                        Cahier des Charges / Spécifications (PDF)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={formData.detail?.docUrl}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              detail: { ...formData.detail!, docUrl: e.target.value },
                            })
                          }
                          placeholder="/assets/cdc.pdf ou URL"
                          className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0d1117] text-sm"
                        />
                        <label className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-xs font-medium cursor-pointer">
                          <Upload className="w-3.5 h-3.5" />
                          <span>PDF</span>
                          <input
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, 'docUrl')}
                            disabled={isUploading}
                          />
                        </label>
                      </div>
                      <input
                        type="text"
                        value={formData.detail?.docLabel}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            detail: { ...formData.detail!, docLabel: e.target.value },
                          })
                        }
                        placeholder="Libellé bouton (ex: Télécharger le Cahier des Charges)"
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0d1117] text-xs text-gray-500"
                      />
                    </div>
                  </div>

                  {/* Media Gallery (YouTube Video & Screenshots) */}
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0d1117] border border-gray-200 dark:border-gray-800 space-y-3">
                    <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                      Galerie Médias (Carousel & Lightbox)
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Ajoutez des vidéos YouTube embed (ex: https://www.youtube.com/embed/...) ou des captures d'écran.
                    </p>

                    <div className="flex gap-2">
                      <select
                        value={mediaTypeInput}
                        onChange={(e) => setMediaTypeInput(e.target.value as 'image' | 'video')}
                        className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#161b22] text-sm"
                      >
                        <option value="image">Image / Screenshot</option>
                        <option value="video">Vidéo (YouTube Embed)</option>
                      </select>

                      <input
                        type="text"
                        value={mediaSrcInput}
                        onChange={(e) => setMediaSrcInput(e.target.value)}
                        placeholder={
                          mediaTypeInput === 'video'
                            ? 'https://www.youtube.com/embed/...'
                            : '/assets/screenshot.webp ou URL'
                        }
                        className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#161b22] text-sm"
                      />

                      <button
                        type="button"
                        onClick={handleAddMedia}
                        className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold cursor-pointer"
                      >
                        Ajouter
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      {formData.detail?.media?.map((m, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-black group"
                        >
                          {m.type === 'video' ? (
                            <div className="w-full h-full flex items-center justify-center text-xs text-white bg-red-950/80 p-2 text-center">
                              Vidéo: {m.src.slice(0, 20)}...
                            </div>
                          ) : (
                            <img src={getAssetUrl(m.src)} alt={`Media ${idx}`} className="w-full h-full object-cover" />
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveMedia(idx)}
                            className="absolute top-1 right-1 p-1 rounded-full bg-black/70 text-white hover:bg-red-600 transition cursor-pointer"
                            title="Retirer ce média"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {modalTab === 'preview' && (
                <div className="space-y-6">
                  {/* Card Preview */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Aperçu de la Carte dans la Grille
                    </h4>
                    <div className="max-w-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161b22] shadow-md">
                      <div className="aspect-video w-full bg-black overflow-hidden relative">
                        {formData.image ? (
                          <img src={getAssetUrl(formData.image)} alt={formData.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                            Image manquante
                          </div>
                        )}
                        <span className="absolute top-3 right-3 text-2xs px-2.5 py-1 rounded-full font-bold uppercase bg-black/60 backdrop-blur text-white">
                          {formData.category}
                        </span>
                      </div>
                      <div className="p-4 space-y-2">
                        <h5 className="font-bold text-base text-gray-900 dark:text-gray-100">
                          {formData.title || 'Sans titre'}
                        </h5>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                          {formData.description || formData.detail?.description?.replace(/<[^>]+>/g, '') || 'Description...'}
                        </p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {techInput.split(',').filter(Boolean).map((t) => (
                            <span
                              key={t}
                              className="text-2xs px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-mono"
                            >
                              {t.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detail Specs Preview */}
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0d1117] border border-gray-200 dark:border-gray-800 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Aperçu des Métadonnées de la Page de Détail
                    </h4>
                    <p className="text-sm">
                      <strong className="text-gray-700 dark:text-gray-300">Durée :</strong>{' '}
                      {formData.detail?.duration || 'Non renseignée'}
                    </p>
                    <p className="text-sm">
                      <strong className="text-gray-700 dark:text-gray-300">Équipe :</strong>{' '}
                      {formData.detail?.team || 'Non renseignée'}
                    </p>
                    <p className="text-sm">
                      <strong className="text-gray-700 dark:text-gray-300">Lien Build :</strong>{' '}
                      {formData.detail?.downloadUrl || 'Aucun'}
                    </p>
                    <p className="text-sm">
                      <strong className="text-gray-700 dark:text-gray-300">Cahier des charges :</strong>{' '}
                      {formData.detail?.docUrl || 'Aucun'}
                    </p>
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-purple-600/20 cursor-pointer transition flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Enregistrement...</span>
                    </>
                  ) : (
                    <span>{editingProjectId ? 'Mettre à jour' : 'Créer le projet'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
