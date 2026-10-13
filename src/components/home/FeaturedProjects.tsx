import React from 'react';
import Link from 'next/link';
import { Project } from '@/lib/types';
import ProjectCard from '../projects/ProjectCard';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const demoProjects = projects.slice(0, 2);

  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-[#EAE8E3]">
      {/* Section Editorial Header with Reveal */}
      <ScrollReveal variant="fade-up" duration={700}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 border-b border-[#EAE8E3] pb-10">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#858585] font-semibold block mb-3">
              PROJECTS &bull; WHAT PEOPLE BUILD
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-[#111111] uppercase max-w-3xl leading-[1.02]">
              IDEAS BECOME REAL<br />
              WHEN SOMEONE BUILDS THEM.
            </h2>
          </div>

          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#555555] hover:text-[#B99752] transition-colors flex-shrink-0 font-semibold"
          >
            <span>All Projects ({projects.length})</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#555555] group-hover:text-[#B99752] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </ScrollReveal>

      {/* Editorial Bento Grid with Staggered Entrance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {demoProjects.map((project, idx) => (
          <ScrollReveal
            key={project.id}
            variant="fade-up"
            delay={idx * 120}
            duration={750}
          >
            <ProjectCard project={project} featured={true} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
