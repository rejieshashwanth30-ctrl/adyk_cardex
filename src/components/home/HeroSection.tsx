'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import HeroCSculpture from './HeroCSculpture';

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      window.requestAnimationFrame(() => setReducedMotion(true));
      return;
    }

    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Subtle restrained parallax values (never extreme)
  const textTranslateY = reducedMotion ? 0 : Math.min(scrollY * 0.08, 30);
  const heroOpacity = reducedMotion ? 1 : Math.max(0.7, 1 - scrollY / 1200);
  const sculptureTranslateY = reducedMotion ? 0 : Math.min(scrollY * 0.04, 18);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div
        className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 transition-opacity duration-300"
        style={{ opacity: heroOpacity }}
      >
        {/* Left Column: Architectural Editorial Typography & CTAs (7 cols) */}
        <div
          className="lg:col-span-7 flex flex-col items-start text-left transition-transform duration-200 ease-out"
          style={{ transform: `translateY(${textTranslateY}px)` }}
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#EAE8E3] shadow-[0_2px_8px_rgba(0,0,0,0.03)] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B99752] animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-[#555555] font-semibold">
              ADYK CARDEX &bull; DISCOVERY ENGINE
            </span>
          </div>

          {/* Main Editorial Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-[#111111] leading-[0.94] mb-8 uppercase select-none">
            YOUR WORK<br />
            DESERVES TO BE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#111111] via-[#333333] to-[#B99752] drop-shadow-[0_4px_20px_rgba(185,151,82,0.15)]">
              DISCOVERED.
            </span>
          </h1>

          {/* Supporting Text */}
          <div className="text-base sm:text-lg text-[#555555] font-normal leading-relaxed mb-10 max-w-lg space-y-1.5">
            <p>Showcase what you build to the world.</p>
            <p>Discover the talented minds driving open technology.</p>
            <p className="text-[#111111] font-medium">Connect directly. Build together.</p>
          </div>

          {/* Premium Luxury Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            {/* Primary CTA (Rich Black with Gold Accent Icon) */}
            <Link
              href="/projects"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#111111] hover:bg-[#222222] text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_30px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B99752] transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            {/* Secondary CTA (Pure White with Crisp Border & Gold Detail) */}
            <Link
              href="/developers"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-white hover:bg-[#F8F7F4] text-[#111111] font-semibold text-xs tracking-wider uppercase border border-[#EAE8E3] hover:border-[#D6D2C8] transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:-translate-y-0.5"
            >
              <span>Discover Developers</span>
            </Link>
          </div>

          {/* Secondary Editorial Link */}
          <div className="mt-8 pt-5 border-t border-[#EAE8E3] w-full flex items-center gap-2">
            <span className="text-xs text-[#858585]">Building an open product or prototype?</span>
            <Link
              href="/submit"
              className="group inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#111111] hover:text-[#B99752] transition-colors font-medium"
            >
              <span className="underline underline-offset-4 decoration-[#B99752]/40 group-hover:decoration-[#B99752]">
                Submit your project &rarr;
              </span>
            </Link>
          </div>
        </div>

        {/* Right Column: Luxury 3D Monolith Sculpture in Pearl White & Gold (5 cols) */}
        <div
          className="lg:col-span-5 flex items-center justify-center transition-transform duration-200 ease-out"
          style={{ transform: `translateY(${sculptureTranslateY}px)` }}
        >
          <HeroCSculpture />
        </div>
      </div>
    </section>
  );
}
