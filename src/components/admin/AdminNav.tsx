'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AdminSafe } from '@/lib/types';
import {
  LayoutDashboard,
  Clock,
  CheckCircle2,
  XCircle,
  FolderKanban,
  Users,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';

interface AdminNavProps {
  admin: AdminSafe;
}

export default function AdminNav({ admin }: AdminNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // If currently on login page, do not render navigation
  if (pathname === '/admin/login') {
    return null;
  }

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoggingOut(false);
    }
  };

  const navLinks = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Pending', href: '/admin/projects/pending', icon: Clock },
    { name: 'Approved', href: '/admin/projects/approved', icon: CheckCircle2 },
    { name: 'Declined', href: '/admin/projects/declined', icon: XCircle },
    { name: 'All Projects', href: '/admin/projects', icon: FolderKanban },
    { name: 'Developers', href: '/admin/developers', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#262626] w-full">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* ========================================================= */}
        {/* ZONE 1: LEFT — CARDEX BRAND LOCKUP                       */}
        {/* ========================================================= */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href="/admin"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FFFFFF] rounded-xl p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FFFFFF] text-[#000000] flex items-center justify-center font-mono font-black text-sm tracking-tighter shadow-sm flex-shrink-0 group-hover:bg-[#E5E5E5] transition-colors">
              C
            </div>
            <div className="flex flex-col justify-center select-none">
              <span className="text-sm font-bold tracking-[0.2em] font-mono text-[#FFFFFF] group-hover:text-[#A3A3A3] transition-colors leading-none">
                CARDEX
              </span>
              <span className="text-[8.5px] uppercase tracking-[0.22em] font-mono text-[#737373] mt-1.5 leading-none font-medium">
                ADMIN CONTROL CONSOLE
              </span>
            </div>
          </Link>
        </div>

        {/* ========================================================= */}
        {/* ZONE 2: CENTER — ROLE BADGE + NAVIGATION LINKS           */}
        {/* ========================================================= */}
        <nav
          aria-label="Admin Navigation"
          className="hidden xl:flex items-center gap-1.5 bg-[#121212] border border-[#262626] rounded-full p-1 shadow-inner"
        >
          {/* Admin Role Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#1C1C1C] text-[#EDEDED] border border-[#333333] whitespace-nowrap flex-shrink-0 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFFFFF] animate-pulse" />
            <span>{admin.role}</span>
          </div>

          {/* Divider between role and nav links */}
          <div className="h-4 w-[1px] bg-[#262626] mx-0.5 flex-shrink-0" />

          {/* Nav Links */}
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-[#FFFFFF] text-[#000000] font-bold shadow-sm'
                    : 'text-[#A3A3A3] hover:text-[#FFFFFF] hover:bg-[#262626]/60 font-medium'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 flex-shrink-0 transition-colors ${
                    isActive ? 'text-[#000000]' : 'text-[#737373]'
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* ========================================================= */}
        {/* ZONE 3: RIGHT — PUBLIC SITE | IDENTITY | SIGN OUT        */}
        {/* ========================================================= */}
        <div className="hidden xl:flex items-center gap-3.5 flex-shrink-0">
          {/* Public Site Link */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-[#A3A3A3] hover:text-[#FFFFFF] hover:bg-[#171717] border border-transparent hover:border-[#262626] transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FFFFFF]"
            title="Open public website in new tab"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
          </Link>

          {/* Subtle Vertical Divider */}
          <div className="h-5 w-[1px] bg-[#262626] flex-shrink-0" />

          {/* Admin Identity (Name & Truncated Email) */}
          <div className="flex flex-col justify-center text-right leading-none max-w-[160px] 2xl:max-w-[220px]">
            <span className="text-xs font-mono text-[#EDEDED] font-semibold truncate leading-tight">
              {admin.name}
            </span>
            <span
              className="text-[10px] font-mono text-[#737373] truncate leading-tight mt-1"
              title={admin.email}
            >
              {admin.email}
            </span>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#171717] hover:bg-[#262626] border border-[#333333] hover:border-[#4D4D4D] text-xs font-mono text-[#EDEDED] hover:text-[#FFFFFF] transition-colors disabled:opacity-50 whitespace-nowrap flex-shrink-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FFFFFF]"
            title="Sign out of admin session"
          >
            <LogOut className="w-3.5 h-3.5 text-[#A3A3A3] flex-shrink-0" />
            <span>{loggingOut ? 'Exiting...' : 'Sign Out'}</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TABLET / MOBILE HEADER RIGHT CONTROLS (< 1280px)          */}
        {/* ========================================================= */}
        <div className="flex xl:hidden items-center gap-2.5">
          {/* Compact Role Badge for Tablet */}
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#171717] text-[#EDEDED] border border-[#333333] whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFFFFF]" />
            <span>{admin.role}</span>
          </span>

          {/* Mobile Menu Trigger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#EDEDED] bg-[#171717] hover:bg-[#262626] border border-[#262626] rounded-xl transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FFFFFF]"
            aria-label="Toggle admin menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE / TABLET COLLAPSIBLE DRAWER                        */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0A0A0A] border-b border-[#262626] px-4 py-5 space-y-3 transition-all animate-in fade-in duration-200">
          {/* Identity Card */}
          <div className="p-3.5 rounded-2xl bg-[#141414] border border-[#262626] flex items-center justify-between">
            <div className="min-w-0 pr-3">
              <div className="text-xs font-mono text-[#EDEDED] font-bold truncate">
                {admin.name}
              </div>
              <div className="text-[11px] font-mono text-[#737373] truncate" title={admin.email}>
                {admin.email}
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-[#262626] text-[#EDEDED] border border-[#333333] flex-shrink-0">
              {admin.role}
            </span>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-xl text-xs font-mono tracking-wider transition-colors ${
                    isActive
                      ? 'bg-[#FFFFFF] text-[#000000] font-bold'
                      : 'text-[#A3A3A3] hover:bg-[#171717] hover:text-[#FFFFFF]'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Footer Controls: Public Site & Sign Out */}
          <div className="pt-3 border-t border-[#262626] flex items-center justify-between gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A3A3A3] hover:text-[#FFFFFF] py-2 px-3 rounded-xl hover:bg-[#171717] transition-colors"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#262626] hover:bg-[#333333] text-xs font-mono text-[#FFFFFF] font-bold transition-colors disabled:opacity-50"
            >
              <LogOut className="w-3.5 h-3.5 text-[#A3A3A3]" />
              <span>{loggingOut ? 'Exiting...' : 'Sign Out'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
