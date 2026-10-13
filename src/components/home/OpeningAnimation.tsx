'use client';

import React, { useState, useEffect } from 'react';
import CardexMark from '../brand/CardexMark';

export default function OpeningAnimation() {
  const [stage, setStage] = useState<'initial' | 'mark' | 'sweep' | 'title' | 'tagline' | 'done'>('initial');
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      window.requestAnimationFrame(() => setRemoved(true));
      return;
    }

    // Check if user already saw opening intro this session
    const seen = sessionStorage.getItem('cardex_intro_seen');
    if (seen) {
      window.requestAnimationFrame(() => setRemoved(true));
      return;
    }

    // Cinematic 1.3s sequence
    const t0 = setTimeout(() => setStage('mark'), 40);
    const t1 = setTimeout(() => setStage('sweep'), 350);
    const t2 = setTimeout(() => setStage('title'), 650);
    const t3 = setTimeout(() => setStage('tagline'), 900);
    const t4 = setTimeout(() => {
      setStage('done');
      sessionStorage.setItem('cardex_intro_seen', 'true');
    }, 1300);
    const t5 = setTimeout(() => setRemoved(true), 1700);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white pointer-events-none transition-opacity duration-500 ${
        stage === 'done' ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center justify-center text-center px-4 relative">
        {/* Soft volumetric metallic gold glow */}
        <div
          className={`absolute w-80 h-80 rounded-full blur-[100px] pointer-events-none transition-opacity duration-700 ${
            stage !== 'initial' ? 'opacity-40' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle, rgba(185, 151, 82, 0.45) 0%, rgba(248, 247, 244, 0.2) 50%, transparent 75%)',
          }}
        />

        {/* 2. ADYK CARDEX Official Logo */}
        <div
          className={`relative transform transition-all duration-500 ease-out ${
            stage === 'initial'
              ? 'scale-85 opacity-0'
              : 'scale-100 opacity-100'
          }`}
        >
          <CardexMark size="xl" glow />

          {/* 3. Subtle Metallic Gold Light Sweep */}
          <div
            className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-300 ${
              stage === 'sweep' || stage === 'title' || stage === 'tagline'
                ? 'opacity-100'
                : 'opacity-0'
            }`}
          >
            <div
              className={`w-full h-full bg-gradient-to-r from-transparent via-[#B99752]/25 to-transparent transform -skew-x-25 transition-transform duration-700 ease-in-out ${
                stage === 'sweep' ? 'translate-x-full' : '-translate-x-full'
              }`}
            />
          </div>
        </div>

        {/* 4. ADYK CARDEX Wordmark Appears */}
        <div
          className={`mt-7 transform transition-all duration-400 ease-out ${
            stage === 'title' || stage === 'tagline' || stage === 'done'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3'
          }`}
        >
          <h1 className="font-mono text-2xl md:text-3xl font-bold tracking-[0.2em] text-[#111111]">
            ADYK CARDEX
          </h1>
        </div>

        {/* 5. BUILD. SHOWCASE. CONNECT. Appears */}
        <div
          className={`mt-2.5 transform transition-all duration-400 ease-out ${
            stage === 'tagline' || stage === 'done'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2'
          }`}
        >
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#858585]">
            BUILD. SHOWCASE. CONNECT.
          </p>
        </div>
      </div>
    </div>
  );
}
