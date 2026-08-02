"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { userApi, authApi, setRefreshTokenFn } from "@repo/shared";
import type { User } from "@repo/shared";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshTokens: () => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin credentials are provisioned directly in the DB at deploy time —
// there's no self-registration for this app. Only role === 'ADMIN' may
// hold a session here, so a correct password on a non-admin account is
// still rejected.
const assertAdmin = (user: User) => {
  if (user.role !== "ADMIN") {
    throw new Error(
      "This dashboard is only accessible to administrator accounts.",
    );
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Refresh token function – shared with apiClient via setRefreshTokenFn
  const refreshTokens = useCallback(async (): Promise<string> => {
    try {
      const res = await authApi.refresh();
      const newToken = res.data.accessToken;
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", newToken);
      }
      return newToken;
    } catch {
      // Refresh failed – clear local storage and redirect
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
      }
      setUser(null);
      router.push("/login");
      return "";
    }
  }, [router]);

  // On mount: set refresh function, then load user
  useEffect(() => {
    setRefreshTokenFn(refreshTokens);

    const loadUser = async () => {
      try {
        const res = await userApi.getProfile();
        assertAdmin(res.data.user);
        setUser(res.data.user);
      } catch {
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
        }
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, [refreshTokens]);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await authApi.login({ email, password });
      const { accessToken, user } = res.data;

      assertAdmin(user);

      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", accessToken);
      }
      setUser(user);
      router.push("/dashboard");
    },
    [router],
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
    }
    setUser(null);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, refreshTokens }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
