import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/auth/LoginPage";
import { AdminHomePage } from "../pages/admin/AdminHomePage";
import { MyTasksPage } from "../pages/user/MyTasksPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { RoleGuard } from "./RoleGuard";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={["ROLE_ADMIN"]}>
              <AdminHomePage />
            </RoleGuard>
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/tasks"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={["ROLE_USER"]}>
              <MyTasksPage />
            </RoleGuard>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
