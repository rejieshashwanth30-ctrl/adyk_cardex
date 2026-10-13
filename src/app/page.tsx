import React from 'react';
import OpeningAnimation from '@/components/home/OpeningAnimation';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import DiscoverDevelopers from '@/components/home/DiscoverDevelopers';
import TechnologyGrid from '@/components/home/TechnologyGrid';
import CollaborationSection from '@/components/home/CollaborationSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import SubmitCtaSection from '@/components/home/SubmitCtaSection';
import HomeAboutSection from '@/components/home/HomeAboutSection';
import { getApprovedProjects, getDevelopers } from '@/lib/data/store';

export const metadata = {
  title: 'ADYK CARDEX — Build. Showcase. Connect.',
  description:
    'Discover developers, explore projects and connect with builders through ADYK CARDEX. Your work deserves to be discovered.',
};

export default async function HomePage() {
  const projects = await getApprovedProjects();
  const developers = await getDevelopers();

  return (
    <div className="relative min-h-screen">
      {/* 1. Cinematic Luxury Opening Animation */}
      <OpeningAnimation />

      {/* 2. Editorial White Luxury Hero */}
      <HeroSection />

      {/* 3. Featured Projects in Luxury White Bento Grid */}
      <FeaturedProjects projects={projects} />

      {/* 4. Discover Developers */}
      <DiscoverDevelopers developers={developers} />

      {/* 5. Explore by Technology */}
      <TechnologyGrid />

      {/* 6. Collaboration Hub */}
      <CollaborationSection projects={projects} />

      {/* 7. How It Works Sequence */}
      <HowItWorksSection />

      {/* 8. Submit Your Project CTA */}
      <SubmitCtaSection />

      {/* 9. About ADYK CARDEX */}
      <HomeAboutSection />
    </div>
  );
}
