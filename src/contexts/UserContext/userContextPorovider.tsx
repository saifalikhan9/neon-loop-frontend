import { useEffect, useState } from "react";
import { UserContext, type UserContextType } from "./userContext";
import axios from "axios";
import api from "@/lib/axios";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<UserContextType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // ✅ Add loading state


  // ✅ Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      // Since you're using httpOnly cookies, don't rely on localStorage for auth
      // Instead, verify with backend
      try {
        // Call a /me or /verify endpoint to check if user is authenticated
        const res = await api.get("/users/me"); // You need to create this endpoint
        
        if (res.data.user) {
          setUser(res.data.user);
          setToken(res.data.accessToken); // If backend sends it
          setIsAuthenticated(true);
        }
      } catch (error) {
        // User is not authenticated
        setIsAuthenticated(false);
        setUser(null);
        setToken(undefined);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      const res = await api.post("/users/login", {
        email,
        password: pass,
      });

      if (res.data) {
        // ✅ Don't store token in localStorage if using httpOnly cookies
        // The cookie is automatically stored by the browser
        setToken(res.data.token); // Optional: only if you need it in state
        setUser(res.data.user);
        setIsAuthenticated(true);
        alert(res.data.message || "Login successful!");
      }

      return res;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error?.message ||
          error.response?.data?.message ||
          "Login failed. Please try again.";
        alert(errorMessage);
      } else {
        alert("An unexpected error occurred");
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      // ✅ Call backend to clear the httpOnly cookie
      await api.post("/users/logout");

      setToken(undefined);
      setUser(null);
      setIsAuthenticated(false);
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);

      setToken(undefined);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // ✅ Show loading state while checking authentication


  return (
    <UserContext.Provider
      value={{ user, login, logout, isAuthenticated, token }}
    >
      {children}
    </UserContext.Provider>
  );
}
