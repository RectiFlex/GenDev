import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Logo from '../common/Logo';
import { useNavigation } from '../../services/navigation';

export default function DashboardHeader() {
  const { user, signOut } = useAuth();
  const { goToProjects, goToDocumentation, goToSupport } = useNavigation();

  if (!user) return null;

  return (
    <header className="h-14 border-b border-white/10 px-4 flex items-center justify-between bg-[#0D0D1E]/95 backdrop-blur-sm">
      <div className="flex items-center space-x-6">
        <Logo />
        <nav className="hidden md:flex space-x-6">
          <button 
            onClick={goToProjects}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Projects
          </button>
          <button 
            onClick={goToDocumentation}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Documentation
          </button>
          <button 
            onClick={goToSupport}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Support
          </button>
        </nav>
      </div>
      
      <button
        onClick={signOut}
        className="text-gray-300 hover:text-white transition-colors"
      >
        Sign Out
      </button>
    </header>
  );
}