import React from 'react';
import { useAuthStore } from '../auth/store/authStore';
import Logo from './common/Logo';

interface HeaderProps {
  onAuthClick: () => void;
}

export default function Header({ onAuthClick }: HeaderProps) {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <header className="fixed top-2 left-4 right-4 z-50">
      <div className="mx-auto rounded-full border border-purple-500/10
                    bg-gradient-to-r from-purple-900/40 to-gray-900/40 backdrop-blur-md
                    shadow-lg shadow-purple-500/5 py-3">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Logo />
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#faq" className="text-gray-300 hover:text-white transition-colors">
                FAQ
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={onAuthClick}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 
                           text-white font-medium transform hover:scale-105 hover:shadow-lg 
                           hover:shadow-purple-500/25 transition-all duration-300 ease-out"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}