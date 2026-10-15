'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project, Developer } from '@/lib/types';
import StatusBadge from '@/components/projects/StatusBadge';
import AvailabilityBadge from '@/components/developers/AvailabilityBadge';
import CollaborateModal from '@/components/projects/CollaborateModal';
import {
  ArrowLeft,
  ArrowUpRight,
  Globe,
  Video,
  Cpu,
  Layers,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';

interface ProjectDetailClientProps {
  project: Project;
  creator?: Developer;
}

export default function ProjectDetailClient({ project, creator }: ProjectDetailClientProps) {
  const [collabOpen, setCollabOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const creatorAvatarUrl = creator?.avatarUrl || project.creatorAvatar;
  const showCreatorAvatar = Boolean(creatorAvatarUrl && !avatarError);
  const creatorInitials = project.creatorName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  // Exact WhatsApp prefilled message
  const cleanPhone = project.creatorWhatsApp?.replace(/[^0-9]/g, '') || '';
  const whatsAppText = encodeURIComponent(
    `Hi ${project.creatorName}, I discovered your project '${project.title}' on ADYK CARDEX and I'm interested in collaborating.`
  );
  const whatsAppLink = `https://wa.me/${cleanPhone}?text=${whatsAppText}`;

  return (
    <div className="pt-20 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Top Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#858585] hover:text-[#111111] transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all projects</span>
        </Link>
      </div>

      {/* Main Hero Header */}
      <div className="relative rounded-2xl overflow-hidden material-luxury-card bg-white mb-10 border border-[#EAE8E3]">
        {/* Project Image Banner with Luxury Editorial Filter */}
        <div className="relative w-full aspect-[21/9] min-h-[260px] max-h-[420px] overflow-hidden bg-[#F0EEEA]">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center project-editorial-image"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20" />

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <StatusBadge status={project.status} className="!text-[11px] !px-2.5 !py-0.5" />

            {project.collaborationOpen && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] bg-white/95 border border-[#B99752]/40 text-[#111111] backdrop-blur-md shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B99752] animate-pulse" />
                <span className="font-semibold">Open for Collaboration</span>
              </span>
            )}
          </div>

          {/* Hero Title & Identity Bottom Overlay */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 z-10">
            <div className="max-w-2xl text-white">
              <span className="text-[11px] uppercase tracking-wider text-neutral-300 font-semibold mb-1.5 block">
                {project.category}
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em] uppercase mb-1.5 text-white drop-shadow-xs">
                {project.title}
              </h1>
              {project.tagline && (
                <p className="text-xs sm:text-sm text-neutral-200 font-normal line-clamp-2">
                  {project.tagline}
                </p>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              {project.collaborationOpen && (
                <button
                  type="button"
                  onClick={() => setCollabOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-[#111111] hover:bg-[#222222] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-xs"
                >
                  Collaborate &rarr;
                </button>
              )}

              <Link
                href={`/developers/${project.creatorUsername}`}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F8F7F4] text-[#111111] text-xs uppercase tracking-wider font-semibold border border-[#EAE8E3] transition-colors shadow-xs"
              >
                View Creator &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Details (8 cols) + Sidebar (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Long-form Editorial Architecture & Specs (8 cols) */}
        <div className="lg:col-span-8 space-y-10">
          {/* Overview */}
          <section className="p-8 sm:p-10 rounded-3xl material-luxury-card bg-white border border-[#EAE8E3]">
            <h2 className="text-lg font-bold text-[#111111] mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#B99752]" />
              <span>Project Overview</span>
            </h2>
            <p className="text-[#555555] text-base leading-relaxed whitespace-pre-line font-normal">
              {project.description}
            </p>
          </section>

          {/* Problem Solved */}
          {project.problemSolved && (
            <section className="p-8 sm:p-10 rounded-3xl material-luxury-card bg-white border border-[#EAE8E3]">
              <h2 className="text-lg font-bold text-[#111111] mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B99752]" />
                <span>Problem Solved</span>
              </h2>
              <p className="text-[#555555] text-base leading-relaxed whitespace-pre-line font-normal">
                {project.problemSolved}
              </p>
            </section>
          )}

          {/* How It Works */}
          {project.howItWorks && (
            <section className="p-8 sm:p-10 rounded-3xl material-luxury-card bg-white border border-[#EAE8E3]">
              <h2 className="text-lg font-bold text-[#111111] mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#B99752]" />
                <span>How It Works &amp; Architecture</span>
              </h2>
              <p className="text-[#555555] text-base leading-relaxed whitespace-pre-line font-normal">
                {project.howItWorks}
              </p>
            </section>
          )}

          {/* Collaboration Requirements */}
          {project.collaborationOpen && project.lookingFor.length > 0 && (
            <section className="p-8 sm:p-10 rounded-3xl material-luxury-card bg-[#FAF9F6] border border-[#EAE8E3] shadow-sm">
              <div className="flex items-center gap-2 text-[#111111] text-xs uppercase tracking-wider font-bold mb-2">
                <span>Active Collaboration Needs</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#111111] uppercase tracking-tight mb-3">
                Seeking Teammates &amp; Contributors
              </h2>
              <p className="text-sm text-[#555555] mb-6 font-normal">
                This project is actively welcoming builders. If your skill set matches the requirements below, reach out directly:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {project.lookingFor.map((role) => (
                  <div
                    key={role}
                    className="p-3.5 rounded-xl bg-white border border-[#EAE8E3] flex items-center gap-3 text-sm text-[#111111] shadow-sm font-medium"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B99752]" />
                    <span>{role}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setCollabOpen(true)}
                  className="px-7 py-3.5 rounded-xl bg-[#111111] hover:bg-[#222222] text-white text-xs uppercase tracking-wider font-semibold shadow-md transition-colors"
                >
                  Transmit Collaboration Proposal &rarr;
                </button>

                {project.allowWhatsAppContact && project.creatorWhatsApp && (
                  <a
                    href={whatsAppLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#F8F7F4] border border-[#EAE8E3] hover:border-[#B99752] text-[#111111] text-xs uppercase tracking-wider transition-all font-semibold shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4 text-[#B99752]" />
                    <span>Collaborate on WhatsApp &rarr;</span>
                  </a>
                )}
              </div>
            </section>
          )}
        </div>

        {/* Right Sidebar: Meta & Creator Preview (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Creator Profile Box */}
          <div className="p-7 rounded-3xl material-luxury-card bg-white border border-[#EAE8E3]">
            <span className="text-xs uppercase tracking-wider text-[#858585] font-semibold block mb-4">
              Project Creator
            </span>

            <div className="flex items-center gap-3.5 mb-4">
              <div className="relative w-12 h-12 rounded-xl bg-[#F8F7F4] border border-[#EAE8E3] flex items-center justify-center font-bold text-[#111111] text-base flex-shrink-0 overflow-hidden">
                {showCreatorAvatar ? (
                  <Image
                    src={creatorAvatarUrl!}
                    alt={project.creatorName}
                    fill
                    className="object-cover"
                    sizes="48px"
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <span>{creatorInitials}</span>
                )}
              </div>
              <div>
                <h3 className="text-base font-bold text-[#111111]">
                  {project.creatorName}
                </h3>
                <p className="text-xs text-[#858585]">
                  @{project.creatorUsername}
                </p>
              </div>
            </div>

            {creator?.bio && (
              <p className="text-xs text-[#555555] leading-relaxed mb-5 line-clamp-3">
                {creator.bio}
              </p>
            )}

            {creator?.availability && (
              <div className="mb-5">
                <AvailabilityBadge availability={creator.availability} />
              </div>
            )}

            <Link
              href={`/developers/${project.creatorUsername}`}
              className="w-full py-2.5 rounded-xl bg-[#F8F7F4] hover:bg-[#EAE8E3] border border-[#EAE8E3] text-xs uppercase tracking-wider text-center block text-[#111111] font-medium transition-colors"
            >
              View Full Profile &rarr;
            </Link>
          </div>

          {/* External Links */}
          <div className="p-7 rounded-3xl material-luxury-card bg-white border border-[#EAE8E3]">
            <span className="text-xs uppercase tracking-wider text-[#858585] font-semibold block mb-4">
              Project Links
            </span>

            <div className="space-y-2.5 text-xs">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF9F6] hover:bg-[#F8F7F4] border border-[#EAE8E3] text-[#111111] hover:text-[#B99752] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <GithubIcon className="w-4 h-4 text-[#111111]" />
                    <span>Source Repository</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#858585]" />
                </a>
              )}

              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF9F6] hover:bg-[#F8F7F4] border border-[#EAE8E3] text-[#111111] hover:text-[#B99752] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#111111]" />
                    <span>Live Interactive Demo</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#858585]" />
                </a>
              )}

              {project.demoVideoUrl && (
                <a
                  href={project.demoVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF9F6] hover:bg-[#F8F7F4] border border-[#EAE8E3] text-[#111111] hover:text-[#B99752] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-[#111111]" />
                    <span>Architecture Walkthrough Video</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#858585]" />
                </a>
              )}
            </div>
          </div>

          {/* Technologies Stack Box */}
          <div className="p-7 rounded-3xl material-luxury-card bg-white border border-[#EAE8E3]">
            <span className="text-xs uppercase tracking-wider text-[#858585] font-semibold block mb-4">
              Technologies Used
            </span>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Link
                  key={tech}
                  href={`/explore?tech=${encodeURIComponent(tech)}`}
                  className="px-3 py-1 rounded-lg text-xs bg-[#FAF9F6] hover:bg-[#F8F7F4] text-[#555555] hover:text-[#111111] border border-[#EAE8E3] transition-colors font-medium"
                >
                  {tech}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Collaboration Modal */}
      <CollaborateModal
        project={project}
        isOpen={collabOpen}
        onClose={() => setCollabOpen(false)}
      />
    </div>
  );
}
