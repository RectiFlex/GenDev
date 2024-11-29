import React from 'react';
import { Menu, X } from 'lucide-react';
import NavLink from './NavLink';
import NavButton from './NavButton';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  isAuthenticated: boolean;
  onSignIn: () => void;
  onSignUp: () => void;
  onSignOut: () => void;
}

export default function MobileMenu({ 
  isOpen, 
  onToggle, 
  isAuthenticated,
  onSignIn,
  onSignUp,
  onSignOut
}: MobileMenuProps) {
  return (
    <div className="md:hidden">
      <button onClick={onToggle} className="text-white p-2">
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 p-4 rounded-2xl bg-gradient-to-b from-purple-900/90 to-gray-900/90 backdrop-blur-xl
                      border border-purple-500/20 shadow-xl transform animate-fadeIn">
          <nav className="flex flex-col space-y-4">
            <NavLink href="#">Home</NavLink>
            <NavLink href="#">How it Works</NavLink>
            <NavLink href="#">Features</NavLink>
            <NavLink href="#">Pricing</NavLink>
            <NavLink href="#">FAQ</NavLink>
            {!isAuthenticated ? (
              <>
                <button
                  onClick={onSignUp}
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Sign Up
                </button>
                <NavButton onClick={onSignIn}>Sign In</NavButton>
              </>
            ) : (
              <NavButton onClick={onSignOut}>Sign Out</NavButton>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}