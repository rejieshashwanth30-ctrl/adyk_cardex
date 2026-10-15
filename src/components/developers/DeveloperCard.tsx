'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Developer } from '@/lib/types';
import AvailabilityBadge from './AvailabilityBadge';
import CardexMark from '../brand/CardexMark';
import { ArrowUpRight, FolderKanban } from 'lucide-react';

interface DeveloperCardProps {
  developer: Developer;
}

export default function DeveloperCard({ developer }: DeveloperCardProps) {
  const [imageError, setImageError] = useState(false);
  const initials = developer.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const hasAvatar = Boolean(developer.avatarUrl && !imageError);

  return (
    <>
      {/* ---------------- MOBILE COMPACT CARD (< sm) ---------------- */}
      <div className="sm:hidden group relative rounded-2xl material-luxury-card p-2.5 sm:p-3 flex flex-col justify-between bg-white hover:bg-[#FAF9F6] transition-all duration-300 h-full">
        <div>
          {/* Top Row: Avatar + Open for Collab Badge / Indicator */}
          <div className="flex items-start justify-between gap-1.5 mb-2">
            {/* Compact Avatar */}
            <div className="relative w-9 h-9 rounded-xl bg-[#F8F7F4] border border-[#EAE8E3] flex items-center justify-center font-bold text-xs text-[#111111] shadow-xs flex-shrink-0">
              {hasAvatar ? (
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <Image
                    src={developer.avatarUrl!}
                    alt={developer.name}
                    fill
                    className="object-cover"
                    sizes="36px"
                    onError={() => setImageError(true)}
                  />
                </div>
              ) : (
                <span>{initials}</span>
              )}
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-white rounded-full border border-[#EAE8E3] shadow-xs flex items-center justify-center z-10">
                <CardexMark size="xs" glow={false} />
              </div>
            </div>

            {/* Availability / Collab Indicator */}
            {developer.availability === 'OPEN FOR COLLABORATION' ? (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-medium bg-white border border-[#B99752]/40 text-[#111111] shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B99752] animate-pulse flex-shrink-0" />
                <span className="truncate max-w-[55px]">Collab</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-medium bg-white border border-[#EAE8E3] text-[#555555] shadow-xs">
                <span
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                    developer.availability === 'OPEN TO CONNECT' ? 'bg-[#111111]' : 'bg-[#858585]'
                  }`}
                />
                <span className="truncate max-w-[55px]">
                  {developer.availability === 'OPEN TO CONNECT' ? 'Connect' : 'Active'}
                </span>
              </span>
            )}
          </div>

          {/* Developer Name & Username */}
          <h3 className="text-xs sm:text-sm font-bold tracking-tight text-[#111111] group-hover:text-black transition-colors line-clamp-1 leading-snug">
            <Link href={`/developers/${developer.username}`}>
              {developer.name}
            </Link>
          </h3>
          <p className="text-[10px] text-[#737373] truncate mb-1">
            @{developer.username}
          </p>

          {/* Role */}
          <p className="text-[11px] font-medium text-[#222222] line-clamp-1 mb-1 leading-tight">
            {developer.role}
          </p>

          {/* Short Bio (1-2 lines clamp) */}
          {developer.bio && (
            <p className="text-[10px] text-[#666666] line-clamp-2 leading-snug mb-2 font-normal">
              {developer.bio}
            </p>
          )}

          {/* 2-3 Key Skills */}
          <div className="flex flex-wrap gap-1 mb-2">
            {developer.skills.slice(0, 2).map((skill) => (
              <span
                key={skill}
                className="px-1.5 py-0.5 rounded text-[10px] bg-[#F8F7F4] text-[#444444] border border-[#EAE8E3] font-medium truncate max-w-[70px]"
              >
                {skill}
              </span>
            ))}
            {developer.skills.length > 2 && (
              <span className="px-1 py-0.5 rounded text-[10px] bg-[#F8F7F4] text-[#858585] font-medium">
                +{developer.skills.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="pt-2 border-t border-[#EAE8E3] flex items-center justify-between gap-1 mt-auto">
          <Link
            href={`/developers/${developer.username}`}
            className="inline-flex items-center gap-0.5 text-[10px] text-[#444444] hover:text-[#111111] font-medium py-1"
          >
            <span>Profile</span>
            <ArrowUpRight className="w-3 h-3 text-[#858585]" />
          </Link>

          <Link
            href={`/developers/${developer.username}`}
            className="inline-flex items-center px-2 py-1 rounded-md text-[10px] text-white bg-[#111111] hover:bg-[#222222] font-semibold transition-all shadow-xs"
          >
            <span>Connect</span>
          </Link>
        </div>
      </div>

      {/* ---------------- DESKTOP / TABLET CARD (>= sm) ---------------- */}
      {/* Refined compact, neat and clean editorial card for desktop & laptops */}
      <div className="hidden sm:flex group relative rounded-2xl material-luxury-card p-4 sm:p-5 flex-col justify-between bg-white hover:bg-[#FAF9F6] transition-all duration-300 h-full">
        <div>
          {/* Top Header: Avatar + Availability */}
          <div className="flex items-start justify-between gap-3 mb-3.5">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#F8F7F4] border border-[#EAE8E3] flex items-center justify-center font-bold text-sm sm:text-base text-[#111111] shadow-xs flex-shrink-0">
                {hasAvatar ? (
                  <div className="w-full h-full rounded-xl overflow-hidden relative">
                    <Image
                      src={developer.avatarUrl!}
                      alt={developer.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                      onError={() => setImageError(true)}
                    />
                  </div>
                ) : (
                  <span>{initials}</span>
                )}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full border border-[#EAE8E3] shadow-xs flex items-center justify-center z-10">
                  <CardexMark size="xs" glow={false} />
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#111111] group-hover:text-black transition-colors leading-snug">
                  <Link href={`/developers/${developer.username}`}>
                    {developer.name}
                  </Link>
                </h3>
                <p className="text-[11px] text-[#737373] font-normal">
                  @{developer.username}
                </p>
              </div>
            </div>

            <AvailabilityBadge availability={developer.availability} className="!text-[10px] !px-2 !py-0.5" />
          </div>

          {/* Role */}
          <p className="text-xs sm:text-sm font-medium text-[#222222] mb-1.5 leading-snug">
            {developer.role}
          </p>

          {/* Bio */}
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed line-clamp-2 mb-3.5 font-normal">
            {developer.bio}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-1 mb-3.5">
            {developer.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded text-[11px] bg-[#F8F7F4] text-[#444444] border border-[#EAE8E3] font-medium"
              >
                {skill}
              </span>
            ))}
            {developer.skills.length > 4 && (
              <span className="px-1.5 py-0.5 rounded text-[11px] bg-[#F8F7F4] text-[#858585]">
                +{developer.skills.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Card Footer: Project count & Editorial Action Buttons */}
        <div className="mt-auto pt-3 border-t border-[#EAE8E3] flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5 text-xs text-[#737373] font-medium">
            <FolderKanban className="w-3.5 h-3.5 text-[#B99752]" />
            <span>{developer.featuredProjectSlugs.length} {developer.featuredProjectSlugs.length === 1 ? 'Build' : 'Builds'}</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/developers/${developer.username}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-[#444444] hover:text-[#111111] bg-white hover:bg-[#F8F7F4] border border-[#EAE8E3] transition-colors font-medium shadow-xs"
            >
              <span>Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#858585]" />
            </Link>

            <Link
              href={`/developers/${developer.username}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-white bg-[#111111] hover:bg-[#222222] font-semibold transition-all shadow-xs"
            >
              <span>Connect &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
