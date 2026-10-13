import React from 'react';
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { getAdminSession } from '@/lib/auth/adminAuth';
import AdminNav from '@/components/admin/AdminNav';

export const metadata: Metadata = {
  title: 'ADYK CARDEX — Admin Control Console',
  description: 'Authorized ADYK CARDEX administrative operations.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  const admin = await getAdminSession();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] selection:bg-[#FFFFFF] selection:text-[#000000] font-sans">
      {/* If admin is logged in, show the monochromatic admin navigation bar */}
      {admin && <AdminNav admin={admin} />}

      {/* Admin Content Area */}
      <main className="relative z-10">{children}</main>
    </div>
  );
}
