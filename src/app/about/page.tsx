import React from 'react';
import Link from 'next/link';
import CardexMark from '@/components/brand/CardexMark';
import { Code2, ArrowRight } from 'lucide-react';

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
        <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#858585] mb-4 px-3.5 py-1.5 rounded-full bg-white border border-[#EAE8E3] shadow-sm font-semibold">
          <CardexMark size="xs" glow={false} />
          <span>MANIFESTO &bull; PRODUCT IDENTITY</span>
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
        <h2 className="text-lg sm:text-xl font-bold text-[#111111] mb-4 font-mono uppercase tracking-wider">
          THE ADYK CARDEX POSITIONING
        </h2>
        <blockquote className="text-base sm:text-xl text-[#111111] leading-relaxed font-normal mb-6 border-l-2 border-[#B99752] pl-5">
          &ldquo;ADYK CARDEX is an open platform where developers and creators showcase what they build, discover talented people, find collaborators, and connect directly.&rdquo;
        </blockquote>

        <p className="text-sm sm:text-base text-[#555555] leading-relaxed mb-6 font-normal">
          ADYK CARDEX is engineered as an open discovery engine. Unlike traditional social media feeds or resume databases, ADYK CARDEX anchors interaction on tangible engineering artifacts: architecture schematics, hardware prototypes, source repositories, and active collaboration needs.
        </p>

        {/* Product Separation Notice */}
        <div className="p-5 rounded-2xl bg-[#F8F7F4] border border-[#EAE8E3] text-xs font-mono text-[#555555] space-y-1">
          <div className="text-[#111111] font-bold uppercase tracking-wider">
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
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#858585] font-bold block mb-2">
            CORE DISCOVERY LOOP
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#111111] uppercase tracking-tight">
            From Discovery To Creation
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-center font-mono">
          {[
            { step: '01', title: 'DISCOVER PROJECTS' },
            { step: '02', title: 'DISCOVER DEVELOPERS' },
            { step: '03', title: 'EXPLORE SKILLS' },
            { step: '04', title: 'FIND COLLABORATORS' },
            { step: '05', title: 'CONNECT DIRECTLY' },
            { step: '06', title: 'BUILD TOGETHER' },
          ].map((item) => (
            <div
              key={item.step}
              className="p-5 rounded-2xl material-luxury-card bg-white border border-[#EAE8E3] flex flex-col items-center justify-center hover:border-[#B99752] transition-colors shadow-sm"
            >
              <span className="text-[10px] text-[#B99752] font-bold mb-2">STEP {item.step}</span>
              <span className="text-xs font-bold text-[#111111] tracking-wider leading-snug">{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stack Freedom Statement */}
      <div className="p-8 sm:p-12 rounded-3xl material-luxury-card bg-white border border-[#EAE8E3] mb-16 shadow-sm">
        <div className="flex items-center gap-3 text-[#111111] mb-3">
          <Code2 className="w-5 h-5 text-[#B99752]" />
          <h2 className="text-xl font-bold font-mono text-[#111111] uppercase tracking-wider">
            COMPLETE TECHNOLOGY FREEDOM
          </h2>
        </div>
        <p className="text-sm sm:text-base text-[#555555] leading-relaxed mb-6 font-normal">
          ADYK CARDEX never dictates or restricts which technologies creators build with. Builders are entirely free to showcase projects made with any runtime, language, cloud provider, or hardware:
        </p>

        <div className="flex flex-wrap gap-2 text-xs font-mono">
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
        <h2 className="text-xl font-bold font-mono text-[#111111] mb-6 uppercase tracking-wider">
          PLATFORM EVOLUTION ROADMAP
        </h2>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-[#F8F7F4] border border-[#B99752]/40 shadow-sm">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono font-bold text-[#111111]">V1.0 — CURRENT PRODUCTION</span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#111111] text-white font-bold">ACTIVE</span>
            </div>
            <p className="text-xs text-[#555555] leading-relaxed font-normal">
              Open discovery engine, public project intake, privacy-first direct connection, luxury bento showcase, and curated moderation.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE8E3]">
            <span className="text-xs font-mono font-bold text-[#111111] block mb-1">
              V2.0 — BUILDER ACCOUNTS &amp; PEER REVIEWS
            </span>
            <p className="text-xs text-[#555555] leading-relaxed font-normal">
              Developer accounts, project editing, interactive embed sandboxes (StackBlitz/CodePen), and structured technical architecture reviews.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE8E3]">
            <span className="text-xs font-mono font-bold text-[#111111] block mb-1">
              V3.0 — VERIFIED TEAMS &amp; INTELLIGENT MATCHING
            </span>
            <p className="text-xs text-[#555555] leading-relaxed font-normal">
              Multi-contributor project workspaces, verified technical badges, AI-assisted skill complementarity matching.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE8E3]">
            <span className="text-xs font-mono font-bold text-[#111111] block mb-1">
              V4.0 — ECOSYSTEM COLLABORATION
            </span>
            <p className="text-xs text-[#555555] leading-relaxed font-normal">
              Startup team formation, open-source grant matching, and full institutional technology partnerships.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="text-center pt-4">
        <Link
          href="/submit"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#111111] hover:bg-[#222222] text-white font-black text-xs font-mono uppercase tracking-widest transition-all shadow-md group"
        >
          <span>SUBMIT YOUR PROJECT TO ADYK CARDEX</span>
          <ArrowRight className="w-4 h-4 text-[#B99752] transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
