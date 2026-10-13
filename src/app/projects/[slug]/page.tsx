import React from 'react';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getDeveloperByUsername } from '@/lib/data/store';
import ProjectDetailClient from './ProjectDetailClient';
import type { Metadata } from 'next';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

import { connection } from 'next/server';

export const instant = false;

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found — ADYK CARDEX',
    };
  }

  return {
    title: `${project.title} — ADYK CARDEX`,
    description: project.description,
    openGraph: {
      title: `${project.title} — ADYK CARDEX`,
      description: project.description,
      images: [project.imageUrl],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  await connection();
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const creator = await getDeveloperByUsername(project.creatorUsername);

  return <ProjectDetailClient project={project} creator={creator} />;
}
