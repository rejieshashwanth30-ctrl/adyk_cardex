'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const TECHNOLOGIES = [
  { name: 'NEXT.JS', desc: 'React framework for server-rendered web systems' },
  { name: 'TYPESCRIPT', desc: 'Type-safe distributed application engineering' },
  { name: 'AI / ML', desc: 'Neural architectures and on-device inference models' },
  { name: 'ESP32', desc: 'Bare-metal silicon microcontroller firmware' },
  { name: 'PYTHON', desc: 'Computational analysis, PyTorch & backend services' },
  { name: 'REACT', desc: 'Component ecosystems and reactive canvas engines' },
  { name: 'FLUTTER', desc: 'Cross-platform native client rendering pipelines' },
  { name: 'NODE.JS', desc: 'Event-driven high-throughput runtime services' },
  { name: 'POSTGRESQL', desc: 'Relational data structures, vector extensions' },
  { name: 'IOT', desc: 'Transducers, edge telemetry and sensor clusters' },
  { name: 'ARDUINO', desc: 'Embedded hardware prototyping and real-time control' },
  { name: 'WEBSOCKETS', desc: 'Sub-millisecond bidirectional network streams' },
];

export default function TechnologyGrid() {
  const [activeHover, setActiveHover] = useState<string | null>(null);

  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-[#EAE8E3]">
      {/* Editorial Header */}
      <ScrollReveal variant="fade-up" duration={700}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 border-b border-[#EAE8E3] pb-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#858585] font-semibold block mb-3">
              ECOSYSTEM &bull; STACK AGNOSTIC
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-[#111111] uppercase max-w-2xl leading-[1.02]">
              THE TECHNOLOGY<br />
              BEHIND THE BUILD.
            </h2>
          </div>

          <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#858585] font-medium">
            TECHNOLOGY &rarr; PROJECTS &rarr; BUILDERS
          </div>
        </div>
      </ScrollReveal>

      {/* Oversized Luxury Typography Grid with Staggered Entrance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TECHNOLOGIES.map((tech, idx) => {
          const isHovered = activeHover === tech.name;
          return (
            <ScrollReveal
              key={tech.name}
              variant="fade-scale"
              delay={(idx % 3) * 80}
              duration={650}
            >
              <Link
                href={`/explore?tech=${encodeURIComponent(tech.name)}`}
                onMouseEnter={() => setActiveHover(tech.name)}
                onMouseLeave={() => setActiveHover(null)}
                className="group relative p-7 rounded-2xl sm:rounded-3xl material-luxury-card flex flex-col justify-between overflow-hidden bg-white hover:bg-[#FAF9F6] transition-all duration-300 h-full"
              >
                {/* Subtle monochromatic hover sheen */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#858585] font-semibold">
                      STACK COMPONENT
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#858585] group-hover:text-[#111111] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  <h3
                    className={`text-2xl sm:text-3xl font-black tracking-tight uppercase transition-all duration-300 ${
                      isHovered ? 'text-[#111111] translate-x-1' : 'text-[#222222]'
                    }`}
                  >
                    {tech.name}
                  </h3>

                  <p className="text-xs text-[#555555] mt-2 font-normal leading-relaxed">
                    {tech.desc}
                  </p>
                </div>

                <div className="relative z-10 mt-6 pt-4 border-t border-[#EAE8E3] flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.15em] text-[#858585] group-hover:text-[#111111] transition-colors font-medium">
                  <span>View Builds</span>
                  <span>&rarr;</span>
                </div>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
