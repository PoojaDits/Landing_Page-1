import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useState, useEffect } from 'react';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

interface AuthStore extends AuthState, AuthActions { }

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => set({
        user,
        token,
        isAuthenticated: true,
      }),

      clearAuth: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        localStorage.removeItem('myToken');
        localStorage.removeItem('myUser');
        localStorage.removeItem('impersonator');
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Hook to safely wait for Zustand persist rehydration (prevents premature redirects on first render / refresh)
export function useAuthHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    // If already hydrated (sync case), set immediately
    setHydrated(useAuthStore.persist.hasHydrated());

    return unsub;
  }, []);

  return hydrated;
}

