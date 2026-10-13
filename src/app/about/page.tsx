import React from 'react';
import Link from 'next/link';
import CardexMark from '@/components/brand/CardexMark';
import { Code2, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import {
  WhatsappIcon,
  LinkedinIcon,
  InstagramIcon,
  DiscordIcon,
} from '@/components/ui/Icons';

export const metadata = {
  title: 'About ADYK CARDEX — Manifesto & Architecture',
  description:
    'ADYK CARDEX is an open platform where developers and creators showcase what they build, discover talented people, find collaborators, and connect directly.',
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#858585] mb-4 px-3.5 py-1.5 rounded-full bg-white border border-[#EAE8E3] shadow-sm font-semibold">
          <CardexMark size="xs" glow={false} />
          <span>Manifesto &bull; Product Identity</span>
        </div>

        <h1 className="text-4xl sm:text-7xl font-black tracking-tight text-[#111111] mb-6 uppercase leading-[0.95]">
          ABOUT<br />
          <span className="text-[#858585]">ADYK CARDEX.</span>
        </h1>

        <p className="text-lg sm:text-2xl text-[#555555] font-light leading-relaxed">
          &ldquo;Your work deserves to be discovered.&rdquo;
        </p>
      </div>

      {/* Core Positioning Statement */}
      <div className="p-8 sm:p-14 rounded-3xl material-luxury-card bg-white border border-[#EAE8E3] mb-16 shadow-sm">
        <h2 className="text-lg sm:text-xl font-bold text-[#111111] mb-4 tracking-tight">
          THE ADYK CARDEX POSITIONING
        </h2>
        <blockquote className="text-base sm:text-xl text-[#111111] leading-relaxed font-normal mb-6 border-l-2 border-[#B99752] pl-5">
          &ldquo;ADYK CARDEX is an open platform where developers and creators showcase what they build, discover talented people, find collaborators, and connect directly.&rdquo;
        </blockquote>

        <p className="text-sm sm:text-base text-[#555555] leading-relaxed mb-6 font-normal">
          ADYK CARDEX is engineered as an open discovery engine. Unlike traditional social media feeds or resume databases, ADYK CARDEX anchors interaction on tangible engineering artifacts: architecture schematics, hardware prototypes, source repositories, and active collaboration needs.
        </p>

        {/* Product Separation Notice */}
        <div className="p-5 rounded-2xl bg-[#F8F7F4] border border-[#EAE8E3] text-xs text-[#555555] space-y-1">
          <div className="text-[#111111] font-bold tracking-wide">
            &bull; Product Independence Notice:
          </div>
          <p className="leading-relaxed">
            ADYK CARDEX is a dedicated, public project discovery, developer showcase, and direct technical connection portal designed for serious technological innovation.
          </p>
        </div>
      </div>

      {/* Core Pipeline Diagram */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-wider text-[#858585] font-bold block mb-2">
            Core Discovery Loop
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#111111] uppercase tracking-tight">
            From Discovery To Creation
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-center">
          {[
            { step: '01', title: 'Discover Projects' },
            { step: '02', title: 'Discover Developers' },
            { step: '03', title: 'Explore Skills' },
            { step: '04', title: 'Find Collaborators' },
            { step: '05', title: 'Connect Directly' },
            { step: '06', title: 'Build Together' },
          ].map((item) => (
            <div
              key={item.step}
              className="p-5 rounded-2xl material-luxury-card bg-white border border-[#EAE8E3] flex flex-col items-center justify-center hover:border-[#B99752] transition-colors shadow-sm"
            >
              <span className="text-xs text-[#B99752] font-bold mb-2">Step {item.step}</span>
              <span className="text-xs font-semibold text-[#111111] leading-snug">{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stack Freedom Statement */}
      <div className="p-8 sm:p-12 rounded-3xl material-luxury-card bg-white border border-[#EAE8E3] mb-16 shadow-sm">
        <div className="flex items-center gap-3 text-[#111111] mb-3">
          <Code2 className="w-5 h-5 text-[#B99752]" />
          <h2 className="text-xl font-bold text-[#111111] tracking-tight">
            Complete Technology Freedom
          </h2>
        </div>
        <p className="text-sm sm:text-base text-[#555555] leading-relaxed mb-6 font-normal">
          ADYK CARDEX never dictates or restricts which technologies creators build with. Builders are entirely free to showcase projects made with any runtime, language, cloud provider, or hardware:
        </p>

        <div className="flex flex-wrap gap-2 text-xs">
          {[
            'GitHub',
            'GitLab',
            'Flutter',
            'React',
            'Next.js',
            'Python',
            'Rust',
            'C++',
            'AWS',
            'Azure',
            'Firebase',
            'Vercel',
            'Arduino',
            'ESP32',
            'PyTorch',
            'Docker',
            'PostgreSQL',
          ].map((tech) => (
            <span
              key={tech}
              className="px-3.5 py-1.5 rounded-lg bg-[#FAF9F6] text-[#111111] border border-[#EAE8E3] hover:border-[#B99752] transition-colors font-medium shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Evolutionary Roadmap */}
      <div className="p-8 sm:p-12 rounded-3xl material-luxury-card bg-white border border-[#EAE8E3] mb-16 shadow-sm">
        <h2 className="text-xl font-bold text-[#111111] mb-6 tracking-tight">
          Platform Evolution Roadmap
        </h2>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-[#F8F7F4] border border-[#B99752]/40 shadow-sm">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-[#111111]">v1.0 — Current Production</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#111111] text-white font-bold">Active</span>
            </div>
            <p className="text-xs text-[#555555] leading-relaxed font-normal">
              Open discovery engine, public project intake, privacy-first direct connection, luxury bento showcase, and curated moderation.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE8E3]">
            <span className="text-xs font-bold text-[#111111] block mb-1">
              v2.0 — Builder Accounts &amp; Peer Reviews
            </span>
            <p className="text-xs text-[#555555] leading-relaxed font-normal">
              Developer accounts, project editing, interactive embed sandboxes (StackBlitz/CodePen), and structured technical architecture reviews.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE8E3]">
            <span className="text-xs font-bold text-[#111111] block mb-1">
              v3.0 — Verified Teams &amp; Intelligent Matching
            </span>
            <p className="text-xs text-[#555555] leading-relaxed font-normal">
              Multi-contributor project workspaces, verified technical badges, AI-assisted skill complementarity matching.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE8E3]">
            <span className="text-xs font-bold text-[#111111] block mb-1">
              v4.0 — Ecosystem Collaboration
            </span>
            <p className="text-xs text-[#555555] leading-relaxed font-normal">
              Startup team formation, open-source grant matching, and full institutional technology partnerships.
            </p>
          </div>
        </div>
      </div>

      {/* ADYK Ecosystem & Contact Channels */}
      <div className="p-8 sm:p-12 rounded-3xl material-luxury-card bg-white border border-[#EAE8E3] mb-16 shadow-sm">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#858585] mb-2 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#B99752]" />
          <span>ADYK Multi-Venture Network</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#111111] uppercase tracking-tight mb-3">
          Connect With The ADYK Team
        </h2>
        <p className="text-sm text-[#555555] max-w-2xl leading-relaxed mb-8 font-normal">
          Interested in learning, building, growing, and inspiring? ADYK is an expanding multi-venture technology ecosystem. Register on ADYK Inspire or reach out directly through any of our official channels.
        </p>

        {/* ADYK Inspire Banner Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#FAF9F6] to-[#F5F3EC] border border-[#EAE8E3] mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B99752] animate-ping" />
              <span>ADYK Inspire Portal &bull; Learn &bull; Build &bull; Grow</span>
            </div>
            <p className="text-xs text-[#555555]">
              Register to collaborate and connect directly with the ADYK team: <span className="font-mono text-[#111111]">https://adyk-inspire.vercel.app/</span>
            </p>
          </div>
          <a
            href="https://adyk-inspire.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#111111] hover:bg-[#222222] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-sm flex-shrink-0"
          >
            <span>Register Now</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#B99752]" />
          </a>
        </div>

        {/* 4 Official Contact Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="https://wa.me/918870605699"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-[#FAF9F6] hover:bg-[#F3F1EC] border border-[#EAE8E3] hover:border-[#25D366]/40 transition-all flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
                <WhatsappIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#111111] block">WhatsApp</span>
                <span className="text-[11px] text-[#555555] font-mono">+91 88706 05699</span>
              </div>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#858585] group-hover:text-[#25D366] transition-colors" />
          </a>

          <a
            href="https://www.linkedin.com/in/adyk-a-multi-venture-company-38782a431?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-[#FAF9F6] hover:bg-[#F3F1EC] border border-[#EAE8E3] hover:border-[#0A66C2]/40 transition-all flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center">
                <LinkedinIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#111111] block">LinkedIn</span>
                <span className="text-[11px] text-[#555555]">ADYK - Multi-Venture Company</span>
              </div>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#858585] group-hover:text-[#0A66C2] transition-colors" />
          </a>

          <a
            href="https://www.instagram.com/buildby.adyk?rpxt=MTE0ajhmNWJuY3Fsdw%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-[#FAF9F6] hover:bg-[#F3F1EC] border border-[#EAE8E3] hover:border-[#E4405F]/40 transition-all flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#E4405F]/10 text-[#E4405F] flex items-center justify-center">
                <InstagramIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#111111] block">Instagram</span>
                <span className="text-[11px] text-[#555555]">@buildby.adyk</span>
              </div>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#858585] group-hover:text-[#E4405F] transition-colors" />
          </a>

          <a
            href="https://discord.gg/7qB6vGNb2"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-[#FAF9F6] hover:bg-[#F3F1EC] border border-[#EAE8E3] hover:border-[#5865F2]/40 transition-all flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#5865F2]/10 text-[#5865F2] flex items-center justify-center">
                <DiscordIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#111111] block">Discord</span>
                <span className="text-[11px] text-[#555555]">ADYK Community Server</span>
              </div>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#858585] group-hover:text-[#5865F2] transition-colors" />
          </a>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="text-center pt-4">
        <Link
          href="/submit"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#111111] hover:bg-[#222222] text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-md group"
        >
          <span>Submit Your Project to ADYK CARDEX</span>
          <ArrowRight className="w-4 h-4 text-[#B99752] transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
