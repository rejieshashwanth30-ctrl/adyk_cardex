import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAdminSession } from '@/lib/auth/adminAuth';
import { getProjectsByStatus } from '@/lib/data/store';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import AdminProjectRow from '@/components/admin/AdminProjectRow';

export const instant = false;

export const metadata = {
  title: 'Approved Projects — ADYK CARDEX Admin',
};

export default async function AdminApprovedProjectsPage() {
  const admin = await getAdminSession();
  if (!admin) {
    redirect('/admin/login');
  }

  const approvedProjects = await getProjectsByStatus('APPROVED');

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
              APPROVED PROJECTS ({approvedProjects.length})
            </h1>
          </div>
          <p className="text-xs font-mono text-[#737373] mt-1.5">
            Active public showcase on ADYK CARDEX. Visible to all platform visitors.
          </p>
        </div>
      </div>

      {/* List */}
      {approvedProjects.length === 0 ? (
        <div className="p-16 rounded-3xl bg-[#121212] border border-[#262626] text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#1C1C1C] text-[#EDEDED] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6 text-[#A3A3A3]" />
          </div>
          <h2 className="text-base font-mono font-bold text-[#FFFFFF] uppercase">
            NO APPROVED PROJECTS YET
          </h2>
          <p className="text-xs font-mono text-[#737373] max-w-md mx-auto">
            Approved projects will appear here and become publicly visible across the platform.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {approvedProjects.map((project) => (
            <AdminProjectRow key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
