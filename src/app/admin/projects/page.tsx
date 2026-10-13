import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAdminSession } from '@/lib/auth/adminAuth';
import { getAllProjectsAdmin } from '@/lib/data/store';
import { ArrowLeft } from 'lucide-react';
import AdminProjectsList from '@/components/admin/AdminProjectsList';

export const metadata = {
  title: 'All Projects — ADYK CARDEX Admin',
};

export default async function AdminAllProjectsPage() {
  const admin = await getAdminSession();
  if (!admin) {
    redirect('/admin/login');
  }

  const projects = await getAllProjectsAdmin();

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
          <h1 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-[#FFFFFF] uppercase">
            PROJECT REPOSITORY ({projects.length})
          </h1>
          <p className="text-xs font-mono text-[#737373] mt-1.5">
            Complete database inventory of all submitted, approved, and archived projects.
          </p>
        </div>
      </div>

      {/* Filterable Client Component */}
      <AdminProjectsList initialProjects={projects} />
    </div>
  );
}
