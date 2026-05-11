import { axiosClient } from "./axiosClient";
import type { NotificationResponse } from "../types/notification.types";

export async function getNotifications(): Promise<NotificationResponse[]> {
  const response = await axiosClient.get<NotificationResponse[]>("/notifications");
  return response.data;
}

export async function getNotificationsByUserId(
  userId: number
): Promise<NotificationResponse[]> {
  const response = await axiosClient.get<NotificationResponse[]>(
    `/notifications/user/${userId}`
  );

  return response.data;
}
