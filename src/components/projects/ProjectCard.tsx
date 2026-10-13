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
      <div
        className={`group relative rounded-2xl sm:rounded-3xl material-luxury-card flex flex-col overflow-hidden ${
          featured ? 'bg-[#FFFFFF]' : 'bg-[#FAF9F6]'
        }`}
      >
        {/* Subtle hover gold light sweep */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B99752]/[0.04] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-20" />

        {/* Project Image Banner with Luxury Editorial Treatment */}
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#F0EEEA]">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center project-editorial-image"
            priority={featured}
          />

          {/* Soft White/Ivory Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

          {/* Badges Over Image Top */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
            <StatusBadge status={project.status} />

            {project.collaborationOpen && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.15em] uppercase bg-white/95 border border-[#B99752]/40 text-[#111111] backdrop-blur-md shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B99752] animate-pulse" />
                <span className="font-semibold">COLLABORATE</span>
              </span>
            )}
          </div>

          {/* Creator Pill Over Image Bottom */}
          <div className="absolute bottom-3 left-4 flex items-center gap-2 z-10">
            <Link
              href={`/developers/${project.creatorUsername}`}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 border border-[#EAE8E3] text-xs font-mono text-[#111111] hover:text-[#B99752] backdrop-blur-md transition-colors shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#B99752]" />
              <span>by {project.creatorName}</span>
            </Link>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 flex flex-col flex-grow relative z-10 bg-white">
          {/* Category */}
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#858585] font-semibold">
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold tracking-tight text-[#111111] group-hover:text-black transition-colors mb-3">
            <Link href={`/projects/${project.slug}`} className="focus:outline-none">
              {project.title}
            </Link>
          </h3>

          {/* Description */}
          <p className="text-sm text-[#555555] line-clamp-2 leading-relaxed mb-6 font-normal">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#F8F7F4] text-[#555555] border border-[#EAE8E3] uppercase tracking-wider font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 rounded-md text-[11px] font-mono bg-[#F8F7F4] text-[#858585]">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Looking For Collaboration Role Block */}
          {project.collaborationOpen && project.lookingFor && project.lookingFor.length > 0 && (
            <div className="mt-auto mb-6 p-3.5 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3]">
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#858585] block mb-1.5 font-semibold">
                Looking For:
              </span>
              <div className="text-xs text-[#111111] font-medium font-mono">
                {project.lookingFor.map((role) => (
                  <span key={role} className="inline-block mr-3">
                    &bull; {role}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="mt-auto pt-5 border-t border-[#EAE8E3] flex items-center justify-between gap-3">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.15em] text-[#555555] hover:text-[#111111] transition-colors group-hover:translate-x-0.5 duration-200 font-semibold"
            >
              <span>View Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#858585] group-hover:text-[#111111] transition-colors" />
            </Link>

            {project.collaborationOpen && (
              <button
                type="button"
                onClick={() => setIsCollabOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-[0.15em] bg-[#111111] hover:bg-[#222222] border border-[#111111] text-white transition-all shadow-sm"
              >
                <span>COLLABORATE &rarr;</span>
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
