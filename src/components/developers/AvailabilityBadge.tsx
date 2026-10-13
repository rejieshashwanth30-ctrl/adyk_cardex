import React from 'react';
import { AvailabilityStatus } from '@/lib/types';

interface AvailabilityBadgeProps {
  availability: AvailabilityStatus;
  className?: string;
}

export default function AvailabilityBadge({ availability, className = '' }: AvailabilityBadgeProps) {
  const config: Record<AvailabilityStatus, { text: string; bg: string; border: string; dot: string }> = {
    'OPEN FOR COLLABORATION': {
      text: 'text-[#111111]',
      bg: 'bg-white',
      border: 'border-[#B99752]/40 shadow-sm',
      dot: 'bg-[#B99752]',
    },
    'OPEN TO CONNECT': {
      text: 'text-[#111111]',
      bg: 'bg-white',
      border: 'border-[#EAE8E3]',
      dot: 'bg-[#111111]',
    },
    'CURRENTLY BUILDING': {
      text: 'text-[#555555]',
      bg: 'bg-white',
      border: 'border-[#EAE8E3]',
      dot: 'bg-[#858585]',
    },
    'NOT CURRENTLY AVAILABLE': {
      text: 'text-[#858585]',
      bg: 'bg-[#F8F7F4]',
      border: 'border-[#EAE8E3]',
      dot: 'bg-[#858585]',
    },
  };

  const current = config[availability] || config['OPEN TO CONNECT'];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-md shadow-sm ${current.bg} ${current.border} ${current.text} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot} ${availability === 'OPEN FOR COLLABORATION' ? 'animate-pulse' : ''}`} />
      <span>{availability}</span>
    </span>
  );
}
