"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import Cookies from "js-cookie";

// User interface matching database schema
export interface User {
  id: number;
  email: string;
  fullname: string;
  grade: number;
  city: string;
  schoolName?: string | null;
  phone?: string | null;
  createdAt: string;
  updatedAt?: string | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    userData: RegisterData
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  fullname: string;
  grade: number;
  city: string;
  schoolName?: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Fetch user profile using HTTP-only cookie (sent automatically by browser)
  const fetchProfile = async (): Promise<User | null> => {
    try {
      const response = await fetch("/api/auth/profile", {
        // credentials include ensures cookies are sent in all environments
        credentials: "include",
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  };

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      const userData = await fetchProfile();
      setUser(userData);
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error };
      }

      // Set user state
      setUser(data.user);

      // Cookie is set by API as HTTP-only; nothing to store on client
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "Đã xảy ra lỗi, vui lòng thử lại" };
    }
  };

  // Register function
  const register = async (userData: RegisterData) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error };
      }

      // Set user state
      setUser(data.user);

      return { success: true };
    } catch (error) {
      console.error("Register error:", error);
      return { success: false, error: "Đã xảy ra lỗi, vui lòng thử lại" };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout API error:", error);
    }

    // Clear state regardless of API response
    setUser(null);
    // Do not manage HTTP-only cookie on client; server route clears it
  };

  // Refresh user data
  const refreshUser = async () => {
    const userData = await fetchProfile();
    setUser(userData);
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
