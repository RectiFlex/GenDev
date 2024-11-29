import { useClerk, useUser } from '@clerk/clerk-react';
import { db } from '../db';

export async function createUser(userId: string, email: string) {
  await db`
    INSERT INTO users (id, email)
    VALUES (${userId}, ${email})
    ON CONFLICT (id) DO NOTHING
  `;
}

export function useAuth() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return {
    user,
    isSignedIn,
    signOut: handleSignOut
  };
}