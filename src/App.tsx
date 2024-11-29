import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import { clerkConfig } from './services/clerk';
import LoadingSpinner from './components/common/LoadingSpinner';

function App() {
  return (
    <ClerkProvider {...clerkConfig} navigate={(to) => window.location.href = to}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <SignedIn>
                <Navigate to="/dashboard" replace />
              </SignedIn>
              <SignedOut>
                <LandingPage />
              </SignedOut>
            </>
          } />
          <Route path="/dashboard" element={
            <SignedIn>
              <Dashboard />
            </SignedIn>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;