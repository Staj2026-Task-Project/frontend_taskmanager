import { NOTIFICATION_TYPE_LABELS } from "../../constants/enums";
import type { NotificationResponse } from "../../types/notification.types";
import { formatDateTime } from "../../utils/date";

interface NotificationListProps {
  notifications: NotificationResponse[];
}

export function NotificationList({ notifications }: NotificationListProps) {
  // Boş durum (Empty State)
  if (!notifications.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-12 text-center">
        <svg
          className="mb-4 h-12 w-12 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <h3 className="text-sm font-medium text-gray-900">Bildirim bulunamadı</h3>
        <p className="mt-1 text-sm text-gray-500">
          Şu anda size ait herhangi bir bildirim kaydı yok.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`relative flex flex-col rounded-xl border p-5 shadow-sm transition-all duration-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:gap-6 ${
            notification.isRead
              ? "border-gray-100 bg-white"
              : "border-blue-100 bg-blue-50/50"
          }`}
        >
          {/* Sol Kısım: Rozet ve Mesaj */}
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                {NOTIFICATION_TYPE_LABELS[notification.notificationType]}
              </span>
              {/* Mobil görünüm için tarih */}
              <span className="text-xs font-medium text-gray-400 sm:hidden">
                {formatDateTime(notification.createdAt)}
              </span>
            </div>

            <p
              className={`text-sm ${
                notification.isRead
                  ? "font-medium text-gray-600"
                  : "font-semibold text-gray-900"
              }`}
            >
              {notification.message}
            </p>
          </div>

          {/* Sağ Kısım: Tarih ve Durum */}
          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 sm:mt-0 sm:flex-col sm:items-end sm:border-none sm:pt-0">
            {/* Masaüstü görünüm için tarih */}
            <span className="mb-2 hidden text-xs font-medium text-gray-400 sm:block">
              {formatDateTime(notification.createdAt)}
            </span>

            {/* Okunma Durumu */}
            {notification.isRead ? (
              <span className="text-xs font-medium text-gray-400">Okundu</span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs font-bold text-blue-600">
                <span className="h-2 w-2 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.8)] animate-pulse"></span>
                Okunmadı
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}