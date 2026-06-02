import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  userEmail: string | null;
  setSession: (token: string, email: string) => void;
  clearSession: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      userEmail: null,
      setSession: (accessToken, userEmail) => set({ accessToken, userEmail }),
      clearSession: () => set({ accessToken: null, userEmail: null }),
      isAuthenticated: () => Boolean(get().accessToken),
    }),
    { name: 'framecraft-admin-auth' }
  )
);
