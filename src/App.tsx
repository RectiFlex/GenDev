import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { 
  ClerkProvider, 
  SignedIn, 
  SignedOut, 
  useClerk, 
  useUser,
  ClerkProviderProps 
} from '@clerk/clerk-react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import { clerkConfig } from './services/clerk';
import LoadingSpinner from './components/common/LoadingSpinner';

// Separate component for protected routes
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoaded } = useClerk();
  const { isSignedIn } = useUser();

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

// Custom navigation handler for Clerk
function ClerkNavigationProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { setActive } = useClerk();

  React.useEffect(() => {
    // Update Clerk's navigation handler to use React Router
    setActive({
      beforeEmit: (navigation) => {
        navigate(navigation.toPath);
        return true;
      }
    });
  }, [navigate, setActive]);

  return <>{children}</>;
}

function App() {
  return (
    <ClerkProvider {...clerkConfig as ClerkProviderProps}>
      <BrowserRouter>
        <ClerkNavigationProvider>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SignedIn>
                    <Navigate to="/dashboard" replace />
                  </SignedIn>
                  <SignedOut>
                    <LandingPage />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ClerkNavigationProvider>
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;