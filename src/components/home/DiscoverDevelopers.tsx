import React from 'react';
import Link from 'next/link';
import { Developer } from '@/lib/types';
import DeveloperCard from '../developers/DeveloperCard';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

interface DiscoverDevelopersProps {
  developers: Developer[];
}

export default function DiscoverDevelopers({ developers }: DiscoverDevelopersProps) {
  return (
    <section className="py-14 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-[#EAE8E3]">
      {/* Editorial Section Header */}
      <ScrollReveal variant="fade-up" duration={700}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 border-b border-[#EAE8E3] pb-6 sm:pb-8">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#858585] font-semibold block mb-2 sm:mb-3">
              BUILDERS &bull; DEVELOPER DISCOVERY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em] text-[#111111] uppercase max-w-2xl leading-[1.02]">
              MEET THE PEOPLE<br />
              BEHIND THE WORK.
            </h2>
          </div>

          <Link
            href="/developers"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#555555] hover:text-[#B99752] transition-colors flex-shrink-0 font-semibold"
          >
            <span>All Builders ({developers.length})</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#555555] group-hover:text-[#B99752] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </ScrollReveal>

      {/* Developer Cards Grid with Staggered Entrance */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
        {developers.map((dev, idx) => (
          <ScrollReveal
            key={dev.id}
            variant="fade-up"
            delay={idx * 120}
            duration={750}
            className="h-full"
          >
            <DeveloperCard developer={dev} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
