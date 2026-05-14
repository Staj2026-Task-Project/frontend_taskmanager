import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth.service";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
