import React from 'react';
import { useRedirect } from '../hooks/useRedirect';
import AuthProvider from '../components/auth/AuthProvider';
import DashboardLayout from '../components/layout/DashboardLayout';

export default function Dashboard() {
  useRedirect();

  return (
    <AuthProvider>
      <DashboardLayout />
    </AuthProvider>
  );
}