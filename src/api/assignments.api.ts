import { axiosClient } from "./axiosClient";
import type {
  TaskAssignRequest,
  TaskAssignmentResponse,
  TaskStateUpdateRequest,
} from "../types/assignment.types";

export async function assignTask(
  data: TaskAssignRequest
): Promise<TaskAssignmentResponse> {
  const response = await axiosClient.post<TaskAssignmentResponse>(
    "/task-assignments",
    data
  );

  return response.data;
}

export async function getTaskAssignments(): Promise<TaskAssignmentResponse[]> {
  const response = await axiosClient.get<TaskAssignmentResponse[]>(
    "/task-assignments"
  );

  return response.data;
}

export async function updateTaskState(
  data: TaskStateUpdateRequest
): Promise<TaskAssignmentResponse> {
  const response = await axiosClient.patch<TaskAssignmentResponse>(
    "/task-assignments/state",
    data
  );

  return response.data;
}
