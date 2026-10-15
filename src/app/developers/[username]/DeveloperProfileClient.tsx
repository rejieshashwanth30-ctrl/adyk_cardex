'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  const [imageError, setImageError] = useState(false);
  const initials = developer.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const hasAvatar = Boolean(developer.avatarUrl && !imageError);

  // WhatsApp click-to-chat if allowed
  const cleanPhone = developer.whatsApp?.replace(/[^0-9]/g, '') || '';
  const firstProject = projects[0]?.title || 'your builds';
  const whatsAppText = encodeURIComponent(
    `Hi ${developer.name}, I discovered your profile and project '${firstProject}' on ADYK CARDEX and I'm interested in collaborating.`
  );
  const whatsAppLink = `https://wa.me/${cleanPhone}?text=${whatsAppText}`;

  return (
    <div className="pt-20 sm:pt-24 pb-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Breadcrumb */}
      {/* Back link */}
      <div className="mb-6 sm:mb-8">
        <Link
          href="/developers"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#858585] hover:text-[#111111] transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all builders</span>
        </Link>
      </div>

      {/* Main Profile Header Banner */}
      <div className="p-5 sm:p-8 rounded-2xl material-luxury-card bg-white border border-[#EAE8E3] mb-10 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-10">
          {/* Avatar & Info */}
          <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#F8F7F4] border border-[#EAE8E3] flex items-center justify-center font-bold text-2xl sm:text-3xl text-[#111111] flex-shrink-0 shadow-xs">
              {hasAvatar ? (
                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                  <Image
                    src={developer.avatarUrl!}
                    alt={developer.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="96px"
                    onError={() => setImageError(true)}
                  />
                </div>
              ) : (
                <span>{initials}</span>
              )}
              <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-white rounded-full border border-[#EAE8E3] shadow-xs flex items-center justify-center z-10">
                <CardexMark size="xs" />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] uppercase tracking-tight">
                  {developer.name}
                </h1>
                <AvailabilityBadge availability={developer.availability} className="!text-[10px] !px-2 !py-0.5" />
              </div>

              <p className="text-xs sm:text-sm text-[#444444] mb-2.5 font-medium">
                @{developer.username} &bull; {developer.role}
              </p>

              <p className="text-xs sm:text-sm text-[#555555] max-w-2xl leading-relaxed mb-4 font-normal">
                {developer.bio}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#737373] font-medium">
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
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white hover:bg-[#F8F7F4] border border-[#EAE8E3] hover:border-[#B99752] text-[#111111] text-xs uppercase tracking-wider font-semibold shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4 text-[#B99752]" />
                <span>Direct WhatsApp &rarr;</span>
              </a>
            )}

            <div className="flex items-center gap-2">
              {developer.githubUrl && (
                <a
                  href={developer.githubUrl.startsWith('http') ? developer.githubUrl : `https://github.com/${developer.githubUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FAF9F6] hover:bg-[#F8F7F4] border border-[#EAE8E3] text-[#111111] text-xs uppercase tracking-wider transition-colors shadow-sm font-medium"
                >
                  <GithubIcon className="w-4 h-4 text-[#111111]" />
                  <span>GitHub</span>
                </a>
              )}

              {developer.linkedInUrl && (
                <a
                  href={developer.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FAF9F6] hover:bg-[#F8F7F4] border border-[#EAE8E3] text-[#111111] text-xs uppercase tracking-wider transition-colors shadow-sm font-medium"
                >
                  <LinkedinIcon className="w-4 h-4 text-[#111111]" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>

            {developer.portfolioUrl && (
              <a
                href={developer.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FAF9F6] hover:bg-[#F8F7F4] border border-[#EAE8E3] text-[#111111] text-xs uppercase tracking-wider transition-colors shadow-sm font-medium"
              >
                <Globe className="w-4 h-4 text-[#111111]" />
                <span>Personal Website</span>
              </a>
            )}
          </div>
        </div>

        {/* Skills Tag Strip */}
        <div className="mt-10 pt-8 border-t border-[#EAE8E3]">
          <span className="text-xs uppercase tracking-wider text-[#858585] block mb-3 font-semibold">
            Engineering &amp; Design Domains
          </span>
          <div className="flex flex-wrap gap-2">
            {developer.skills.map((skill) => (
              <span
                key={skill}
                className="px-3.5 py-1.5 rounded-lg text-xs bg-[#FAF9F6] text-[#111111] border border-[#EAE8E3] font-medium shadow-sm"
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
          <span className="text-xs uppercase tracking-wider text-[#858585] font-medium">
            Authentic Repositories
          </span>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-16 material-luxury-card bg-white rounded-2xl p-8 border border-[#EAE8E3]">
            <p className="text-xs sm:text-sm text-[#858585]">No verified builds listed yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} featured={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
