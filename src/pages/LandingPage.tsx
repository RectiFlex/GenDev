import React from 'react';
import { useRedirect } from '../hooks/useRedirect';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';

export default function LandingPage() {
  useRedirect();

  return (
    <div className="min-h-screen bg-[#0D0D1E]">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Pricing />
        <FAQ />
      </main>
      <footer className="py-8 text-center text-gray-400">
        <p>© {new Date().getFullYear()} Aikode. All rights reserved.</p>
      </footer>
    </div>
  );
}