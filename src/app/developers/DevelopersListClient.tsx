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
    <div className="pt-20 sm:pt-24 pb-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="mb-8 sm:mb-10 border-b border-[#EAE8E3] pb-6 sm:pb-8">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#858585] mb-2 font-semibold">
          <Users className="w-3.5 h-3.5 text-[#B99752]" />
          <span>BUILDERS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111111] uppercase leading-[0.95]">
          THE PEOPLE<br />
          <span className="text-[#858585]">WHO BUILD.</span>
        </h1>
        <p className="text-[#555555] text-xs sm:text-sm mt-2.5 max-w-xl font-normal leading-relaxed">
          Discover developers, systems architects, and creative technologists through the authentic work they create.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3 mb-6 sm:mb-8">
        <div className="relative">
          <Search className="w-4 h-4 text-[#858585] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find a developer, creator or skill..."
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] text-xs sm:text-sm text-[#111111] placeholder-[#858585] focus:outline-none focus:border-[#B99752] transition-colors"
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

        <div className="p-3 sm:p-3.5 rounded-xl material-luxury-card bg-white border border-[#EAE8E3] flex flex-wrap items-center gap-2.5 text-xs">
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
        <div className="text-center py-16 material-luxury-card bg-white rounded-2xl p-8 border border-[#EAE8E3]">
          <p className="text-[#858585] text-xs sm:text-sm mb-3">No developers match your active filters.</p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-[#111111] hover:bg-[#222222] text-white text-xs uppercase tracking-wider font-semibold transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
          {filteredDevelopers.map((dev) => (
            <DeveloperCard key={dev.id} developer={dev} />
          ))}
        </div>
      )}
    </div>
  );
}
