import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  createContext,
} from "react";
import { userApi, type UserProfile } from "../services/userApi";
import authApi from "../services/authApi";
import type { AuthContextValue } from "@/types/auth";

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const fetchMe = useCallback(async () => {
    if (!localStorage.getItem("accessToken")) {
      setUser(null);
      return;
    }
    try {
      const me = await userApi.getUserProfile();
      setUser(me);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setUser(null);
    }
  }, []);

  const refreshMe = useCallback(async () => {
    try {
      await fetchMe();
    } catch {
      setUser(null);
    }
  }, [fetchMe]);

  const login = useCallback(
    async (email: string, password: string) => {
      await authApi.login({ email, password });
      await refreshMe();
    },
    [refreshMe]
  );

  const logout = useCallback(async () => {
    await authApi.logout();
    setUser(null);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await fetchMe();
      } finally {
        setLoadingUser(false);
      }
    })();
  }, [fetchMe]);

  const value = useMemo(
    () => ({
      user,
      loadingUser,
      isAuthenticated: !!user,
      login,
      logout,
      refreshMe,
      setUser,
    }),
    [user, loadingUser, login, logout, refreshMe]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
