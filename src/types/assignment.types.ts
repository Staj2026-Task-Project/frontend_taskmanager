import type { TaskStatus } from "./task.types";

export interface TaskAssignRequest {
  taskId: number;
  userId?: number;
  groupId?: number;
}

export interface TaskAssignmentResponse {
  id: number;
  taskId: number;
  userId: number | null;
  groupId: number | null;
  taskState: TaskStatus;
  penaltyApplied: boolean;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TaskStateUpdateRequest {
  taskAssignmentId: number;
  newState: TaskStatus;
  userId: number;
}
