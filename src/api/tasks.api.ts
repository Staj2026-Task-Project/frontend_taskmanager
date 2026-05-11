import { axiosClient } from "./axiosClient";
import type { TaskCreateRequest, TaskResponse } from "../types/task.types";

export async function createTask(data: TaskCreateRequest): Promise<TaskResponse> {
  const response = await axiosClient.post<TaskResponse>("/tasks", data);
  return response.data;
}

export async function getTasks(): Promise<TaskResponse[]> {
  const response = await axiosClient.get<TaskResponse[]>("/tasks");
  return response.data;
}

export async function getTaskById(taskId: number): Promise<TaskResponse> {
  const response = await axiosClient.get<TaskResponse>(`/tasks/${taskId}`);
  return response.data;
}
