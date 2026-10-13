'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function AtmosphericBackground() {
  const pathname = usePathname();
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [scrollY, setScrollY] = useState(0);
  const [isTouch, setIsTouch] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Check if touch device or prefers reduced motion
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      window.requestAnimationFrame(() => setIsTouch(true));
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('textarea') ||
          target.closest('.interactive-hover')
        );
        setIsHoveringInteractive(isInteractive);
      }
    };

    const handleScroll = () => {
      if (rafId.current) return;
      rafId.current = window.requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafId.current = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Suppress in admin console
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  // Compute scroll fraction
  const maxScroll = typeof window !== 'undefined' ? (document.body.scrollHeight - window.innerHeight || 1) : 4000;
  const scrollFraction = Math.min(Math.max(scrollY / (maxScroll || 1), 0), 1);

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Pure Pearl White Base Floor */}
        <div className="absolute inset-0 bg-[#FFFFFF]" />

        {/* Very soft warm ivory gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] via-[#FAF9F6] to-[#F8F7F4] opacity-90" />

        {/* Fine Architectural Grid (1% black) */}
        <div className="absolute inset-0 architectural-grid opacity-50" />

        {/* Fine Architectural Dots (subtle telemetry layer) */}
        <div className="absolute inset-0 architectural-dots opacity-30" />

        {/* Dynamic Slow-Moving Radial Light Effects */}
        {/* 1. Hero Warm Pearl & Very Subtle Gold Light (top center) */}
        <div
          className="absolute -top-[12%] left-1/2 -translate-x-1/2 w-[70vw] h-[60vw] max-w-[1000px] max-h-[850px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-1000"
          style={{
            background:
              'radial-gradient(circle, rgba(185, 151, 82, 0.045) 0%, rgba(248, 247, 244, 0.6) 45%, transparent 75%)',
            opacity: Math.max(0.3, 1 - scrollFraction * 2.2),
          }}
        />

        {/* 2. Soft Ivory & Silver Light (middle left) */}
        <div
          className="absolute top-[28%] -left-[10%] w-[55vw] h-[55vw] max-w-[850px] max-h-[850px] rounded-full blur-[160px] pointer-events-none transition-opacity duration-1000"
          style={{
            background:
              'radial-gradient(circle, rgba(234, 232, 227, 0.8) 0%, rgba(185, 151, 82, 0.03) 40%, transparent 75%)',
            opacity: scrollFraction > 0.08 && scrollFraction < 0.65 ? 0.9 : 0.3,
          }}
        />

        {/* 3. Subtle Warm Gold Ambient Reflection (lower right) */}
        <div
          className="absolute top-[62%] -right-[10%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full blur-[180px] pointer-events-none transition-opacity duration-1000"
          style={{
            background:
              'radial-gradient(circle, rgba(185, 151, 82, 0.04) 0%, rgba(245, 243, 239, 0.7) 50%, transparent 80%)',
            opacity: scrollFraction > 0.35 && scrollFraction < 0.9 ? 0.95 : 0.25,
          }}
        />

        {/* 4. Fine Horizon Gold Line (ultra-fine 1px edge) */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B99752]/20 to-transparent" />
      </div>

      {/* Desktop Luxury Custom Cursor: Restrained Charcoal Outer Ring + Gold Core */}
      {!isTouch && mousePos.x >= 0 && (
        <>
          {/* Subtle Outer Halo */}
          <div
            className="fixed pointer-events-none z-50 rounded-full transition-transform duration-75 ease-out"
            style={{
              width: isHoveringInteractive ? 42 : 26,
              height: isHoveringInteractive ? 42 : 26,
              left: mousePos.x - (isHoveringInteractive ? 21 : 13),
              top: mousePos.y - (isHoveringInteractive ? 21 : 13),
              border: isHoveringInteractive ? '1px solid rgba(185, 151, 82, 0.6)' : '1px solid rgba(17, 17, 17, 0.2)',
              background: isHoveringInteractive ? 'rgba(185, 151, 82, 0.04)' : 'transparent',
              boxShadow: isHoveringInteractive ? '0 0 15px rgba(185, 151, 82, 0.15)' : 'none',
              willChange: 'transform',
            }}
          />

          {/* Precision Center Gold Dot */}
          <div
            className="fixed pointer-events-none z-50 rounded-full shadow-[0_0_6px_rgba(185,151,82,0.6)]"
            style={{
              width: 3.5,
              height: 3.5,
              backgroundColor: '#B99752',
              left: mousePos.x - 1.75,
              top: mousePos.y - 1.75,
              willChange: 'transform',
            }}
          />
        </>
      )}
    </>
  );
}
