import { dark } from '@clerk/themes';

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error('Missing Clerk Publishable Key');
}

export const clerkConfig = {
  publishableKey,
  appearance: {
    baseTheme: dark,
    variables: {
      colorPrimary: '#8B5CF6',
      colorTextOnPrimaryBackground: 'white',
    },
    elements: {
      card: 'glass-effect-strong',
      navbar: 'glass-effect',
      footer: 'glass-effect',
      formButtonPrimary: 
        'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300',
      formFieldInput: 'bg-white/5 border-white/10',
      dividerLine: 'bg-white/10',
      dividerText: 'text-white/60',
      socialButtonsIconButton: 'bg-white/5 hover:bg-white/10 border-white/10',
      socialButtonsBlockButton: 'bg-white/5 hover:bg-white/10 border-white/10',
      footerActionLink: 'text-purple-400 hover:text-purple-300',
      headerTitle: 'text-white',
      headerSubtitle: 'text-white/60',
    },
  },
  afterSignInUrl: '/dashboard',
  afterSignUpUrl: '/dashboard',
  signInUrl: '/',
  signUpUrl: '/',
};