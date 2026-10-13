'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProjectCard from '@/components/projects/ProjectCard';
import DeveloperCard from '@/components/developers/DeveloperCard';
import { Project, Developer } from '@/lib/types';
import {
  Search,
  SlidersHorizontal,
  FolderKanban,
  Users,
  Handshake,
  X,
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

  // Derive unique tech tags across all data
  const availableTechs = useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach((p) => p.technologies.forEach((t) => set.add(t)));
    initialDevelopers.forEach((d) => d.skills.forEach((s) => set.add(s)));
    return Array.from(set).sort();
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
        p.technologies.some((t) => t.toLowerCase() === selectedTech.toLowerCase())
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
        d.skills.some((s) => s.toLowerCase() === selectedTech.toLowerCase())
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
    <div className="pt-28 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Editorial Header */}
      <div className="mb-12 border-b border-[#EAE8E3] pb-10">
        <span className="text-xs uppercase tracking-wider text-[#858585] font-semibold block mb-3">
          Discovery Engine &bull; ADYK CARDEX
        </span>
        <h1 className="text-4xl sm:text-6xl font-black tracking-[-0.04em] text-[#111111] uppercase leading-[0.98]">
          EXPLORE ADYK CARDEX.
        </h1>
        <p className="text-[#555555] text-sm sm:text-base mt-4 max-w-2xl font-normal leading-relaxed">
          Search verified projects, inspect technical architectures, and discover talented builders ready to collaborate.
        </p>
      </div>

      {/* Luxury Tabs */}
      <div className="flex items-center gap-2 border-b border-[#EAE8E3] pb-5 mb-10 overflow-x-auto">
        <button
          onClick={() => setActiveTab('PROJECTS')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all whitespace-nowrap font-medium ${
            activeTab === 'PROJECTS'
              ? 'bg-[#111111] text-white font-bold shadow-md'
              : 'text-[#555555] hover:text-[#111111] bg-white border border-[#EAE8E3] hover:border-[#D6D2C8]'
          }`}
        >
          <FolderKanban className="w-3.5 h-3.5 text-[#B99752]" />
          <span>Projects ({initialProjects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('DEVELOPERS')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all whitespace-nowrap font-medium ${
            activeTab === 'DEVELOPERS'
              ? 'bg-[#111111] text-white font-bold shadow-md'
              : 'text-[#555555] hover:text-[#111111] bg-white border border-[#EAE8E3] hover:border-[#D6D2C8]'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-[#B99752]" />
          <span>Developers ({initialDevelopers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('COLLABORATION')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all whitespace-nowrap font-medium ${
            activeTab === 'COLLABORATION'
              ? 'bg-[#111111] text-white font-bold shadow-md'
              : 'text-[#555555] hover:text-[#111111] bg-white border border-[#EAE8E3] hover:border-[#D6D2C8]'
          }`}
        >
          <Handshake className="w-3.5 h-3.5 text-[#B99752]" />
          <span>Collaboration ({initialProjects.filter((p) => p.collaborationOpen).length})</span>
        </button>
      </div>

      {/* Luxury Search & Filter Toolbar */}
      <div className="space-y-4 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Main Search Input */}
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-[#858585] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, developers, technologies..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] text-sm text-[#111111] placeholder-[#858585] focus:outline-none focus:border-[#B99752] transition-colors"
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
              className="w-full py-3.5 px-4 rounded-xl bg-white border border-[#EAE8E3] text-xs text-[#111111] focus:outline-none focus:border-[#B99752] shadow-sm font-medium"
            >
              <option value="featured">Sort: Featured First</option>
              <option value="newest">Sort: Newest Submissions</option>
              <option value="updated">Sort: Recently Updated</option>
            </select>
          </div>
        </div>

        {/* Filter Pill Toolbar */}
        <div className="p-4 rounded-2xl material-luxury-card bg-white flex flex-wrap items-center gap-3 text-xs">
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
            <div className="py-20 text-center material-luxury-card rounded-2xl bg-white p-8">
              <FolderKanban className="w-10 h-10 text-[#858585] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#111111] mb-1">No matching projects found</h3>
              <p className="text-xs text-[#555555] max-w-sm mx-auto mb-4">
                No verified projects matched the active search and filter constraints.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-lg bg-[#111111] text-white hover:bg-[#222222] text-xs transition-colors font-medium"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} featured={true} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          {filteredDevelopers.length === 0 ? (
            <div className="py-20 text-center material-luxury-card rounded-2xl bg-white p-8">
              <Users className="w-10 h-10 text-[#858585] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#111111] mb-1">No matching developers found</h3>
              <p className="text-xs text-[#555555] max-w-sm mx-auto mb-4">
                No builders matched your search keywords or technology filters.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-lg bg-[#111111] text-white hover:bg-[#222222] text-xs transition-colors font-medium"
              >
                Clear Filters
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
