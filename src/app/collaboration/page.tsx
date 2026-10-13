import React from 'react';
import { getApprovedProjects } from '@/lib/data/store';
import CollaborationPageClient from './CollaborationPageClient';

export const metadata = {
  title: 'Collaboration Hub — ADYK CARDEX',
  description:
    'Find people who have the skills your project needs. Direct developer collaboration without gatekeepers on ADYK CARDEX.',
};

import { connection } from 'next/server';

export const instant = false;

export default async function CollaborationPage() {
  await connection();
  const allProjects = await getApprovedProjects();
  const collabProjects = allProjects.filter((p) => p.collaborationOpen);

  return <CollaborationPageClient projects={collabProjects} />;
}
