import { NOTIFICATION_TYPE_LABELS } from "../constants/enums";
import { useAuth } from "../hooks/useAuth";
import { useNotificationsByUserId } from "../hooks/useNotifications";
import { formatDateTime } from "../utils/date";

export function MyNotificationsContainer() {
  const { userId } = useAuth();
  const notificationsQuery = useNotificationsByUserId(userId);

  if (!userId) {
    return <p>Kullanıcı ID bulunamadı.</p>;
  }

  if (notificationsQuery.isLoading) {
    return <p>Bildirimler yükleniyor...</p>;
  }

  if (notificationsQuery.error) {
    return <p>Bildirimler alınamadı.</p>;
  }

  return (
    <section>
      <h2>Bildirimlerim</h2>

      {!notificationsQuery.data?.length && <p>Bildirim bulunamadı.</p>}

      <ul>
        {notificationsQuery.data?.map((notification) => (
          <li key={notification.id}>
            <strong>{NOTIFICATION_TYPE_LABELS[notification.notificationType]}</strong>
            <div>{notification.message}</div>
            <div>{notification.isRead ? "Okundu" : "Okunmadı"}</div>
            <div>{formatDateTime(notification.createdAt)}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
