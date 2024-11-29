import { ClerkProvider } from '@clerk/clerk-react';

// Ensure the publishable key is properly formatted and valid
export const publishableKey = 'pk_test_Y29vbC1nb29zZS00Mi5jbGVyay5hY2NvdW50cy5kZXYk';

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
  }
};