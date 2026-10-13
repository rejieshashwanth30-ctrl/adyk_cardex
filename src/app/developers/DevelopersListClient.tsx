'use client';

import React, { useState, useMemo } from 'react';
import { Developer } from '@/lib/types';
import DeveloperCard from '@/components/developers/DeveloperCard';
import { Search, Users, SlidersHorizontal, X } from 'lucide-react';

interface DevelopersListClientProps {
  initialDevelopers: Developer[];
}

export default function DevelopersListClient({ initialDevelopers }: DevelopersListClientProps) {
  const [search, setSearch] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('ALL');

  // Derive unique skills
  const availableSkills = useMemo(() => {
    const set = new Set<string>();
    initialDevelopers.forEach((d) => d.skills.forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, [initialDevelopers]);

  const filteredDevelopers = useMemo(() => {
    let result = [...initialDevelopers];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.username.toLowerCase().includes(q) ||
          d.role.toLowerCase().includes(q) ||
          d.bio.toLowerCase().includes(q) ||
          d.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (selectedSkill) {
      result = result.filter((d) =>
        d.skills.some((s) => s.toLowerCase() === selectedSkill.toLowerCase())
      );
    }

    if (selectedAvailability !== 'ALL') {
      result = result.filter((d) => d.availability === selectedAvailability);
    }

    return result;
  }, [initialDevelopers, search, selectedSkill, selectedAvailability]);

  const resetFilters = () => {
    setSearch('');
    setSelectedSkill('');
    setSelectedAvailability('ALL');
  };

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="mb-14 border-b border-[#EAE8E3] pb-10">
        <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#858585] mb-3 font-semibold">
          <Users className="w-3.5 h-3.5 text-[#B99752]" />
          <span>BUILDERS</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#111111] uppercase leading-[0.95]">
          THE PEOPLE<br />
          <span className="text-[#858585]">WHO BUILD.</span>
        </h1>
        <p className="text-[#555555] text-sm sm:text-base mt-4 max-w-xl font-normal leading-relaxed">
          Discover developers, systems architects, and creative technologists through the authentic work they create.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4 mb-12">
        <div className="relative">
          <Search className="w-4 h-4 text-[#858585] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find a developer, creator or skill..."
            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] text-sm text-[#111111] placeholder-[#858585] focus:outline-none focus:border-[#B99752] transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#858585] hover:text-[#111111]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="p-4 rounded-xl material-luxury-card bg-white border border-[#EAE8E3] flex flex-wrap items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-[#858585] mr-2 tracking-wider font-semibold">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#B99752]" />
            <span>FILTER:</span>
          </div>

          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="py-1.5 px-3 rounded-lg bg-[#FAF9F6] border border-[#EAE8E3] text-[#111111] focus:outline-none focus:border-[#B99752] font-medium"
          >
            <option value="">All Skills</option>
            {availableSkills.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={selectedAvailability}
            onChange={(e) => setSelectedAvailability(e.target.value)}
            className="py-1.5 px-3 rounded-lg bg-[#FAF9F6] border border-[#EAE8E3] text-[#111111] focus:outline-none focus:border-[#B99752] font-medium"
          >
            <option value="ALL">All Availability</option>
            <option value="OPEN FOR COLLABORATION">Open for Collaboration</option>
            <option value="OPEN TO CONNECT">Open to Connect</option>
            <option value="CURRENTLY BUILDING">Currently Building</option>
            <option value="NOT CURRENTLY AVAILABLE">Not Currently Available</option>
          </select>

          {(search || selectedSkill || selectedAvailability !== 'ALL') && (
            <button
              onClick={resetFilters}
              className="ml-auto inline-flex items-center gap-1 text-xs text-[#858585] hover:text-[#111111] underline underline-offset-4 font-semibold"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {filteredDevelopers.length === 0 ? (
        <div className="text-center py-20 material-luxury-card bg-white rounded-3xl p-10 border border-[#EAE8E3]">
          <p className="text-[#858585] text-sm font-mono mb-4">No developers match your active filters.</p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-xl bg-[#111111] hover:bg-[#222222] text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredDevelopers.map((dev) => (
            <DeveloperCard key={dev.id} developer={dev} />
          ))}
        </div>
      )}
    </div>
  );
}
