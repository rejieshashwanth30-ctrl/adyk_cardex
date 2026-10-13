import React from 'react';
import { getApprovedProjects, getDevelopers } from '@/lib/data/store';
import ExploreClient from './ExploreClient';

export const metadata = {
  title: 'Explore Projects & Developers — ADYK CARDEX',
  description:
    'Search projects, developers, and technologies across the open ecosystem. Discover talented builders and active collaborations on ADYK CARDEX.',
};

export const instant = false;

export default async function ExplorePage() {
  const projects = await getApprovedProjects();
  const developers = await getDevelopers();

  return <ExploreClient initialProjects={projects} initialDevelopers={developers} />;
}
