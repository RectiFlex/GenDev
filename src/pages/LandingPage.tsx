import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../auth/store/authStore';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import AuthModal from '../auth/components/AuthModal';

export default function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-[#0D0D1E]">
      <Header onAuthClick={() => setShowAuthModal(true)} />
      <main>
        <Hero onGetStarted={() => setShowAuthModal(true)} />
        <HowItWorks />
        <Features />
        <Pricing />
        <FAQ />
      </main>
      <footer className="py-8 text-center text-gray-400">
        <p>© {new Date().getFullYear()} GenDev. All rights reserved.</p>
      </footer>
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
}