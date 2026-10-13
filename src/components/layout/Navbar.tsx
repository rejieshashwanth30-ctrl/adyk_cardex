'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CardexMark from '../brand/CardexMark';
import { Menu, X, ArrowUpRight, Plus, Compass, FolderKanban, Users, Handshake, Info } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Explore', href: '/explore', icon: Compass },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Developers', href: '/developers', icon: Users },
  { name: 'Collaboration', href: '/collaboration', icon: Handshake },
  { name: 'About', href: '/about', icon: Info },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
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
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/85 backdrop-blur-xl border-b border-[#EAE8E3] shadow-[0_4px_30px_-5px_rgba(0,0,0,0.03)]'
            : 'bg-white/40 backdrop-blur-md border-b border-[#EAE8E3]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* ADYK CARDEX Brand Logo with Supplied Geometric Mark & Rich Black Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B99752] rounded-lg p-1"
          >
            <CardexMark size="sm" animated />
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-[0.2em] text-[#111111] group-hover:text-black transition-colors flex items-center gap-1.5 font-mono">
                ADYK CARDEX
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#858585] font-mono">
                BUILD. SHOWCASE. CONNECT.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Pearl White Pill Container) */}
          <nav className="hidden md:flex items-center gap-1 bg-[#F8F7F4]/90 border border-[#EAE8E3] rounded-full px-3 py-1.5 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'text-[#111111] bg-white font-semibold shadow-[0_1px_4px_rgba(0,0,0,0.05)] border border-[#EAE8E3]'
                      : 'text-[#555555] hover:text-[#111111] hover:bg-black/[0.02]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-[#B99752] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Submit Your Project (Rich Black Button with Gold Accent) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/submit"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider text-white bg-[#111111] hover:bg-[#222222] border border-[#111111] hover:border-black transition-all duration-300 shadow-[0_2px_15px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B99752]"
            >
              <Plus className="w-3.5 h-3.5 text-[#B99752] transition-transform duration-200 group-hover:rotate-90" />
              <span>Submit Project</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/submit"
              className="p-2 text-[#111111] bg-[#F8F7F4] border border-[#EAE8E3] rounded-lg text-xs"
              aria-label="Submit Project"
            >
              <Plus className="w-4 h-4 text-[#B99752]" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#111111] bg-white border border-[#EAE8E3] rounded-lg hover:bg-[#F8F7F4] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#111111]" /> : <Menu className="w-5 h-5 text-[#111111]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Luxury White Surface) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden pt-20 bg-white/95 backdrop-blur-2xl border-b border-[#EAE8E3]">
          <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-3">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center justify-between p-4 rounded-xl text-sm font-mono tracking-wider transition-colors ${
                    isActive
                      ? 'bg-[#F8F7F4] text-[#111111] font-semibold border border-[#EAE8E3]'
                      : 'text-[#555555] hover:bg-[#FAF9F6] hover:text-[#111111]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#B99752]' : 'text-[#858585]'}`} />
                    <span>{link.name}</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#858585]" />
                </Link>
              );
            })}

            <div className="pt-6 mt-4 border-t border-[#EAE8E3]">
              <Link
                href="/submit"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-xs font-mono uppercase tracking-[0.15em] bg-[#111111] text-white font-semibold shadow-md"
              >
                <Plus className="w-4 h-4 text-[#B99752]" />
                <span>Submit Your Project</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
