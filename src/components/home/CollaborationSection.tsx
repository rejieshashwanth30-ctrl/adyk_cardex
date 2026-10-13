'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Project } from '@/lib/types';
import StatusBadge from '../projects/StatusBadge';
import CollaborateModal from '../projects/CollaborateModal';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

interface CollaborationSectionProps {
  projects: Project[];
}

export default function CollaborationSection({ projects }: CollaborationSectionProps) {
  const collabProjects = projects.filter((p) => p.collaborationOpen);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-[#EAE8E3]">
      {/* Editorial Header */}
      <ScrollReveal variant="fade-up" duration={700}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 border-b border-[#EAE8E3] pb-10">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#858585] font-semibold block mb-3">
              COLLABORATION &bull; DIRECT CONNECTION
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-[#111111] uppercase max-w-3xl leading-[0.96]">
              BUILDING<br />
              IS BETTER<br />
              TOGETHER.
            </h2>
            <p className="text-base sm:text-lg text-[#555555] mt-4 max-w-xl font-normal leading-relaxed">
              Find people with the skills your project needs. Directly connect with creators and build something together.
            </p>
          </div>

          <Link
            href="/collaboration"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#555555] hover:text-[#B99752] transition-colors flex-shrink-0 font-semibold"
          >
            <span>All Collaborations ({collabProjects.length})</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#555555] group-hover:text-[#B99752] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </ScrollReveal>

      {/* Large Luxury Collaboration Cards Composition */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {collabProjects.map((project, idx) => (
          <ScrollReveal
            key={project.id}
            variant="fade-up"
            delay={idx * 120}
            duration={750}
          >
            <div className="group relative rounded-2xl sm:rounded-3xl material-luxury-card p-8 sm:p-10 flex flex-col justify-between bg-white hover:bg-[#FAF9F6] transition-all duration-400 h-full">
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="text-xs uppercase tracking-wider text-[#858585] font-semibold">
                    {project.category}
                  </span>
                  <StatusBadge status={project.status} />
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] group-hover:text-black transition-colors mb-2.5">
                  <Link href={`/projects/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>

                {/* Creator Tag */}
                <p className="text-xs text-[#858585] mb-5 font-normal">
                  Created by{' '}
                  <Link
                    href={`/developers/${project.creatorUsername}`}
                    className="text-[#111111] font-semibold hover:text-[#B99752] hover:underline underline-offset-4"
                  >
                    {project.creatorName}
                  </Link>
                </p>

                {/* Short Description */}
                <p className="text-sm text-[#555555] leading-relaxed mb-8 font-normal">
                  {project.description}
                </p>

                {/* Looking For Luxury Section */}
                <div className="p-5 rounded-2xl bg-[#F8F7F4] border border-[#EAE8E3] mb-8">
                  <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[#858585] font-semibold mb-3">
                    <span>LOOKING FOR:</span>
                    <span className="text-[#111111] text-xs px-2.5 py-0.5 rounded-full bg-white border border-[#B99752]/40 shadow-sm font-semibold">
                      OPEN
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.lookingFor.map((role) => (
                      <span
                        key={role}
                        className="px-3 py-1.5 rounded-lg text-xs bg-white text-[#111111] border border-[#EAE8E3] font-medium shadow-sm"
                      >
                        &bull; {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#EAE8E3] flex items-center justify-between gap-4">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs text-[#555555] hover:text-[#111111] transition-colors font-medium group/link"
                >
                  <span>View Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#858585] transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>

                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#111111] hover:bg-[#222222] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.15)] group/btn"
                >
                  <span>Collaborate</span>
                  <span className="transition-transform duration-200 group-hover/btn:translate-x-1">&rarr;</span>
                </button>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {selectedProject && (
        <CollaborateModal
          project={selectedProject}
          isOpen={Boolean(selectedProject)}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
