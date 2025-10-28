import { api } from "./api";

interface User {
  id: number;
  email: string;
}

interface AuthResponse {
  user: User | null;
  token: string;
}

export const AuthService = {
  async register(email: string, password: string): Promise<AuthResponse> {
    const res = await api.post("/auth/signup", { email, password });
    const { user, access_token } = res.data;

    if (!access_token) {
      throw new Error("No access token received from register");
    }

    return {
      user: user ?? null,
      token: access_token,
    };
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await api.post("/auth/login", { email, password });
    const { access_token } = res.data;

    if (!access_token) {
      throw new Error("No access token received from login");
    }

    try {
      const me = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      return {
        user: me.data ?? null,
        token: access_token,
      };
    } catch {
      return {
        user: null,
        token: access_token,
      };
    }
  },
};
