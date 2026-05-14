import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { clearAuthToken } from "../../services/auth.service";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();

  function handleLogout() {
    clearAuthToken();
    navigate(ROUTES.login, { replace: true });
  }

  return (
    <div>
      <aside>
        <h2>Admin Panel</h2>

        <nav>
          <ul>
            <li>
              <Link to={ROUTES.adminHome}>Dashboard</Link>
            </li>
            <li>
              <Link to={ROUTES.adminUsers}>Kullanıcılar</Link>
            </li>
            <li>
              <Link to={ROUTES.adminGroups}>Gruplar</Link>
            </li>
            <li>
              <Link to={ROUTES.adminTasks}>Tasklar</Link>
            </li>
            <li>
              <Link to={ROUTES.adminTaskCreate}>Task Oluştur</Link>
            </li>
            <li>
              <Link to={ROUTES.adminTaskAssign}>Task Ata</Link>
            </li>
          </ul>
        </nav>

        <button type="button" onClick={handleLogout}>
          Çıkış yap
        </button>
      </aside>

      <div>{children}</div>
    </div>
  );
}
