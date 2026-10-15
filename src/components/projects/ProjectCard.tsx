'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/types';
import StatusBadge from './StatusBadge';
import CollaborateModal from './CollaborateModal';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const [isCollabOpen, setIsCollabOpen] = useState(false);

  return (
    <>
      {/* ---------------- MOBILE COMPACT CARD (< sm) ---------------- */}
      <div
        className={`sm:hidden group relative rounded-2xl material-luxury-card flex flex-col justify-between overflow-hidden h-full ${
          featured ? 'bg-[#FFFFFF]' : 'bg-[#FAF9F6]'
        }`}
      >
        {/* Project Image Banner */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#F0EEEA]">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 50vw, 33vw"
            className="object-cover object-center project-editorial-image"
            priority={featured}
          />

          {/* Soft Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />

          {/* Badges Over Image Top */}
          <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none z-10 gap-1">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-white/95 border border-[#EAE8E3] text-[#111111] backdrop-blur-md shadow-xs">
              <span
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  project.status === 'BUILDING'
                    ? 'bg-[#B99752] animate-pulse'
                    : project.status === 'COMPLETED'
                    ? 'bg-[#111111]'
                    : 'bg-[#858585]'
                }`}
              />
              <span className="truncate max-w-[65px]">{project.status}</span>
            </span>

            {project.collaborationOpen && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-medium bg-white/95 border border-[#B99752]/40 text-[#111111] backdrop-blur-md shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B99752] animate-pulse flex-shrink-0" />
                <span className="hidden min-[380px]:inline">Collab</span>
              </span>
            )}
          </div>

          {/* Creator Pill Over Image Bottom */}
          <div className="absolute bottom-1.5 left-2 right-2 z-10">
            <Link
              href={`/developers/${project.creatorUsername}`}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 border border-[#EAE8E3] text-[10px] font-medium text-[#111111] hover:text-[#B99752] backdrop-blur-md transition-colors shadow-xs truncate max-w-full"
            >
              <span className="w-1 h-1 rounded-full bg-[#B99752] flex-shrink-0" />
              <span className="truncate">by {project.creatorName}</span>
            </Link>
          </div>
        </div>

        {/* Mobile Card Body */}
        <div className="p-2.5 sm:p-3 flex flex-col flex-grow bg-white justify-between">
          <div>
            {/* Category */}
            <span className="text-[10px] font-medium text-[#737373] uppercase tracking-wider block mb-1 truncate">
              {project.category}
            </span>

            {/* Title */}
            <h3 className="text-xs sm:text-sm font-bold tracking-tight text-[#111111] group-hover:text-black transition-colors line-clamp-1 mb-1.5 leading-snug">
              <Link href={`/projects/${project.slug}`} className="focus:outline-none">
                {project.title}
              </Link>
            </h3>

            {/* Technologies (2-3 chips max) */}
            <div className="flex flex-wrap gap-1 mb-2">
              {project.technologies.slice(0, 2).map((tech) => (
                <span
                  key={tech}
                  className="px-1.5 py-0.5 rounded text-[10px] bg-[#F8F7F4] text-[#444444] border border-[#EAE8E3] font-medium truncate max-w-[80px]"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 2 && (
                <span className="px-1 py-0.5 rounded text-[10px] bg-[#F8F7F4] text-[#858585] font-medium">
                  +{project.technologies.length - 2}
                </span>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 border-t border-[#EAE8E3] flex items-center justify-between gap-1 mt-auto">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1 text-[11px] text-[#444444] hover:text-[#111111] font-semibold transition-colors py-1"
            >
              <span>View</span>
              <ArrowUpRight className="w-3 h-3 text-[#858585]" />
            </Link>

            {project.collaborationOpen && (
              <button
                type="button"
                onClick={() => setIsCollabOpen(true)}
                className="inline-flex items-center gap-0.5 px-2 py-1 rounded-md text-[10px] bg-[#111111] hover:bg-[#222222] text-white font-medium transition-all shadow-xs"
              >
                <span>Collab</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ---------------- DESKTOP / TABLET CARD (>= sm) ---------------- */}
      {/* Refined compact, neat and clean editorial card for desktop & laptops */}
      <div
        className={`hidden sm:flex group relative rounded-2xl material-luxury-card flex-col overflow-hidden h-full ${
          featured ? 'bg-[#FFFFFF]' : 'bg-[#FAF9F6]'
        }`}
      >
        {/* Subtle hover gold light sweep */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B99752]/[0.04] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-20" />

        {/* Project Image Banner with Luxury Editorial Treatment */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#F0EEEA]">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center project-editorial-image"
            priority={featured}
          />

          {/* Soft White/Ivory Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

          {/* Badges Over Image Top */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
            <StatusBadge status={project.status} className="!text-[11px] !px-2.5 !py-0.5" />

            {project.collaborationOpen && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/95 border border-[#B99752]/40 text-[#111111] backdrop-blur-md shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B99752] animate-pulse" />
                <span>Collaborate</span>
              </span>
            )}
          </div>

          {/* Creator Pill Over Image Bottom */}
          <div className="absolute bottom-2.5 left-3 flex items-center gap-2 z-10">
            <Link
              href={`/developers/${project.creatorUsername}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/95 border border-[#EAE8E3] text-[11px] font-medium text-[#111111] hover:text-[#B99752] backdrop-blur-md transition-colors shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#B99752]" />
              <span>by {project.creatorName}</span>
            </Link>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 flex flex-col flex-grow relative z-10 bg-white">
          {/* Category */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-medium text-[#737373] tracking-wide uppercase">
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#111111] group-hover:text-black transition-colors mb-2 leading-snug">
            <Link href={`/projects/${project.slug}`} className="focus:outline-none">
              {project.title}
            </Link>
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#555555] line-clamp-2 leading-relaxed mb-3.5 font-normal">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1 mb-3.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-[11px] bg-[#F8F7F4] text-[#444444] border border-[#EAE8E3] font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-1.5 py-0.5 rounded text-[11px] bg-[#F8F7F4] text-[#858585] font-medium">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Looking For Collaboration Role Block */}
          {project.collaborationOpen && project.lookingFor && project.lookingFor.length > 0 && (
            <div className="mt-auto mb-3.5 p-2.5 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3]">
              <span className="text-[10px] uppercase tracking-wider text-[#737373] block mb-1 font-semibold">
                Looking For:
              </span>
              <div className="text-[11px] text-[#111111] font-medium flex flex-wrap gap-x-2 gap-y-0.5">
                {project.lookingFor.map((role) => (
                  <span key={role} className="inline-block">
                    &bull; {role}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="mt-auto pt-3 border-t border-[#EAE8E3] flex items-center justify-between gap-2.5">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1 text-xs text-[#555555] hover:text-[#111111] transition-colors group-hover:translate-x-0.5 duration-200 font-semibold"
            >
              <span>View Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#858585] group-hover:text-[#111111] transition-colors" />
            </Link>

            {project.collaborationOpen && (
              <button
                type="button"
                onClick={() => setIsCollabOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs bg-[#111111] hover:bg-[#222222] border border-[#111111] text-white transition-all shadow-xs font-medium"
              >
                <span>Collaborate &rarr;</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Collaboration Dialog */}
      <CollaborateModal
        isOpen={isCollabOpen}
        onClose={() => setIsCollabOpen(false)}
        project={project}
      />
    </>
  );
}
