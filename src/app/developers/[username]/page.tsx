import React from 'react';
import { connection } from 'next/server';
import { notFound } from 'next/navigation';
import { getDeveloperByUsername, getProjectsByCreator } from '@/lib/data/store';
import DeveloperProfileClient from './DeveloperProfileClient';
import type { Metadata } from 'next';

interface DeveloperPageProps {
  params: Promise<{ username: string }>;
}

export const instant = false;

export async function generateMetadata({ params }: DeveloperPageProps): Promise<Metadata> {
  const { username } = await params;
  const developer = await getDeveloperByUsername(username);

  if (!developer) {
    return {
      title: 'Developer Not Found — ADYK CARDEX',
    };
  }

  return {
    title: `${developer.name} (@${developer.username}) — ADYK CARDEX`,
    description: developer.bio,
  };
}

export default async function DeveloperProfilePage({ params }: DeveloperPageProps) {
  await connection();
  const { username } = await params;
  const developer = await getDeveloperByUsername(username);

  if (!developer) {
    notFound();
  }

  const projects = await getProjectsByCreator(developer.username);

  return <DeveloperProfileClient developer={developer} projects={projects} />;
}
