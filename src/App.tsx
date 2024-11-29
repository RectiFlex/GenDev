import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { clerkConfig } from './config/clerk';
import { PublicRoutes } from './routes/PublicRoutes';
import { PrivateRoutes } from './routes/PrivateRoutes';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ClerkProvider {...clerkConfig}>
      <HashRouter>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/" element={<LandingPage />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </ClerkProvider>
  );
}

export default App;