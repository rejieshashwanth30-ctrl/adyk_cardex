'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Terminal, Code2, Layers } from 'lucide-react';
import CardexMark from '../brand/CardexMark';
import ScrollReveal from '../ui/ScrollReveal';

export default function HomeAboutSection() {
  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-[#EAE8E3]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column (7 cols): Editorial Manifesto */}
        <ScrollReveal variant="fade-up" duration={750} className="lg:col-span-7">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#858585] mb-4 font-semibold">
              <CardexMark size="xs" glow={false} />
              <span>09 &bull; ADYK CARDEX PHILOSOPHY</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black tracking-[-0.04em] text-[#111111] uppercase leading-[0.98] mb-8">
              THE WORK SPEAKS.<br />
              NOT THE FEED.
            </h2>

            <div className="space-y-5 text-base sm:text-lg text-[#555555] leading-relaxed font-normal">
              <p className="text-[#111111] font-medium text-lg sm:text-xl">
                &ldquo;ADYK CARDEX is an open platform where developers and creators showcase what they build, discover talented people, find collaborators, and connect directly.&rdquo;
              </p>
              <p>
                Traditional social feeds and portfolio templates reduce engineering achievements to vanity metrics. ADYK CARDEX was architected to illuminate the work itself&mdash;the technical decisions, the hardware schematics, the architecture diagrams, and the collaboration needs.
              </p>
              <p className="text-sm text-[#858585] pt-2 border-l-2 border-[#B99752] pl-4">
                Open discovery engine built for developers, designers, and systems architects across all stacks.
              </p>
            </div>

            <div className="mt-10">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#F8F7F4] border border-[#EAE8E3] hover:border-[#D6D2C8] text-xs tracking-wider uppercase text-[#111111] font-semibold transition-all shadow-sm"
              >
                <span>Read Full Manifesto & Architecture</span>
                <span className="text-[#B99752]">&rarr;</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Right Column (5 cols): Luxury White Architectural Pillars */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ScrollReveal variant="fade-scale" delay={100} duration={600}>
            <div className="p-6 rounded-2xl material-luxury-card bg-white hover:bg-[#FAF9F6] transition-all h-full">
              <Code2 className="w-5 h-5 text-[#B99752] mb-3" />
              <h3 className="text-sm font-bold text-[#111111] mb-1">Stack Agnostic</h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                From bare metal ESP32 and C++ to Next.js, PyTorch, and Flutter. Zero framework discrimination.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-scale" delay={200} duration={600}>
            <div className="p-6 rounded-2xl material-luxury-card bg-white hover:bg-[#FAF9F6] transition-all h-full">
              <Shield className="w-5 h-5 text-[#B99752] mb-3" />
              <h3 className="text-sm font-bold text-[#111111] mb-1">Creator Privacy</h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                No scraping. No public spam leaks. Personal emails and phones stay strictly private.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-scale" delay={300} duration={600}>
            <div className="p-6 rounded-2xl material-luxury-card bg-white hover:bg-[#FAF9F6] transition-all h-full">
              <Terminal className="w-5 h-5 text-[#B99752] mb-3" />
              <h3 className="text-sm font-bold text-[#111111] mb-1">Direct Connection</h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                Direct collaboration channels. Talk engineer-to-engineer and begin building immediately.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-scale" delay={400} duration={600}>
            <div className="p-6 rounded-2xl material-luxury-card bg-white hover:bg-[#FAF9F6] transition-all h-full">
              <Layers className="w-5 h-5 text-[#B99752] mb-3" />
              <h3 className="text-sm font-bold text-[#111111] mb-1">Verified Builds</h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                Curated intake ensures every published project represents authentic developer craftsmanship.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
