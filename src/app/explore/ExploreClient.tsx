'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ProjectCard from '@/components/projects/ProjectCard';
import DeveloperCard from '@/components/developers/DeveloperCard';
import { Project, Developer } from '@/lib/types';
import { TECHNOLOGIES, matchesTech, findTechInfo } from '@/lib/data/technologies';
import {
  Search,
  SlidersHorizontal,
  FolderKanban,
  Users,
  Handshake,
  X,
  Layers,
  Sparkles,
} from 'lucide-react';

interface ExploreClientProps {
  initialProjects: Project[];
  initialDevelopers: Developer[];
}

function ExploreInner({ initialProjects, initialDevelopers }: ExploreClientProps) {
  const searchParams = useSearchParams();
  const initialTech = searchParams.get('tech') || '';
  const initialTab = searchParams.get('tab') || 'PROJECTS';

  const [activeTab, setActiveTab] = useState<'PROJECTS' | 'DEVELOPERS' | 'COLLABORATION'>(
    initialTab === 'DEVELOPERS'
      ? 'DEVELOPERS'
      : initialTab === 'COLLABORATION'
      ? 'COLLABORATION'
      : 'PROJECTS'
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string>(initialTech);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [collabOnly, setCollabOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'newest' | 'featured' | 'updated'>('featured');

  // Keep selectedTech in sync when URL search params update (e.g. user navigates between tech links)
  useEffect(() => {
    if (initialTech) {
      setSelectedTech(initialTech);
    }
  }, [initialTech]);

  // Retrieve curated stack details for the active technology
  const activeTechInfo = useMemo(() => {
    if (!selectedTech) return null;
    return findTechInfo(selectedTech);
  }, [selectedTech]);

  // Derive unique tech tags across all data, including curated TECHNOLOGIES
  const availableTechs = useMemo(() => {
    const map = new Map<string, string>();
    TECHNOLOGIES.forEach((t) => {
      map.set(t.name.toLowerCase().replace(/[^a-z0-9]/g, ''), t.name);
    });
    initialProjects.forEach((p) =>
      p.technologies.forEach((t) => {
        const key = t.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (!map.has(key)) map.set(key, t);
      })
    );
    initialDevelopers.forEach((d) =>
      d.skills.forEach((s) => {
        const key = s.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (!map.has(key)) map.set(key, s);
      })
    );
    return Array.from(map.values()).sort((a, b) => a.localeCompare(b));
  }, [initialProjects, initialDevelopers]);

  // Derive unique categories
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, [initialProjects]);

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    let result = [...initialProjects];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.creatorName.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedTech) {
      result = result.filter((p) =>
        p.technologies.some((t) => matchesTech(t, selectedTech))
      );
    }

    if (selectedStatus !== 'ALL') {
      result = result.filter((p) => p.status === selectedStatus);
    }

    if (selectedCategory !== 'ALL') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (collabOnly || activeTab === 'COLLABORATION') {
      result = result.filter((p) => p.collaborationOpen);
    }

    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'updated') {
      result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    }

    return result;
  }, [initialProjects, searchQuery, selectedTech, selectedStatus, selectedCategory, collabOnly, activeTab, sortBy]);

  // Filtered Developers
  const filteredDevelopers = useMemo(() => {
    let result = [...initialDevelopers];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.role.toLowerCase().includes(q) ||
          d.bio.toLowerCase().includes(q) ||
          d.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (selectedTech) {
      result = result.filter((d) =>
        d.skills.some((s) => matchesTech(s, selectedTech))
      );
    }

    return result;
  }, [initialDevelopers, searchQuery, selectedTech]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTech('');
    setSelectedStatus('ALL');
    setSelectedCategory('ALL');
    setCollabOnly(false);
  };

  const hasActiveFilters = Boolean(
    searchQuery || selectedTech || selectedStatus !== 'ALL' || selectedCategory !== 'ALL' || collabOnly
  );

  return (
    <div className="pt-20 sm:pt-24 pb-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Editorial Header */}
      <div className="mb-8 border-b border-[#EAE8E3] pb-6 sm:pb-8">
        <span className="text-xs uppercase tracking-wider text-[#858585] font-semibold block mb-2">
          Discovery Engine &bull; ADYK CARDEX
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.04em] text-[#111111] uppercase leading-[0.98]">
          EXPLORE ADYK CARDEX.
        </h1>
        <p className="text-[#555555] text-xs sm:text-sm mt-2.5 max-w-2xl font-normal leading-relaxed">
          Search verified projects, inspect technical architectures, and discover talented builders ready to collaborate.
        </p>
      </div>

      {/* Dedicated Technology Details Showcase when exploring a specific technology */}
      {selectedTech && (
        <div className="mb-8 p-4 sm:p-6 rounded-2xl material-luxury-card bg-[#FAF9F6] border-2 border-[#111111] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#EAE8E3]">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#858585] bg-white border border-[#EAE8E3] px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                  <Layers className="w-3 h-3 text-[#B99752]" />
                  <span>Stack Component</span>
                </span>
                <span className="text-[10px] font-semibold text-[#111111] bg-white border border-[#EAE8E3] px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B99752]" />
                  <span>{filteredProjects.length} {filteredProjects.length === 1 ? 'Build' : 'Builds'}</span>
                </span>
                {filteredDevelopers.length > 0 && (
                  <span className="text-[10px] font-semibold text-[#555555] bg-white border border-[#EAE8E3] px-2.5 py-0.5 rounded-full">
                    {filteredDevelopers.length} {filteredDevelopers.length === 1 ? 'Builder' : 'Builders'}
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight uppercase text-[#111111]">
                {selectedTech}
              </h2>

              <p className="text-xs sm:text-sm text-[#555555] mt-1.5 max-w-2xl leading-relaxed">
                {activeTechInfo?.desc ||
                  `Verified builds and developer talent using ${selectedTech} across the open ecosystem.`}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
              <Link
                href="/submit"
                className="px-3.5 py-2 rounded-xl bg-[#111111] hover:bg-[#222222] text-white text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap shadow-xs"
              >
                Submit {selectedTech} Build &rarr;
              </Link>
              <button
                onClick={() => setSelectedTech('')}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-[#F2EFE9] border border-[#EAE8E3] text-[#555555] hover:text-[#111111] text-xs font-semibold transition-colors"
                title="Clear technology filter"
              >
                <X className="w-3.5 h-3.5" />
                <span className="text-xs">View All Tech</span>
              </button>
            </div>
          </div>

          {/* Quick Relationship Switcher */}
          <div className="pt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[10px] uppercase tracking-wider text-[#858585] font-semibold">
              Filter By:
            </span>
            <button
              onClick={() => setActiveTab('PROJECTS')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'PROJECTS'
                  ? 'bg-[#111111] text-white'
                  : 'bg-white text-[#555555] border border-[#EAE8E3] hover:text-[#111111]'
              }`}
            >
              Projects ({filteredProjects.length})
            </button>
            <button
              onClick={() => setActiveTab('DEVELOPERS')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'DEVELOPERS'
                  ? 'bg-[#111111] text-white'
                  : 'bg-white text-[#555555] border border-[#EAE8E3] hover:text-[#111111]'
              }`}
            >
              Builders ({filteredDevelopers.length})
            </button>
            {filteredProjects.some((p) => p.collaborationOpen) && (
              <button
                onClick={() => setActiveTab('COLLABORATION')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'COLLABORATION'
                    ? 'bg-[#111111] text-white'
                    : 'bg-white text-[#555555] border border-[#EAE8E3] hover:text-[#111111]'
                }`}
              >
                Open Collabs ({filteredProjects.filter((p) => p.collaborationOpen).length})
              </button>
            )}
          </div>
        </div>
      )}

      {/* Luxury Tabs */}
      <div className="flex items-center gap-2 border-b border-[#EAE8E3] pb-3.5 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('PROJECTS')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs uppercase tracking-wider transition-all whitespace-nowrap font-medium ${
            activeTab === 'PROJECTS'
              ? 'bg-[#111111] text-white font-bold shadow-sm'
              : 'text-[#555555] hover:text-[#111111] bg-white border border-[#EAE8E3] hover:border-[#D6D2C8]'
          }`}
        >
          <FolderKanban className="w-3.5 h-3.5 text-[#B99752]" />
          <span>Projects ({selectedTech || searchQuery ? filteredProjects.length : initialProjects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('DEVELOPERS')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs uppercase tracking-wider transition-all whitespace-nowrap font-medium ${
            activeTab === 'DEVELOPERS'
              ? 'bg-[#111111] text-white font-bold shadow-sm'
              : 'text-[#555555] hover:text-[#111111] bg-white border border-[#EAE8E3] hover:border-[#D6D2C8]'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-[#B99752]" />
          <span>Developers ({selectedTech || searchQuery ? filteredDevelopers.length : initialDevelopers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('COLLABORATION')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs uppercase tracking-wider transition-all whitespace-nowrap font-medium ${
            activeTab === 'COLLABORATION'
              ? 'bg-[#111111] text-white font-bold shadow-sm'
              : 'text-[#555555] hover:text-[#111111] bg-white border border-[#EAE8E3] hover:border-[#D6D2C8]'
          }`}
        >
          <Handshake className="w-3.5 h-3.5 text-[#B99752]" />
          <span>
            Collaboration (
            {(selectedTech || searchQuery ? filteredProjects : initialProjects).filter((p) => p.collaborationOpen).length}
            )
          </span>
        </button>
      </div>

      {/* Luxury Search & Filter Toolbar */}
      <div className="space-y-3 mb-6 sm:mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3">
          {/* Main Search Input */}
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-[#858585] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, developers, technologies..."
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] text-xs sm:text-sm text-[#111111] placeholder-[#858585] focus:outline-none focus:border-[#B99752] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#858585] hover:text-[#111111]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="md:col-span-4 flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'featured' | 'updated')}
              className="w-full py-2.5 sm:py-3 px-3.5 rounded-xl bg-white border border-[#EAE8E3] text-xs text-[#111111] focus:outline-none focus:border-[#B99752] shadow-xs font-medium"
            >
              <option value="featured">Sort: Featured First</option>
              <option value="newest">Sort: Newest Submissions</option>
              <option value="updated">Sort: Recently Updated</option>
            </select>
          </div>
        </div>

        {/* Filter Pill Toolbar */}
        <div className="p-3 sm:p-3.5 rounded-xl material-luxury-card bg-white flex flex-wrap items-center gap-2.5 text-xs">
          <div className="flex items-center gap-1.5 text-[#858585] mr-2 font-semibold">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#B99752]" />
            <span>Filters:</span>
          </div>

          {/* Technology filter */}
          <select
            value={selectedTech}
            onChange={(e) => setSelectedTech(e.target.value)}
            className="py-1.5 px-3 rounded-lg bg-[#FAF9F6] border border-[#EAE8E3] text-[#111111] focus:outline-none focus:border-[#B99752] font-medium"
          >
            <option value="">All Technologies</option>
            {availableTechs.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* Status filter */}
          {activeTab !== 'DEVELOPERS' && (
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="py-1.5 px-3 rounded-lg bg-[#FAF9F6] border border-[#EAE8E3] text-[#111111] focus:outline-none focus:border-[#B99752] font-medium"
            >
              <option value="ALL">All Statuses</option>
              <option value="BUILDING">Building</option>
              <option value="OPEN_SOURCE">Open Source</option>
              <option value="COMPLETED">Completed</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          )}

          {/* Category filter */}
          {activeTab !== 'DEVELOPERS' && (
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-1.5 px-3 rounded-lg bg-[#FAF9F6] border border-[#EAE8E3] text-[#111111] focus:outline-none focus:border-[#B99752] font-medium"
            >
              <option value="ALL">All Categories</option>
              {availableCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}

          {/* Reset button */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="ml-auto inline-flex items-center gap-1 text-[#858585] hover:text-[#111111] underline underline-offset-4 font-semibold"
            >
              <X className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'PROJECTS' || activeTab === 'COLLABORATION' ? (
        <div>
          {filteredProjects.length === 0 ? (
            <div className="py-16 text-center material-luxury-card rounded-2xl bg-white p-8 border border-[#EAE8E3]">
              <FolderKanban className="w-10 h-10 text-[#858585] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#111111] mb-1">
                {selectedTech ? `No ${selectedTech} projects found yet` : 'No matching projects found'}
              </h3>
              <p className="text-xs text-[#555555] max-w-sm mx-auto mb-4">
                {selectedTech
                  ? `No verified projects have been submitted for ${selectedTech} yet. Be the first to showcase your build!`
                  : 'No verified projects matched the active search and filter constraints.'}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {selectedTech && (
                  <Link
                    href="/submit"
                    className="px-4 py-2 rounded-xl bg-[#111111] text-white hover:bg-[#222222] text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Submit the first {selectedTech} build &rarr;
                  </Link>
                )}
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-xl bg-white border border-[#EAE8E3] text-[#555555] hover:text-[#111111] text-xs transition-colors font-medium"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} featured={true} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          {filteredDevelopers.length === 0 ? (
            <div className="py-16 text-center material-luxury-card rounded-2xl bg-white p-8 border border-[#EAE8E3]">
              <Users className="w-10 h-10 text-[#858585] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#111111] mb-1">
                {selectedTech ? `No ${selectedTech} builders listed yet` : 'No matching developers found'}
              </h3>
              <p className="text-xs text-[#555555] max-w-sm mx-auto mb-4">
                {selectedTech
                  ? `No verified developer profiles currently highlight ${selectedTech} in their primary skills.`
                  : 'No builders matched your search keywords or technology filters.'}
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-[#111111] text-white hover:bg-[#222222] text-xs transition-colors font-medium"
              >
                Clear Filters
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
      )}
    </div>
  );
}

export default function ExploreClient(props: ExploreClientProps) {
  return (
    <Suspense
      fallback={
        <div className="pt-32 pb-20 text-center text-xs text-[#858585]">
          Loading discovery engine...
        </div>
      }
    >
      <ExploreInner {...props} />
    </Suspense>
  );
}
