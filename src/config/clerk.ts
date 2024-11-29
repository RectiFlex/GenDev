import { ClerkProvider } from '@clerk/clerk-react';

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error('Missing Clerk Publishable Key');
}

export const clerkConfig = {
  publishableKey,
  appearance: {
    baseTheme: 'dark',
    variables: {
      colorPrimary: '#8B5CF6',
      colorTextOnPrimaryBackground: 'white',
    },
    elements: {
      card: 'glass-effect-strong',
      navbar: 'glass-effect',
      footer: 'glass-effect'
    }
  },
  // Use hash-based routing to avoid CORS issues
  navigate: (to: string) => {
    window.location.hash = to.replace(/^\//, '');
  }
};