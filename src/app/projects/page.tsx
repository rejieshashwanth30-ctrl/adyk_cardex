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

export const instant = false;

export default async function ProjectsPage() {
  const projects = await getApprovedProjects();

  return (
    <div className="pt-28 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 border-b border-[#EAE8E3] pb-10">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#858585] font-semibold block mb-3">
            PROJECTS &bull; VERIFIED REPOSITORY
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-[-0.04em] text-[#111111] uppercase leading-[0.98]">
            BUILT BY DEVELOPERS.
          </h1>
          <p className="text-[#555555] text-sm sm:text-base mt-4 max-w-xl font-normal leading-relaxed">
            Explore projects, experiments and ideas created by builders across the open web.
          </p>
        </div>

        <Link
          href="/submit"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#111111] hover:bg-[#222222] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex-shrink-0"
        >
          <Plus className="w-3.5 h-3.5 text-[#B99752]" />
          <span>Submit Your Project</span>
        </Link>
      </div>

      {/* Projects Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} featured={true} />
        ))}
      </div>
    </div>
  );
}
