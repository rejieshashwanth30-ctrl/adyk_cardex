'use client';

import React, { useState } from 'react';
import { Project, CollaborationRole } from '@/lib/types';
import { X, MessageSquare, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

interface CollaborateModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export default function CollaborateModal({ project, isOpen, onClose }: CollaborateModalProps) {
  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [selectedRole, setSelectedRole] = useState(project.lookingFor[0] || 'Frontend Developer');
  const [proposal, setProposal] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  // Exact WhatsApp prefilled message URL
  const whatsAppText = encodeURIComponent(
    `Hi ${project.creatorName}, I discovered your project '${project.title}' on ADYK CARDEX and I'm interested in collaborating.`
  );
  // Clean phone number (strip spaces/dashes)
  const cleanPhone = project.creatorWhatsApp?.replace(/[^0-9]/g, '') || '';
  const whatsAppLink = `https://wa.me/${cleanPhone}?text=${whatsAppText}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="collab-title"
    >
      <div className="relative w-full max-w-lg rounded-3xl material-luxury-card bg-white shadow-[0_25px_70px_-20px_rgba(0,0,0,0.18)] p-6 sm:p-9 text-[#111111] border border-[#EAE8E3]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-[#858585] hover:text-[#111111] bg-[#F8F7F4] hover:bg-[#EAE8E3] transition-colors"
          aria-label="Close Collaboration Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-[#F8F7F4] border border-[#B99752]/40 flex items-center justify-center mb-5 text-[#B99752]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-mono tracking-wider mb-2 uppercase text-[#111111]">PROPOSAL TRANSMITTED</h3>
            <p className="text-sm text-[#555555] max-w-sm mb-6 leading-relaxed">
              Your message has been relayed to <span className="text-[#111111] font-semibold">{project.creatorName}</span>. They will review your note and connect directly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-[#111111] text-white font-semibold text-xs font-mono uppercase tracking-wider transition-colors hover:bg-[#222222]"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <span className="font-mono text-[10px] tracking-[0.25em] text-[#858585] uppercase font-bold block mb-1">
                DIRECT INTAKE &bull; ADYK CARDEX
              </span>
              <h2 id="collab-title" className="text-2xl font-bold tracking-tight text-[#111111]">
                Collaborate on {project.title}
              </h2>
              <p className="text-xs text-[#555555] mt-1">
                Initiate collaboration with project creator <span className="text-[#111111] font-semibold">{project.creatorName}</span>.
              </p>
            </div>

            {/* Seeking Roles */}
            {project.lookingFor && project.lookingFor.length > 0 && (
              <div className="mb-6 p-4 rounded-2xl bg-[#F8F7F4] border border-[#EAE8E3]">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#858585] font-semibold block mb-2">
                  Project actively seeking:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.lookingFor.map((role) => (
                    <span
                      key={role}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-white text-[#111111] border border-[#EAE8E3] uppercase tracking-wider font-medium shadow-sm"
                    >
                      &bull; {role}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* WhatsApp Direct Option if opted in */}
            {project.allowWhatsAppContact && project.creatorWhatsApp && (
              <div className="mb-6">
                <a
                  href={whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl bg-white hover:bg-[#F8F7F4] border border-[#EAE8E3] hover:border-[#B99752] text-[#111111] font-mono text-xs uppercase tracking-wider transition-all group shadow-sm font-semibold"
                >
                  <MessageSquare className="w-4 h-4 text-[#B99752] group-hover:scale-105 transition-transform" />
                  <span>COLLABORATE ON WHATSAPP &rarr;</span>
                </a>
                <p className="text-[10px] text-[#858585] text-center mt-1.5 font-mono">
                  Direct encrypted chat via pre-filled introduction
                </p>
              </div>
            )}

            <div className="relative flex py-2 items-center mb-4">
              <div className="flex-grow border-t border-[#EAE8E3]" />
              <span className="flex-shrink mx-3 text-[10px] font-mono uppercase tracking-[0.2em] text-[#858585] font-medium">
                Or Send In-Portal Note
              </span>
              <div className="flex-grow border-t border-[#EAE8E3]" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#111111] mb-1.5 font-semibold">
                  Your Name / Identity *
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Maya Sharma"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] text-sm text-[#111111] placeholder-[#858585] focus:outline-none focus:border-[#B99752] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#111111] mb-1.5 font-semibold">
                  Your Contact (Email, GitHub or Profile Link) *
                </label>
                <input
                  type="text"
                  required
                  value={senderContact}
                  onChange={(e) => setSenderContact(e.target.value)}
                  placeholder="e.g. github.com/mayasharma"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] text-sm text-[#111111] placeholder-[#858585] focus:outline-none focus:border-[#B99752] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#111111] mb-1.5 font-semibold">
                  Role You Wish to Contribute
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as CollaborationRole | 'Other')}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] text-sm text-[#111111] focus:outline-none focus:border-[#B99752] transition-colors font-mono"
                >
                  {project.lookingFor.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                  <option value="Other">Other Contributor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#111111] mb-1.5 font-semibold">
                  Brief Pitch / Background
                </label>
                <textarea
                  rows={3}
                  required
                  value={proposal}
                  onChange={(e) => setProposal(e.target.value)}
                  placeholder="What caught your attention? What skills do you bring?"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] text-sm text-[#111111] placeholder-[#858585] focus:outline-none focus:border-[#B99752] transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#111111] hover:bg-[#222222] text-white font-semibold text-xs font-mono uppercase tracking-[0.15em] flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-[#B99752]" />
                  <span>TRANSMIT COLLABORATION PROPOSAL</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-[#858585] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B99752]" />
                <span>Protected by ADYK CARDEX Creator Privacy Guard</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
