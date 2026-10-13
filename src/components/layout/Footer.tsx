'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CardexMark from '../brand/CardexMark';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import {
  WhatsappIcon,
  LinkedinIcon,
  InstagramIcon,
  DiscordIcon,
} from '@/components/ui/Icons';

export default function Footer() {
  const pathname = usePathname();

  // Suppress public footer in admin dashboard
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="border-t border-[#EAE8E3] bg-[#FAF9F6] text-[#111111] relative z-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* ADYK Inspire & Ecosystem Connect Card */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE8E3] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#B99752]/30 text-xs font-semibold text-[#111111] mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B99752]" />
              <span className="tracking-wide">ADYK INSPIRE &bull; LEARN &bull; BUILD &bull; GROW &bull; INSPIRE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#111111] tracking-tight uppercase">
              REGISTER TO CONNECT WITH THE ADYK TEAM
            </h3>
            <p className="text-xs sm:text-sm text-[#555555] mt-1.5 leading-relaxed font-normal">
              For anyone interested to learn, build, grow, and inspire together. Register on ADYK Inspire or message our leadership directly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <a
              href="https://adyk-inspire.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#111111] hover:bg-[#222222] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-sm"
            >
              <span>Register on ADYK Inspire</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#B99752]" />
            </a>
            <a
              href="https://wa.me/918870605699"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-[#FAF9F6] border border-[#EAE8E3] text-[#111111] text-xs uppercase tracking-wider font-semibold transition-colors shadow-sm"
            >
              <WhatsappIcon className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp: 8870605699</span>
            </a>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-[#EAE8E3]">
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col gap-4">
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

            {/* Social Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <a
                href="https://wa.me/918870605699"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-[#EAE8E3] hover:border-[#111111] flex items-center justify-center text-[#25D366] transition-colors shadow-xs"
                title="WhatsApp: 8870605699"
              >
                <WhatsappIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/adyk-a-multi-venture-company-38782a431?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-[#EAE8E3] hover:border-[#111111] flex items-center justify-center text-[#0A66C2] transition-colors shadow-xs"
                title="LinkedIn: ADYK - A Multi-Venture Company"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/buildby.adyk?rpxt=MTE0ajhmNWJuY3Fsdw%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-[#EAE8E3] hover:border-[#111111] flex items-center justify-center text-[#E4405F] transition-colors shadow-xs"
                title="Instagram: @buildby.adyk"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://discord.gg/7qB6vGNb2"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-[#EAE8E3] hover:border-[#111111] flex items-center justify-center text-[#5865F2] transition-colors shadow-xs"
                title="Discord: ADYK Community Server"
              >
                <DiscordIcon className="w-4 h-4" />
              </a>
            </div>

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

          {/* Company & Ecosystem */}
          <div className="flex flex-col gap-3">
            <h2 className="text-xs uppercase tracking-wider text-[#111111] font-semibold">
              Company
            </h2>
            <ul className="flex flex-col gap-2.5 text-sm font-normal">
              <li>
                <Link href="/about" className="hover:text-[#111111] transition-colors">
                  About ADYK CARDEX
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#111111] transition-colors">
                  Contact ADYK
                </Link>
              </li>
              <li>
                <a
                  href="https://adyk-inspire.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#111111] text-[#B99752] font-semibold transition-colors flex items-center gap-1"
                >
                  <span>ADYK Inspire</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link href="/moderation" className="text-xs text-[#858585] hover:text-[#111111] transition-colors inline-flex items-center gap-1">
                  <span>Review Queue</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Community Channels */}
          <div className="flex flex-col gap-3">
            <h2 className="text-xs uppercase tracking-wider text-[#111111] font-semibold">
              Contact &amp; Connect
            </h2>
            <ul className="flex flex-col gap-2.5 text-xs font-normal">
              <li>
                <a
                  href="https://wa.me/918870605699"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#444444] hover:text-[#111111] transition-colors flex items-center gap-2"
                >
                  <WhatsappIcon className="w-3.5 h-3.5 text-[#25D366] flex-shrink-0" />
                  <span>+91 88706 05699</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/adyk-a-multi-venture-company-38782a431?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#444444] hover:text-[#111111] transition-colors flex items-center gap-2"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2] flex-shrink-0" />
                  <span>LinkedIn Profile</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/buildby.adyk?rpxt=MTE0ajhmNWJuY3Fsdw%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#444444] hover:text-[#111111] transition-colors flex items-center gap-2"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-[#E4405F] flex-shrink-0" />
                  <span>@buildby.adyk</span>
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/7qB6vGNb2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#444444] hover:text-[#111111] transition-colors flex items-center gap-2"
                >
                  <DiscordIcon className="w-3.5 h-3.5 text-[#5865F2] flex-shrink-0" />
                  <span>Discord Community</span>
                </a>
              </li>
              <li className="pt-1">
                <Link
                  href="/contact"
                  className="text-[11px] text-[#858585] hover:text-[#111111] font-semibold uppercase tracking-wider transition-colors"
                >
                  All Contact Options &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#858585] font-medium">
          <div>
            &copy; 2026 ADYK CARDEX &bull; ADYK - A MULTI-VENTURE COMPANY. ALL RIGHTS RESERVED.
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
