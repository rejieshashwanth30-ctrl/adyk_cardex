'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Project, CollaborationRole } from '@/lib/types';
import StatusBadge from '@/components/projects/StatusBadge';
import CollaborateModal from '@/components/projects/CollaborateModal';
import { Handshake, ArrowUpRight, Filter } from 'lucide-react';

interface CollaborationPageClientProps {
  projects: Project[];
}

const ROLES: CollaborationRole[] = [
  'Frontend Developer',
  'Backend Developer',
  'Mobile Developer',
  'AI/ML Developer',
  'UI/UX Designer',
  'Hardware / IoT Developer',
  'Tester',
];

export default function CollaborationPageClient({ projects }: CollaborationPageClientProps) {
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (selectedRole === 'ALL') return projects;
    return projects.filter((p) => p.lookingFor.includes(selectedRole as CollaborationRole));
  }, [projects, selectedRole]);

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="mb-14 border-b border-[#EAE8E3] pb-10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#858585] uppercase mb-3">
          <Handshake className="w-3.5 h-3.5 text-[#B99752]" />
          <span>Collaboration</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#111111] uppercase leading-[0.95]">
          BUILDING<br />
          <span className="text-[#858585]">IS BETTER TOGETHER.</span>
        </h1>
        <p className="text-[#555555] text-sm sm:text-base mt-4 max-w-xl font-normal leading-relaxed">
          Find people who have the skills your project needs. Connect directly with creators and build something great.
        </p>
      </div>

      {/* Role Filter Pills */}
      <div className="p-4 rounded-xl material-luxury-card bg-white border border-[#EAE8E3] mb-12 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 text-xs text-[#858585] mr-2 font-semibold">
          <Filter className="w-3.5 h-3.5 text-[#B99752]" />
          <span>Needed Role:</span>
        </div>

        <button
          onClick={() => setSelectedRole('ALL')}
          className={`px-3 py-1.5 rounded-lg text-xs transition-colors font-medium ${
            selectedRole === 'ALL'
              ? 'bg-[#111111] text-white font-bold shadow-sm'
              : 'text-[#555555] hover:text-[#111111] bg-[#FAF9F6] border border-[#EAE8E3]'
          }`}
        >
          All Roles ({projects.length})
        </button>

        {ROLES.map((role) => {
          const count = projects.filter((p) => p.lookingFor.includes(role)).length;
          return (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-colors font-medium ${
                selectedRole === role
                  ? 'bg-[#111111] text-white font-bold shadow-sm'
                  : 'text-[#555555] hover:text-[#111111] bg-[#FAF9F6] border border-[#EAE8E3]'
              }`}
            >
              {role} {count > 0 && `(${count})`}
            </button>
          );
        })}
      </div>

      {/* Project Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center material-luxury-card bg-white rounded-3xl border border-[#EAE8E3] p-8">
          <Handshake className="w-10 h-10 text-[#858585] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#111111] mb-1 tracking-tight">No active projects seeking this role</h3>
          <p className="text-xs text-[#555555] max-w-sm mx-auto mb-4">
            Check back soon or select another role filter.
          </p>
          <button
            onClick={() => setSelectedRole('ALL')}
            className="px-4 py-2 rounded-lg bg-[#111111] hover:bg-[#222222] text-xs text-white transition-colors font-medium"
          >
            Show All Roles
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-3xl material-luxury-card bg-white hover:bg-[#FAF9F6] border border-[#EAE8E3] hover:border-[#D6D2C8] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B99752]/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-medium text-[#858585]">
                    {project.category}
                  </span>
                  <StatusBadge status={project.status} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-[#111111] group-hover:text-black transition-colors mb-2 tracking-tight">
                  <Link href={`/projects/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>

                {/* Creator */}
                <p className="text-xs text-[#858585] mb-4">
                  Created by{' '}
                  <Link
                    href={`/developers/${project.creatorUsername}`}
                    className="text-[#111111] font-semibold hover:text-[#B99752] underline underline-offset-4"
                  >
                    {project.creatorName}
                  </Link>
                </p>

                {/* Short Description */}
                <p className="text-sm text-[#555555] leading-relaxed mb-6 line-clamp-3 font-normal">
                  {project.description}
                </p>

                {/* Required Skills Box */}
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] mb-6">
                  <span className="text-xs font-semibold text-[#858585] block mb-2.5">
                    Actively Seeking Contributors:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.lookingFor.map((role) => (
                      <span
                        key={role}
                        className="px-2.5 py-1 rounded-md text-xs bg-white text-[#111111] border border-[#EAE8E3] shadow-sm font-medium"
                      >
                        &bull; {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 border-t border-[#EAE8E3] flex items-center justify-between gap-4">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs text-[#555555] hover:text-[#111111] transition-colors font-medium"
                >
                  <span>View Project</span>
                  <ArrowUpRight className="w-4 h-4 text-[#858585]" />
                </Link>

                <button
                  type="button"
                  onClick={() => setActiveProjectModal(project)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111111] text-white hover:bg-[#222222] text-xs font-medium transition-all shadow-md group/btn"
                >
                  <span>Collaborate &rarr;</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeProjectModal && (
        <CollaborateModal
          project={activeProjectModal}
          isOpen={Boolean(activeProjectModal)}
          onClose={() => setActiveProjectModal(null)}
        />
      )}
    </div>
  );
}
