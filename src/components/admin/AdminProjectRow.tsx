'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Project } from '@/lib/types';
import {
  Check,
  X,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Globe,
  Edit2,
  Trash2,
  Save,
  RotateCcw,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';

interface AdminProjectRowProps {
  project: Project;
  onStatusChange?: (updated: Project) => void;
  onDelete?: (deletedId: string) => void;
}

function formatDateDeterministic(dateStr?: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDateTimeDeterministic(dateStr?: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const mins = String(d.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${mins}`;
}

export default function AdminProjectRow({
  project,
  onStatusChange,
  onDelete,
}: AdminProjectRowProps) {
  const router = useRouter();
  const [currentProject, setCurrentProject] = useState<Project>(project);
  const [isDeleted, setIsDeleted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState(project.adminNotes || '');
  const [feedback, setFeedback] = useState<string | null>(null);

  // Edit form state
  const [editForm, setEditForm] = useState({
    title: project.title,
    tagline: project.tagline || '',
    description: project.description,
    category: project.category,
    technologies: project.technologies.join(', '),
    imageUrl: project.imageUrl,
    githubUrl: project.githubUrl || '',
    liveDemoUrl: project.liveDemoUrl || '',
    problemSolved: project.problemSolved || '',
    howItWorks: project.howItWorks || '',
  });

  if (isDeleted) {
    return null;
  }

  const handleDecision = async (decision: 'APPROVED' | 'DECLINED') => {
    try {
      setLoadingAction(decision);
      setFeedback(null);

      const res = await fetch('/api/admin/moderation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: currentProject.id,
          decision,
          adminNotes: adminNotes.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.project) {
        setCurrentProject(data.project);
        setFeedback(`Project status updated to ${decision} in PostgreSQL.`);
        if (onStatusChange) {
          onStatusChange(data.project);
        }
        router.refresh();
      } else {
        setFeedback(data.error || 'Failed to update status.');
      }
    } catch {
      setFeedback('Network or server error updating project status.');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoadingAction('SAVE_EDIT');
      setFeedback(null);

      const techs = editForm.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const updates = {
        title: editForm.title.trim(),
        tagline: editForm.tagline.trim() || undefined,
        description: editForm.description.trim(),
        category: editForm.category.trim(),
        technologies: techs,
        imageUrl: editForm.imageUrl.trim(),
        githubUrl: editForm.githubUrl.trim() || undefined,
        liveDemoUrl: editForm.liveDemoUrl.trim() || undefined,
        problemSolved: editForm.problemSolved.trim() || undefined,
        howItWorks: editForm.howItWorks.trim() || undefined,
      };

      const res = await fetch('/api/admin/moderation', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: currentProject.id,
          updates,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.project) {
        setCurrentProject(data.project);
        setIsEditing(false);
        setFeedback('Project successfully updated in PostgreSQL and public cache purged.');
        if (onStatusChange) {
          onStatusChange(data.project);
        }
        router.refresh();
      } else {
        setFeedback(data.error || 'Failed to save project updates.');
      }
    } catch {
      setFeedback('Network or server error while saving changes.');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to permanently delete "${currentProject.title}" from PostgreSQL?`)) {
      return;
    }

    try {
      setLoadingAction('DELETE');
      setFeedback(null);

      const res = await fetch('/api/admin/moderation', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: currentProject.id }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsDeleted(true);
        if (onDelete) {
          onDelete(currentProject.id);
        }
        router.refresh();
      } else {
        setFeedback(data.error || 'Failed to delete project.');
      }
    } catch {
      setFeedback('Network or server error deleting project.');
    } finally {
      setLoadingAction(null);
    }
  };

  const statusBadgeColor =
    currentProject.submissionStatus === 'APPROVED'
      ? 'bg-[#171717] text-[#FFFFFF] border-[#404040]'
      : currentProject.submissionStatus === 'DECLINED'
      ? 'bg-[#171717] text-[#737373] border-[#262626]'
      : 'bg-[#FFFFFF] text-[#000000] border-[#FFFFFF] font-bold';

  return (
    <div className="rounded-2xl bg-[#121212] border border-[#262626] overflow-hidden transition-all duration-200">
      {/* Primary Row Header */}
      <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Thumbnail & Essential Info */}
        <div className="flex items-start sm:items-center gap-4 min-w-0">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-[#1E1E1E] flex-shrink-0 border border-[#262626]">
            {currentProject.imageUrl ? (
              <Image
                src={currentProject.imageUrl}
                alt={currentProject.title}
                fill
                sizes="64px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-mono text-xs text-[#737373]">
                NO IMG
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border ${statusBadgeColor}`}
              >
                {currentProject.submissionStatus}
              </span>
              <span className="text-[10px] font-mono text-[#737373] uppercase">
                {currentProject.category}
              </span>
              <span suppressHydrationWarning className="text-[10px] font-mono text-[#525252]">
                {formatDateDeterministic(currentProject.createdAt)}
              </span>
            </div>

            <h3 className="text-sm sm:text-base font-bold font-mono text-[#FFFFFF] truncate">
              {currentProject.title}
            </h3>

            <div className="text-xs font-mono text-[#737373] flex flex-wrap items-center gap-2 mt-0.5">
              <span>By {currentProject.creatorName}</span>
              <span>&bull;</span>
              <span className="text-[#A3A3A3]">{currentProject.creatorEmail}</span>
              {currentProject.allowWhatsAppContact && currentProject.creatorWhatsApp && (
                <>
                  <span>&bull;</span>
                  <span className="text-[#EDEDED]">WhatsApp: {currentProject.creatorWhatsApp}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-center">
          {currentProject.submissionStatus !== 'APPROVED' && (
            <button
              onClick={() => handleDecision('APPROVED')}
              disabled={loadingAction !== null}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFFFFF] hover:bg-[#E5E5E5] text-[#000000] font-mono text-xs font-bold uppercase transition-all disabled:opacity-50"
              title="Approve and publish to production website"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{loadingAction === 'APPROVED' ? '...' : 'Approve'}</span>
            </button>
          )}

          {currentProject.submissionStatus !== 'DECLINED' && (
            <button
              onClick={() => handleDecision('DECLINED')}
              disabled={loadingAction !== null}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#171717] hover:bg-[#262626] border border-[#333333] text-[#A3A3A3] hover:text-[#FFFFFF] font-mono text-xs uppercase transition-colors disabled:opacity-50"
              title="Decline project"
            >
              <X className="w-3.5 h-3.5" />
              <span>{loadingAction === 'DECLINED' ? '...' : 'Decline'}</span>
            </button>
          )}

          <button
            onClick={() => {
              setIsEditing(!isEditing);
              if (!expanded) setExpanded(true);
            }}
            disabled={loadingAction !== null}
            className={`p-2 rounded-xl border font-mono text-xs transition-colors ${
              isEditing
                ? 'bg-[#FFFFFF] text-[#000000] border-[#FFFFFF]'
                : 'bg-[#171717] hover:bg-[#262626] border-[#262626] text-[#A3A3A3] hover:text-[#FFFFFF]'
            }`}
            title="Edit project details"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleDelete}
            disabled={loadingAction !== null}
            className="p-2 rounded-xl bg-[#171717] hover:bg-[#262626] border border-[#262626] text-[#737373] hover:text-[#EF4444] transition-colors"
            title="Delete project permanently"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 rounded-xl bg-[#171717] hover:bg-[#262626] border border-[#262626] text-[#A3A3A3] hover:text-[#FFFFFF] transition-colors"
            aria-label="Toggle details"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Drawer (Inspection & Editing) */}
      {expanded && (
        <div className="px-5 pb-6 pt-2 border-t border-[#1F1F1F] space-y-6 text-xs font-mono">
          {feedback && (
            <div className="p-3 rounded-xl bg-[#1C1C1C] border border-[#333333] text-[#EDEDED]">
              {feedback}
            </div>
          )}

          {/* EDIT FORM */}
          {isEditing ? (
            <form onSubmit={handleSaveEdit} className="space-y-4 pt-2">
              <div className="flex items-center justify-between border-b border-[#262626] pb-3">
                <span className="text-xs uppercase font-bold text-[#FFFFFF] tracking-wider">
                  EDIT PROJECT IN POSTGRESQL
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1C1C1C] text-[#A3A3A3] hover:text-[#FFFFFF]"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Cancel</span>
                  </button>
                  <button
                    type="submit"
                    disabled={loadingAction === 'SAVE_EDIT'}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FFFFFF] text-[#000000] font-bold"
                  >
                    <Save className="w-3 h-3" />
                    <span>{loadingAction === 'SAVE_EDIT' ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase text-[#737373] mb-1">Title</label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#171717] border border-[#262626] text-xs text-[#FFFFFF] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-[#737373] mb-1">Category</label>
                  <input
                    type="text"
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#171717] border border-[#262626] text-xs text-[#FFFFFF] outline-none"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] uppercase text-[#737373] mb-1">Tagline</label>
                  <input
                    type="text"
                    value={editForm.tagline}
                    onChange={(e) => setEditForm({ ...editForm, tagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#171717] border border-[#262626] text-xs text-[#FFFFFF] outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] uppercase text-[#737373] mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#171717] border border-[#262626] text-xs text-[#FFFFFF] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-[#737373] mb-1">Technologies (comma-separated)</label>
                  <input
                    type="text"
                    value={editForm.technologies}
                    onChange={(e) => setEditForm({ ...editForm, technologies: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#171717] border border-[#262626] text-xs text-[#FFFFFF] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-[#737373] mb-1">Image URL</label>
                  <input
                    type="text"
                    value={editForm.imageUrl}
                    onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#171717] border border-[#262626] text-xs text-[#FFFFFF] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-[#737373] mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={editForm.githubUrl}
                    onChange={(e) => setEditForm({ ...editForm, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#171717] border border-[#262626] text-xs text-[#FFFFFF] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-[#737373] mb-1">Live Demo URL</label>
                  <input
                    type="text"
                    value={editForm.liveDemoUrl}
                    onChange={(e) => setEditForm({ ...editForm, liveDemoUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#171717] border border-[#262626] text-xs text-[#FFFFFF] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-[#737373] mb-1">Problem Solved</label>
                  <textarea
                    rows={2}
                    value={editForm.problemSolved}
                    onChange={(e) => setEditForm({ ...editForm, problemSolved: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#171717] border border-[#262626] text-xs text-[#FFFFFF] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-[#737373] mb-1">How It Works</label>
                  <textarea
                    rows={2}
                    value={editForm.howItWorks}
                    onChange={(e) => setEditForm({ ...editForm, howItWorks: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#171717] border border-[#262626] text-xs text-[#FFFFFF] outline-none"
                  />
                </div>
              </div>
            </form>
          ) : (
            /* VIEW MODE */
            <>
              {/* Description */}
              <div>
                <span className="text-[10px] uppercase text-[#737373] tracking-widest block mb-1">
                  Description
                </span>
                <p className="text-sm text-[#CCCCCC] leading-relaxed font-sans font-normal">
                  {currentProject.description}
                </p>
              </div>

              {/* Problem Solved & How It Works */}
              {(currentProject.problemSolved || currentProject.howItWorks) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentProject.problemSolved && (
                    <div className="p-4 rounded-xl bg-[#171717] border border-[#262626]">
                      <span className="text-[10px] uppercase text-[#737373] block mb-1">
                        Problem Solved
                      </span>
                      <p className="text-xs text-[#EDEDED] font-sans font-normal">
                        {currentProject.problemSolved}
                      </p>
                    </div>
                  )}
                  {currentProject.howItWorks && (
                    <div className="p-4 rounded-xl bg-[#171717] border border-[#262626]">
                      <span className="text-[10px] uppercase text-[#737373] block mb-1">
                        How It Works
                      </span>
                      <p className="text-xs text-[#EDEDED] font-sans font-normal">
                        {currentProject.howItWorks}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Technologies & Collaboration */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase text-[#737373] tracking-widest block mb-2">
                    Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentProject.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-[#1C1C1C] border border-[#2B2B2B] text-[11px] text-[#EDEDED]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {currentProject.collaborationOpen && currentProject.lookingFor.length > 0 && (
                  <div>
                    <span className="text-[10px] uppercase text-[#737373] tracking-widest block mb-2">
                      Looking For Collaboration
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentProject.lookingFor.map((role) => (
                        <span
                          key={role}
                          className="px-2.5 py-1 rounded-md bg-[#1C1C1C] border border-[#383838] text-[11px] text-[#FFFFFF]"
                        >
                          &bull; {role}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* External Links */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {currentProject.githubUrl && (
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#171717] border border-[#262626] text-[#EDEDED] hover:text-[#FFFFFF]"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub Repository</span>
                    <ExternalLink className="w-3 h-3 text-[#737373]" />
                  </a>
                )}

                {currentProject.liveDemoUrl && (
                  <a
                    href={currentProject.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#171717] border border-[#262626] text-[#EDEDED] hover:text-[#FFFFFF]"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                    <ExternalLink className="w-3 h-3 text-[#737373]" />
                  </a>
                )}

                {currentProject.creatorLinkedIn && (
                  <a
                    href={currentProject.creatorLinkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#171717] border border-[#262626] text-[#EDEDED] hover:text-[#FFFFFF]"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    <span>Creator LinkedIn</span>
                    <ExternalLink className="w-3 h-3 text-[#737373]" />
                  </a>
                )}

                {currentProject.creatorWebsite && (
                  <a
                    href={currentProject.creatorWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#171717] border border-[#262626] text-[#EDEDED] hover:text-[#FFFFFF]"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Creator Portfolio</span>
                    <ExternalLink className="w-3 h-3 text-[#737373]" />
                  </a>
                )}
              </div>

              {/* Audit Notes & Moderation Notes */}
              <div className="pt-4 border-t border-[#1F1F1F]">
                <label
                  htmlFor={`notes-${currentProject.id}`}
                  className="block text-[10px] uppercase text-[#737373] tracking-widest mb-1.5 font-medium"
                >
                  Admin Audit Notes
                </label>
                <input
                  id={`notes-${currentProject.id}`}
                  type="text"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Internal moderation notes..."
                  className="w-full px-3 py-2 rounded-xl bg-[#171717] border border-[#262626] text-xs font-mono text-[#EDEDED] placeholder-[#525252] focus:border-[#FFFFFF] outline-none"
                />
                {currentProject.reviewedAt && (
                  <p suppressHydrationWarning className="text-[10px] text-[#737373] mt-1.5">
                    Last reviewed: {formatDateTimeDeterministic(currentProject.reviewedAt)}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
