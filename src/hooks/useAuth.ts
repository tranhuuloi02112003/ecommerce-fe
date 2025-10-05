import { AuthContext } from "@/contexts/AuthProvider";
import type { AuthContextValue } from "@/types/auth";
import { useContext } from "react";

export function useAuth(): AuthContextValue {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("useAuth must be used within AuthProvider");
  return authContext;
}
