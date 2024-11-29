import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';

export function useRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;

    const from = location.state?.from?.pathname || '/';
    
    if (isSignedIn && location.pathname === '/') {
      navigate('/dashboard', { replace: true });
    } else if (!isSignedIn && location.pathname !== '/') {
      navigate('/', { replace: true, state: { from } });
    }
  }, [isSignedIn, isLoaded, location, navigate]);
}