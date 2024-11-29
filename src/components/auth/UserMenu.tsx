import React, { useState } from 'react';
import { UserResource } from '@clerk/clerk-react';
import { Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface UserMenuProps {
  user: UserResource;
}

export default function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useAuth();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/5 transition-colors"
      >
        <img
          src={user.imageUrl}
          alt={user.fullName || 'User'}
          className="w-8 h-8 rounded-full border border-white/10"
        />
        <span className="hidden md:block text-sm text-gray-300">{user.fullName}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-[#1A1A2E] border border-white/10 shadow-lg py-1 z-50">
          <button
            onClick={() => {
              // Handle settings
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/5 flex items-center space-x-2"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <div className="my-1 border-t border-white/10" />
          <button
            onClick={() => {
              signOut();
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/5 flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}