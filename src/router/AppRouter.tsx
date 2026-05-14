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
import { AdminLayout } from "../components/layout/AdminLayout";
import { UserLayout } from "../components/layout/UserLayout";
import { ROUTES } from "../constants/routes";

function AdminRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={["ROLE_ADMIN"]}>
        <AdminLayout>{children}</AdminLayout>
      </RoleGuard>
    </ProtectedRoute>
  );
}

function UserRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={["ROLE_USER"]}>
        <UserLayout>{children}</UserLayout>
      </RoleGuard>
    </ProtectedRoute>
  );
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={ROUTES.login} replace />} />

      <Route path={ROUTES.login} element={<LoginPage />} />

      <Route
        path={ROUTES.adminHome}
        element={
          <AdminRoute>
            <AdminHomePage />
          </AdminRoute>
        }
      />

      <Route
        path={ROUTES.adminUsers}
        element={
          <AdminRoute>
            <AdminUsersPage />
          </AdminRoute>
        }
      />

      <Route
        path={ROUTES.adminGroups}
        element={
          <AdminRoute>
            <AdminGroupsPage />
          </AdminRoute>
        }
      />

      <Route
        path={ROUTES.adminTasks}
        element={
          <AdminRoute>
            <AdminTasksPage />
          </AdminRoute>
        }
      />

      <Route
        path={ROUTES.adminTaskCreate}
        element={
          <AdminRoute>
            <TaskCreatePage />
          </AdminRoute>
        }
      />

      <Route
        path={ROUTES.adminTaskAssign}
        element={
          <AdminRoute>
            <TaskAssignPage />
          </AdminRoute>
        }
      />

      <Route
        path={ROUTES.userTasks}
        element={
          <UserRoute>
            <MyTasksPage />
          </UserRoute>
        }
      />

      <Route
        path={ROUTES.userNotifications}
        element={
          <UserRoute>
            <MyNotificationsPage />
          </UserRoute>
        }
      />

      <Route path="*" element={<Navigate to={ROUTES.login} replace />} />
    </Routes>
  );
}
