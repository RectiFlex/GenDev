import React, { useState, useEffect } from 'react';
import { Code2 } from 'lucide-react';
import { useClerk, useUser } from '@clerk/clerk-react';
import NavLink from './navigation/NavLink';
import NavButton from './navigation/NavButton';
import MobileMenu from './navigation/MobileMenu';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openSignIn, openSignUp, signOut } = useClerk();
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <header className={`fixed top-2 left-4 right-4 z-50 transition-all duration-300 ease-out
                     ${isScrolled ? 'translate-y-0' : 'translate-y-1'}`}>
      <div className={`mx-auto rounded-full border border-purple-500/10
                    bg-gradient-to-r from-purple-900/40 to-gray-900/40 backdrop-blur-md
                    shadow-lg shadow-purple-500/5
                    transition-all duration-300 ease-out
                    ${isScrolled ? 'py-2' : 'py-3'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 group">
              <img src="/gendev-logo.svg" alt="GenDev" className="w-8 h-8 transform group-hover:scale-110 transition-transform duration-300" />
              <span className="text-lg font-semibold text-white">GenDev</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <NavLink href="#home">Home</NavLink>
              <NavLink href="#how-it-works">How it Works</NavLink>
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#pricing">Pricing</NavLink>
              <NavLink href="#faq">FAQ</NavLink>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {!isSignedIn ? (
                <>
                  <button
                    onClick={() => openSignUp()}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    Sign Up
                  </button>
                  <NavButton onClick={() => openSignIn()}>
                    Sign In
                  </NavButton>
                </>
              ) : (
                <NavButton onClick={handleSignOut}>
                  Sign Out
                </NavButton>
              )}
            </div>

            <MobileMenu 
              isOpen={isMobileMenuOpen}
              onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              isAuthenticated={isSignedIn}
              onSignIn={() => openSignIn()}
              onSignUp={() => openSignUp()}
              onSignOut={handleSignOut}
            />
          </div>
        </div>
      </div>
    </header>
  );
}