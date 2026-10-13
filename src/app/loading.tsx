import React from 'react';
import CardexMark from '@/components/brand/CardexMark';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center relative z-20">
      <div className="relative flex flex-col items-center">
        <CardexMark size="lg" animated glow />
        <div className="mt-8 flex items-center gap-2.5 text-[10px] font-mono tracking-[0.25em] text-[#858585] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B99752] animate-ping" />
          <span>SYNCHRONIZING ADYK CARDEX ARCHIVE...</span>
        </div>
      </div>
    </div>
  );
}
