'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Terminal, Code2, Layers } from 'lucide-react';
import CardexMark from '../brand/CardexMark';
import ScrollReveal from '../ui/ScrollReveal';

export default function HomeAboutSection() {
  return (
    <section className="py-14 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-[#EAE8E3]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column (7 cols): Editorial Manifesto */}
        <ScrollReveal variant="fade-up" duration={750} className="lg:col-span-7">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-wider text-[#858585] mb-2 sm:mb-3 font-semibold">
              <CardexMark size="xs" glow={false} />
              <span>09 &bull; ADYK CARDEX PHILOSOPHY</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em] sm:tracking-[-0.04em] text-[#111111] uppercase leading-tight sm:leading-[0.98] mb-3 sm:mb-6">
              THE WORK SPEAKS.<br />
              NOT THE FEED.
            </h2>

            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm lg:text-base text-[#555555] leading-relaxed font-normal">
              <p className="text-[#111111] font-semibold text-sm sm:text-lg">
                &ldquo;ADYK CARDEX is an open platform where developers and creators showcase what they build, discover talented people, find collaborators, and connect directly.&rdquo;
              </p>
              <p className="line-clamp-3 sm:line-clamp-none">
                Traditional social feeds and portfolio templates reduce engineering achievements to vanity metrics. ADYK CARDEX was architected to illuminate the work itself&mdash;the technical decisions, the hardware schematics, the architecture diagrams, and the collaboration needs.
              </p>
              <p className="text-[11px] sm:text-xs text-[#858585] pt-1.5 sm:pt-2 border-l-2 border-[#B99752] pl-3 sm:pl-4">
                Open discovery engine built for developers, designers, and systems architects across all stacks.
              </p>
            </div>

            <div className="mt-5 sm:mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-[#F8F7F4] border border-[#EAE8E3] hover:border-[#D6D2C8] text-xs tracking-wider uppercase text-[#111111] font-semibold transition-all shadow-xs"
              >
                <span>Read Full Manifesto</span>
                <span className="text-[#B99752]">&rarr;</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Right Column (5 cols): Luxury White Architectural Pillars */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-2 sm:gap-4">
          <ScrollReveal variant="fade-scale" delay={100} duration={600} className="h-full">
            <div className="p-3 sm:p-6 rounded-xl sm:rounded-2xl material-luxury-card bg-white hover:bg-[#FAF9F6] transition-all h-full">
              <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#B99752] mb-2 sm:mb-3" />
              <h3 className="text-xs sm:text-sm font-bold text-[#111111] mb-0.5 sm:mb-1">Stack Agnostic</h3>
              <p className="text-[10px] sm:text-xs text-[#555555] leading-snug sm:leading-relaxed">
                From bare metal ESP32 to Next.js, PyTorch & Flutter. Zero framework discrimination.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-scale" delay={200} duration={600} className="h-full">
            <div className="p-3 sm:p-6 rounded-xl sm:rounded-2xl material-luxury-card bg-white hover:bg-[#FAF9F6] transition-all h-full">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#B99752] mb-2 sm:mb-3" />
              <h3 className="text-xs sm:text-sm font-bold text-[#111111] mb-0.5 sm:mb-1">Creator Privacy</h3>
              <p className="text-[10px] sm:text-xs text-[#555555] leading-snug sm:leading-relaxed">
                No scraping. Personal emails and phones stay strictly private and moderated.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-scale" delay={300} duration={600} className="h-full">
            <div className="p-3 sm:p-6 rounded-xl sm:rounded-2xl material-luxury-card bg-white hover:bg-[#FAF9F6] transition-all h-full">
              <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-[#B99752] mb-2 sm:mb-3" />
              <h3 className="text-xs sm:text-sm font-bold text-[#111111] mb-0.5 sm:mb-1">Direct Connection</h3>
              <p className="text-[10px] sm:text-xs text-[#555555] leading-snug sm:leading-relaxed">
                Direct collaboration channels. Talk engineer-to-engineer and build immediately.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-scale" delay={400} duration={600} className="h-full">
            <div className="p-3 sm:p-6 rounded-xl sm:rounded-2xl material-luxury-card bg-white hover:bg-[#FAF9F6] transition-all h-full">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#B99752] mb-2 sm:mb-3" />
              <h3 className="text-xs sm:text-sm font-bold text-[#111111] mb-0.5 sm:mb-1">Verified Builds</h3>
              <p className="text-[10px] sm:text-xs text-[#555555] leading-snug sm:leading-relaxed">
                Curated intake ensures every published project represents authentic craftsmanship.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
