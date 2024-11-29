import React from 'react';
import { useClerk } from '@clerk/clerk-react';

export default function SignUpButton() {
  const { openSignUp } = useClerk();

  return (
    <button
      onClick={() => openSignUp()}
      className="text-gray-300 hover:text-white transition-colors duration-300"
    >
      Sign Up
    </button>
  );
}