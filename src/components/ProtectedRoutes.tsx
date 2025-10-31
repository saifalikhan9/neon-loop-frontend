// ProtectedRoutes.tsx
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router";

export default function ProtectedRoutes() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // ✅ Wait for auth check to complete
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  // ✅ Redirect to login if not authenticated
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}