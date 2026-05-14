export type NotificationType = "PENALTY" | "SYSTEM" | "GROUP_ALERT";

export interface NotificationResponse {
  id: number;
  userId: number;
  taskAssignmentId: number;
  notificationType: NotificationType;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}
