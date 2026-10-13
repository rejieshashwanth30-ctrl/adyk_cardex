import { MetadataRoute } from 'next';
import { getApprovedProjects, getDevelopers } from '@/lib/data/store';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cardex.adyk.io';
  const stableDate = new Date('2026-03-15T00:00:00.000Z');

  const projects = await getApprovedProjects();
  const developers = await getDevelopers();

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt || '2026-03-15T00:00:00.000Z'),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const developerUrls = developers.map((dev) => ({
    url: `${baseUrl}/developers/${dev.username}`,
    lastModified: stableDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: stableDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: stableDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: stableDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/developers`,
      lastModified: stableDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/collaboration`,
      lastModified: stableDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: stableDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/submit`,
      lastModified: stableDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  return [...staticUrls, ...projectUrls, ...developerUrls];
}
