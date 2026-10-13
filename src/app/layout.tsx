import { Suspense } from 'react';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AtmosphericBackground from '@/components/layout/AtmosphericBackground';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ADYK CARDEX — Build. Showcase. Connect.',
  description:
    'Discover developers, explore projects and connect with builders through ADYK CARDEX. Your work deserves to be discovered.',
  keywords: [
    'ADYK CARDEX',
    'Developer Discovery',
    'Project Showcase',
    'Tech Collaboration',
    'Luxury Portfolio',
    'Open Source',
  ],
  authors: [{ name: 'ADYK CARDEX' }],
  openGraph: {
    title: 'ADYK CARDEX — Build. Showcase. Connect.',
    description:
      'Discover developers, explore projects and connect with builders through ADYK CARDEX.',
    siteName: 'ADYK CARDEX',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ADYK CARDEX — Build. Showcase. Connect.',
    description:
      'Discover developers, explore projects and connect with builders through ADYK CARDEX.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FFFFFF] text-[#111111]`}
    >
      <body className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#111111] selection:bg-[#111111] selection:text-[#FFFFFF]">
        {/* Dynamic Pearl White & Subtle Gold Atmospheric Light System */}
        <Suspense fallback={null}>
          <AtmosphericBackground />
        </Suspense>

        {/* Global Luxury Navigation Bar */}
        <Suspense fallback={<div className="h-20" />}>
          <Navbar />
        </Suspense>

        {/* Main Application Container */}
        <main className="flex-grow relative z-10">{children}</main>

        {/* Global Editorial Footer */}
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
