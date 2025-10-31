import { createContext } from "react";
import { type AxiosResponse } from "axios";

export interface UserContextType {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: UserContextType;
  message?: string;
}

interface UserContext {
  user: UserContextType | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<AxiosResponse<LoginResponse>>;
  logout: () => void;
  signup: (
    email: string,
    password: string,
    confirmPassword: string,
    name: string
  ) => Promise<AxiosResponse>;
  isAuthenticated: boolean;
  token?: string;
}

export const UserContext = createContext<UserContext | null>(null);
