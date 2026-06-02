import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export function useAdminAuth() {
  const navigate = useNavigate();
  const { setSession, clearSession, isAuthenticated, accessToken, userEmail } = useAuthStore();

  const login = useCallback(
    async (email: string, password: string) => {
      if (!supabase) {
        toast.error('Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
        return false;
      }
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error(error.message);
        return false;
      }
      const token = data.session?.access_token;
      if (!token) {
        toast.error('No session returned');
        return false;
      }
      setSession(token, email);
      toast.success('Welcome back!');
      navigate('/admin');
      return true;
    },
    [navigate, setSession]
  );

  const logout = useCallback(async () => {
    if (supabase) await supabase.auth.signOut();
    clearSession();
    navigate('/admin/login');
  }, [clearSession, navigate]);

  return { login, logout, isAuthenticated, accessToken, userEmail };
}
