"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

interface DemoUser {
  name: string;
  email: string;
  role: "demo";
}

interface AuthContextValue {
  user: DemoUser | null;
  loginDemo: (email: string, password: string) => boolean;
  logout: () => void;
}

const STORAGE_KEY = "voi_demo_user";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }
    try {
      setUser(JSON.parse(raw) as DemoUser);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const loginDemo = useCallback((email: string, password: string) => {
    const ok = email.trim().toLowerCase() === "demo@voi.news" && password === "demo123";
    if (!ok) {
      return false;
    }

    const demoUser: DemoUser = {
      name: "Demo User",
      email: "demo@voi.news",
      role: "demo"
    };
    setUser(demoUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({ user, loginDemo, logout }),
    [user, loginDemo, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
