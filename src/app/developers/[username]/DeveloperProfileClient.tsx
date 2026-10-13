'use client';

import React from 'react';
import Link from 'next/link';
import { Developer, Project } from '@/lib/types';
import AvailabilityBadge from '@/components/developers/AvailabilityBadge';
import ProjectCard from '@/components/projects/ProjectCard';
import CardexMark from '@/components/brand/CardexMark';
import {
  ArrowLeft,
  Globe,
  MessageSquare,
  FolderKanban,
  MapPin,
  Calendar,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';

interface DeveloperProfileClientProps {
  developer: Developer;
  projects: Project[];
}

export default function DeveloperProfileClient({
  developer,
  projects,
}: DeveloperProfileClientProps) {
  const initials = developer.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  // WhatsApp click-to-chat if allowed
  const cleanPhone = developer.whatsApp?.replace(/[^0-9]/g, '') || '';
  const firstProject = projects[0]?.title || 'your builds';
  const whatsAppText = encodeURIComponent(
    `Hi ${developer.name}, I discovered your profile and project '${firstProject}' on ADYK CARDEX and I'm interested in collaborating.`
  );
  const whatsAppLink = `https://wa.me/${cleanPhone}?text=${whatsAppText}`;

  return (
    <div className="pt-28 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Breadcrumb */}
      <div className="mb-10">
        <Link
          href="/developers"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#858585] hover:text-[#111111] transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO ALL BUILDERS</span>
        </Link>
      </div>

      {/* Main Profile Header Banner */}
      <div className="p-8 sm:p-14 rounded-3xl material-luxury-card bg-white border border-[#EAE8E3] mb-16 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10">
          {/* Avatar & Info */}
          <div className="flex flex-col sm:flex-row items-start gap-8">
            <div className="relative w-28 h-28 rounded-2xl bg-[#F8F7F4] border border-[#EAE8E3] flex items-center justify-center font-mono font-black text-4xl text-[#111111] tracking-widest flex-shrink-0 shadow-sm">
              {initials}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full border border-[#EAE8E3] shadow-sm flex items-center justify-center">
                <CardexMark size="xs" />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl sm:text-5xl font-black text-[#111111] uppercase tracking-tight">
                  {developer.name}
                </h1>
                <AvailabilityBadge availability={developer.availability} />
              </div>

              <p className="text-xs sm:text-sm font-mono text-[#858585] mb-4 tracking-wider uppercase font-semibold">
                @{developer.username} &bull; {developer.role}
              </p>

              <p className="text-sm sm:text-base text-[#555555] max-w-2xl leading-relaxed mb-6 font-normal">
                {developer.bio}
              </p>

              <div className="flex flex-wrap items-center gap-5 text-xs font-mono text-[#858585]">
                {developer.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#B99752]" />
                    <span>{developer.location}</span>
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#B99752]" />
                  <span>Verified Builder &bull; ADYK CARDEX V1</span>
                </span>
              </div>
            </div>
          </div>

          {/* Connection Channel Buttons */}
          <div className="flex flex-col gap-3 min-w-[220px]">
            {developer.allowWhatsAppContact && developer.whatsApp && (
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white hover:bg-[#F8F7F4] border border-[#EAE8E3] hover:border-[#B99752] text-[#111111] font-mono text-xs uppercase tracking-wider font-semibold shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4 text-[#B99752]" />
                <span>DIRECT WHATSAPP &rarr;</span>
              </a>
            )}

            <div className="flex items-center gap-2">
              {developer.githubUrl && (
                <a
                  href={developer.githubUrl.startsWith('http') ? developer.githubUrl : `https://github.com/${developer.githubUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FAF9F6] hover:bg-[#F8F7F4] border border-[#EAE8E3] text-[#111111] font-mono text-xs uppercase tracking-wider transition-colors shadow-sm font-medium"
                >
                  <GithubIcon className="w-4 h-4 text-[#111111]" />
                  <span>GITHUB</span>
                </a>
              )}

              {developer.linkedInUrl && (
                <a
                  href={developer.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FAF9F6] hover:bg-[#F8F7F4] border border-[#EAE8E3] text-[#111111] font-mono text-xs uppercase tracking-wider transition-colors shadow-sm font-medium"
                >
                  <LinkedinIcon className="w-4 h-4 text-[#111111]" />
                  <span>LINKEDIN</span>
                </a>
              )}
            </div>

            {developer.portfolioUrl && (
              <a
                href={developer.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FAF9F6] hover:bg-[#F8F7F4] border border-[#EAE8E3] text-[#111111] font-mono text-xs uppercase tracking-wider transition-colors shadow-sm font-medium"
              >
                <Globe className="w-4 h-4 text-[#111111]" />
                <span>PERSONAL WEBSITE</span>
              </a>
            )}
          </div>
        </div>

        {/* Skills Tag Strip */}
        <div className="mt-10 pt-8 border-t border-[#EAE8E3]">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#858585] block mb-3 font-semibold">
            ENGINEERING &amp; DESIGN DOMAINS
          </span>
          <div className="flex flex-wrap gap-2">
            {developer.skills.map((skill) => (
              <span
                key={skill}
                className="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-[#FAF9F6] text-[#111111] border border-[#EAE8E3] font-medium uppercase tracking-wider shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Projects by this builder */}
      <div>
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#EAE8E3]">
          <h2 className="text-2xl font-black text-[#111111] uppercase tracking-tight flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-[#B99752]" />
            <span>BUILDS BY {developer.name} ({projects.length})</span>
          </h2>
          <span className="text-xs font-mono uppercase tracking-wider text-[#858585]">
            AUTHENTIC REPOSITORIES
          </span>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-16 material-luxury-card bg-white rounded-3xl p-8 border border-[#EAE8E3]">
            <p className="text-sm font-mono text-[#858585]">No verified builds listed yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} featured={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
