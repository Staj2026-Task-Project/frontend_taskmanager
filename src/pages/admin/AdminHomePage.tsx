import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export function AdminHomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Sayfa Başlığı ve Açıklaması */}
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Admin Panel
        </h1>
        <p className="mt-3 text-lg text-gray-500 max-w-2xl">
          Kullanıcı, grup, task oluşturma ve task atama işlemleri bu panelden
          hızlı ve güvenli bir şekilde yapılır.
        </p>
      </div>

      {/* Hızlı İşlem Kartları (Responsive Grid) */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Kullanıcı Yönetimi Kartı */}
        <Link
          to={ROUTES.adminUsers}
          className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            Kullanıcı Yönetimi
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Sistemdeki tüm kullanıcıları görüntüleyin, rol atayın veya yeni kullanıcılar ekleyin.
          </p>
        </Link>

        {/* Grup Yönetimi Kartı */}
        <Link
          to={ROUTES.adminGroups}
          className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-indigo-500 hover:shadow-lg"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
            Grup Yönetimi
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Ekipleri organize edin, yeni gruplar oluşturun ve takım yapılarını düzenleyin.
          </p>
        </Link>

        {/* Task Listesi Kartı */}
        <Link
          to={ROUTES.adminTasks}
          className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-teal-500 hover:shadow-lg"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 text-teal-600 transition-colors group-hover:bg-teal-600 group-hover:text-white">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
            Görev Listesi
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Sistemdeki tüm görevleri listeleyin, durumlarını ve ilerlemelerini takip edin.
          </p>
        </Link>

        {/* Task Oluştur Kartı */}
        <Link
          to={ROUTES.adminTaskCreate}
          className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500 hover:shadow-lg"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
            Yeni Görev Oluştur
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Sisteme yeni bir görev tanımı ekleyin, detayları ve önceliklerini belirleyin.
          </p>
        </Link>

        {/* Task Ata Kartı */}
        <Link
          to={ROUTES.adminTaskAssign}
          className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-orange-500 hover:shadow-lg"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 text-orange-600 transition-colors group-hover:bg-orange-600 group-hover:text-white">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
            Görev Ata
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Oluşturulan görevleri mevcut kullanıcılara veya ilgili gruplara paylaştırın.
          </p>
        </Link>
      </div>
    </main>
  );
}