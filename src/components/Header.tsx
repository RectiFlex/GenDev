import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './common/Logo';
import SignInButton from './auth/SignInButton';
import SignUpButton from './auth/SignUpButton';
import { useAuth } from '../hooks/useAuth';
import { useNavigation } from '../services/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const { goToDocumentation, goToSupport } = useNavigation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <Logo />
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <button 
                onClick={goToDocumentation}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Docs
              </button>
              <button 
                onClick={goToSupport}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Support
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              {!isSignedIn ? (
                <>
                  <SignUpButton />
                  <SignInButton />
                </>
              ) : (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Dashboard
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}