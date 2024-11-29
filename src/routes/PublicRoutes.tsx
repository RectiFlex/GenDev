import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/common/LoadingSpinner';

export function PublicRoutes() {
  const { isSignedIn, isLoaded } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  if (isSignedIn) {
    return <Navigate to="/dashboard" replace state={{ from: location }} />;
  }

  return <Outlet />;
}