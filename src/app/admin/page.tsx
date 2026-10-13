import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAdminSession } from '@/lib/auth/adminAuth';
import { getAdminStats, getAllProjectsAdmin } from '@/lib/data/store';
import {
  Clock,
  CheckCircle2,
  XCircle,
  FolderKanban,
  Users,
  ArrowRight,
} from 'lucide-react';
import AdminProjectRow from '@/components/admin/AdminProjectRow';

export const instant = false;

export const metadata = {
  title: 'Dashboard — ADYK CARDEX Admin',
};

export default async function AdminDashboardPage() {
  const admin = await getAdminSession();
  if (!admin) {
    redirect('/admin/login');
  }

  const stats = await getAdminStats();
  const allProjects = await getAllProjectsAdmin();
  const recentSubmissions = allProjects.slice(0, 8);
  const pendingProjects = allProjects.filter((p) => p.submissionStatus === 'PENDING');

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Top Banner & Greetings */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#262626] pb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#737373] mb-2">
            <span>OPERATIONAL METRICS</span>
            <span>&bull;</span>
            <span className="text-[#A3A3A3]">LIVE POSTGRESQL INSTANCE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-[#FFFFFF] uppercase">
            CONTROL OVERVIEW
          </h1>
          <p className="text-xs font-mono text-[#A3A3A3] mt-2">
            Logged in as <span className="text-[#FFFFFF] font-semibold">{admin.name}</span> ({admin.email})
          </p>
        </div>

        {pendingProjects.length > 0 && (
          <Link
            href="/admin/projects/pending"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-[#FFFFFF] hover:bg-[#E5E5E5] text-[#000000] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md flex-shrink-0"
          >
            <span className="w-2 h-2 rounded-full bg-[#000000] animate-ping" />
            <span>REVIEW PENDING ({pendingProjects.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      {/* Real Database Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* 1. Pending Projects */}
        <Link
          href="/admin/projects/pending"
          className="p-5 rounded-2xl bg-[#121212] border border-[#262626] hover:border-[#525252] transition-colors group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[#737373] group-hover:text-[#FFFFFF] mb-4">
            <span className="text-[11px] font-mono uppercase tracking-wider">Pending Review</span>
            <Clock className="w-4 h-4 text-[#EDEDED]" />
          </div>
          <div>
            <div className="text-3xl font-mono font-black text-[#FFFFFF]">
              {stats.pendingCount}
            </div>
            <div className="text-[10px] font-mono text-[#737373] mt-1">Requires moderation</div>
          </div>
        </Link>

        {/* 2. Approved Projects */}
        <Link
          href="/admin/projects/approved"
          className="p-5 rounded-2xl bg-[#121212] border border-[#262626] hover:border-[#525252] transition-colors group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[#737373] group-hover:text-[#FFFFFF] mb-4">
            <span className="text-[11px] font-mono uppercase tracking-wider">Approved</span>
            <CheckCircle2 className="w-4 h-4 text-[#EDEDED]" />
          </div>
          <div>
            <div className="text-3xl font-mono font-black text-[#FFFFFF]">
              {stats.approvedCount}
            </div>
            <div className="text-[10px] font-mono text-[#737373] mt-1">Publicly displayed</div>
          </div>
        </Link>

        {/* 3. Declined Projects */}
        <Link
          href="/admin/projects/declined"
          className="p-5 rounded-2xl bg-[#121212] border border-[#262626] hover:border-[#525252] transition-colors group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[#737373] group-hover:text-[#FFFFFF] mb-4">
            <span className="text-[11px] font-mono uppercase tracking-wider">Declined</span>
            <XCircle className="w-4 h-4 text-[#737373]" />
          </div>
          <div>
            <div className="text-3xl font-mono font-black text-[#737373]">
              {stats.declinedCount}
            </div>
            <div className="text-[10px] font-mono text-[#525252] mt-1">Private archived</div>
          </div>
        </Link>

        {/* 4. Total Projects */}
        <Link
          href="/admin/projects"
          className="p-5 rounded-2xl bg-[#121212] border border-[#262626] hover:border-[#525252] transition-colors group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[#737373] group-hover:text-[#FFFFFF] mb-4">
            <span className="text-[11px] font-mono uppercase tracking-wider">Total Submissions</span>
            <FolderKanban className="w-4 h-4 text-[#A3A3A3]" />
          </div>
          <div>
            <div className="text-3xl font-mono font-black text-[#EDEDED]">
              {stats.totalProjects}
            </div>
            <div className="text-[10px] font-mono text-[#737373] mt-1">All time received</div>
          </div>
        </Link>

        {/* 5. Total Developers */}
        <Link
          href="/admin/developers"
          className="p-5 rounded-2xl bg-[#121212] border border-[#262626] hover:border-[#525252] transition-colors group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[#737373] group-hover:text-[#FFFFFF] mb-4">
            <span className="text-[11px] font-mono uppercase tracking-wider">Developers</span>
            <Users className="w-4 h-4 text-[#A3A3A3]" />
          </div>
          <div>
            <div className="text-3xl font-mono font-black text-[#EDEDED]">
              {stats.totalDevelopers}
            </div>
            <div className="text-[10px] font-mono text-[#737373] mt-1">Directory builders</div>
          </div>
        </Link>
      </div>

      {/* Recent Submissions Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h2 className="text-base font-mono font-bold tracking-wider text-[#FFFFFF] uppercase">
              RECENT SUBMISSIONS ({recentSubmissions.length})
            </h2>
          </div>
          <Link
            href="/admin/projects"
            className="text-xs font-mono text-[#A3A3A3] hover:text-[#FFFFFF] transition-colors"
          >
            VIEW ALL &rarr;
          </Link>
        </div>

        {recentSubmissions.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#121212] border border-[#262626] text-center text-xs font-mono text-[#737373]">
            No projects found in database. All clean.
          </div>
        ) : (
          <div className="space-y-3">
            {recentSubmissions.map((proj) => (
              <AdminProjectRow key={proj.id} project={proj} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
