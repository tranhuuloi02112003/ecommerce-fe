import type { UserProfile } from "../services/userApi";

export type AuthContextValue = {
  user: UserProfile | null;
  loadingUser: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshMe: () => Promise<void>;
  setUser: (u: UserProfile | null) => void;
};