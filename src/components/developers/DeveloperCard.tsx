import React from 'react';
import Link from 'next/link';
import { Developer } from '@/lib/types';
import AvailabilityBadge from './AvailabilityBadge';
import CardexMark from '../brand/CardexMark';
import { ArrowUpRight, FolderKanban } from 'lucide-react';

interface DeveloperCardProps {
  developer: Developer;
}

export default function DeveloperCard({ developer }: DeveloperCardProps) {
  const initials = developer.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="group relative rounded-2xl sm:rounded-3xl material-luxury-card p-7 sm:p-9 flex flex-col justify-between bg-white hover:bg-[#FAF9F6] transition-all duration-400">
      <div>
        {/* Top Header: Avatar + Availability */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-2xl bg-[#F8F7F4] border border-[#EAE8E3] flex items-center justify-center font-mono font-bold text-lg text-[#111111] shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
              {initials}
              <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 bg-white rounded-full border border-[#EAE8E3] shadow-sm flex items-center justify-center">
                <CardexMark size="xs" glow={false} />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-[#111111] group-hover:text-black transition-colors">
                <Link href={`/developers/${developer.username}`}>
                  {developer.name}
                </Link>
              </h3>
              <p className="text-xs font-mono uppercase tracking-wider text-[#858585] mt-0.5">
                @{developer.username}
              </p>
            </div>
          </div>

          <AvailabilityBadge availability={developer.availability} />
        </div>

        {/* Role */}
        <p className="text-xs font-mono uppercase tracking-[0.15em] text-[#111111] mb-3 font-semibold">
          {developer.role}
        </p>

        {/* Bio */}
        <p className="text-sm text-[#555555] leading-relaxed line-clamp-3 mb-6 font-normal">
          {developer.bio}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-8">
          {developer.skills.slice(0, 5).map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#F8F7F4] text-[#555555] border border-[#EAE8E3] uppercase tracking-wider font-medium"
            >
              {skill}
            </span>
          ))}
          {developer.skills.length > 5 && (
            <span className="px-2 py-1 rounded-md text-[11px] font-mono bg-[#F8F7F4] text-[#858585]">
              +{developer.skills.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Project count & Editorial Action Buttons */}
      <div className="pt-6 border-t border-[#EAE8E3] flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs font-mono text-[#858585]">
          <FolderKanban className="w-3.5 h-3.5 text-[#B99752]" />
          <span>{developer.featuredProjectSlugs.length} Featured {developer.featuredProjectSlugs.length === 1 ? 'Build' : 'Builds'}</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/developers/${developer.username}`}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-[0.15em] text-[#555555] hover:text-[#111111] bg-white hover:bg-[#F8F7F4] border border-[#EAE8E3] transition-colors font-medium shadow-sm"
          >
            <span>VIEW PROFILE</span>
            <ArrowUpRight className="w-3 h-3 text-[#858585]" />
          </Link>

          <Link
            href={`/developers/${developer.username}`}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-[0.15em] text-white bg-[#111111] hover:bg-[#222222] font-semibold transition-all shadow-sm"
          >
            <span>CONNECT &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
