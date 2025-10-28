import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthService } from "../services/authService";

interface User {
  id: number;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        try {
          const { user, token } = await AuthService.login(email, password);
          set({ user, token, isAuthenticated: true });
          window.location.href = "/game";
        } catch (error) {
          console.error("Login error:", error);
          alert("Login failed");
        }
      },

      register: async (email, password) => {
        try {
          const { user, token } = await AuthService.register(email, password);
          set({ user, token, isAuthenticated: true });
          window.location.href = "/game";
        } catch (error) {
          console.error("Register error:", error);
          alert("Registration failed");
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        window.location.href = "/login";
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
