import { useEffect, useState } from "react";
import { UserContext, type UserContextType } from "./userContext";
import axios from "axios";
import api from "@/lib/axios";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<UserContextType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // ✅ Add loading state
  console.log(token);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const res = await api.get("/users/me");

        if (res.data.user) {
          setUser(res.data.user);
          setToken(res.data.accessToken);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser(null);
        setToken(undefined);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signup = async (
    email: string,
    password: string,
    confirmPassword: string,
    name: string
  ) => {
    try {
      const res = await api.post("users/signup", {
        email,
        name,
        password,
        confirmPassword,
      });
      return res;
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, pass: string) => {
    try {
      const res = await api.post("/users/login", {
        email,
        password: pass,
      });

      if (res.data) {
        setToken(res.data.token);
        setUser(res.data.user);
        setIsAuthenticated(true);
        alert("Login successful!");
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
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/users/logout");
      setToken(undefined);
      setUser(null);
      setIsAuthenticated(false);
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      // setToken(undefined);
      // setUser(null);
      // setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, login, logout, signup, isAuthenticated, token, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
}
