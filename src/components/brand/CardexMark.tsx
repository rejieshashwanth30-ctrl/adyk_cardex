'use client';

import React from 'react';
import Image from 'next/image';

export interface CardexMarkProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  glow?: boolean;
  animated?: boolean;
}

export default function CardexMark({
  size = 'md',
  className = '',
  glow = false,
  animated = false,
}: CardexMarkProps) {
  const sizeMap: Record<string, number> = {
    xs: 20,
    sm: 28,
    md: 36,
    lg: 48,
    xl: 64,
    hero: 120,
  };

  const dim = sizeMap[size] || 36;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none flex-shrink-0 ${className}`}
      style={{ width: dim, height: dim }}
      aria-label="ADYK CARDEX Official Logo"
    >
      {/* Subtle ambient light glow if enabled */}
      {glow && (
        <div
          className="absolute inset-0 rounded-2xl blur-lg pointer-events-none opacity-25 bg-[#B99752]"
        />
      )}

      <div
        className={`relative w-full h-full rounded-xl overflow-hidden shadow-sm bg-black border border-black/10 flex items-center justify-center ${
          animated ? 'transition-transform duration-500 hover:scale-105' : ''
        }`}
      >
        <Image
          src="/images/adyk-cardex-logo.png"
          alt="ADYK CARDEX"
          width={dim}
          height={dim}
          className="w-full h-full object-contain pointer-events-none"
          priority={size === 'sm' || size === 'md'}
        />
      </div>
    </div>
  );
}
