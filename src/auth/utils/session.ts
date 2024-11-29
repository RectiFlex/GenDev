import { useUser } from '@clerk/clerk-react';

export function useSession() {
  const { user, isSignedIn, isLoaded } = useUser();

  return {
    session: isSignedIn ? {
      user: {
        id: user?.id,
        email: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
        imageUrl: user?.imageUrl,
      }
    } : null,
    isLoaded,
  };
}