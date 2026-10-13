import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAdminSession } from '@/lib/auth/adminAuth';
import { getProjectsByStatus } from '@/lib/data/store';
import { XCircle, ArrowLeft } from 'lucide-react';
import AdminProjectRow from '@/components/admin/AdminProjectRow';

export const instant = false;

export const metadata = {
  title: 'Declined Projects — ADYK CARDEX Admin',
};

export default async function AdminDeclinedProjectsPage() {
  const admin = await getAdminSession();
  if (!admin) {
    redirect('/admin/login');
  }

  const declinedProjects = await getProjectsByStatus('DECLINED');

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#262626] pb-6">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#737373] hover:text-[#FFFFFF] transition-colors mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO DASHBOARD</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-[#FFFFFF] uppercase">
              DECLINED PROJECTS ({declinedProjects.length})
            </h1>
          </div>
          <p className="text-xs font-mono text-[#737373] mt-1.5">
            Privately archived submissions that did not meet curation standards. Never exposed to the public API.
          </p>
        </div>
      </div>

      {/* List */}
      {declinedProjects.length === 0 ? (
        <div className="p-16 rounded-3xl bg-[#121212] border border-[#262626] text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#1C1C1C] text-[#EDEDED] flex items-center justify-center mx-auto">
            <XCircle className="w-6 h-6 text-[#737373]" />
          </div>
          <h2 className="text-base font-mono font-bold text-[#FFFFFF] uppercase">
            NO DECLINED SUBMISSIONS
          </h2>
          <p className="text-xs font-mono text-[#737373] max-w-md mx-auto">
            Declined projects are preserved privately here for auditing without affecting public feeds.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {declinedProjects.map((project) => (
            <AdminProjectRow key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
