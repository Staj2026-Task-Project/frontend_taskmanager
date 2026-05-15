import type { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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

  // NavLink için aktif ve pasif durum stillerini belirleyen yardımcı fonksiyon
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 md:flex-row">
      {/* Sidebar / Üst Menü */}
      <nav className="z-20 flex w-full flex-col bg-gray-900 shadow-xl md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0">

        {/* Logo & Mobil Çıkış Alanı */}
        <div className="flex items-center justify-between border-b border-gray-800 p-4 md:p-6">
          <h2 className="text-xl font-bold tracking-wider text-white">
            Admin Panel
          </h2>
          <button
            onClick={handleLogout}
            className="flex items-center rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-700 md:hidden"
          >
            Çıkış
          </button>
        </div>

        {/* Navigasyon Linkleri */}
        <div className="flex flex-row gap-1 overflow-x-auto p-3 md:flex-1 md:flex-col md:overflow-y-auto md:p-4">
          <NavLink to={ROUTES.adminHome} className={getNavLinkClass} end>
            Dashboard
          </NavLink>
          <NavLink to={ROUTES.adminUsers} className={getNavLinkClass}>
            Kullanıcılar
          </NavLink>
          <NavLink to={ROUTES.adminGroups} className={getNavLinkClass}>
            Gruplar
          </NavLink>
          <NavLink to={ROUTES.adminTasks} className={getNavLinkClass}>
            Tasklar
          </NavLink>
          <NavLink to={ROUTES.adminTaskCreate} className={getNavLinkClass}>
            Task Oluştur
          </NavLink>
          <NavLink to={ROUTES.adminTaskAssign} className={getNavLinkClass}>
            Task Ata
          </NavLink>
        </div>

        {/* Masaüstü Çıkış Alanı */}
        <div className="hidden border-t border-gray-800 p-4 md:block">
          <button
            onClick={handleLogout}
            className="w-full rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Çıkış yap
          </button>
        </div>
      </nav>

      {/* Main Content (Sağ İçerik Alanı) */}
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}