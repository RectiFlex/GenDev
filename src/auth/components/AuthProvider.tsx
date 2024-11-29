import React, { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { getCurrentUser } from '../services/authService';
import { getAuthToken, isTokenValid } from '../utils/token';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AuthContext = createContext<{
  isAuthenticated: boolean;
  isLoading: boolean;
}>({
  isAuthenticated: false,
  isLoading: true,
});

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { isLoading, setLoading, isAuthenticated, setError } = useAuthStore();

  useEffect(() => {
    async function initializeAuth() {
      const token = getAuthToken();
      if (!token || !isTokenValid(token)) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser();
        useAuthStore.setState({ 
          user: response.user, 
          isAuthenticated: true 
        });
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Authentication failed');
        navigate('/', { replace: true });
      } finally {
        setLoading(false);
      }
    }

    initializeAuth();
  }, [navigate, setLoading, setError]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading }}>
      {isLoading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
}