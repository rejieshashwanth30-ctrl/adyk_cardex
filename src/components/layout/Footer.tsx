'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CardexMark from '../brand/CardexMark';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  // Suppress public footer in admin dashboard
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="border-t border-[#EAE8E3] bg-[#FAF9F6] text-[#111111] relative z-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-14 border-b border-[#EAE8E3]">
          {/* Brand Col */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <CardexMark size="sm" />
              <span className="text-base font-bold tracking-tight text-[#111111]">
                ADYK CARDEX
              </span>
            </div>
            <p className="text-xs uppercase tracking-wider text-[#858585] font-medium">
              BUILD. SHOWCASE. CONNECT.
            </p>
            <p className="text-sm text-[#555555] max-w-sm leading-relaxed mt-1 font-normal">
              An open project discovery, developer showcase, and direct technical connection platform. Engineered to bring visibility to exceptional builders.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#555555] mt-2 font-medium">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B99752] animate-pulse" />
              <span>Platform Status: Operational (V1.0)</span>
            </div>
          </div>

          {/* Platform Navigation */}
          <div className="flex flex-col gap-3">
            <h2 className="text-xs uppercase tracking-wider text-[#111111] font-semibold">
              Platform
            </h2>
            <ul className="flex flex-col gap-2.5 text-sm font-normal">
              <li>
                <Link href="/explore" className="hover:text-[#111111] transition-colors">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#111111] transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/developers" className="hover:text-[#111111] transition-colors">
                  Developers
                </Link>
              </li>
              <li>
                <Link href="/collaboration" className="hover:text-[#111111] transition-colors">
                  Collaboration
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-[#111111] hover:text-[#B99752] transition-colors flex items-center gap-1 text-xs uppercase tracking-wider font-semibold">
                  Submit Project
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company / Identity */}
          <div className="flex flex-col gap-3">
            <h2 className="text-xs uppercase tracking-wider text-[#111111] font-semibold">
              Identity
            </h2>
            <ul className="flex flex-col gap-2.5 text-sm font-normal">
              <li>
                <Link href="/about" className="hover:text-[#111111] transition-colors">
                  About ADYK CARDEX
                </Link>
              </li>
              <li>
                <span className="text-[#555555]">
                  Open Discovery Ecosystem
                </span>
              </li>
              <li>
                <span className="text-xs text-[#858585] leading-normal">
                  Direct Builder Connections
                </span>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="flex flex-col gap-3">
            <h2 className="text-xs uppercase tracking-wider text-[#111111] font-semibold">
              Governance
            </h2>
            <ul className="flex flex-col gap-2.5 text-sm font-normal">
              <li>
                <span className="text-xs text-[#858585]">
                  Open Submission Guidelines
                </span>
              </li>
              <li>
                <span className="text-xs text-[#858585]">
                  Project Integrity Standards
                </span>
              </li>
              <li>
                <span className="text-xs text-[#858585]">
                  Developer Privacy First
                </span>
              </li>
              <li>
                <Link href="/moderation" className="text-xs text-[#858585] hover:text-[#111111] transition-colors mt-2 inline-flex items-center gap-1 font-medium">
                  <span>Review Queue</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#858585] font-medium">
          <div>
            &copy; 2026 ADYK CARDEX. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#111111] transition-colors">
              CONFIDENTIAL &amp; PROPRIETARY DESIGN
            </span>
            <span>&bull;</span>
            <span className="text-[#B99752] font-semibold">
              LUXURY WHITE EDITION
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
