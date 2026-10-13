import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAdminSession } from '@/lib/auth/adminAuth';
import { getProjectsByStatus } from '@/lib/data/store';
import { Clock, ArrowLeft } from 'lucide-react';
import AdminProjectRow from '@/components/admin/AdminProjectRow';

export const instant = false;

export const metadata = {
  title: 'Pending Submissions — ADYK CARDEX Admin',
};

export default async function AdminPendingProjectsPage() {
  const admin = await getAdminSession();
  if (!admin) {
    redirect('/admin/login');
  }

  const pendingProjects = await getProjectsByStatus('PENDING');

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
              PENDING SUBMISSIONS ({pendingProjects.length})
            </h1>
            {pendingProjects.length > 0 && (
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFFFFF] animate-pulse" />
            )}
          </div>
          <p className="text-xs font-mono text-[#737373] mt-1.5">
            Incoming project submissions hidden from the public feed. Review and approve to publish.
          </p>
        </div>
      </div>

      {/* Queue List */}
      {pendingProjects.length === 0 ? (
        <div className="p-16 rounded-3xl bg-[#121212] border border-[#262626] text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#1C1C1C] text-[#EDEDED] flex items-center justify-center mx-auto">
            <Clock className="w-6 h-6 text-[#A3A3A3]" />
          </div>
          <h2 className="text-base font-mono font-bold text-[#FFFFFF] uppercase">
            QUEUE CLEAR
          </h2>
          <p className="text-xs font-mono text-[#737373] max-w-md mx-auto">
            All submitted projects have been processed. New incoming submissions will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingProjects.map((project) => (
            <AdminProjectRow key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
