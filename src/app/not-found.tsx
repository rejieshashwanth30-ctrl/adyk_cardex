import React from 'react';
import Link from 'next/link';
import CardexMark from '@/components/brand/CardexMark';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 relative z-20">
      <div className="p-7 sm:p-8 rounded-2xl material-luxury-card bg-white border border-[#EAE8E3] max-w-md w-full shadow-xs">
        <div className="mb-6 flex justify-center">
          <CardexMark size="lg" glow={true} />
        </div>

        <span className="text-xs uppercase tracking-wider text-[#858585] font-semibold block mb-2">
          404 &bull; Page Not Found
        </span>

        <h1 className="text-2xl font-black text-[#111111] mb-3 uppercase tracking-tight">
          Page Not Found
        </h1>

        <p className="text-sm text-[#555555] leading-relaxed mb-6 font-normal">
          The requested project or profile does not exist or has not been approved for public indexing on ADYK CARDEX.
        </p>

        <div className="flex flex-col gap-2.5">
          <Link
            href="/explore"
            className="w-full py-3 rounded-xl bg-[#111111] text-white text-xs uppercase tracking-wider font-semibold shadow-md hover:bg-[#222222] transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#B99752]" />
            <span>Return to Explore</span>
          </Link>

          <Link
            href="/"
            className="w-full py-2.5 rounded-xl bg-white hover:bg-[#FAF9F6] text-[#111111] text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-[#EAE8E3] font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#858585]" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
