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
  const featuredProjectsList = projects.slice(0, 3);

  return (
    <section className="py-14 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-[#EAE8E3]">
      {/* Section Editorial Header with Reveal */}
      <ScrollReveal variant="fade-up" duration={700}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 border-b border-[#EAE8E3] pb-6 sm:pb-8">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#858585] font-semibold block mb-2 sm:mb-3">
              PROJECTS &bull; WHAT PEOPLE BUILD
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em] text-[#111111] uppercase max-w-3xl leading-[1.02]">
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
      {featuredProjectsList.length === 0 ? (
        <ScrollReveal variant="fade-up" duration={700}>
          <div className="p-12 sm:p-16 rounded-2xl bg-[#FAF9F6] border border-[#EAE8E3] text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-wider text-[#858585] font-semibold block">
              CURATED SHOWCASE &bull; REPOSITORY PENDING
            </span>
            <h3 className="text-lg sm:text-xl font-black text-[#111111] uppercase tracking-tight">
              AWAITING APPROVED SUBMISSIONS
            </h3>
            <p className="text-xs sm:text-sm text-[#666666] leading-relaxed max-w-md mx-auto">
              Every project on ADYK CARDEX is moderated by administrators before public display. Be the first to showcase your engineering!
            </p>
            <div className="pt-2">
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111111] hover:bg-[#222222] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-xs"
              >
                <span>Submit Your Project</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#B99752]" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
          {featuredProjectsList.map((project, idx) => (
            <ScrollReveal
              key={project.id}
              variant="fade-up"
              delay={idx * 120}
              duration={750}
              className="h-full"
            >
              <ProjectCard project={project} featured={true} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </section>
  );
}
