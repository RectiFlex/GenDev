import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../auth/store/authStore';

export function useRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading) {
      const from = location.state?.from?.pathname || '/';
      
      if (isAuthenticated && location.pathname === '/') {
        navigate('/dashboard', { replace: true });
      } else if (!isAuthenticated && location.pathname !== '/') {
        navigate('/', { replace: true, state: { from } });
      }
    }
  }, [isAuthenticated, isLoading, location, navigate]);
}