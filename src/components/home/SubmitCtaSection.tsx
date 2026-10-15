'use client';

import React from 'react';
import Link from 'next/link';
import CardexMark from '../brand/CardexMark';
import { ArrowRight, Plus, ShieldCheck } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

export default function SubmitCtaSection() {
  return (
    <section className="py-14 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-[#EAE8E3]">
      <ScrollReveal variant="fade-scale" duration={800}>
        <div className="relative rounded-2xl overflow-hidden material-luxury-card bg-gradient-to-b from-[#FFFFFF] via-[#FAF9F6] to-[#F8F7F4] p-6 sm:p-10 lg:p-14 text-center shadow-xs border border-[#EAE8E3]">
          {/* Volumetric Warm Gold Spotlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[300px] bg-[#B99752]/[0.06] blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <div className="mb-3 sm:mb-6">
              <CardexMark size="md" glow={true} className="sm:hidden" />
              <div className="hidden sm:block">
                <CardexMark size="md" glow={true} />
              </div>
            </div>

            {/* Label */}
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#858585] font-semibold block mb-2 sm:mb-3">
              BUILT SOMETHING? &bull; OPEN INTAKE
            </span>

            {/* Large Heading */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em] sm:tracking-[-0.04em] text-[#111111] uppercase leading-tight sm:leading-[0.98] mb-2.5 sm:mb-4">
              PUT YOUR WORK<br />
              ON THE MAP.
            </h2>

            <p className="text-xs sm:text-sm lg:text-base text-[#555555] leading-relaxed mb-6 sm:mb-8 max-w-xl font-normal">
              Showcase what you&apos;ve built and connect directly with collaborators who can help you take it to the next level.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
              <Link
                href="/submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#111111] hover:bg-[#222222] text-white font-semibold text-xs tracking-wider uppercase shadow-xs transition-all duration-300"
              >
                <Plus className="w-3.5 h-3.5 text-[#B99752] stroke-[2.5]" />
                <span>Submit Your Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#F8F7F4] text-[#111111] font-semibold text-xs tracking-wider uppercase border border-[#EAE8E3] hover:border-[#D6D2C8] transition-all shadow-xs"
              >
                <span>About ADYK CARDEX</span>
              </Link>
            </div>

            <div className="mt-6 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-[10px] sm:text-xs text-[#858585] font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B99752]" />
                <span>No Login Required in V1</span>
              </span>
              <span>&bull;</span>
              <span>Architectural Review Verification</span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
