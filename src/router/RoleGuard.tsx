import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { UserRole } from "../types/user.types";
import { getCurrentUserRole } from "../services/auth.service";

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: ReactNode;
}

export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const currentRole = getCurrentUserRole();

  if (!currentRole || !allowedRoles.includes(currentRole)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
