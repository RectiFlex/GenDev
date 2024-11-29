import React from 'react';
import { useClerk } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { session, loaded } = useClerk();

  if (!loaded) {
    return <LoadingSpinner />;
  }

  return session ? <>{children}</> : <Navigate to="/" replace />;
}