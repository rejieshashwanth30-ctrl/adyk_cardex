'use client';

import React, { useState, useMemo } from 'react';
import { Project, SubmissionStatus } from '@/lib/types';
import AdminProjectRow from './AdminProjectRow';
import { Search } from 'lucide-react';

interface AdminProjectsListProps {
  initialProjects: Project[];
}

export default function AdminProjectsList({ initialProjects }: AdminProjectsListProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [filterStatus, setFilterStatus] = useState<'ALL' | SubmissionStatus>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const handleStatusChange = (updated: Project) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  const handleDelete = (deletedId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== deletedId));
  };

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesStatus =
        filterStatus === 'ALL' ? true : p.submissionStatus === filterStatus;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.creatorName.toLowerCase().includes(q) ||
        p.creatorEmail.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));

      return matchesStatus && matchesSearch;
    });
  }, [projects, filterStatus, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#141414] border border-[#262626]">
          {(['ALL', 'PENDING', 'APPROVED', 'DECLINED'] as const).map((tab) => {
            const count =
              tab === 'ALL'
                ? projects.length
                : projects.filter((p) => p.submissionStatus === tab).length;

            return (
              <button
                key={tab}
                onClick={() => setFilterStatus(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-colors ${
                  filterStatus === tab
                    ? 'bg-[#FFFFFF] text-[#000000] font-bold shadow-sm'
                    : 'text-[#A3A3A3] hover:text-[#FFFFFF]'
                }`}
              >
                <span>{tab}</span>
                <span className="ml-1.5 text-[10px] opacity-70 font-normal">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-[#737373] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, creator, tech..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#141414] border border-[#262626] text-xs font-mono text-[#FFFFFF] placeholder-[#525252] focus:border-[#FFFFFF] outline-none"
          />
        </div>
      </div>

      {/* Rows */}
      {filtered.length === 0 ? (
        <div className="p-14 rounded-2xl bg-[#121212] border border-[#262626] text-center text-xs font-mono text-[#737373]">
          No projects match the selected criteria.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((proj) => (
            <AdminProjectRow
              key={proj.id}
              project={proj}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
