import { UserContext } from "@/contexts/UserContext/userContext";
import { useContext } from "react";

export function useAuth() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within CartProvider");
  }
  return context;
}
