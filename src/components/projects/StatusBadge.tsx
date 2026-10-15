import React from 'react';
import { ProjectStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
  showDot?: boolean;
}

export default function StatusBadge({ status, className = '', showDot = true }: StatusBadgeProps) {
  const configMap: Record<ProjectStatus, { label: string; text: string; bg: string; border: string; dot: string }> = {
    BUILDING: {
      label: 'BUILDING',
      text: 'text-[#111111]',
      bg: 'bg-white',
      border: 'border-[#B99752]/40 shadow-sm',
      dot: 'bg-[#B99752]',
    },
    COMPLETED: {
      label: 'COMPLETED',
      text: 'text-[#111111]',
      bg: 'bg-white',
      border: 'border-[#EAE8E3]',
      dot: 'bg-[#111111]',
    },
    OPEN_SOURCE: {
      label: 'OPEN SOURCE',
      text: 'text-[#555555]',
      bg: 'bg-white',
      border: 'border-[#EAE8E3]',
      dot: 'bg-[#858585]',
    },
    ARCHIVED: {
      label: 'ARCHIVED',
      text: 'text-[#858585]',
      bg: 'bg-[#F8F7F4]',
      border: 'border-[#EAE8E3]',
      dot: 'bg-[#858585]',
    },
  };

  const current = configMap[status] || configMap.BUILDING;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border backdrop-blur-md shadow-xs ${current.bg} ${current.border} ${current.text} ${className}`}
    >
      {showDot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${current.dot} ${status === 'BUILDING' ? 'animate-pulse' : ''}`}
        />
      )}
      <span>{current.label}</span>
    </span>
  );
}
