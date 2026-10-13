'use client';

import React from 'react';
import Link from 'next/link';
import CardexMark from '../brand/CardexMark';
import { ArrowRight, Plus, ShieldCheck } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

export default function SubmitCtaSection() {
  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-[#EAE8E3]">
      <ScrollReveal variant="fade-scale" duration={800}>
        <div className="relative rounded-3xl overflow-hidden material-luxury-card bg-gradient-to-b from-[#FFFFFF] via-[#FAF9F6] to-[#F8F7F4] p-10 sm:p-16 lg:p-20 text-center shadow-[0_20px_60px_-20px_rgba(0,0,0,0.06)] border border-[#EAE8E3]">
          {/* Volumetric Warm Gold Spotlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[#B99752]/[0.06] blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <div className="mb-8">
              <CardexMark size="lg" glow={true} />
            </div>

            {/* Label */}
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#858585] font-semibold block mb-4">
              BUILT SOMETHING? &bull; OPEN INTAKE
            </span>

            {/* Large Heading */}
            <h2 className="text-4xl sm:text-6xl font-black tracking-[-0.04em] text-[#111111] uppercase leading-[0.98] mb-6">
              PUT YOUR WORK<br />
              ON THE MAP.
            </h2>

            <p className="text-base sm:text-lg text-[#555555] leading-relaxed mb-10 max-w-xl font-normal">
              Showcase what you&apos;ve built and connect directly with collaborators who can help you take it to the next level.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/submit"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#111111] hover:bg-[#222222] text-white font-semibold text-xs font-mono uppercase tracking-[0.15em] shadow-[0_4px_25px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:scale-[1.01]"
              >
                <Plus className="w-3.5 h-3.5 text-[#B99752] stroke-[2.5]" />
                <span>SUBMIT YOUR PROJECT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white hover:bg-[#F8F7F4] text-[#111111] font-semibold text-xs font-mono uppercase tracking-[0.15em] border border-[#EAE8E3] hover:border-[#D6D2C8] transition-all shadow-sm"
              >
                <span>ABOUT ADYK CARDEX</span>
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-5 text-xs font-mono text-[#858585]">
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
