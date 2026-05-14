import { ErrorState } from "../components/feedback/ErrorState";
import { LoadingState } from "../components/feedback/LoadingState";
import { NotificationList } from "../components/notification/NotificationList";
import { useAuth } from "../hooks/useAuth";
import { useNotificationsByUserId } from "../hooks/useNotifications";

export function MyNotificationsContainer() {
  const { userId } = useAuth();
  const notificationsQuery = useNotificationsByUserId(userId);

  if (!userId) {
    return <ErrorState message="Kullanıcı ID bulunamadı." />;
  }

  if (notificationsQuery.isLoading) {
    return <LoadingState message="Bildirimler yükleniyor..." />;
  }

  if (notificationsQuery.error) {
    return <ErrorState message="Bildirimler alınamadı." />;
  }

  return (
    <section>
      <h2>Bildirimlerim</h2>
      <NotificationList notifications={notificationsQuery.data ?? []} />
    </section>
  );
}
