export type TaskPriority = "HIGH" | "MEDIUM" | "LOW";

export type AssignmentRule =
  | "INDIVIDUAL"
  | "GROUP_ANYONE"
  | "GROUP_EVERYONE";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export interface TaskCreateRequest {
  title: string;
  description: string;
  priority: TaskPriority;
  assignmentRule: AssignmentRule;
  dueDate: string;
  createdBy: number;
}

export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  assignmentRule: AssignmentRule;
  dueDate: string;
  status: TaskStatus;
  createdBy: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
