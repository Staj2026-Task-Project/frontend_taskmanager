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
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 md:flex-row">
      {/* Sidebar */}
      <aside className="flex w-full flex-col border-b border-gray-200 bg-white md:w-64 md:border-b-0 md:border-r">
        {/* Başlık / Logo */}
        <div className="flex items-center justify-center border-b border-gray-50 p-6">
          <h2 className="text-lg font-bold tracking-tight text-blue-600">
            Kullanıcı Paneli
          </h2>
        </div>

        {/* Navigasyon Linkleri */}
        <nav className="flex flex-row space-x-2 p-4 md:flex-1 md:flex-col md:space-x-0 md:space-y-1">
          <Link
            to={ROUTES.userTasks}
            className="flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 md:flex-none"
          >
            Görevlerim
          </Link>
          <Link
            to={ROUTES.userNotifications}
            className="flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 md:flex-none"
          >
            Bildirimlerim
          </Link>
        </nav>

        {/* Çıkış Yap Butonu */}
        <div className="border-t border-gray-100 p-4">
          <button
            onClick={handleLogout}
            className="w-full rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition-all hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200"
          >
            Çıkış yap
          </button>
        </div>
      </aside>

      {/* Ana İçerik Alanı */}
      <main className="flex-1 overflow-auto p-6 md:p-10">
        <div className="mx-auto max-w-5xl">
          {children}
        </div>
      </main>
    </div>
  );
}