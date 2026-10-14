'use client';

import React from 'react';
import ScrollReveal from '../ui/ScrollReveal';

const STEPS = [
  {
    num: '01',
    label: 'SHOWCASE',
    title: 'Share what you build.',
    desc: 'Publish your work with architectural breakdowns, repository source links, and clear collaboration needs.',
  },
  {
    num: '02',
    label: 'DISCOVER',
    title: 'Explore projects and developers.',
    desc: 'Explore real technical builds across languages, embedded hardware, and specialized software domains.',
  },
  {
    num: '03',
    label: 'CONNECT',
    title: 'Reach the people behind the work.',
    desc: 'Reach the engineers directly without feed clutter, hiring middlemen, or superficial resume metrics.',
  },
  {
    num: '04',
    label: 'COLLABORATE',
    title: 'Build something together.',
    desc: 'Team up, commit code, solve hard engineering problems, and bring ambitious technology to life.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-12 sm:py-28 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-[#EAE8E3]">
      {/* Editorial Header */}
      <ScrollReveal variant="fade-up" duration={700}>
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-20">
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#858585] font-semibold block mb-1.5 sm:mb-3">
            METHODOLOGY &bull; ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-[#111111] uppercase leading-tight sm:leading-[1.02]">
            HOW ADYK CARDEX WORKS.
          </h2>
          <p className="text-xs sm:text-base text-[#555555] mt-2 sm:mt-4 max-w-lg mx-auto font-normal leading-relaxed">
            A direct, developer-first pipeline designed to give projects visibility and ignite collaboration.
          </p>
        </div>
      </ScrollReveal>

      {/* Four-Step Architectural Grid with Connecting Lines */}
      <div className="relative grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {/* Horizontal Connecting Line (Desktop) */}
        <div className="hidden lg:block absolute top-[4.5rem] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#B99752]/30 to-transparent z-0 pointer-events-none" />

        {STEPS.map((step, idx) => (
          <ScrollReveal
            key={step.num}
            variant="fade-up"
            delay={idx * 100}
            duration={700}
            className="h-full"
          >
            <div className="group relative rounded-xl sm:rounded-3xl material-luxury-card p-3 sm:p-6 lg:p-8 flex flex-col justify-between bg-white hover:bg-[#FAF9F6] transition-all duration-400 z-10 h-full">
              <div>
                {/* Step Number with Gold Accented Typography */}
                <div className="flex items-center justify-between mb-2 sm:mb-8">
                  <span className="text-xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#111111] via-[#333333] to-[#B99752]">
                    {step.num}
                  </span>
                  <span className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-[#EAE8E3] group-hover:bg-[#B99752] transition-colors" />
                </div>

                {/* Sub-label */}
                <span className="text-[9px] sm:text-xs uppercase tracking-wider text-[#858585] font-bold block mb-1 sm:mb-2 truncate">
                  {step.label}
                </span>

                {/* Step Title */}
                <h3 className="text-xs sm:text-lg lg:text-xl font-bold tracking-tight text-[#111111] mb-1 sm:mb-3 line-clamp-1 sm:line-clamp-none">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-[10px] sm:text-xs lg:text-sm text-[#555555] leading-snug sm:leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
                  {step.desc}
                </p>
              </div>

              <div className="mt-2.5 sm:mt-8 pt-1.5 sm:pt-4 border-t border-[#EAE8E3] text-[9px] sm:text-xs uppercase tracking-wider text-[#858585] group-hover:text-[#111111] transition-colors font-medium">
                Phase {step.num} &bull; Verified
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
