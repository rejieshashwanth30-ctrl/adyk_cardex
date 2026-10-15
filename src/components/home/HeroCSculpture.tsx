'use client';

import React, { useState, useEffect } from 'react';

export default function HeroCSculpture() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized offset from center of window (-1 to 1)
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[380px] lg:max-w-[440px] flex items-center justify-center select-none group">
      {/* Volumetric Metallic Gold Spotlight behind sculpture */}
      <div
        className="absolute inset-0 rounded-full blur-[100px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          background:
            'radial-gradient(circle, rgba(185, 151, 82, 0.18) 0%, rgba(248, 247, 244, 0.8) 45%, transparent 75%)',
          transform: `translate(${mouseOffset.x * 12}px, ${mouseOffset.y * 12}px)`,
        }}
      />

      {/* Sculpture Container with subtle 3D tilt */}
      <div
        className="relative w-full h-full p-6 sm:p-8 flex items-center justify-center transition-transform duration-500 ease-out"
        style={{
          transform: `perspective(1000px) rotateY(${mouseOffset.x * 6}deg) rotateX(${-mouseOffset.y * 6}deg)`,
        }}
      >
        <svg
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.06)]"
        >
          <defs>
            {/* Polished Metallic Gold Gradient */}
            <linearGradient id="sculptureGold" x1="80" y1="80" x2="420" y2="420" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F5DFAB" />
              <stop offset="25%" stopColor="#DFBF7A" />
              <stop offset="55%" stopColor="#B99752" />
              <stop offset="85%" stopColor="#8C6D28" />
              <stop offset="100%" stopColor="#634C19" />
            </linearGradient>

            {/* Pristine Pearl White & Platinum Sheen */}
            <linearGradient id="sculpturePearl" x1="120" y1="80" x2="380" y2="420" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#F8F7F4" />
              <stop offset="100%" stopColor="#EAE8E3" />
            </linearGradient>

            {/* Specular Pure White Caustic Highlight */}
            <linearGradient id="specularGoldEdge" x1="150" y1="100" x2="350" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#DFBF7A" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#B99752" stopOpacity="0" />
            </linearGradient>

            {/* Translucent Frosted Glass Outer Bevel */}
            <linearGradient id="luxuryGlassFacet" x1="80" y1="80" x2="420" y2="420" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#FAF9F6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#EAE8E3" stopOpacity="0.2" />
            </linearGradient>

            {/* Soft Ambient Depth Shadow */}
            <filter id="luxurySoftShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#B99752" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Background Architectural Construction Orbit Rings */}
          <circle cx="250" cy="250" r="210" stroke="rgba(185, 151, 82, 0.15)" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="250" cy="250" r="165" stroke="rgba(234, 232, 227, 0.9)" strokeWidth="1.2" />
          <circle cx="250" cy="250" r="110" stroke="rgba(185, 151, 82, 0.2)" strokeWidth="1" strokeDasharray="3 6" />

          {/* Precision Telemetry Gold Ticks */}
          <line x1="250" y1="28" x2="250" y2="38" stroke="#B99752" strokeWidth="1.5" />
          <line x1="250" y1="462" x2="250" y2="472" stroke="#B99752" strokeWidth="1.5" />
          <line x1="28" y1="250" x2="38" y2="250" stroke="#B99752" strokeWidth="1.5" />
          <line x1="462" y1="250" x2="472" y2="250" stroke="#B99752" strokeWidth="1.5" />

          {/* Luxury Architectural Fine-Art Plaque Base with Soft Multi-Layer Shadow */}
          <rect
            x="76"
            y="76"
            width="348"
            height="348"
            rx="32"
            fill="url(#sculpturePearl)"
            stroke="#EAE8E3"
            strokeWidth="1.5"
            filter="url(#luxurySoftShadow)"
          />

          {/* Polished Metallic Gold Inner Hairline Bezel */}
          <rect
            x="82"
            y="82"
            width="336"
            height="336"
            rx="28"
            fill="#FAF9F6"
            stroke="url(#sculptureGold)"
            strokeWidth="1.2"
            strokeOpacity="0.45"
          />

          {/* Clip path for the artwork */}
          <clipPath id="artworkCardClip">
            <rect x="84" y="84" width="332" height="332" rx="26" />
          </clipPath>

          {/* Ultra-Realistic Handwritten ADYK Artwork (High-Res, Cleaned of Subtitle) */}
          <image
            href="/images/adyk-clean-full.png"
            x="84"
            y="84"
            width="332"
            height="332"
            preserveAspectRatio="xMidYMid meet"
            clipPath="url(#artworkCardClip)"
            className="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />

          {/* Realistic Specular Glass Sheen Overlay */}
          <path
            d="M 84 84 L 380 84 C 400 84 416 100 416 120 L 84 320 Z"
            fill="url(#specularGoldEdge)"
            opacity="0.15"
            clipPath="url(#artworkCardClip)"
            pointerEvents="none"
          />

          {/* Corner Architectural Registration Marks */}
          <path d="M 94 102 L 94 94 L 102 94" stroke="#B99752" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <path d="M 406 102 L 406 94 L 398 94" stroke="#B99752" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <path d="M 94 398 L 94 406 L 102 406" stroke="#B99752" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <path d="M 406 398 L 406 406 L 398 406" stroke="#B99752" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

          {/* Top Architectural Focal Node */}
          <circle cx="250" cy="98" r="4" fill="#B99752" />
          <circle cx="250" cy="98" r="1.5" fill="#FFFFFF" />

          {/* Technical Alignment & Archival Notation */}
          <g transform="translate(0, 0)">
            <rect
              x="165"
              y="386"
              width="170"
              height="20"
              rx="10"
              fill="rgba(255, 255, 255, 0.92)"
              stroke="#EAE8E3"
              strokeWidth="1"
            />
            <text
              x="250"
              y="400"
              textAnchor="middle"
              fill="#111111"
              fontSize="9"
              fontFamily="monospace"
              fontWeight="bold"
              letterSpacing="2.5"
              opacity="0.85"
            >
              CARDEX // 01 &bull; ADYK
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
