'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import { Project, Developer } from '@/lib/types';
import { TECHNOLOGIES, matchesTech } from '@/lib/data/technologies';

interface TechnologyGridProps {
  projects?: Project[];
  developers?: Developer[];
}

export default function TechnologyGrid({ projects = [] }: TechnologyGridProps) {
  const [activeHover, setActiveHover] = useState<string | null>(null);

  // Pre-calculate project counts for each technology from authentic database data (no fake numbers)
  const techProjectCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    TECHNOLOGIES.forEach((tech) => {
      const count = projects.filter((p) =>
        p.technologies.some((t) => matchesTech(t, tech.name))
      ).length;
      counts[tech.name] = count;
    });
    return counts;
  }, [projects]);

  return (
    <section className="py-14 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-[#EAE8E3]">
      {/* Editorial Header */}
      <ScrollReveal variant="fade-up" duration={700}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 border-b border-[#EAE8E3] pb-6 sm:pb-8">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#858585] font-semibold block mb-2 sm:mb-3">
              ECOSYSTEM &bull; STACK AGNOSTIC
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em] text-[#111111] uppercase max-w-2xl leading-[1.02]">
              THE TECHNOLOGY<br />
              BEHIND THE BUILD.
            </h2>
          </div>

          <div className="text-xs uppercase tracking-wider text-[#858585] font-medium">
            TECHNOLOGY &rarr; PROJECTS &rarr; BUILDERS
          </div>
        </div>
      </ScrollReveal>

      {/* ---------------- MOBILE COMPACT 2-COLUMN DISCOVERY GRID (< sm) ---------------- */}
      {/* DIRECT NAVIGATION TO DEDICATED EXPLORE PAGE (NOT EXPANDED IN SAME PAGE) */}
      <div className="sm:hidden">
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
          {TECHNOLOGIES.map((tech) => {
            const count = techProjectCounts[tech.name] || 0;

            return (
              <Link
                key={tech.name}
                href={`/explore?tech=${encodeURIComponent(tech.name)}`}
                className="group relative p-2.5 sm:p-3 rounded-xl material-luxury-card flex flex-col justify-between bg-white hover:bg-[#FAF9F6] active:bg-[#F2EFE9] border border-[#EAE8E3] hover:border-[#111111] transition-all duration-200 select-none"
              >
                <div>
                  {/* Top Row: STACK COMPONENT label + subtle arrow */}
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[9px] uppercase tracking-wider text-[#858585] font-semibold truncate">
                      STACK COMPONENT
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-[#858585] group-hover:text-[#111111] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  {/* Technology Name */}
                  <h3 className="text-xs sm:text-sm font-black tracking-tight uppercase text-[#111111] truncate mb-0.5 group-hover:text-black">
                    {tech.name}
                  </h3>

                  {/* Very short description */}
                  <p className="text-[10px] text-[#666666] line-clamp-1 leading-snug">
                    {tech.desc}
                  </p>
                </div>

                {/* Bottom Row: Real project count + Explore ↗ link */}
                <div className="mt-2.5 pt-1.5 border-t border-[#EAE8E3] flex items-center justify-between text-[9px]">
                  {count > 0 ? (
                    <span className="font-semibold text-[#111111] bg-[#F5F3EF] px-1.5 py-0.5 rounded-full inline-flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-[#B99752]" />
                      <span>{count} {count === 1 ? 'Build' : 'Builds'}</span>
                    </span>
                  ) : (
                    <span className="text-[#858585] font-medium">Stack index</span>
                  )}

                  <span className="font-semibold text-[#111111] group-hover:underline inline-flex items-center gap-0.5">
                    Explore &rarr;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ---------------- DESKTOP & TABLET VIEW (>= sm) ---------------- */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {TECHNOLOGIES.map((tech, idx) => {
          const isHovered = activeHover === tech.name;
          return (
            <ScrollReveal
              key={tech.name}
              variant="fade-scale"
              delay={(idx % 3) * 80}
              duration={650}
            >
              <Link
                href={`/explore?tech=${encodeURIComponent(tech.name)}`}
                onMouseEnter={() => setActiveHover(tech.name)}
                onMouseLeave={() => setActiveHover(null)}
                className="group relative p-5 sm:p-5.5 rounded-2xl material-luxury-card flex flex-col justify-between overflow-hidden bg-white hover:bg-[#FAF9F6] transition-all duration-300 h-full"
              >
                {/* Subtle monochromatic hover sheen */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] uppercase tracking-wider text-[#858585] font-semibold">
                      STACK COMPONENT
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#858585] group-hover:text-[#111111] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  <h3
                    className={`text-lg sm:text-xl font-black tracking-tight uppercase transition-all duration-300 ${
                      isHovered ? 'text-[#111111] translate-x-0.5' : 'text-[#222222]'
                    }`}
                  >
                    {tech.name}
                  </h3>

                  <p className="text-xs text-[#555555] mt-1.5 font-normal leading-relaxed line-clamp-2">
                    {tech.desc}
                  </p>
                </div>

                <div className="relative z-10 mt-4 pt-3 border-t border-[#EAE8E3] flex items-center justify-between text-xs uppercase tracking-wider text-[#858585] group-hover:text-[#111111] transition-colors font-medium">
                  <span>View Builds</span>
                  <span>&rarr;</span>
                </div>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}

