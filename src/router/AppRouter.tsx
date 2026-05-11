import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/auth/LoginPage";
import { AdminHomePage } from "../pages/admin/AdminHomePage";
import { AdminUsersPage } from "../pages/admin/AdminUsersPage";
import { AdminGroupsPage } from "../pages/admin/AdminGroupsPage";
import { AdminTasksPage } from "../pages/admin/AdminTasksPage";
import { TaskCreatePage } from "../pages/admin/TaskCreatePage";
import { TaskAssignPage } from "../pages/admin/TaskAssignPage";
import { MyTasksPage } from "../pages/user/MyTasksPage";
import { MyNotificationsPage } from "../pages/user/MyNotificationsPage";
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
        path="/admin/users"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={["ROLE_ADMIN"]}>
              <AdminUsersPage />
            </RoleGuard>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/groups"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={["ROLE_ADMIN"]}>
              <AdminGroupsPage />
            </RoleGuard>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/tasks"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={["ROLE_ADMIN"]}>
              <AdminTasksPage />
            </RoleGuard>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/tasks/create"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={["ROLE_ADMIN"]}>
              <TaskCreatePage />
            </RoleGuard>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/tasks/assign"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={["ROLE_ADMIN"]}>
              <TaskAssignPage />
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

      <Route
        path="/user/notifications"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={["ROLE_USER"]}>
              <MyNotificationsPage />
            </RoleGuard>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
