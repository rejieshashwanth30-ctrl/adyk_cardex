import React from 'react';
import CardexMark from '@/components/brand/CardexMark';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center relative z-20">
      <div className="relative flex flex-col items-center">
        <CardexMark size="lg" animated glow />
        <div className="mt-8 flex items-center gap-2.5 text-xs tracking-wider text-[#858585] uppercase font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B99752] animate-ping" />
          <span>Synchronizing ADYK CARDEX Archive...</span>
        </div>
      </div>
    </div>
  );
}
