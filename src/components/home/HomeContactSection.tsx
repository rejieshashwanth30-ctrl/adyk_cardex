'use client';

import React from 'react';
import CardexMark from '../brand/CardexMark';
import ScrollReveal from '../ui/ScrollReveal';
import { ArrowUpRight, Sparkles, MessageCircle, Send } from 'lucide-react';
import {
  WhatsappIcon,
  LinkedinIcon,
  InstagramIcon,
  DiscordIcon,
} from '@/components/ui/Icons';

export default function HomeContactSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-[#EAE8E3]">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <ScrollReveal variant="fade-up" duration={700}>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#858585] mb-3 px-3.5 py-1.5 rounded-full bg-white border border-[#EAE8E3] shadow-sm font-semibold">
            <CardexMark size="xs" glow={false} />
            <span>10 &bull; CONNECT WITH ADYK</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-[-0.04em] text-[#111111] uppercase leading-[0.98] mb-4">
            LEARN. BUILD.<br />
            <span className="text-[#858585]">GROW. INSPIRE.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#555555] leading-relaxed font-normal">
            Passionate about learning, building products, and scaling bold ideas? Register on ADYK Inspire to collaborate and connect directly with the ADYK team across our official channels.
          </p>
        </ScrollReveal>
      </div>

      {/* Main Grid: ADYK Inspire Hero Card + 4 Direct Channel Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Featured ADYK Inspire Portal Card (7 cols) */}
        <ScrollReveal variant="fade-scale" duration={750} className="lg:col-span-7">
          <div className="relative rounded-3xl material-luxury-card bg-gradient-to-br from-[#FFFFFF] via-[#FAF9F6] to-[#F5F3EC] p-8 sm:p-12 border border-[#EAE8E3] shadow-sm flex flex-col justify-between h-full group hover:border-[#B99752] transition-all">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] text-white text-[11px] font-semibold tracking-wider uppercase">
                  <Sparkles className="w-3 h-3 text-[#B99752]" />
                  <span>ADYK Inspire Portal</span>
                </div>
                <span className="text-xs text-[#059669] font-bold uppercase tracking-wider">
                  &bull; Open For Registration
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-[#111111] tracking-tight uppercase mb-4 leading-tight">
                JOIN THE ADYK BUILDER COMMUNITY
              </h3>

              <p className="text-sm sm:text-base text-[#555555] leading-relaxed font-normal mb-8">
                ADYK Inspire is the flagship platform where aspiring engineers, creators, and innovators register to connect with the core ADYK team. Whether you want to master new stacks, collaborate on multi-venture builds, or bring game-changing technology to life, your journey begins here.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
                {['Learn', 'Build', 'Grow', 'Inspire'].map((pillar) => (
                  <div
                    key={pillar}
                    className="p-3 rounded-xl bg-white border border-[#EAE8E3] text-center"
                  >
                    <span className="text-xs font-bold text-[#111111] tracking-wide uppercase">
                      {pillar}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#EAE8E3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs text-[#858585] font-mono">
                https://adyk-inspire.vercel.app/
              </span>

              <a
                href="https://adyk-inspire.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#111111] hover:bg-[#222222] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-md group-hover:scale-[1.01]"
              >
                <span>Register to Connect</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#B99752]" />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Right: 4 Direct Contact Channels (5 cols) */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {/* WhatsApp Direct */}
          <ScrollReveal variant="fade-scale" delay={100} duration={600}>
            <a
              href="https://wa.me/918870605699"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 sm:p-6 rounded-2xl material-luxury-card bg-white hover:bg-[#FAF9F6] border border-[#EAE8E3] hover:border-[#25D366]/40 transition-all block group shadow-xs"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
                    <WhatsappIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111111]">Direct WhatsApp</h4>
                    <p className="text-xs text-[#555555] font-mono">+91 88706 05699</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#858585] group-hover:text-[#25D366] transition-colors" />
              </div>
              <p className="text-xs text-[#737373] mt-2">
                Click to open WhatsApp &amp; message the ADYK team directly.
              </p>
            </a>
          </ScrollReveal>

          {/* LinkedIn Profile */}
          <ScrollReveal variant="fade-scale" delay={200} duration={600}>
            <a
              href="https://www.linkedin.com/in/adyk-a-multi-venture-company-38782a431?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 sm:p-6 rounded-2xl material-luxury-card bg-white hover:bg-[#FAF9F6] border border-[#EAE8E3] hover:border-[#0A66C2]/40 transition-all block group shadow-xs"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111111]">LinkedIn</h4>
                    <p className="text-xs text-[#555555]">ADYK - A Multi-Venture Company</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#858585] group-hover:text-[#0A66C2] transition-colors" />
              </div>
              <p className="text-xs text-[#737373] mt-2">
                Connect with our corporate identity, venture news, and team.
              </p>
            </a>
          </ScrollReveal>

          {/* Instagram Profile */}
          <ScrollReveal variant="fade-scale" delay={300} duration={600}>
            <a
              href="https://www.instagram.com/buildby.adyk?rpxt=MTE0ajhmNWJuY3Fsdw%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 sm:p-6 rounded-2xl material-luxury-card bg-white hover:bg-[#FAF9F6] border border-[#EAE8E3] hover:border-[#E4405F]/40 transition-all block group shadow-xs"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E4405F]/10 text-[#E4405F] flex items-center justify-center">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111111]">Instagram</h4>
                    <p className="text-xs text-[#555555]">@buildby.adyk</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#858585] group-hover:text-[#E4405F] transition-colors" />
              </div>
              <p className="text-xs text-[#737373] mt-2">
                Behind the scenes, product launches, and builder highlights.
              </p>
            </a>
          </ScrollReveal>

          {/* Discord Server */}
          <ScrollReveal variant="fade-scale" delay={400} duration={600}>
            <a
              href="https://discord.gg/7qB6vGNb2"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 sm:p-6 rounded-2xl material-luxury-card bg-white hover:bg-[#FAF9F6] border border-[#EAE8E3] hover:border-[#5865F2]/40 transition-all block group shadow-xs"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#5865F2]/10 text-[#5865F2] flex items-center justify-center">
                    <DiscordIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111111]">Discord Server</h4>
                    <p className="text-xs text-[#555555]">discord.gg/7qB6vGNb2</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#858585] group-hover:text-[#5865F2] transition-colors" />
              </div>
              <p className="text-xs text-[#737373] mt-2">
                Real-time builder chats, engineering assistance &amp; voice channels.
              </p>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
