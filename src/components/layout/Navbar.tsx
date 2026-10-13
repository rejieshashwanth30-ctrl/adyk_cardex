'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CardexMark from '../brand/CardexMark';
import {
  Menu,
  X,
  ArrowUpRight,
  Plus,
  Compass,
  FolderKanban,
  Users,
  Handshake,
  Info,
  Search,
  MessageSquare,
} from 'lucide-react';

const NAV_LINKS = [
  { name: 'Explore', href: '/explore', icon: Compass },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Developers', href: '/developers', icon: Users },
  { name: 'Collaboration', href: '/collaboration', icon: Handshake },
  { name: 'About', href: '/about', icon: Info },
  { name: 'Contact', href: '/contact', icon: MessageSquare },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Manage body scroll locking when mobile menu opens/closes
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    window.requestAnimationFrame(() => setMobileMenuOpen(false));
  }, [pathname]);

  // Suppress public navigation in admin area
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* Floating Precision Dock Header */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <div
            className={`pointer-events-auto flex items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-2xl transition-all duration-300 ${
              scrolled
                ? 'bg-[#FFFFFF]/90 backdrop-blur-2xl border border-black/10 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.95)]'
                : 'bg-[#FFFFFF]/80 backdrop-blur-xl border border-black/[0.07] shadow-[0_8px_30px_-6px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.85)]'
            }`}
          >
            {/* Left: Brand Identity & Live Platform Indicator */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-xl p-0.5 transition-transform duration-200 active:scale-[0.98]"
            >
              <CardexMark size="sm" animated />
              <div className="flex items-center gap-2.5">
                <div className="flex flex-col">
                  <span className="text-[13px] sm:text-sm font-bold tracking-tight text-[#111111] group-hover:text-black transition-colors uppercase leading-none">
                    ADYK CARDEX
                  </span>
                  <span className="hidden sm:block text-[9px] uppercase tracking-wider text-[#888888] font-medium leading-none mt-1">
                    DISCOVERY ENGINE
                  </span>
                </div>

                <div className="hidden xl:flex items-center gap-1.5 pl-2.5 ml-0.5 border-l border-black/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="text-[9px] font-semibold tracking-wider text-[#666666] uppercase">
                    LIVE
                  </span>
                </div>
              </div>
            </Link>

            {/* Center: Precision Architectural Navigation Rail */}
            <nav className="hidden md:flex items-center gap-1 bg-[#F5F4F0]/85 p-1 rounded-xl border border-[#E7E5DE] backdrop-blur-md shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-normal transition-all duration-200 ${
                      isActive
                        ? 'bg-white text-[#111111] font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-black/[0.06]'
                        : 'text-[#666666] hover:text-[#111111] hover:bg-white/60'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B99752] animate-pulse" />
                      )}
                      <span>{link.name}</span>
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Right: Search Shortcut + Obsidian Action Button */}
            <div className="hidden md:flex items-center gap-2.5">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-[#666666] hover:text-[#111111] bg-black/[0.03] hover:bg-black/[0.06] border border-black/[0.05] transition-all font-medium"
                title="Search and Explore Projects"
              >
                <Search className="w-3.5 h-3.5 text-[#888888]" />
                <span className="hidden lg:inline text-[11px] uppercase tracking-wider">Search</span>
                <kbd className="hidden lg:inline-flex text-[9px] px-1 py-0.5 rounded bg-black/[0.06] text-[#666666] leading-none">
                  ⌘K
                </kbd>
              </Link>

              <Link
                href="/submit"
                className="group relative inline-flex items-center gap-2 px-4 sm:px-4.5 py-2 rounded-xl text-xs uppercase tracking-wider text-white bg-gradient-to-b from-[#1C1C1C] to-[#0A0A0A] hover:from-[#262626] hover:to-[#121212] border border-[#2B2B2B] hover:border-black transition-all duration-200 shadow-[0_2px_10px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.15)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)] active:scale-[0.98]"
              >
                <Plus className="w-3.5 h-3.5 text-[#B99752] transition-transform duration-300 group-hover:rotate-90" />
                <span className="font-semibold">Submit Project</span>
              </Link>
            </div>

            {/* Mobile Actions & Menu Trigger */}
            <div className="flex md:hidden items-center gap-2">
              <Link
                href="/submit"
                className="p-2 text-white bg-[#111111] hover:bg-[#222222] rounded-xl text-xs border border-black/10 shadow-sm"
                aria-label="Submit Project"
              >
                <Plus className="w-4 h-4 text-[#B99752]" />
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#111111] bg-black/[0.03] hover:bg-black/[0.06] border border-black/[0.08] rounded-xl transition-colors focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-[#111111]" />
                ) : (
                  <Menu className="w-5 h-5 text-[#111111]" />
                )}
              </button>
            </div>
          </div>

          {/* Floating Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="pointer-events-auto mt-2.5 rounded-2xl bg-white/95 backdrop-blur-2xl border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex flex-col gap-2">
                <Link
                  href="/explore"
                  className="flex items-center justify-between p-3 rounded-xl bg-black/[0.03] text-xs font-medium text-[#555555] border border-black/[0.04]"
                >
                  <div className="flex items-center gap-2.5">
                    <Search className="w-4 h-4 text-[#888888]" />
                    <span>Search Projects & Developers</span>
                  </div>
                  <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-black/[0.06] text-[#666666]">
                    ⌘K
                  </kbd>
                </Link>

                {NAV_LINKS.map((link) => {
                  const Icon = link.icon;
                  const isActive =
                    pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`flex items-center justify-between p-3.5 rounded-xl text-xs tracking-normal transition-colors ${
                        isActive
                          ? 'bg-[#F5F4F0] text-[#111111] font-semibold border border-black/[0.06]'
                          : 'text-[#555555] hover:bg-black/[0.02] hover:text-[#111111]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 ${isActive ? 'text-[#B99752]' : 'text-[#888888]'}`}
                        />
                        <span>{link.name}</span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#888888]" />
                    </Link>
                  );
                })}

                <div className="pt-3 mt-1 border-t border-black/5">
                  <Link
                    href="/submit"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-xs uppercase tracking-wider bg-[#111111] text-white font-semibold shadow-md active:scale-[0.99] transition-transform"
                  >
                    <Plus className="w-4 h-4 text-[#B99752]" />
                    <span>Submit Your Project</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
