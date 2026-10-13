'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Invalid admin credentials.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        setError(data.error || 'Invalid admin credentials.');
        return;
      }

      // Successful login -> Redirect
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      console.error('Admin login connection error:', err);
      setError('Connection or server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-[#EDEDED] flex flex-col justify-between overflow-hidden selection:bg-[#FFFFFF] selection:text-[#000000]">
      {/* Subtle Architectural Ambient Grid (Strictly monochromatic, 1.5% white) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Subtle Centered Monochrome Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
        }}
      />

      {/* Top Header Row */}
      <header className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#737373] hover:text-[#FFFFFF] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO CARDEX</span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-[10px] font-mono tracking-widest text-[#A3A3A3]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFFFFF] animate-pulse" />
          <span>ENCRYPTED V1 GATEWAY</span>
        </div>
      </header>

      {/* Main Login Card (High-Contrast Monochromatic Editorial Form) */}
      <main className="relative z-10 w-full max-w-md mx-auto px-4 py-8">
        <div className="bg-[#0D0D0D] border border-[#262626] rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          {/* Brand Mark & Label */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#FFFFFF] text-[#000000] font-mono font-black text-xl mb-5 shadow-lg">
              C
            </div>

            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#737373] font-semibold mb-2">
              ADMIN ACCESS
            </div>

            <h1 className="text-2xl sm:text-3xl font-black font-mono tracking-[0.2em] text-[#FFFFFF] uppercase">
              ADYK CARDEX
            </h1>

            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#A3A3A3] mt-3 font-medium">
              CONTROL THE WORK. CURATE THE BUILDERS.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div
              role="alert"
              className="mb-6 p-3.5 rounded-xl bg-[#171717] border border-[#404040] flex items-center gap-2.5 text-xs font-mono text-[#FFFFFF]"
            >
              <AlertCircle className="w-4 h-4 text-[#A3A3A3] flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} method="POST" action="#" className="space-y-5" noValidate>
            <div>
              <label
                htmlFor="admin-email"
                className="block text-[11px] font-mono uppercase tracking-wider text-[#A3A3A3] mb-2 font-medium"
              >
                Admin Email
              </label>
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@adyk.io"
                className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#262626] focus:border-[#FFFFFF] focus:ring-1 focus:ring-[#FFFFFF] text-sm font-mono text-[#FFFFFF] placeholder-[#525252] outline-none transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="admin-password"
                  className="block text-[11px] font-mono uppercase tracking-wider text-[#A3A3A3] font-medium"
                >
                  Password
                </label>
              </div>
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#262626] focus:border-[#FFFFFF] focus:ring-1 focus:ring-[#FFFFFF] text-sm font-mono text-[#FFFFFF] placeholder-[#525252] outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full group mt-2 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#E5E5E5] text-[#000000] font-mono font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-[0_4px_20px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{loading ? 'AUTHENTICATING...' : 'ACCESS ADMIN'}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </form>

          {/* Subtle Security Notice */}
          <div className="mt-8 pt-6 border-t border-[#1F1F1F] text-center">
            <p className="text-[11px] font-mono text-[#737373] tracking-wide">
              Authorized ADYK CARDEX administrators only.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-6 text-center text-[10px] font-mono text-[#525252] uppercase tracking-[0.25em]">
        ADYK CARDEX &bull; DISCOVERY ENGINE &bull; 2026
      </footer>
    </div>
  );
}
