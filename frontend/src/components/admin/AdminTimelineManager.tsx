import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { TimelineItem, TimelineCategory } from '../../types';
import { TimelinePayload } from '../../types/admin';
import { timelineItems as fallbackTimelineItems } from '../../data/skills';
import {
  GraduationCap,
  Briefcase,
  Globe,
  Code2,
  Plus,
  Trash2,
  Edit,
  ArrowUp,
  ArrowDown,
  Upload,
  Check,
  AlertCircle,
  Loader2,
  X,
  Eye,
  Calendar,
} from 'lucide-react';
import { getAssetUrl } from '../../utils/imageUrl';

interface TimelineItemWithOrder extends TimelineItem {
  orderIndex: number;
}

export const AdminTimelineManager: React.FC = () => {
  const [itemsList, setItemsList] = useState<TimelineItemWithOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState<TimelinePayload>({
    period: '',
    title: '',
    subtitle: '',
    description: '',
    image: '',
    type: 'edu',
    link: '',
    linkText: 'En savoir plus',
  });

  const fetchTimeline = async () => {
    setIsLoading(true);
    try {
      const data = await api.getTimeline();
      const mapped = data.map((item, idx) => ({
        ...item,
        orderIndex: item.orderIndex ?? idx,
      }));
      setItemsList(mapped);
    } catch {
      // Offline fallback: load static items
      const fallbackList: TimelineItemWithOrder[] = fallbackTimelineItems.map((item, idx) => ({
        ...item,
        orderIndex: idx,
      }));
      setItemsList(fallbackList);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeline();
  }, []);

  const showNotification = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const getCategoryConfig = (type: TimelineCategory) => {
    switch (type) {
      case 'edu':
        return {
          label: 'Formation (Éducation)',
          icon: <GraduationCap className="w-4 h-4 text-[#00d1ff]" />,
          colorText: 'text-[#00d1ff]',
          dotBorder: 'border-[#00d1ff]',
          dotShadow: 'shadow-[0_0_10px_rgba(0,209,255,0.4)]',
          badgeBg: 'bg-[#00d1ff]/10 text-[#00d1ff] border-[#00d1ff]/30',
        };
      case 'pro':
        return {
          label: 'Professionnel (Entreprise)',
          icon: <Briefcase className="w-4 h-4 text-[#e83720]" />,
          colorText: 'text-[#e83720]',
          dotBorder: 'border-[#e83720]',
          dotShadow: 'shadow-[0_0_10px_rgba(232,55,32,0.4)]',
          badgeBg: 'bg-[#e83720]/10 text-[#e83720] border-[#e83720]/30',
        };
      case 'online':
        return {
          label: 'En Ligne / Certifications',
          icon: <Globe className="w-4 h-4 text-[#bd00ff]" />,
          colorText: 'text-[#bd00ff]',
          dotBorder: 'border-[#bd00ff]',
          dotShadow: 'shadow-[0_0_10px_rgba(189,0,255,0.4)]',
          badgeBg: 'bg-[#bd00ff]/10 text-[#bd00ff] border-[#bd00ff]/30',
        };
      case 'tech':
        return {
          label: 'Technique / R&D',
          icon: <Code2 className="w-4 h-4 text-[#ff9800]" />,
          colorText: 'text-[#ff9800]',
          dotBorder: 'border-[#ff9800]',
          dotShadow: 'shadow-[0_0_10px_rgba(255,152,0,0.4)]',
          badgeBg: 'bg-[#ff9800]/10 text-[#ff9800] border-[#ff9800]/30',
        };
    }
  };

  const openAddModal = () => {
    setEditingItemId(null);
    setFormData({
      period: '',
      title: '',
      subtitle: '',
      description: '',
      image: '',
      type: 'edu',
      link: '',
      linkText: 'En savoir plus',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: TimelineItemWithOrder) => {
    setEditingItemId(item.id);
    setFormData({
      period: item.period,
      title: item.title,
      subtitle: item.subtitle || '',
      description: item.description,
      image: item.image || '',
      type: item.type,
      link: item.link || '',
      linkText: item.linkText || 'En savoir plus',
      orderIndex: item.orderIndex,
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploaded = await api.uploadMedia(file);
      setFormData((prev) => ({ ...prev, image: uploaded.url }));
      showNotification('success', `Image ${file.name} téléversée avec succès !`);
    } catch (err: unknown) {
      showNotification('error', err instanceof Error ? err.message : 'Erreur lors du téléversement.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.period || !formData.description) {
      showNotification('error', 'Le titre, la période et la description sont requis.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingItemId) {
        await api.updateTimelineItem(editingItemId, formData);
        showNotification('success', 'Étape de timeline mise à jour !');
      } else {
        await api.createTimelineItem({
          ...formData,
          orderIndex: itemsList.length,
        });
        showNotification('success', 'Nouvelle étape de timeline ajoutée !');
      }

      setIsModalOpen(false);
      await fetchTimeline();
    } catch (err: unknown) {
      showNotification('error', err instanceof Error ? err.message : 'Erreur lors de l’enregistrement.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Voulez-vous vraiment supprimer "${title}" de la timeline ?`)) {
      return;
    }

    try {
      await api.deleteTimelineItem(id);
      showNotification('success', 'Étape supprimée avec succès.');
      await fetchTimeline();
    } catch (err: unknown) {
      showNotification('error', err instanceof Error ? err.message : 'Erreur lors de la suppression.');
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= itemsList.length) return;

    const updated = [...itemsList];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIdx, 0, moved);

    const reordered = updated.map((item, idx) => ({ ...item, orderIndex: idx }));
    setItemsList(reordered);

    try {
      await api.reorderTimeline(reordered.map((item) => ({ id: item.id, orderIndex: item.orderIndex })));
      showNotification('success', 'Ordre chronologique mis à jour !');
    } catch (err: unknown) {
      showNotification('error', err instanceof Error ? err.message : 'Erreur lors de la réorganisation.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-[#161b22] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight">Gestion de la Timeline</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
              {itemsList.length} étapes
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Personnalisez votre parcours affiché dans la section "Sur moi" avec dates, médias 16:9 et badges colorés.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold shadow-md shadow-purple-600/20 transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter une Étape</span>
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

      {/* Timeline Items List */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center text-gray-500">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600 mb-2" />
          <p className="text-sm">Chargement de la timeline...</p>
        </div>
      ) : itemsList.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#161b22] rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 p-8">
          <Calendar className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">Aucune étape enregistrée</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-4">
            Ajoutez votre premier diplôme, projet d'école ou expérience professionnelle.
          </p>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Créer une étape
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#161b22] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-xs">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Ordre d'affichage chronologique
            </h3>
            <span className="text-xs text-gray-400">
              Le premier élément apparaît tout en haut de la timeline
            </span>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {itemsList.map((item, index) => {
              const cfg = getCategoryConfig(item.type);

              return (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/60 dark:hover:bg-[#1c2129]/60 transition"
                >
                  {/* Left: Reorder controls + Category Icon + Info */}
                  <div className="flex items-center gap-4">
                    {/* Position and arrows */}
                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={() => handleMove(index, 'up')}
                        disabled={index === 0}
                        className="p-1 rounded-md text-gray-400 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-20 disabled:hover:bg-transparent cursor-pointer"
                        title="Monter d'un rang"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-mono font-bold w-6 text-center text-gray-600 dark:text-gray-400">
                        #{index + 1}
                      </span>
                      <button
                        onClick={() => handleMove(index, 'down')}
                        disabled={index === itemsList.length - 1}
                        className="p-1 rounded-md text-gray-400 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-20 disabled:hover:bg-transparent cursor-pointer"
                        title="Descendre d'un rang"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Bullet badge preview */}
                    <div
                      className={`w-10 h-10 rounded-full bg-white dark:bg-[#0d1117] border-2 flex items-center justify-center shrink-0 ${cfg.dotBorder} ${cfg.dotShadow}`}
                    >
                      {cfg.icon}
                    </div>

                    {/* Thumbnail preview if available */}
                    {item.image && (
                      <div className="w-20 h-14 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0 border border-gray-200 dark:border-gray-700 hidden md:block">
                        <img src={getAssetUrl(item.image)} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    )}

                    {/* Info */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold font-mono text-purple-600 dark:text-purple-400">
                          {item.period}
                        </span>
                        <span
                          className={`text-2xs px-2 py-0.5 rounded-full font-bold border uppercase ${cfg.badgeBg}`}
                        >
                          {cfg.label}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 mt-0.5 truncate">
                        {item.title}
                      </h4>
                      {item.subtitle && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {item.subtitle}
                        </p>
                      )}
                      <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-1 mt-1 max-w-xl">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                      title="Modifier"
                    >
                      <Edit className="w-4 h-4" />
                      <span className="hidden md:inline">Modifier</span>
                    </button>

                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      className="p-2 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden md:inline">Supprimer</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col my-8">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                  {editingItemId ? 'Modifier l’Étape de Timeline' : 'Nouvelle Étape de Timeline'}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Configurez la date, les informations et la pastille lumineuse.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Category Selector with live bullet preview */}
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-2">
                  Catégorie & Icône Pastille *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(['edu', 'pro', 'online', 'tech'] as TimelineCategory[]).map((cat) => {
                    const cfg = getCategoryConfig(cat);
                    const isSelected = formData.type === cat;

                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFormData({ ...formData, type: cat })}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition cursor-pointer ${
                          isSelected
                            ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 ring-2 ring-purple-500/20'
                            : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0d1117] hover:border-gray-300 dark:hover:border-gray-700'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full bg-white dark:bg-[#161b22] border-2 flex items-center justify-center ${cfg.dotBorder} ${cfg.dotShadow}`}
                        >
                          {cfg.icon}
                        </div>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">
                          {cat === 'edu' && 'Éducation'}
                          {cat === 'pro' && 'Pro'}
                          {cat === 'online' && 'En ligne'}
                          {cat === 'tech' && 'Tech & R&D'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date / Period and Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
                    Période / Date *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="Ex: Sept. 2024 - Présent"
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0d1117] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
                    Titre Principal *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ex: Gaming Campus"
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0d1117] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
                  Sous-titre (Optionnel)
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Ex: G. Tech - Bachelor Développeur informatique & Moteur de jeux"
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0d1117] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
                  Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description détaillée de l'expérience, des acquis ou des objectifs..."
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0d1117] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Media Image 16:9 */}
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
                  Image Illustrative (Format 16:9 recommandé)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/assets/GamingCampus/gamingcampus.webp ou URL"
                    className="flex-1 px-3.5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0d1117] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-sm font-medium cursor-pointer transition">
                    <Upload className="w-4 h-4" />
                    <span>{isUploading ? 'Upload...' : 'Téléverser'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
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

              {/* External Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
                    Lien Externe (Optionnel)
                  </label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="https://gamingcampus.fr/..."
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0d1117] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
                    Texte du Lien
                  </label>
                  <input
                    type="text"
                    value={formData.linkText}
                    onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
                    placeholder="En savoir plus"
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0d1117] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Live Preview Box */}
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0d1117] border border-gray-200 dark:border-gray-800 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Aperçu en Direct de la Pastille</span>
                </div>
                <div className="flex items-center gap-3">
                  {(() => {
                    const cfg = getCategoryConfig(formData.type);
                    return (
                      <div
                        className={`w-9 h-9 rounded-full bg-white dark:bg-[#161b22] border-2 flex items-center justify-center shrink-0 ${cfg.dotBorder} ${cfg.dotShadow}`}
                      >
                        {cfg.icon}
                      </div>
                    );
                  })()}
                  <div>
                    <span className="text-xs font-bold font-mono text-purple-600 dark:text-purple-400 block">
                      {formData.period || 'Date / Période'}
                    </span>
                    <span className="font-semibold text-sm text-gray-900 dark:text-gray-100 block">
                      {formData.title || 'Titre de l’étape'}
                    </span>
                  </div>
                </div>
              </div>

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
                    <span>{editingItemId ? 'Mettre à jour' : 'Ajouter à la timeline'}</span>
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
