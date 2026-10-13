import React from 'react';
import { getDevelopers } from '@/lib/data/store';
import DevelopersListClient from './DevelopersListClient';

export const metadata = {
  title: 'The People Who Build — ADYK CARDEX',
  description:
    'Discover developers, systems engineers, and creative technologists through what they build on ADYK CARDEX.',
};

export const instant = false;

export default async function DevelopersPage() {
  const developers = await getDevelopers();

  return <DevelopersListClient initialDevelopers={developers} />;
}
