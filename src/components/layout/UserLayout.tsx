import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { clearAuthToken } from "../../services/auth.service";

interface UserLayoutProps {
  children: ReactNode;
}

export function UserLayout({ children }: UserLayoutProps) {
  const navigate = useNavigate();

  function handleLogout() {
    clearAuthToken();
    navigate(ROUTES.login, { replace: true });
  }

  return (
    <div>
      <aside>
        <h2>Kullanıcı Paneli</h2>

        <nav>
          <ul>
            <li>
              <Link to={ROUTES.userTasks}>Görevlerim</Link>
            </li>
            <li>
              <Link to={ROUTES.userNotifications}>Bildirimlerim</Link>
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
