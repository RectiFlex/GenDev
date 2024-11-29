import { useClerk, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const clerk = useClerk();
  const { user, isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await clerk.signOut();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return {
    user,
    isSignedIn,
    isLoaded,
    signOut: handleSignOut
  };
}