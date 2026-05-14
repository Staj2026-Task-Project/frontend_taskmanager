import type { AssignmentRule, TaskPriority, TaskStatus } from "../types/task.types";
import type { UserRole } from "../types/user.types";
import type { NotificationType } from "../types/notification.types";

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  ROLE_ADMIN: "Admin",
  ROLE_USER: "Kullanıcı",
};

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  HIGH: "Yüksek",
  MEDIUM: "Orta",
  LOW: "Düşük",
};

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  TODO: "Bekliyor",
  IN_PROGRESS: "Devam ediyor",
  DONE: "Tamamlandı",
};

export const ASSIGNMENT_RULE_LABELS: Record<AssignmentRule, string> = {
  INDIVIDUAL: "Kişiye atanır",
  GROUP_ANYONE: "Gruptan bir kişi tamamlayabilir",
  GROUP_EVERYONE: "Gruptaki herkes tamamlamalı",
};

export const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
  PENALTY: "Ceza",
  SYSTEM: "Sistem",
  GROUP_ALERT: "Grup bildirimi",
};
