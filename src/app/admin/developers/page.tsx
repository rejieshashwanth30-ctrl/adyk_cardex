import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAdminSession } from '@/lib/auth/adminAuth';
import { getAllDevelopersAdmin } from '@/lib/data/store';
import { Users, ArrowLeft, ExternalLink, Globe, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';

export const metadata = {
  title: 'Developers Directory — ADYK CARDEX Admin',
};

export default async function AdminDevelopersPage() {
  const admin = await getAdminSession();
  if (!admin) {
    redirect('/admin/login');
  }

  const developers = await getAllDevelopersAdmin();

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
            DEVELOPERS DIRECTORY ({developers.length})
          </h1>
          <p className="text-xs font-mono text-[#737373] mt-1.5">
            Registered creators and builders indexed in the PostgreSQL database.
          </p>
        </div>
      </div>

      {/* Developers List */}
      {developers.length === 0 ? (
        <div className="p-16 rounded-3xl bg-[#121212] border border-[#262626] text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#1C1C1C] text-[#EDEDED] flex items-center justify-center mx-auto">
            <Users className="w-6 h-6 text-[#A3A3A3]" />
          </div>
          <h2 className="text-base font-mono font-bold text-[#FFFFFF] uppercase">
            NO DEVELOPERS REGISTERED
          </h2>
          <p className="text-xs font-mono text-[#737373] max-w-md mx-auto">
            Developers are indexed automatically as projects are submitted or imported.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {developers.map((dev) => (
            <div
              key={dev.id}
              className="p-6 rounded-2xl bg-[#121212] border border-[#262626] flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h2 className="text-base font-bold font-mono text-[#FFFFFF]">
                      {dev.name}
                    </h2>
                    <span className="text-xs font-mono text-[#737373]">
                      @{dev.username} &bull; {dev.role}
                    </span>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#1C1C1C] text-[#EDEDED] border border-[#333333]">
                    {dev.availability}
                  </span>
                </div>

                <p className="text-xs text-[#A3A3A3] font-sans line-clamp-2 mt-2 leading-relaxed">
                  {dev.bio}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {dev.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#171717] text-[#CCCCCC] border border-[#262626]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Links & Public Profile */}
              <div className="pt-3 border-t border-[#1F1F1F] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2 text-[#737373]">
                  {dev.githubUrl && (
                    <a
                      href={dev.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#FFFFFF] transition-colors"
                      title="GitHub"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {dev.linkedInUrl && (
                    <a
                      href={dev.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#FFFFFF] transition-colors"
                      title="LinkedIn"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {dev.portfolioUrl && (
                    <a
                      href={dev.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#FFFFFF] transition-colors"
                      title="Portfolio"
                    >
                      <Globe className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {dev.allowWhatsAppContact && dev.whatsApp && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#EDEDED]">
                      <MessageSquare className="w-3 h-3 text-[#A3A3A3]" />
                      <span>{dev.whatsApp}</span>
                    </span>
                  )}
                </div>

                <Link
                  href={`/developers/${dev.username}`}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-[11px] text-[#A3A3A3] hover:text-[#FFFFFF] transition-colors"
                >
                  <span>Public Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
