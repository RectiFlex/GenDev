import { useAuthStore } from '../auth/store/authStore';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const { user, isAuthenticated, isLoading, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    signOut: handleSignOut
  };
}