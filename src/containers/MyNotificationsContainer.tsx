import { NotificationList } from "../components/notification/NotificationList";
import { useAuth } from "../hooks/useAuth";
import { useNotificationsByUserId } from "../hooks/useNotifications";

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
      <NotificationList notifications={notificationsQuery.data ?? []} />
    </section>
  );
}
