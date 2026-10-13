'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  UploadCloud,
  Clock,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Info,
  CheckCircle2,
  Plus,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import { CollaborationRole, ProjectStatus } from '@/lib/types';
import CardexMark from '@/components/brand/CardexMark';

const COLLAB_OPTIONS: CollaborationRole[] = [
  'Frontend Developer',
  'Backend Developer',
  'Mobile Developer',
  'AI/ML Developer',
  'UI/UX Designer',
  'Hardware / IoT Developer',
  'Tester',
  'Other',
];

export default function SubmitProjectPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successData, setSuccessData] = useState<{
    submissionId: string;
    status: string;
  } | null>(null);

  // Form State
  const [creatorName, setCreatorName] = useState('');
  const [creatorEmail, setCreatorEmail] = useState('');
  const [creatorWhatsApp, setCreatorWhatsApp] = useState('');
  const [allowWhatsAppContact, setAllowWhatsAppContact] = useState(false);

  // Developer Avatar Upload State (Optional)
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarUploadError, setAvatarUploadError] = useState<string | null>(null);

  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [category, setCategory] = useState('Creative Technology / Web Platform');
  const [technologies, setTechnologies] = useState('Next.js, TypeScript, AI');

  // Image Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);

  const [problemSolved, setProblemSolved] = useState('');
  const [howItWorks, setHowItWorks] = useState('');

  const [githubUrl, setGithubUrl] = useState('');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  const [demoVideoUrl, setDemoVideoUrl] = useState('');
  const [creatorLinkedIn, setCreatorLinkedIn] = useState('');
  const [creatorWebsite, setCreatorWebsite] = useState('');

  const [projectStatus, setProjectStatus] = useState<ProjectStatus>('BUILDING');
  const [collaborationOpen, setCollaborationOpen] = useState(true);
  const [lookingFor, setLookingFor] = useState<CollaborationRole[]>([
    'Backend Developer',
    'UI/UX Designer',
  ]);

  const toggleRole = (role: CollaborationRole) => {
    if (lookingFor.includes(role)) {
      setLookingFor(lookingFor.filter((r) => r !== role));
    } else {
      setLookingFor([...lookingFor, role]);
    }
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploadError(null);
    setErrorMessage('');

    // Client-side file size check (5 MB)
    if (file.size > 5 * 1024 * 1024) {
      setImageUploadError(
        `File exceeds maximum allowed size of 5 MB (Selected size: ${(file.size / (1024 * 1024)).toFixed(2)} MB).`
      );
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Client-side MIME type check
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setImageUploadError(
        'Unsupported file format. Please select a JPG, PNG, or WebP image.'
      );
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Instant local preview
    setImageFile(file);
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);

    // Upload to server-side endpoint
    try {
      setIsUploadingImage(true);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setImageUploadError(data.error || 'Failed to upload image. Please try again.');
        setImageUrl('');
      } else {
        setImageUrl(data.url);
      }
    } catch {
      setImageUploadError('Network error uploading image. Please try again.');
      setImageUrl('');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageUrl('');
    setImageUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAvatarSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarUploadError(null);

    // Client-side file size check (5 MB)
    if (file.size > 5 * 1024 * 1024) {
      setAvatarUploadError(
        `File exceeds maximum allowed size of 5 MB (Selected size: ${(file.size / (1024 * 1024)).toFixed(2)} MB).`
      );
      if (avatarInputRef.current) avatarInputRef.current.value = '';
      return;
    }

    // Client-side MIME type check
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setAvatarUploadError(
        'Unsupported file format. Please select a JPG, PNG, or WebP image.'
      );
      if (avatarInputRef.current) avatarInputRef.current.value = '';
      return;
    }

    // Instant local preview
    setAvatarFile(file);
    const objectUrl = URL.createObjectURL(file);
    setAvatarPreview(objectUrl);

    // Upload to server-side endpoint
    try {
      setIsUploadingAvatar(true);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setAvatarUploadError(data.error || 'Failed to upload profile picture. Please try again.');
        setAvatarUrl('');
      } else {
        setAvatarUrl(data.url);
      }
    } catch {
      setAvatarUploadError('Network error uploading profile picture. Please try again.');
      setAvatarUrl('');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    setAvatarUrl('');
    setAvatarUploadError(null);
    if (avatarInputRef.current) {
      avatarInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Project image is strictly required
    if (!imageUrl) {
      setErrorMessage('Please add a project image before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      const techList = technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creatorName,
          creatorEmail,
          creatorWhatsApp,
          allowWhatsAppContact,
          creatorAvatarUrl: avatarUrl || undefined,
          projectTitle,
          projectDescription,
          category,
          technologies: techList,
          imageUrl,
          problemSolved,
          howItWorks,
          githubUrl,
          liveDemoUrl,
          demoVideoUrl,
          creatorLinkedIn,
          creatorWebsite,
          projectStatus,
          collaborationOpen,
          lookingFor: collaborationOpen ? lookingFor : [],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit project');
      }

      setSuccessData({
        submissionId: data.submissionId,
        status: data.status,
      });
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-10">
      {/* Success State Screen */}
      {successData ? (
        <div className="rounded-3xl material-luxury-card bg-white border border-[#EAE8E3] p-8 sm:p-14 shadow-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#FAF9F6] border border-[#B99752]/40 flex items-center justify-center mx-auto mb-6 text-[#B99752]">
            <Clock className="w-8 h-8 animate-pulse text-[#B99752]" />
          </div>

          <span className="text-xs uppercase tracking-wider text-[#858585] font-bold block mb-2">
            Submission Protocol Complete
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-[#111111] mb-3 uppercase tracking-tight">
            PROJECT SUBMITTED
          </h1>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF9F6] border border-[#B99752]/40 text-[#111111] text-xs font-bold mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#B99752] animate-ping" />
            <span>Status: Pending Review</span>
          </div>

          <p className="text-base text-[#555555] max-w-lg mx-auto leading-relaxed mb-6 font-normal">
            Your project has been received and is currently pending review. It will not appear publicly on the homepage, search, explore, or developers pages until it has been inspected and approved by ADYK CARDEX moderation.
          </p>

          <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] max-w-sm mx-auto text-xs text-[#555555] mb-8">
            <span className="text-[#858585] block mb-1">REFERENCE SUBMISSION ID:</span>
            <span className="text-[#111111] font-bold">{successData.submissionId}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/explore"
              className="px-6 py-3 rounded-xl bg-white hover:bg-[#FAF9F6] border border-[#EAE8E3] text-xs uppercase tracking-wider text-[#111111] font-semibold transition-colors shadow-sm"
            >
              &larr; Return to Explore
            </Link>
            <Link
              href="/moderation"
              className="px-6 py-3 rounded-xl bg-[#111111] text-white hover:bg-[#222222] text-xs uppercase tracking-wider font-bold transition-colors shadow-sm"
            >
              Open Moderation Panel &rarr;
            </Link>
          </div>
        </div>
      ) : (
        <div>
          {/* Header */}
          <div className="mb-12 text-center sm:text-left border-b border-[#EAE8E3] pb-10">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#858585] mb-3 font-semibold">
              <UploadCloud className="w-3.5 h-3.5 text-[#B99752]" />
              <span>Public Intake &bull; No Login Required</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#111111] uppercase leading-[0.95]">
              SHOW US WHAT<br />
              <span className="text-[#858585]">YOU BUILT.</span>
            </h1>
            <p className="text-[#555555] text-sm sm:text-base mt-4 max-w-xl font-normal leading-relaxed">
              Publish your project to ADYK CARDEX. All submissions enter a curated review queue to ensure verified craftsmanship and developer privacy.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Creator Information Section */}
            <div className="p-6 sm:p-8 rounded-3xl material-luxury-card bg-white border border-[#EAE8E3] space-y-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#111111] font-bold">
                <ShieldCheck className="w-4 h-4 text-[#B99752]" />
                <span>01. Creator Identity (Privacy Protected)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                    Creator Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    placeholder="e.g. Vikram Seth"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] text-sm text-[#111111] placeholder-[#858585] focus:outline-none focus:border-[#B99752] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                    Creator Email * (Kept Strictly Private)
                  </label>
                  <input
                    type="email"
                    required
                    value={creatorEmail}
                    onChange={(e) => setCreatorEmail(e.target.value)}
                    placeholder="e.g. vikram@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] text-sm text-[#111111] placeholder-[#858585] focus:outline-none focus:border-[#B99752] transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                  Creator WhatsApp (Optional &bull; Defaults to Private)
                </label>
                <input
                  type="text"
                  value={creatorWhatsApp}
                  onChange={(e) => setCreatorWhatsApp(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] text-sm text-[#111111] placeholder-[#858585] focus:outline-none focus:border-[#B99752] transition-colors"
                />

                <label className="flex items-center gap-3 mt-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={allowWhatsAppContact}
                    onChange={(e) => setAllowWhatsAppContact(e.target.checked)}
                    className="w-4 h-4 rounded border-[#EAE8E3] text-[#111111] focus:ring-0"
                  />
                  <span className="text-xs text-[#555555]">
                    Allow direct &ldquo;COLLABORATE ON WHATSAPP&rdquo; click-to-chat button on project page (Default: OFF)
                  </span>
                </label>
              </div>

              {/* Developer Profile Picture (Optional) */}
              <div className="pt-4 border-t border-[#EAE8E3]">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-[#111111]">
                    Developer Profile Picture (Optional)
                  </label>
                  {avatarUrl ? (
                    <span className="text-xs text-[#059669] font-bold uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
                      <span>Photo Attached</span>
                    </span>
                  ) : (
                    <span className="text-xs text-[#858585]">
                      Optional &bull; Initials used if skipped
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#555555] mb-3 font-normal">
                  Upload an optional profile picture for your developer card. If skipped, your 2-letter monogram initials will be displayed.
                </p>

                {/* Native Device File Input for Profile Photo */}
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleAvatarSelect}
                />

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl bg-[#FAF9F6] border border-[#EAE8E3]">
                  {/* The exact Developer Card preview box */}
                  <div className="relative w-14 h-14 rounded-2xl bg-white border border-[#EAE8E3] flex items-center justify-center font-bold text-lg text-[#111111] shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex-shrink-0">
                    {avatarPreview ? (
                      <div className="w-full h-full rounded-2xl overflow-hidden relative">
                        <Image
                          src={avatarPreview}
                          alt="Profile Preview"
                          fill
                          unoptimized
                          className="object-cover"
                        />
                        {isUploadingAvatar && (
                          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center">
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                      </div>
                    ) : (
                      <span>
                        {creatorName.trim()
                          ? creatorName
                              .trim()
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .slice(0, 2)
                              .toUpperCase()
                          : 'DEV'}
                      </span>
                    )}
                    <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 bg-white rounded-full border border-[#EAE8E3] shadow-sm flex items-center justify-center z-10">
                      <CardexMark size="xs" glow={false} />
                    </div>
                  </div>

                  {/* Actions & Explanations */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <button
                        type="button"
                        onClick={() => avatarInputRef.current?.click()}
                        disabled={isUploadingAvatar}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-[#EAE8E3] hover:border-[#111111] text-[#111111] text-xs uppercase tracking-wider font-semibold transition-all shadow-sm disabled:opacity-50"
                      >
                        {avatarPreview ? (
                          <>
                            <RefreshCw className="w-3 h-3 text-[#555555]" />
                            <span>Change Profile Photo</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3 text-[#B99752]" />
                            <span>+ Upload Profile Photo</span>
                          </>
                        )}
                      </button>

                      {avatarPreview && (
                        <button
                          type="button"
                          onClick={handleRemoveAvatar}
                          disabled={isUploadingAvatar}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF0F0] hover:bg-[#FCE8E8] border border-red-200 text-red-700 text-xs uppercase tracking-wider font-semibold transition-all disabled:opacity-50"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>

                    <p className="text-[11px] text-[#858585]">
                      {isUploadingAvatar
                        ? 'Optimizing & uploading profile picture...'
                        : avatarPreview
                        ? `${avatarFile?.name || 'Profile photo uploaded'} (ready)`
                        : 'JPG, PNG, or WebP &bull; Max 5 MB &bull; Device camera or photo library'}
                    </p>

                    {avatarUploadError && (
                      <p className="text-xs text-red-600 mt-1.5 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{avatarUploadError}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Project Details Section */}
            <div className="p-6 sm:p-8 rounded-3xl material-luxury-card bg-white border border-[#EAE8E3] space-y-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#111111] font-bold">
                <Sparkles className="w-4 h-4 text-[#B99752]" />
                <span>02. Project Specifications</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="e.g. Apex Hypervisor Core"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] text-sm text-[#111111] placeholder-[#858585] focus:outline-none focus:border-[#B99752] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] text-sm text-[#111111] focus:outline-none focus:border-[#B99752] font-medium"
                  >
                    <option value="Creative Technology / Web Platform">Creative Technology / Web Platform</option>
                    <option value="AI / IoT / Embedded Systems">AI / IoT / Embedded Systems</option>
                    <option value="Developer Tooling & Infrastructure">Developer Tooling & Infrastructure</option>
                    <option value="Distributed Computing & Protocols">Distributed Computing & Protocols</option>
                    <option value="Mobile & Cross-Platform Application">Mobile & Cross-Platform Application</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                  Project Description * (Minimum 20 characters)
                </label>
                <textarea
                  rows={3}
                  required
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Concise, technical description of what you designed and engineered."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] text-sm text-[#111111] placeholder-[#858585] focus:outline-none focus:border-[#B99752] resize-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                  Technologies Used * (Comma-separated)
                </label>
                <input
                  type="text"
                  required
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                  placeholder="e.g. Next.js, TypeScript, AI, PyTorch, Docker"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] text-sm text-[#111111] placeholder-[#858585] focus:outline-none focus:border-[#B99752] transition-colors"
                />
              </div>

              {/* Real Project Image Upload Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-[#111111]">
                    Project Image *
                  </label>
                  {imageUrl ? (
                    <span className="text-xs text-[#059669] font-bold uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
                      <span>Image Attached</span>
                    </span>
                  ) : (
                    <span className="text-xs text-[#858585]">
                      JPG / PNG / WebP &bull; Max 5 MB
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#555555] mb-3 font-normal">
                  Upload a clear image representing your project.
                </p>

                {/* Native Device File Input (Opens device photo picker on mobile or file dialog on desktop) */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleImageSelect}
                />

                {!imagePreview ? (
                  /* Empty state with + ADD PROJECT IMAGE button */
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all duration-200 ${
                      imageUploadError
                        ? 'border-red-400 bg-red-50/20'
                        : 'border-[#D5D2CB] bg-[#FAF9F6] hover:bg-[#F3F1EC] hover:border-[#111111]'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white border border-[#EAE8E3] shadow-sm flex items-center justify-center mx-auto mb-4 text-[#111111]">
                      <UploadCloud className="w-6 h-6 text-[#111111]" />
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] hover:bg-[#222222] text-white text-xs uppercase tracking-wider font-bold transition-all shadow-sm mb-2"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#B99752]" />
                      <span>+ Add Project Image</span>
                    </button>

                    <p className="text-xs text-[#858585] mt-1">
                      Tap or click to browse device photos &amp; files
                    </p>
                  </div>
                ) : (
                  /* Image Selected & Preview Card */
                  <div className="rounded-2xl border border-[#EAE8E3] bg-[#FAF9F6] p-4 space-y-4">
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black/5 border border-[#EAE8E3]">
                      <Image
                        src={imagePreview}
                        alt="Project Preview"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                      {isUploadingImage && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Optimizing &amp; uploading image...</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#111111] truncate">
                          {imageFile?.name || 'Uploaded Project Image'}
                        </div>
                        <div className="text-xs text-[#858585]">
                          {imageFile
                            ? `${(imageFile.size / (1024 * 1024)).toFixed(2)} MB • ${imageFile.type.toUpperCase().replace('IMAGE/', '')}`
                            : 'Image Ready'}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploadingImage}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#EAE8E3] hover:border-[#111111] text-[#111111] text-xs uppercase tracking-wider font-semibold transition-all shadow-sm disabled:opacity-50"
                        >
                          <RefreshCw className="w-3 h-3 text-[#555555]" />
                          <span>Change Image</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          disabled={isUploadingImage}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF0F0] hover:bg-[#FCE8E8] border border-red-200 text-red-700 text-xs uppercase tracking-wider font-semibold transition-all disabled:opacity-50"
                        >
                          <Trash2 className="w-3 h-3 text-red-600" />
                          <span>Remove Image</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {imageUploadError && (
                  <div className="mt-2.5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{imageUploadError}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                    Problem Solved
                  </label>
                  <textarea
                    rows={2}
                    value={problemSolved}
                    onChange={(e) => setProblemSolved(e.target.value)}
                    placeholder="What friction or challenge does this solve?"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] text-sm text-[#111111] placeholder-[#858585] focus:outline-none focus:border-[#B99752] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                    How It Works
                  </label>
                  <textarea
                    rows={2}
                    value={howItWorks}
                    onChange={(e) => setHowItWorks(e.target.value)}
                    placeholder="Architecture, pipeline, or execution details."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] text-sm text-[#111111] placeholder-[#858585] focus:outline-none focus:border-[#B99752] resize-none"
                  />
                </div>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#111111] mb-2">
                  Current Project Status *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['BUILDING', 'COMPLETED', 'OPEN_SOURCE'] as ProjectStatus[]).map((status) => (
                    <button
                      type="button"
                      key={status}
                      onClick={() => setProjectStatus(status)}
                      className={`py-2.5 px-3 rounded-xl text-xs uppercase tracking-wider font-semibold border transition-colors ${
                        projectStatus === status
                          ? 'bg-[#111111] text-white border-[#111111] shadow-sm'
                          : 'bg-[#FAF9F6] text-[#555555] border-[#EAE8E3] hover:text-[#111111]'
                      }`}
                    >
                      {status.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* External Links Section */}
            <div className="p-6 sm:p-8 rounded-3xl material-luxury-card bg-white border border-[#EAE8E3] space-y-4">
              <span className="text-xs uppercase tracking-wider text-[#111111] font-bold block">
                03. Links &amp; Repositories (Optional)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                    GitHub Repository URL
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] text-xs text-[#111111] placeholder-[#858585] focus:outline-none focus:border-[#B99752]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={liveDemoUrl}
                    onChange={(e) => setLiveDemoUrl(e.target.value)}
                    placeholder="https://yourdemo.app"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] text-xs text-[#111111] placeholder-[#858585] focus:outline-none focus:border-[#B99752]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                    Demo Video URL
                  </label>
                  <input
                    type="url"
                    value={demoVideoUrl}
                    onChange={(e) => setDemoVideoUrl(e.target.value)}
                    placeholder="https://youtube.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] text-xs text-[#111111] placeholder-[#858585] focus:outline-none focus:border-[#B99752]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                    Creator LinkedIn
                  </label>
                  <input
                    type="url"
                    value={creatorLinkedIn}
                    onChange={(e) => setCreatorLinkedIn(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] text-xs text-[#111111] placeholder-[#858585] focus:outline-none focus:border-[#B99752]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                    Creator Portfolio / Website
                  </label>
                  <input
                    type="url"
                    value={creatorWebsite}
                    onChange={(e) => setCreatorWebsite(e.target.value)}
                    placeholder="https://yourportfolio.dev"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] text-xs text-[#111111] placeholder-[#858585] focus:outline-none focus:border-[#B99752]"
                  />
                </div>
              </div>
            </div>

            {/* Collaboration Section */}
            <div className="p-6 sm:p-8 rounded-3xl material-luxury-card bg-white border border-[#EAE8E3] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#111111] font-bold">
                  04. Collaboration Settings
                </span>

                <button
                  type="button"
                  onClick={() => setCollaborationOpen(!collaborationOpen)}
                  className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold border transition-colors ${
                    collaborationOpen
                      ? 'bg-[#111111] text-white border-[#111111] shadow-sm'
                      : 'bg-[#FAF9F6] text-[#858585] border-[#EAE8E3]'
                  }`}
                >
                  {collaborationOpen ? 'Open for Collaboration: Yes' : 'Open for Collaboration: No'}
                </button>
              </div>

              {collaborationOpen && (
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-[#111111] mb-2">
                    Looking For (Select Roles):
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {COLLAB_OPTIONS.map((role) => {
                      const selected = lookingFor.includes(role);
                      return (
                        <button
                          type="button"
                          key={role}
                          onClick={() => toggleRole(role)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs border transition-colors ${
                            selected
                              ? 'bg-[#111111] text-white border-[#111111] font-bold shadow-sm'
                              : 'bg-[#FAF9F6] border-[#EAE8E3] text-[#555555] hover:text-[#111111]'
                          }`}
                        >
                          {selected ? '✓ ' : '+ '}
                          {role}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-[#111111] hover:bg-[#222222] text-white font-semibold text-sm tracking-wide uppercase transition-all shadow-md disabled:opacity-50"
              >
                {isSubmitting ? 'Transmitting Intake...' : 'Submit Project for Review &rarr;'}
              </button>

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[#858585]">
                <Info className="w-3.5 h-3.5 text-[#B99752]" />
                <span>Project will undergo review before appearing on public feeds.</span>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
