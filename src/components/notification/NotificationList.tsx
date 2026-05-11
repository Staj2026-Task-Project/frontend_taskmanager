import { NOTIFICATION_TYPE_LABELS } from "../../constants/enums";
import type { NotificationResponse } from "../../types/notification.types";
import { formatDateTime } from "../../utils/date";

interface NotificationListProps {
  notifications: NotificationResponse[];
}

export function NotificationList({ notifications }: NotificationListProps) {
  if (!notifications.length) {
    return <p>Bildirim bulunamadı.</p>;
  }

  return (
    <ul>
      {notifications.map((notification) => (
        <li key={notification.id}>
          <strong>
            {NOTIFICATION_TYPE_LABELS[notification.notificationType]}
          </strong>

          <div>{notification.message}</div>
          <div>{notification.isRead ? "Okundu" : "Okunmadı"}</div>
          <div>{formatDateTime(notification.createdAt)}</div>
        </li>
      ))}
    </ul>
  );
}
