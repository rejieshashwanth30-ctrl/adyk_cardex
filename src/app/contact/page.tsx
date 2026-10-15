import React from 'react';
import Link from 'next/link';
import CardexMark from '@/components/brand/CardexMark';
import { ArrowUpRight } from 'lucide-react';
import {
  WhatsappIcon,
  LinkedinIcon,
  InstagramIcon,
  DiscordIcon,
} from '@/components/ui/Icons';

export const metadata = {
  title: 'Contact ADYK — ADYK Inspire & Official Channels',
  description:
    'Connect with the ADYK team. Register on ADYK Inspire to learn, build, grow, and inspire, or reach out directly via WhatsApp, LinkedIn, Instagram, and Discord.',
};

export default function ContactPage() {
  return (
    <div className="pt-20 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#858585] mb-3 px-3 py-1 rounded-full bg-white border border-[#EAE8E3] shadow-xs font-semibold">
          <CardexMark size="xs" glow={false} />
          <span>ADYK Multi-Venture Network &bull; Contact Protocol</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111111] mb-4 uppercase leading-[0.95]">
          CONNECT WITH<br />
          <span className="text-[#858585]">THE ADYK TEAM.</span>
        </h1>

        <p className="text-base sm:text-xl text-[#555555] font-light leading-relaxed">
          &ldquo;Learn. Build. Grow. Inspire.&rdquo;
        </p>
      </div>



      {/* Direct Contact Channels Grid */}
      <div className="mb-14">
        <h2 className="text-xs uppercase tracking-wider text-[#858585] font-bold mb-4">
          Direct Channels &bull; Real-Time Communication
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/918870605699"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl material-luxury-card bg-white hover:bg-[#FAF9F6] border border-[#EAE8E3] hover:border-[#25D366]/50 transition-all flex flex-col justify-between group shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
                  <WhatsappIcon className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#858585] group-hover:text-[#25D366] transition-colors" />
              </div>
              <h3 className="text-base font-bold text-[#111111] mb-1">WhatsApp Direct</h3>
              <p className="text-xs text-[#555555] font-mono mb-2">+91 88706 05699</p>
              <p className="text-xs text-[#737373] leading-relaxed">
                Connect directly with our leadership team for collaboration inquiries, partnerships, and technical questions.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#F0EFEA] text-xs font-semibold text-[#25D366] flex items-center gap-1">
              <span>Open WhatsApp Chat &rarr;</span>
            </div>
          </a>

          {/* LinkedIn Profile */}
          <a
            href="https://www.linkedin.com/in/adyk-a-multi-venture-company-38782a431?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl material-luxury-card bg-white hover:bg-[#FAF9F6] border border-[#EAE8E3] hover:border-[#0A66C2]/50 transition-all flex flex-col justify-between group shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center">
                  <LinkedinIcon className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#858585] group-hover:text-[#0A66C2] transition-colors" />
              </div>
              <h3 className="text-base font-bold text-[#111111] mb-1">LinkedIn Network</h3>
              <p className="text-xs text-[#555555] mb-2">ADYK - A Multi-Venture Company</p>
              <p className="text-xs text-[#737373] leading-relaxed">
                Follow enterprise milestones, venture announcements, leadership profiles, and career opportunities across ADYK.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#F0EFEA] text-xs font-semibold text-[#0A66C2] flex items-center gap-1">
              <span>Visit LinkedIn Profile &rarr;</span>
            </div>
          </a>

          {/* Instagram Profile */}
          <a
            href="https://www.instagram.com/buildby.adyk?rpxt=MTE0ajhmNWJuY3Fsdw%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl material-luxury-card bg-white hover:bg-[#FAF9F6] border border-[#EAE8E3] hover:border-[#E4405F]/50 transition-all flex flex-col justify-between group shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#E4405F]/10 text-[#E4405F] flex items-center justify-center">
                  <InstagramIcon className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#858585] group-hover:text-[#E4405F] transition-colors" />
              </div>
              <h3 className="text-base font-bold text-[#111111] mb-1">Instagram</h3>
              <p className="text-xs text-[#555555] mb-2">@buildby.adyk</p>
              <p className="text-xs text-[#737373] leading-relaxed">
                Experience the visual crafting process: prototype teasers, design blueprints, community stories, and hardware demos.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#F0EFEA] text-xs font-semibold text-[#E4405F] flex items-center gap-1">
              <span>Follow @buildby.adyk &rarr;</span>
            </div>
          </a>

          {/* Discord Community Server */}
          <a
            href="https://discord.gg/7qB6vGNb2"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl material-luxury-card bg-white hover:bg-[#FAF9F6] border border-[#EAE8E3] hover:border-[#5865F2]/50 transition-all flex flex-col justify-between group shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#5865F2]/10 text-[#5865F2] flex items-center justify-center">
                  <DiscordIcon className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#858585] group-hover:text-[#5865F2] transition-colors" />
              </div>
              <h3 className="text-base font-bold text-[#111111] mb-1">Discord Server</h3>
              <p className="text-xs text-[#555555] mb-2">discord.gg/7qB6vGNb2</p>
              <p className="text-xs text-[#737373] leading-relaxed">
                Join our developer Discord for real-time engineering chats, live prototype feedback, voice jams, and open collaboration.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#F0EFEA] text-xs font-semibold text-[#5865F2] flex items-center gap-1">
              <span>Join Discord Server &rarr;</span>
            </div>
          </a>
        </div>
      </div>

      {/* Return to Explore / Submit Bottom */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-[#EAE8E3]">
        <Link
          href="/explore"
          className="px-6 py-3.5 rounded-xl bg-white hover:bg-[#FAF9F6] border border-[#EAE8E3] text-xs uppercase tracking-wider font-semibold text-[#111111] transition-colors shadow-sm"
        >
          &larr; Explore Projects
        </Link>
        <Link
          href="/submit"
          className="px-6 py-3.5 rounded-xl bg-[#111111] hover:bg-[#222222] text-white text-xs uppercase tracking-wider font-semibold transition-colors shadow-sm"
        >
          Submit a Project &rarr;
        </Link>
      </div>
    </div>
  );
}
