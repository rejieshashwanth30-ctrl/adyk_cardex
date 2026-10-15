import React from 'react';
import Link from 'next/link';
import { getApprovedProjects } from '@/lib/data/store';
import ProjectCard from '@/components/projects/ProjectCard';
import { Plus } from 'lucide-react';

export const metadata = {
  title: 'Projects — ADYK CARDEX',
  description:
    'Explore verified technology projects, architectures, and open experiments built by developers on ADYK CARDEX.',
};

import { connection } from 'next/server';

export const instant = false;

export default async function ProjectsPage() {
  await connection();
  const projects = await getApprovedProjects();

  return (
    <div className="pt-20 sm:pt-24 pb-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 border-b border-[#EAE8E3] pb-6 sm:pb-8">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#858585] font-semibold block mb-2 sm:mb-3">
            PROJECTS &bull; VERIFIED REPOSITORY
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.04em] text-[#111111] uppercase leading-[0.98]">
            BUILT BY DEVELOPERS.
          </h1>
          <p className="text-[#555555] text-xs sm:text-sm mt-2.5 max-w-xl font-normal leading-relaxed">
            Explore projects, experiments and ideas created by builders across the open web.
          </p>
        </div>

        <Link
          href="/submit"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#111111] hover:bg-[#222222] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-sm flex-shrink-0"
        >
          <Plus className="w-3.5 h-3.5 text-[#B99752]" />
          <span>Submit Your Project</span>
        </Link>
      </div>

      {/* Projects Bento Grid */}
      {projects.length === 0 ? (
        <div className="p-12 sm:p-16 rounded-2xl bg-[#FAF9F6] border border-[#EAE8E3] text-center max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-xl bg-white border border-[#EAE8E3] text-[#111111] flex items-center justify-center mx-auto shadow-xs">
            <Plus className="w-5 h-5 text-[#B99752]" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[#111111] uppercase tracking-tight">
            NO PUBLIC PROJECTS DISPLAYED
          </h2>
          <p className="text-xs text-[#666666] leading-relaxed">
            All submitted projects must be approved by administrators before appearing publicly.
          </p>
          <div className="pt-2">
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111111] hover:bg-[#222222] text-white text-xs uppercase tracking-wider font-semibold transition-colors"
            >
              <span>Submit A Project</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} featured={true} />
          ))}
        </div>
      )}
    </div>
  );
}
