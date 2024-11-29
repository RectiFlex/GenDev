import React from 'react';

interface NavButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function NavButton({ children, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium
                transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25
                transition-all duration-300 ease-out"
    >
      {children}
    </button>
  );
}