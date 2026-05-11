import { useQuery } from "@tanstack/react-query";
import {
  getNotifications,
  getNotificationsByUserId,
} from "../api/notifications.api";

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });
}

export function useNotificationsByUserId(userId: number | null | undefined) {
  return useQuery({
    queryKey: ["notifications", "user", userId],
    queryFn: () => getNotificationsByUserId(userId as number),
    enabled: typeof userId === "number",
  });
}
